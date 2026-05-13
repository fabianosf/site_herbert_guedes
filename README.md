# GuedesLab

High-end research-portal site for **GuedesLab** — PI: **Dr. Herbert Guedes**.
Dark cosmic aesthetic · Glassmorphism · Multi-language (PT-BR / EN) · Production-ready.

```
Vite · React 18 · TypeScript · Tailwind 3 · Framer Motion 11 · react-i18next · Vitest · Docker · Nginx
```

---

## Highlights

- **i18n:** `react-i18next` + browser language detector. PT-BR / EN with sleek glassmorphism switcher in the navbar.
- **Design system:** centralized in `src/config/theme.ts` (structural data) + Tailwind tokens. All copy lives in `src/i18n/locales/*.json`.
- **Motion:** Framer Motion entrance/scroll animations; respects `prefers-reduced-motion`.
- **Performance:** code-split sections, vendor chunks, ~14kb gzip main bundle, immutable asset caching, gzip on the wire.
- **Accessibility:** semantic landmarks, skip-link, ARIA on menu/form, focus rings, keyboard nav, jsx-a11y linting.
- **Security:** strict CSP, X-Frame-Options, COOP/CORP, HSTS, Permissions-Policy, form sanitization via DOMPurify + honeypot.
- **Quality gate:** ESLint (0 warnings), Vitest + Testing Library (18 tests), full typecheck.
- **Container:** multi-stage Dockerfile (deps → build → dev / prod), hardened nginx, dropped capabilities, read-only FS.

---

## Quick start (local)

```bash
npm install
npm run dev        # http://localhost:5173

npm run lint       # eslint, max 0 warnings
npm test           # vitest run (18 tests)
npm run test:watch # interactive
npm run build      # typecheck + production bundle in dist/
npm run preview    # serve the built bundle
```

Node **>= 20** required.

---

## Quick start (Docker)

```bash
# Development — hot-reload Vite on :5173
docker compose --profile dev up --build

# Production — hardened nginx on :8080 serving the static build
docker compose --profile prod up -d --build
```

The prod image is fully self-contained: build occurs inside the container, output is served by an nginx hardened with:

- `read_only: true`, dropped capabilities, `no-new-privileges`
- non-root worker, tmpfs for `/var/cache/nginx`, `/var/run`, `/tmp`
- canonical security headers + CSP enforced by nginx (see `nginx.conf`)
- gzip + 1-year `immutable` cache for hashed assets
- HEALTHCHECK over HTTP

---

## Configuration

Copy `.env.example` to `.env` and edit:

```env
VITE_SITE_NAME="GuedesLab"
VITE_CONTACT_EMAIL="contato@guedeslab.net"
VITE_CONTACT_ENDPOINT="https://your-form-endpoint.example/api/contact"
```

If `VITE_CONTACT_ENDPOINT` is unset, the contact form simulates a successful POST locally (useful for previews).

**Content & translations** live in `src/i18n/locales/pt.json` and `src/i18n/locales/en.json` — edit both to update copy.
**Structural config** (nav anchors, member initials/colors, social links, affiliation URLs) lives in `src/config/theme.ts`.

---

## Project layout

```
src/
├── App.tsx                       # Composition root (lazy-loads below-the-fold)
├── main.tsx                      # Bootstraps i18n + React
├── index.css                     # Tailwind layers + base styles + glass utilities
├── config/
│   └── theme.ts                  # Structural site config
├── i18n/
│   ├── index.ts                  # i18next init + browser detector
│   └── locales/
│       ├── en.json
│       └── pt.json
├── lib/
│   ├── cn.ts                     # tiny classnames util
│   ├── motion.ts                 # framer-motion variants
│   └── sanitize.ts               # DOMPurify-backed form sanitization (error CODES)
├── components/
│   ├── ui/                       # Button, Container, SectionHeader
│   ├── i18n/                     # LanguageSwitcher (Framer Motion)
│   ├── layout/                   # Navbar (glass, lang switcher), Footer
│   └── sections/                 # Hero, Members, Research, Blog, Teaching, Media, Awards, Contact
└── test/                         # Vitest + Testing Library
```

---

## Security

| Concern              | Mitigation                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| XSS in form inputs   | `DOMPurify` strips HTML/JS payloads, control chars removed, length capped  |
| Spam                 | Hidden honeypot field (`website`) — silent reject on fill                  |
| Click-jacking        | `X-Frame-Options: DENY` + `frame-ancestors 'none'` in CSP                  |
| Mixed content        | `upgrade-insecure-requests` in CSP                                         |
| MITM                 | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`  |
| MIME sniffing        | `X-Content-Type-Options: nosniff`                                          |
| Cross-origin leakage | `Cross-Origin-Opener-Policy` + `Cross-Origin-Resource-Policy: same-origin` |
| Sensitive APIs       | `Permissions-Policy` disables camera, microphone, geolocation              |

CSP is enforced at two layers: a meta tag (defense in depth) and the canonical `Content-Security-Policy` header from nginx (`nginx.conf`).

---

## Performance posture

Build output (gzip):

| File                  | Size       |
| --------------------- | ---------- |
| `index.html`          | 1.14 kB    |
| `index.css`           | 5.68 kB    |
| `index.js` (entry)    | 5.19 kB    |
| `react-vendor.js`     | 43.13 kB   |
| `motion-vendor.js`    | 42.97 kB   |
| `icons-vendor.js`     | 0.84 kB    |
| Below-the-fold chunks | 0.5–11 kB  |

- Sections below the fold are dynamically imported (`React.lazy` + `Suspense`).
- Vendor chunks split (`react-vendor`, `motion-vendor`, `icons-vendor`).
- Tailwind purged via Vite content scan.
- nginx serves with `gzip` + `immutable` cache on hashed assets.
- Fonts preconnected; `font-display: swap`.
- `prefers-reduced-motion` collapses animation durations to `0.01ms`.

Target: **Lighthouse 95+** on Performance / Accessibility / Best Practices / SEO.

---

## Testing

```bash
npm test                # one-shot
npm run test:watch      # watch mode
npm run test:coverage   # generates coverage/ (lcov + html)
```

Coverage focus:

- `src/components/ui/Button.tsx` — variants, anchor-mode, disabled, click handler, default `type="button"`.
- `src/lib/sanitize.ts` — XSS strip, control chars, length caps, email RFC, honeypot.

---

## CI/CD

`.github/workflows/ci.yml` runs on push to `main`/`develop` and on PRs:

1. **quality** — install, lint, test, typecheck-via-build, upload `dist/` artifact.
2. **docker** — build the prod target with buildx + GHA cache.

---

## Deploy

### Option A — Static host
Any static-friendly host works (Vercel, Netlify, Cloudflare Pages, S3+CloudFront).

### Option B — Self-hosted Docker (SSH-based)
Two scripts ship with this repo:

| Script | When | Where |
|---|---|---|
| `scripts/server-bootstrap.sh` | **One-time** server setup (Docker + ufw + harden SSH + clone repo) | On the **server**, as root |
| `deploy.sh` | **Every deploy** (git fetch + rebuild + restart) | On your **laptop** |

**Prereq — SSH key-based auth (no passwords):**

```bash
# On your laptop, if you don't already have a key:
ssh-keygen -t ed25519 -C "fabianosf@laptop"

# Copy your public key to the server:
ssh-copy-id root@92.113.33.16
# (this is the LAST time you should use the root password — never via chat)
```

**One-time server bootstrap:**

```bash
# On the SERVER (after SSH key is in place):
sudo -i
curl -fsSL https://raw.githubusercontent.com/fabianosf/site_herbert_guedes/main/scripts/server-bootstrap.sh | bash
# Installs Docker, sets ufw, disables password-SSH, clones repo, builds + starts prod.
```

**Subsequent deploys from your laptop:**

```bash
./deploy.sh                          # deploy main
GIT_REF=develop ./deploy.sh          # deploy a different branch
REMOTE_HOST=1.2.3.4 ./deploy.sh      # different server
```

The container listens on **:8080** (non-privileged). Put nginx / Caddy / Cloudflare in front for TLS on 443.

### Option C — Registry-based
```bash
docker build --target prod -t registry.example.com/guedeslab:latest .
docker push registry.example.com/guedeslab:latest
```

---

## License

Proprietary — © Herbert Studio. Replace with your own license file if open-sourcing.

---

```
[ OMEGA.FABIANOSF :: BUILD READY ]
Status   : PRODUCTION-READY
Quality  : 0 lint warnings · 18/18 tests · 0 type errors
Bundle   : code-split, vendor-chunked, ~14kB main gzip
Security : CSP, HSTS, COOP/CORP, DOMPurify, honeypot
```
