# YC Reviewer Guide — ControlStackAI Private Preview

**Hostname**: your preview domain (e.g., `yc.controlstackai.com`)  
**Access**: Username/password (or Cloudflare Access one‑time PIN)

## What you'll see
- **YC Preview** page (`/yc.html`) with the product one‑pager and security posture
- **Founders** page (`/founders.html`) with short bios and links to private videos
- Public **Privacy** and **Terms** pages
- Contact routes are proxied to our Worker API (optional)

## Security & Privacy
- Password protection at the edge (Cloudflare Pages Functions) using Basic Auth
- Optional Cloudflare Access (email allowlist + OTP) for better reviewer UX and audit logs
- Zero‑retention defaults; customer‑owned artifact storage in product

## Notes
- Replace placeholder media in `/assets/yc/` with your demo GIF/video
- Set env vars `PROTECT_USER`, `PROTECT_PASS` on the Pages project
- You can also gate the entire hostname with **Cloudflare Access** (recommended)
