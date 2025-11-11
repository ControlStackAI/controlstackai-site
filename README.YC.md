## YC Preview Setup (Addendum)

We ship a private **YC preview** experience:
- New pages: `/yc.html` and `/founders.html`
- Edge password protection via **Cloudflare Pages Functions** middleware (`functions/_middleware.ts`)
- Reviewer instructions in `docs/YC-Reviewer-Guide.md`

### Configure protection
Set environment variables on your Cloudflare Pages **Production** and **Preview** environments:
```
PROTECT_USER=yc
PROTECT_PASS=private
```

Optionally, use **Cloudflare Access** to gate the whole hostname with email allowlist/OTP.

### Deploy
- Connect repo to Pages (Framework: None, Build: None, Output dir: `/`)
- Commit the overlay files; Pages will redeploy automatically

### Swap in real media
Place a small GIF/PNG of your dashboard under `assets/yc/ccp-dashboard-mock.png`.
