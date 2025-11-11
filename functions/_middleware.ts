// Cloudflare Pages Functions middleware for Basic Auth gating.
// Set environment variables on Pages project: PROTECT_USER, PROTECT_PASS
// Allowlist static assets and public brand files as needed.
export const onRequest: PagesFunction = async (ctx) => {
  const { request, env, next } = ctx;
  const url = new URL(request.url);
  const allow = [
    '/assets/', '/styles/', '/_headers', '/favicon.ico', '/robots.txt',
    '/privacy.html', '/terms.html', '/about.html' // keep public or remove as needed
  ];

  if (allow.some(p => url.pathname.startsWith(p))) {
    return next();
  }

  const user = env.PROTECT_USER;
  const pass = env.PROTECT_PASS;
  if (!user || !pass) {
    // If not configured, skip protection.
    return next();
  }

  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith('Basic ')) {
    return new Response('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Private Preview"' }
    });
  }

  const b64 = header.split(' ')[1];
  let creds = '';
  try { creds = atob(b64); } catch { /* noop */ }
  const [u, p] = creds.split(':');
  if (u === user && p === pass) return next();

  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Private Preview"' }
  });
};
