export interface ServerRequestContext {
  accessToken?: string;
  cookie?: string;
}

export function createServerHeaders(context?: ServerRequestContext): Record<string, string> {
  const headers: Record<string, string> = {};

  if (context?.accessToken) {
    headers['Authorization'] = `Bearer ${context.accessToken}`;
  }

  if (context?.cookie) {
    headers['Cookie'] = context.cookie;
  }

  return headers;
}
