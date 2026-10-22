# Sustune Care &mdash; Version 2 (Modern, Interactive & Benchmark Edition)

This directory (`/v2-modern/`) contains the complete, production-ready static website for **Sustune Care**, an executive-governed stewardship institution for Non-Resident Indians (NRIs) managing properties (AEGIS) and caring for aging parents (SPARSH) in Hyderabad and Bengaluru.

This project is structured as a **benchmark architectural reference** that interns and engineers can learn from, demonstrating industry-standard security, WCAG 2.1 AA accessibility, zero-build deployment, and modular vanilla web engineering.

---

## 📁 Project Folder Structure

```text
/v2-modern/
├── index.html                   # Primary semantic single-page application
├── 404.html                     # Branded accessible 404 error page
├── robots.txt                   # Search crawler rules and sitemap pointer
├── sitemap.xml                  # XML search engine index
├── vercel.json                  # Vercel deployment config with strict security headers
├── _headers                     # Netlify/Cloudflare security headers
├── input.css                    # Tailwind CSS input directives & custom tokens
├── tailwind.config.js           # Tailwind theme configuration
├── .well-known/
│   └── security.txt             # RFC 9116 security vulnerability disclosure contact
├── assets/
│   ├── css/
│   │   └── style.css            # Pre-compiled, minified CSS (zero host build step needed)
│   ├── js/
│   │   └── main.js              # Modular vanilla JS engine (zero inline handlers)
│   ├── logo/
│   │   ├── favicon_32x32.ico
│   │   ├── favicon_192x192.png
│   │   ├── sustune_emblem_reversed_white.png
│   │   └── sustune_logo_horizontal_lockup.svg
│   ├── avatars/
│   │   ├── founder1.svg         # Founder 1 avatar placeholder (1:1 aspect ratio)
│   │   ├── founder2.svg         # Founder 2 avatar placeholder (1:1 aspect ratio)
│   │   └── founder3.svg         # Founder 3 avatar placeholder (1:1 aspect ratio)
│   └── captions/
│       ├── launch.vtt           # WebVTT accessibility captions for Launch video
│       ├── aegis.vtt            # WebVTT accessibility captions for Aegis video
│       ├── sparsh.vtt           # WebVTT accessibility captions for Sparsh video
│       └── problem.vtt          # WebVTT accessibility captions for Problem video
├── README.md                    # Operational handover guide (this file)
└── BEST_PRACTICES.md            # Engineering checklist & rationale for interns
```

---

## 🚀 Running Locally

Because this is a pure static site with pre-compiled CSS and vanilla JS, you do not need any build tool to run it.

### Option A: Using Python (Recommended)
From the workspace root directory:
```bash
python -m http.server 8000
```
Then navigate to:
**[http://localhost:8000/v2-modern/](http://localhost:8000/v2-modern/)**

### Option B: Using Node / npx
```bash
npx serve v2-modern
```

### Option C: Direct File Opening
Double-click [`v2-modern/index.html`](file:///d:/sustune-versions/v2-modern/index.html) in Windows Explorer to open it in Chrome, Edge, Safari, or Firefox.

---

## 🌐 Zero-Build Hosting Deployment

This site is pre-compiled and requires **no build step** on your hosting provider.

### 1. Deploying to Vercel
- Root directory: `./v2-modern` (or root repository with rewrites)
- Framework Preset: **Other**
- Build Command: *(Leave blank / none)*
- Output Directory: *(Leave blank / `.`)
- `vercel.json` will automatically apply the strict Content Security Policy, HSTS, and frame protections.

### 2. Deploying to Netlify
- Base directory: `v2-modern`
- Build command: *(Leave blank)*
- Publish directory: `v2-modern`
- Netlify will automatically detect and enforce security headers from `_headers` and `public/_headers`.

### 3. Deploying to AWS Amplify
- Connect your GitHub repository.
- Under build settings, set the frontend build artifacts base directory to `v2-modern` with no build steps (`commands: []`).

---

## 🔗 How to Change the Consultation Google Form Link

All "Enquire", "Book Consultation", and navigation CTA buttons are centrally governed by a single constant to prevent broken links.

1. Open [`assets/js/main.js`](file:///d:/sustune-versions/v2-modern/assets/js/main.js).
2. At the very top (Line 9), update the `GOOGLE_FORM_URL` string:
   ```javascript
   const GOOGLE_FORM_URL = "https://your-new-form-link-here";
   ```
3. Save the file. All buttons across desktop, tablet, mobile, and modal views will automatically route to the updated form in a secure new tab (`target="_blank" rel="noopener noreferrer"`).

---

## 👥 How to Replace Founder Placeholders

The "Meet the Founders" section in [`index.html`](file:///d:/sustune-versions/v2-modern/index.html) contains 3 placeholder cards marked with HTML comments:

1. Search for `<!-- REPLACE ME -->` in `index.html`.
2. **Founder Photo**: Place a 1:1 square photo (WebP or SVG recommended) in `assets/avatars/` (e.g. `assets/avatars/john_doe.webp`) and update the `src` attribute.
3. **Founder Name & Title**: Replace `"Founder Name"` and `"Co-Founder & Managing Director"` with the actual executive's name and corporate role.
4. **Founder Bio**: Replace the 2-line placeholder paragraph with their verified professional background (20-35 words).
5. **LinkedIn Link**: Change `href="#"` to the executive's real profile URL (e.g., `https://linkedin.com/in/foundername`).

---

## 🛠 Rebuilding CSS (For Developers Modifying Styles)

If you modify Tailwind utility classes in `index.html`, recompile `assets/css/style.css` using:
```bash
cmd.exe /c npx -y tailwindcss@3.4.17 -c tailwind.config.js -i input.css -o assets/css/style.css --minify
```
Commit the resulting `assets/css/style.css` directly to Git.
