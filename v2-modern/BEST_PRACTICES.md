# Front-End Engineering Best Practices Checklist

This document details the architectural standards implemented in **Sustune Care Version 2**. Use this checklist when reviewing code or developing new client-facing web applications.

---

## 🔒 1. Security & Protection

- [x] **Strict Content Security Policy (CSP)**: Restricts script, style, font, and media origins to `'self'` and explicitly verified origins.  
  *Why*: Eliminates cross-site scripting (XSS) vectors and unauthorized script execution.
- [x] **`X-Content-Type-Options: nosniff`**: Enforces strict MIME typing.  
  *Why*: Stops browsers from MIME-sniffing responses away from the declared Content-Type, mitigating drive-by download vulnerabilities.
- [x] **`X-Frame-Options: DENY`**: Prohibits the page from rendering in an iframe.  
  *Why*: Protects users from clickjacking and invisible overlay attacks.
- [x] **`Referrer-Policy: strict-origin-when-cross-origin`**: Only passes origin information on cross-origin requests.  
  *Why*: Prevents sensitive user URL parameters from leaking to third-party endpoints.
- [x] **`Permissions-Policy`**: Explicitly disables camera, microphone, geolocation, and payment hardware access.  
  *Why*: Enforces principle of least privilege against malicious injection scripts.
- [x] **`Strict-Transport-Security (HSTS)`**: Enforces HTTPS for 2 years with preloading.  
  *Why*: Prevents SSL-stripping and man-in-the-middle attacks.
- [x] **`rel="noopener noreferrer"` on all external links**: Mandatory on all links with `target="_blank"`.  
  *Why*: Prevents tab-napping via `window.opener` and preserves user privacy.
- [x] **Zero Inline Event Handlers**: No `onclick`, `onload`, or inline script tags in HTML.  
  *Why*: Allows CSP to prohibit `'unsafe-inline'` script evaluation and keeps separation of concerns clean.
- [x] **Zero Raw `innerHTML` with Dynamic Variables**: DOM manipulation relies on `createElement`, `textContent`, and `setAttribute`.  
  *Why*: Completely eliminates DOM-based XSS injection vulnerabilities.
- [x] **`security.txt` RFC 9116 Deployment**: Published at `/.well-known/security.txt`.  
  *Why*: Establishes a standardized, responsible vulnerability disclosure channel.

---

## ♿ 2. Accessibility (WCAG 2.1 AA Compliance)

- [x] **Skip-to-Content Navigation Link**: Invisible by default, becomes visible on first keyboard tab.  
  *Why*: Allows keyboard and screen reader users to bypass repetitive header navigation.
- [x] **Single `<h1>` with Strict Heading Hierarchy**: Exactly one `h1`, followed by ordered `h2`, `h3`, and `h4`.  
  *Why*: Screen readers construct a page outline from heading levels for non-visual scanning.
- [x] **Semantic HTML5 Landmarks**: Page structured with `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, and `<footer>`.  
  *Why*: Enables assistive devices to jump directly between primary content regions.
- [x] **Visible `:focus-visible` Indicators**: 2px cerulean outline with 3px offset on all focused elements.  
  *Why*: Essential for mobility-impaired and keyboard-only users to see current navigation focus.
- [x] **ARIA State & Role Management**: Stepper, tabs, and accordion use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-expanded`, and `aria-controls`.  
  *Why*: Informs assistive technologies of dynamic UI state changes in real time.
- [x] **Color Contrast Compliance (>= 4.5:1)**: Dark Slate text `#1E293B` on gold badges; deep marine `#0D3B66` on mist backgrounds. Never white text on plain gold.  
  *Why*: Ensures legibility for visually impaired, color-blind, or low-contrast screen users.
- [x] **`prefers-reduced-motion` Enforcement**: Disables CSS transforms, animations, and automatically pauses background video.  
  *Why*: Prevents dizziness, nausea, and vestibular motion triggers for sensitive users.
- [x] **Video Captions (`<track kind="captions">`)**: All videos include WebVTT caption tracks and transcript links.  
  *Why*: Guarantees multimedia comprehension for deaf, hard-of-hearing, or quiet-environment users.
- [x] **Minimum 44px Touch Targets**: All interactive elements, buttons, and mobile triggers adhere to `min-h-[44px] min-w-[44px]`.  
  *Why*: Prevents mis-taps on touchscreen devices and satisfies mobile accessibility guidelines.

---

## ⚡ 3. Performance & Resource Optimization

- [x] **Pre-compiled, Zero-Build CSS**: Compiles Tailwind CSS to a 30KB static production file (`assets/css/style.css`).  
  *Why*: Eliminates expensive runtime JavaScript compilation (`cdn.tailwindcss.com`) and speeds up First Contentful Paint (FCP).
- [x] **`defer` Script Loading**: Non-blocking script execution (`<script defer src="..."></script>`).  
  *Why*: Ensures HTML parsing and DOM construction are never delayed by script fetching.
- [x] **Native Image Lazy-Loading**: `loading="lazy"` on all below-the-fold media.  
  *Why*: Conserves mobile bandwidth and accelerates Initial Server Response and Largest Contentful Paint (LCP).
- [x] **Explicit Width & Height Attributes**: Sizing specified on all image elements.  
  *Why*: Reserves layout space before assets load, completely preventing Cumulative Layout Shift (CLS).
- [x] **Font Optimization**: `preconnect` directives to `fonts.googleapis.com` and `fonts.gstatic.com`.  
  *Why*: Warms up TCP and TLS handshakes in advance, minimizing font-swap flicker.
- [x] **Video `preload="none"`**: Prevents multi-megabyte video assets from downloading until user initiates playback.  
  *Why*: Drastically reduces cellular data consumption and page weight.

---

## 🔍 4. SEO & Discoverability

- [x] **Open Graph & Twitter Meta Tags**: Rich social preview titles, descriptions, and share cards.  
  *Why*: Controls how content renders when shared across WhatsApp, LinkedIn, X, and iMessage.
- [x] **Canonical Link Tag**: Points to the definitive page URL.  
  *Why*: Prevents duplicate content penalties across query parameters and aliases.
- [x] **JSON-LD Organization Schema**: Structured data micro-format for Google Knowledge Graph.  
  *Why*: Clarifies business identity, service region, contact points, and official branding to search crawlers.
- [x] **Standard `robots.txt` & `sitemap.xml`**: Defined crawler directives and indexed sitemap location.  
  *Why*: Guides search bot indexing priority and ensures all sections are cataloged.
- [x] **Custom 404 Error Handler**: Branded fallback page with direct navigation back to active services.  
  *Why*: Retains lost visitors and reduces search bounce rates.

---

## 💻 5. Clean Code Architecture

- [x] **Single-Source CTA Binding**: `GOOGLE_FORM_URL` declared once in `main.js`.  
  *Why*: Changes to intake forms require editing exactly one line of code without broken links.
- [x] **Decoupled Architecture**: HTML contains structure; CSS contains styles; JS contains behavior.  
  *Why*: Maximizes maintainability, simplifies code reviews, and prevents tight coupling.
- [x] **`localStorage` State Persistence**: Theme preference cached with fallback to OS `prefers-color-scheme`.  
  *Why*: Delivers a frictionless user experience across repeated visits.
