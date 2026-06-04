# GrowLearnHub — Security Documentation

## Authentication

- JWT-based with short-lived access tokens and rotating refresh tokens.
- Passwords hashed via bcryptjs.
- Tokens transmitted via Bearer header or HTTP-only cookies.
- Rate limiting on auth endpoints (login, register, password reset).

## Authorization

- Role-based access control (student, admin).
- Protected tRPC procedures use the `protectedProcedure` helper which verifies the token and populates `TRPCContext.user`.
- API routes enforce ownership and role checks before serving data.

## API Security

- CORS configured to restrict allowed origins.
- Helmet middleware for security headers (XSS, content-type sniffing, etc.).
- Input validation via Zod schemas at the API boundary.
- Request body size limits enforced.

## Data Protection

- MongoDB accessed via Mongoose with parameterized queries (NoSQL injection prevention).
- Sensitive fields (passwords, tokens) never returned in API responses.
- Environment variables for secrets; `.env` files excluded from version control.

## Session Management

- Refresh token rotation: each refresh issues a new pair and invalidates the old one.
- Logout revokes the active refresh token.
- Token expiration configured for access (short) and refresh (longer) tokens.

## File Upload Security

- File type and size validation on upload.
- Uploads stored in Cloudflare R2 / Cloudinary — not on the application server.

## Monitoring

- Sentry integrated for error tracking and replay.
- Structured logging via Winston for audit trails.
- Rate limiting and anomaly detection on sensitive endpoints.
