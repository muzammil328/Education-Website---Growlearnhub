import { Request, Response, NextFunction } from 'express';
import {
  ResponseHandler,
  verifyAccessToken,
  refreshAccessToken,
  revokeToken,
  AccessTokenPayload,
  getDeviceInfoFromRequest,
} from '@muzammil328/core';
import { logTreeStep } from '@muzammil328/services';
import { config } from '@config/env.config';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  newAccessToken?: string;
  refreshTokenUsed?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extracts the access token from the Authorization header
 * @param authHeader - Full Authorization header value
 * @returns The token string or null if not found
 */
const extractAccessToken = (authHeader?: string): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1] || null;
};

/**
 * Extracts the refresh token from cookie or request body
 * @param req - Express Request object
 * @returns The refresh token or null if not found
 */
const extractRefreshToken = (req: Request): string | null => {
  // First try to get from cookie (more secure)
  const cookieToken = req.cookies?.refreshToken;
  if (cookieToken) {
    return cookieToken;
  }

  // Fall back to body (for mobile apps or special cases)
  const bodyToken = req.body?.refreshToken;
  if (bodyToken) {
    return bodyToken;
  }

  return null;
};

// ============================================================================
// Main Authentication Middleware
// ============================================================================

/**
 * Main authentication middleware
 *
 * This middleware handles the complete authentication flow:
 * - Verifies access token
 * - Auto-refreshes if access token is expired
 * - Returns new access token in response header if refreshed
 *
 * Usage:
 * ```typescript
 * router.get('/protected', authenticate, controller);
 * ```
 *
 * Response headers when token is refreshed:
 * - `X-New-Access-Token`: The new access token (if refresh was successful)
 * - `X-Token-Refreshed`: Set to 'true' if token was refreshed
 */
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const startTime = Date.now();

  logTreeStep('Authenticating request', {
    meta: {
      method: req.method,
      url: req.originalUrl,
      hasAuthHeader: !!req.headers.authorization,
    },
  });

  // Step 1: Extract access token from Authorization header
  const authHeader = req.headers.authorization;
  const accessToken = extractAccessToken(authHeader);

  if (!accessToken) {
    logTreeStep('No access token provided');
    ResponseHandler.unauthorized(res, 'Access token is required');
    return;
  }

  // Step 2: Verify the access token
  logTreeStep('Verifying access token');
  const accessTokenResult = verifyAccessToken(accessToken);

  // Step 3a: Access token is valid - proceed with request
  if (accessTokenResult.valid && accessTokenResult.payload) {
    const payload = accessTokenResult.payload as unknown as AccessTokenPayload;

    // Attach user info to request
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    logTreeStep('Access token valid, request authenticated', {
      meta: {
        userId: payload.id,
        role: payload.role,
        duration: `${Date.now() - startTime}ms`,
      },
    });

    next();
    return;
  }

  // Step 3b: Access token is expired - try to refresh
  if (accessTokenResult.expired) {
    logTreeStep('Access token expired, attempting refresh');

    // Try to get refresh token
    const refreshToken = extractRefreshToken(req);

    if (!refreshToken) {
      logTreeStep('No refresh token available for token refresh');
      ResponseHandler.unauthorized(res, 'Session expired. Please login again.');
      return;
    }

    // Get device info for the new token
    const deviceInfo = getDeviceInfoFromRequest(req);

    // Attempt to refresh the token
    logTreeStep('Attempting token refresh', {
      meta: { userAgent: deviceInfo.userAgent, ip: deviceInfo.ip },
    });
    const newTokens = await refreshAccessToken(refreshToken, deviceInfo);

    if (newTokens) {
      // Token refresh successful - proceed with request and return new token
      logTreeStep('Token refresh successful', {
        meta: {
          userId: req.user?.id,
          duration: `${Date.now() - startTime}ms`,
        },
      });

      // Attach the new access token to request for the controller
      req.newAccessToken = newTokens.accessToken;
      req.refreshTokenUsed = refreshToken;

      // Decode the new token to get user info
      const newPayload = verifyAccessToken(newTokens.accessToken);
      if (newPayload.valid && newPayload.payload) {
        const payload = newPayload.payload as unknown as AccessTokenPayload;
        req.user = {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        };
      }

      // Set response headers with new token info
      res.setHeader('X-New-Access-Token', newTokens.accessToken);
      res.setHeader('X-Token-Refreshed', 'true');

      next();
      return;
    }

    // Token refresh failed - user must re-login
    logTreeStep('Token refresh failed - user must re-login', {
      meta: {
        reason: 'Refresh token invalid or expired',
        duration: `${Date.now() - startTime}ms`,
      },
    });

    ResponseHandler.unauthorized(res, 'Session expired. Please login again.');
    return;
  }

  // Step 3c: Access token is invalid (not just expired)
  logTreeStep('Invalid access token', {
    meta: {
      error: accessTokenResult.expired ? 'expired' : 'invalid',
      duration: `${Date.now() - startTime}ms`,
    },
  });

  ResponseHandler.unauthorized(res, 'Invalid access token');
};

// ============================================================================
// Optional Authentication Middleware
// ============================================================================

/**
 * Optional authentication middleware
 *
 * Similar to authenticate() but doesn't require authentication.
 * If a valid token is provided, it attaches user info.
 * If no token or invalid token, it still calls next().
 *
 * Useful for routes that have different behavior for authenticated
 * vs unauthenticated users.
 *
 * Usage:
 * ```typescript
 * router.get('/content', optionalAuthenticate, controller);
 * ```
 */
export const optionalAuthenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = extractAccessToken(req.headers.authorization);

  if (!accessToken) {
    // No token provided - continue without user info
    logTreeStep('No access token for optional auth');
    next();
    return;
  }

  const result = verifyAccessToken(accessToken);

  if (result.valid && result.payload) {
    const payload = result.payload as unknown as AccessTokenPayload;
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    logTreeStep('Optional auth: user authenticated', { meta: { userId: payload.id } });
  } else {
    logTreeStep('Optional auth: invalid token provided, continuing without auth');
  }

  next();
};

// ============================================================================
// Role-based Authorization Middleware
// ============================================================================

/**
 * Creates a role-based authorization middleware
 *
 * Usage:
 * ```typescript
 * // Require admin role
 * router.delete('/admin/only', authenticate, requireRole('admin'), controller);
 *
 * // Require any of these roles
 * router.put('/content', authenticate, requireRole('admin', 'editor'), controller);
 * ```
 *
 * @param allowedRoles - Roles that are allowed to access the route
 * @returns Express middleware function
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ResponseHandler.unauthorized(res, 'Authentication required');
      return;
    }

    const userRole = req.user.role || '';

    if (!allowedRoles.includes(userRole)) {
      logTreeStep('Access denied - insufficient permissions', {
        meta: {
          userId: req.user.id,
          userRole,
          requiredRoles: allowedRoles,
        },
      });
      ResponseHandler.forbidden(res, 'You do not have permission to access this resource');
      return;
    }

    logTreeStep('Role authorization successful', {
      meta: {
        userId: req.user.id,
        userRole,
        allowedRoles,
      },
    });

    next();
  };
};

// ============================================================================
// Token Refresh Endpoint Handler
// ============================================================================

/**
 * Handler for explicit token refresh endpoint
 *
 * Use this when the client wants to manually refresh their tokens
 * (not automatically on every request).
 *
 * Endpoint: POST /auth/refresh
 * Body: { refreshToken: string }
 *
 * Response:
 * - Success: { success: true, accessToken, expiresIn }
 * - Failure: { success: false, message }
 */
export const handleTokenRefresh = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  logTreeStep('Handling explicit token refresh request');

  const refreshToken = extractRefreshToken(req);

  if (!refreshToken) {
    logTreeStep('Token refresh failed: no refresh token provided');
    ResponseHandler.badRequest(res, 'Refresh token is required');
    return;
  }

  const deviceInfo = getDeviceInfoFromRequest(req);
  const newTokens = await refreshAccessToken(refreshToken, deviceInfo);

  if (!newTokens) {
    logTreeStep('Token refresh failed: invalid refresh token');
    ResponseHandler.unauthorized(res, 'Invalid or expired refresh token. Please login again.');
    return;
  }

  logTreeStep('Token refresh successful', {
    meta: { expiresIn: newTokens.expiresIn },
  });

  ResponseHandler.success(res, 'Token refreshed successfully', {
    accessToken: newTokens.accessToken,
    expiresIn: newTokens.expiresIn,
  });
};

// ============================================================================
// Logout Handler
// ============================================================================

/**
 * Handler for logout endpoint
 *
 * Revokes the refresh token to prevent further token refreshes.
 * The access token will still be valid until it expires (1 day).
 *
 * Endpoint: POST /auth/logout
 * Body: { refreshToken?: string } (optional if using cookies)
 *
 * Response:
 * - Success: { success: true, message }
 * - Failure: { success: false, message }
 */
export const handleLogout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  logTreeStep('Handling logout request');

  // Try to get refresh token from cookie first, then body
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (refreshToken) {
    const revoked = await revokeToken(refreshToken);

    if (revoked) {
      logTreeStep('Refresh token revoked successfully', { meta: { userId: req.user?.id } });
    } else {
      logTreeStep('Refresh token not found or already revoked');
    }
  } else {
    logTreeStep('No refresh token provided for logout');
  }

  // Clear the refresh token cookie if it exists
  if (req.cookies?.refreshToken) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  logTreeStep('User logged out successfully', { meta: { userId: req.user?.id } });
  ResponseHandler.success(res, 'Logged out successfully');
};

// ============================================================================
// Export
// ============================================================================

export default {
  authenticate,
  optionalAuthenticate,
  requireRole,
  handleTokenRefresh,
  handleLogout,
};
