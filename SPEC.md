# MASTER PROMPT: Build my personal portfolio (motion-led, trilingual EN / 한국어 / বাংলা)

> How to use: create an empty folder, open it in Antigravity, save this file as `SPEC.md` in the project root, attach the files listed in section 13, then paste the "KICKOFF MESSAGE" at the bottom into the Agent Manager.

---

## 0. ROLE AND WORKING RULES

You are a senior full-stack engineer, motion designer and product designer. Build my personal portfolio from scratch following this spec.

Rules:
1. **Plan first.** Before writing code, show me a short plan (file structure, libraries, risks) and the stage list from section 12. Then start Stage 1.
2. **Zero-cost only.** Free tiers only (Firebase Spark, free hosting, open-source fonts and icons). No paid API, no service that needs a credit card. If something cannot be done at zero cost, say so and offer a free alternative.
3. **Do not invent facts.** Use only the content in section 3. Where information is missing, render a clearly marked placeholder the admin can fill in. Never fake metrics, logos, testimonials, links or credentials.
4. **Original work.** The look is inspired by "motion-led, HUD / technical portfolios" in general. Do not copy any existing portfolio's code, copy, layout, assets or 3D model. All design, text and assets must be original or properly licensed (CC0 / MIT / CC-BY with attribution).
5. **Work in stages** (section 12). After each stage report: what changed, what you tested, what is still open. Commit after each stage with a clear message. Stop and ask me only when a decision is needed.
6. **Code quality:** TypeScript strict, typed props, small components, no `any`, no dead code, no hardcoded user-facing text in components.
7. **When something breaks,** find the root cause. Do not add workarounds or silence errors.

---

## 1. GOAL

A fast, memorable, recruiter-friendly portfolio for **Rahat Md Mahadi Hasan**, AI & Computer Engineering student at Tongmyong University (Busan, South Korea), aiming to become an **AI software engineer** (machine learning, computer vision, full-stack).

Audiences: (a) Korean and international recruiters, (b) professors and researchers, (c) student-community peers.

Positioning line (use as the base of hero copy): *"Building reliable AI systems and the apps around them."* Do not use the word "aspiring" in hero copy.

The site must feel premium and technical: confident typography, a real-time 3D centerpiece, smooth scroll-driven storytelling, and polished micro-interactions, while staying fast and accessible.

---

## 2. TECH STACK (fixed)

- **React + TypeScript + Vite**, Tailwind CSS, React Router (static-hostable SPA)
- **Motion:** GSAP + ScrollTrigger (`@gsap/react`) and **Lenis** smooth scroll sharing **one ticker** (see 6.1)
- **3D:** three.js via `@react-three/fiber` + `@react-three/drei`, client-only, lazy-loaded
- **i18n:** `react-i18next`
- **Backend / CMS:** Firebase (Auth, Firestore; Storage only if free), security rules in the repo
- **Hosting:** Firebase Hosting (Spark) or Vercel free. Pick one, explain why, and include SPA rewrites so `/ko/...` and `/bn/...` deep links work.

---

## 3. CONTENT (source of truth, seed in all three languages)

Use my words; polish grammar only.

**Identity**
- Name: Rahat Md Mahadi Hasan (Korean: 라하트 마하디 하산; Bengali: রাহাত মো. মেহেদী হাসান; keep configurable)
- Title: AI & Computer Engineering student
- Location: Busan, South Korea
- Email: rahatmdmahadihasan.com
- GitHub: github.com/rahat-codes · LinkedIn: https://www.linkedin.com/in/rahat-md-mahadi-hasan
- Photos (use exactly as provided, no AI regeneration or retouching): `/public/images/profile-hero-4x5.webp|jpg` (hero portrait, 4:5) and `profile-avatar-512.webp|jpg` (header avatar, About, Open Graph image, favicon source). Use `<picture>` with WebP + JPG fallback, explicit width/height, `fetchpriority="high"` in the hero, translated alt text. Replaceable from admin settings.
- **Privacy: never publish my phone number, home address or date of birth anywhere on the public site.**

**Education**
- Tongmyong University, AI and Computer Engineering, Mar 2024 to present (6th semester).

**Languages:** English (advanced), Korean (intermediate; preparing for TOPIK II, planned by January 2027), Bengali (native).

**Experience (timeline, newest first)**
1. **Den of Builders (DOB)**, President & Co-Founder, Jun 2026 to present. Leads a student-run technology community at Tongmyong University: organizes tech events, manages collaborative projects, mentors members on software and AI projects.
2. **Busan International College (BIC), Tongmyong University**, Student Counselor / Apprentice, Sep 2024 to present. Peer counseling, academic guidance and welfare support for international and domestic students.
3. **부마뚝닭갈비 (Korean restaurant)**, Part-time staff, Sep 2025 to present. Customer service, order processing and store operations in Korean. *(Admin toggle: show/hide on the public site.)*

**Projects** (each has a card and a case-study page: problem, my role, stack, key features, outcome, links)
1. **DOB Attendance**: QR-based attendance and monthly participation tracker. React, TypeScript, Tailwind, FastAPI, PostgreSQL, Docker, PWA. Admin opens a session and shows a QR; members check in by phone; expired and duplicate tokens rejected; monthly participation tiers; admin dashboard; CSV export; public leaderboard. Live: dob-hub.vercel.app
2. **CampusAR**: offline-first campus navigation MVP with AR direction mode. Flutter/Dart, FastAPI, PostgreSQL, SQLite, Docker. A* routing on-device (Dart) and server-side (Python); search and routes work without internet; GPS + compass AR mode with graceful sensor/network failure handling; data-driven so other campuses can be added. Bundled campus data is a sample dataset. Repo: github.com/rahat-codes/campusar
3. **Chicken Disease Classification**: image-based disease classification ML pipeline. Python, deep learning, DVC. Modular config/params/entity/component/pipeline stages for a reproducible training workflow. Repo: github.com/rahat-codes/Chicken-Disease-Classification-Project
4. **Adaptive Smart Desk Environment System**: embedded C++ system reading light, sound and presence sensors to rate a study environment, adjusting LED brightness and triggering a buzzer alert. Repo: github.com/rahat-codes/Adaptive-Smart-Desk-Environment-System
5. **Automotive Vehicle-Type Classification (research code)**: reproducible code for the paper below. Repo: github.com/rahat-codes/automotive-classification-reproducible-project

Every project has an optional **"Outcome / metric"** field. Leave it as a visible admin placeholder; never invent numbers.

**Research (featured)**
- *Single-Split Illusions: A Rigorous, Cross-Dataset Re-Evaluation of Classifier Ranking for Automotive Vehicle-Type Prediction*. Authors: Rahat Md Mahadi Hasan, Jun-Mo Jo (Tongmyong University).
- Showed that a reported 97% accuracy for an L1 nearest-centroid classifier on one train/test split was non-representative (unseeded, unscaled protocol and data leakage). Used repeated nested cross-validation (50 folds), corrected preprocessing (recovered n=153 records), scaling ablations, and external validation on UCI Statlog Vehicle Silhouettes (n=813, 3 classes). Applied the Nadeau-Bengio corrected t-test with Holm-Bonferroni correction. Tuned SVM, k-NN and decision trees consistently and significantly outperformed centroid methods on the larger external data.
- Fields for venue/status (placeholder), PDF link (placeholder), repo link. Design so more papers can be added.
- Also add an **"In progress" research card** with title *"Context-aware preprocessing framework for vehicle price prediction"*, status "In progress", no results claimed.

**Certifications and awards** (newest first, with issuer and date)
- Machine Learning Specialization, Coursera (Aug 2026)
- Dean's List, Tongmyong University: 2025 2nd sem (Apr 2026), 2025 1st sem (Sep 2025), 2024 2nd sem (Feb 2025), 2024 1st sem (Aug 2024)
- AI for Everyone, Coursera (Jul 2025)
- Certified SOLIDWORKS Associate (CSWA), Dassault Systèmes (May 2025)
- Generative AI, iNeuroni.ai (2025)
- Certificate of Scholarship, Tongmyong University (Dec 2024)
- Introduction to Generative AI, AWS (May 2024)
- CS50's Introduction to Computer Science, Harvard (Sep to Dec 2023)
- IELTS, British Council (May 2023). Show no score unless I add it.

**Activities**
- **2026 Busan Innovation Exchange (BIX 2026)**: problem-based learning project by Tongmyong University, Pukyong National University and Kyungsung University; inter-university team solving real problems of Busan local small businesses with practical technology solutions. Status: ongoing. Site: 2026bix.com

**Skills** (from the content above only): Python, C++, Dart, TypeScript, JavaScript; deep learning, computer vision, image classification, SVM, k-NN, decision trees, cross-validation, statistical significance testing, DVC; React, Tailwind CSS, Vite, FastAPI, REST APIs, PostgreSQL, SQLite, Firebase; Flutter, microcontroller/sensor programming (C++); Git, GitHub, Docker, Vercel, SOLIDWORKS.

---

## 4. DESIGN DIRECTION

- **Default theme: dark charcoal.** Background `#0E0F11`, surfaces `#16181B`, borders `#23262B`, text `#EDEDED`, muted `#9AA0A6`, **amber accent** `#F59E0B` (hover `#FB923C`). Define all as CSS variables / Tailwind tokens.
- **Light theme** via toggle, same accent, warm-white background. Respect `prefers-color-scheme` on first visit, then remember the choice.
- **Aesthetic:** technical "HUD" feel. Thin 1px frames with corner ticks, mono micro-labels in uppercase, faint grid/noise background, soft glow only on primary buttons and active states. No neon overload.
- **Typography:** Latin: Geist or Inter, with JetBrains Mono for labels. Korean: Pretendard or Noto Sans KR. Bengali: Noto Sans Bengali (or Hind Siliguri). Free sources, `font-display: swap`, subset where possible.
- **Fluid scale:** rem-based layout designed at ~1440px. Above that width the root font-size grows fluidly (with a clamp floor) so the layout scales on large monitors; phones and laptops stay unchanged.
- **Responsive:** 360px to 4K, no horizontal scroll, mobile nav as a slide-in sheet.
- **Ambient UI:** (a) custom cursor dot (fine-pointer devices only, eased on the shared ticker); (b) a slim HUD strip at the top with a live clock in `Asia/Seoul` and a slowly crossfading status line (e.g. "Busan, KR", "Open to internships", "Building DOB Attendance"). Both `pointer-events: none` and hidden under reduced motion where distracting. Status lines come from the CMS.

---

## 5. PAGES AND SECTIONS

Single-page home with smooth-scroll anchors, plus detail routes. Sticky translucent header: monogram/avatar, section links, language switcher, theme toggle, Contact button.

1. **Hero:** name entering with a text-scramble decode; rotating role line (AI Engineer · Computer Vision · Full-Stack Developer); one-sentence objective; buttons **View Projects** and **Download CV**; GitHub / LinkedIn / Email icons; the portrait card (rounded rectangle, thin amber border) with the 3D centerpiece (section 7) behind and around it; a "Currently" chip ("President @ Den of Builders · Busan, KR").
2. **About:** bio, education card, languages with proficiency, interests; stat row with count-up (projects, certificates, Dean's List awards, semesters).
3. **Skills:** grouped chips (AI/ML, Computer Vision, Backend, Frontend, Mobile, Embedded, DevOps/Tools) with a subtle level indicator. Editable in admin.
4. **Experience:** a vertical **"living circuit" timeline**: an SVG path drawn with `stroke-dashoffset` scrubbed to scroll, a bright tip that rides the draw front, and nodes that light up as it passes. Alternating cards on desktop, single column on mobile.
5. **Projects:** a **scroll-scrubbed list**: a pinned column of project titles where the row nearest the viewport center brightens and the others dim, with a preview panel that swaps. Also a filter (All / AI-ML / Web / Mobile / Embedded). Mobile: simple stacked cards. Each project opens a **case-study page** (problem → approach → my role → stack → results → links → next/previous).
6. **Research:** featured card for the paper (abstract, method bullets, key finding, links) plus the in-progress card.
7. **Certifications and awards:** compact filterable list (Certifications / Academic awards), issuer, date, credential-link slot.
8. **Leadership and activities:** Den of Builders and BIX 2026 cards.
9. **Contact:** form (name, email, message) writing to Firestore with client validation, honeypot field, client cooldown, and Firestore rules; clear success/error states; direct email and social links; `mailto:` fallback.
10. **Location ("Where I am"):** tabs **Kakao Map | Google Map**. Pin only **Tongmyong University, 428 Sinseon-ro, Nam-gu, Busan 48520 (부산광역시 남구 신선로 428, 동명대학교)**; never my home. Kakao tab: Kakao Maps JS SDK loaded lazily (key in `VITE_KAKAO_JS_KEY`), resolve via `Places().keywordSearch("동명대학교")`, marker + info window, "Open in Kakao Map" and "Get directions" links. Google tab: keyless iframe embed with `loading="lazy"` plus open/directions buttons. Default to Kakao for Korean language/locale. If Kakao fails (missing key, unregistered domain), show a translated message and fall back to Google automatically. Fixed aspect ratio, "tap to interact" overlay on mobile, dark-mode friendly frame, no geolocation request, third-party scripts load only after the section is opened. Address text, keyword and optional lat/lng override editable in admin.
11. **Footer:** copyright, language switcher, back-to-top, small "Built with React, TypeScript and Firebase".
12. **404 page** and an error boundary, both translated.

---

## 6. MOTION SYSTEM

### 6.1 One animation loop (most important)
- Create Lenis with `autoRaf: false`. Drive it from `gsap.ticker`, and call `ScrollTrigger.update()` on each Lenis scroll event. Use `gsap.ticker.lagSmoothing(0)`.
- Pinned sections and images change layout after measurement. After fonts, images and the 3D canvas settle, run a small staggered `ScrollTrigger.refresh()` + `lenis.resize()`. Test hard refresh on every route.
- Access the Lenis instance through a ref/context so setup runs once.

### 6.2 Composable helpers (one module each)
All in `/src/lib/motion/`, each returns the tween/timeline/ScrollTrigger so callers can kill it on cleanup:
- `tokens.ts` (all durations and easings in one place)
- `fadeUp` (section entrance with stagger)
- `scrambleText` (per-character decode that locks left to right; the real text stays the element's accessible name, an `aria-hidden` layer shows the effect)
- `countUp`, `drawPath` (stroke-dashoffset scrub), `focusList` (center-row highlight)
- `pixelTransition` (grid of cells dissolving/assembling on route change)
- `liquidButton` (primary buttons: a badge floods the button on hover with a reversible, measured timeline rebuilt on resize)

### 6.3 Rules
- Every helper respects `prefers-reduced-motion` and resolves to the end state instead of animating.
- Clean up with `gsap.context()` / `useGSAP` on unmount. No leaks when navigating.
- Language switching must not replay entrance animations or lose scroll position.

---

## 7. 3D CENTERPIECE

- Client-only React Three Fiber canvas, lazy-loaded, behind and around the hero portrait.
- **Subject:** a low-poly **car model** (nod to my vehicle-classification research). Source a CC0/CC-BY `.glb` and put it in `/public/models/hero.glb` with attribution in the footer/README. If no model is present, fall back to a **procedural neural-network node graph** so the hero never breaks. Make the model swappable from `settings`.
- **Look:** render only **crease edges** (`EdgesGeometry`, ~30° threshold) in amber lines over a dark mesh, with a light halftone/dot pass. A top-anchored clipping plane sweeps through to "scan" the model in on load.
- **Interaction:** damped mouse-tracked tilt, drag-to-rotate, subtle idle motion. Pause the render loop with `IntersectionObserver` when off-screen.
- **Performance:** probe device quality once (tiers: high / medium / low) to set pixel ratio, antialiasing and particle count; an FPS guard steps down quality if frames drop. Dispose geometries/materials and release the WebGL context on unmount.
- **Fallbacks:** if WebGL is unavailable, on low-end devices, or with reduced motion, show a static image/SVG instead.

---

## 8. TRILINGUAL (i18n), key requirement

1. Languages `en` (default), `ko`, `bn`. First visit: detect from `navigator.language`, fall back to `en`.
2. Header dropdown `EN · 한국어 · বাংলা` (keyboard accessible, also in the mobile menu). **Instant switch, no reload, no scroll loss.**
3. Persist in `localStorage` and in the URL prefix (`/en`, `/ko`, `/bn`, e.g. `/ko/projects/campusar`). Redirect `/` to the best language.
4. UI strings in `src/locales/{en,ko,bn}/*.json`, split by namespace (nav, hero, about, projects, research, contact, footer, errors, admin).
5. Every content field in Firestore is `{ en, ko?, bn?, reviewed?: { ko?, bn? } }`. Public site renders the active language and **falls back to English**; never show empty text or raw keys.
6. Natural Korean (polite formal 합니다/입니다, professional resume tone) and natural Bengali (standard written Bengali, not literal). Keep technical terms (React, FastAPI, Docker, PostgreSQL) in Latin script. Mark machine-written strings `reviewed: false` (visible only in admin).
7. Dynamic `<html lang>`, per-language font stack, `word-break: keep-all` for Korean, line-height about 1.7 to 1.8 for Bengali. Long KO/BN strings must never overflow buttons, cards or the navbar at 360px.
8. `Intl.DateTimeFormat` / `Intl.NumberFormat` for dates and numbers.
9. Per-language `<title>`, description, Open Graph, `hreflang` (`en`, `ko`, `bn`, `x-default`), and a `sitemap.xml` with all language routes.
10. "Download CV" offers language-matched PDFs (EN and KO uploaded via admin; BN optional); hide options not uploaded.
11. No runtime translation API. All translations are stored text.

---

## 9. ADMIN CMS (single administrator, no-code)

- Firebase Auth at `/admin` (`noindex`, not in nav or sitemap), **one allow-listed admin account**.
- CRUD for: profile/hero, about, skills, experience, projects, research, certifications, activities, site settings (accent color, socials, resume PDFs, HUD status lines, 3D model, map), and contact messages (read/archive/delete).
- Trilingual tabs per field with completeness badges ("KO ✓ · BN ✗") and a **missing translations** dashboard.
- Image upload with client-side compression and size limit. If Firebase Storage needs billing, use optimized files in `/public` or external URLs and tell me which path you chose.
- Drag-and-drop ordering, Published/Draft toggle, live preview in the selected language.
- **"Import starter content"** button that seeds everything in section 3 in all three languages.
- Public pages read content at first render with caching; edits appear without a redeploy.

**Data model:** collections `profile` (single doc), `skills`, `experience`, `projects`, `research`, `certifications`, `activities`, `messages`, `settings`. Every doc has `order`, `status` (`draft` | `published`), `createdAt`, `updatedAt`. Provide TypeScript types and `firestore.rules`.

---

## 10. OPTIONAL AI ASSISTANT (only if free and safe)

An "Ask about Rahat" widget answering only from the portfolio's own content, in the visitor's language, using the free Gemini API tier. Never expose the API key in client code. If there is no free, secure way in this setup, **skip it** and build a static FAQ section instead, and tell me which you chose. Include message limits, cooldown, an AI-generated disclaimer, graceful quota failure, and an admin on/off switch.

---

## 11. PERFORMANCE, ACCESSIBILITY, SEO, SECURITY

- **Performance:** Lighthouse mobile 90+ for Performance, Accessibility, Best Practices, SEO. Route-based code splitting; the 3D bundle and GSAP loaded lazily where possible; images with width/height and WebP; preload only critical fonts; no layout shift.
- **Accessibility (WCAG 2.2 AA):** landmarks, visible focus, skip link, contrast in both themes and all three languages, translated alt text, keyboard-operable menus/switcher/filters, `aria-live` for form status, scramble effect never harms screen readers.
- **SEO:** unique title/description per page and language, Open Graph/Twitter cards using the avatar-based share image, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, canonical URLs.
- **Security:** Firestore rules: public read only for published content; writes only for the admin UID; contact messages create-only with field and size validation. No secrets in the repo, `.env.example` provided, sanitize rich text.
- **Privacy:** no tracking cookies. Analytics, if any, behind an admin toggle, off by default.

---

## 12. DELIVERY STAGES (report after each, commit after each)

1. **Plan + scaffold:** Vite + React + TS + Tailwind, folder structure, lint/format, `.env.example`, git init.
2. **Design system:** tokens, themes, fonts, base components (HUD frame, buttons, chips, cards), layout, header, footer, `/styleguide` page.
3. **Motion foundation:** Lenis + GSAP shared ticker, tokens, helpers from 6.2, custom cursor, HUD strip, `/motion-test` page. Verify hard-refresh stability.
4. **i18n foundation:** routing, locale files, switcher, fallbacks, per-language typography.
5. **Data model + Firebase rules + seed content** (all three languages).
6. **Public sections:** hero (with photo) → about → skills → experience timeline → projects + case studies → research → certifications → activities → contact → location.
7. **3D centerpiece** with quality tiers and fallbacks.
8. **Admin CMS** with trilingual editing and the missing-translations dashboard.
9. **SEO, performance, accessibility pass**, then the AI assistant or FAQ fallback.
10. **Final QA** against section 14, then deployment steps and README.

---

## 13. ASSETS I WILL ATTACH / ADD

- `profile-hero-4x5.webp` / `.jpg`, `profile-avatar-512.webp` / `.jpg` → `/public/images/`
- English ATS resume PDF (Korean version later)
- Optional: a `hero.glb` car model (if I do not supply one, find a CC0 one or use the procedural fallback)
- Optional: a screenshot of a design I like as a visual reference (take layout *ideas* only, never copy it)

---

## 14. ACCEPTANCE CHECKLIST (report pass/fail honestly)

- [ ] Language switch works everywhere with no reload, keeps scroll, updates URL, `<html lang>`, fonts and document title.
- [ ] No missing-key text or empty strings in EN, KO or BN; English fallback works.
- [ ] Long Korean and Bengali text never overflows at 360px.
- [ ] Lenis + ScrollTrigger stay aligned after a hard refresh on every route; pinned sections measure correctly.
- [ ] `prefers-reduced-motion` disables all motion and the 3D falls back to static.
- [ ] No WebGL context leak or console errors when navigating between pages.
- [ ] Dark and light themes both pass contrast checks.
- [ ] Location section: both tabs work, marker is the university (not my home), Google fallback works when the Kakao key/domain is missing.
- [ ] Photos render in hero, header avatar and share image with correct alt text.
- [ ] Every project has a working detail page; every link opens and is correct.
- [ ] Admin can add/edit/reorder/publish an item in all three languages and see it live.
- [ ] Contact form writes a message and rejects invalid or spam input.
- [ ] Firestore rules block public writes everywhere except the contact form.
- [ ] No phone number, address or date of birth appears publicly.
- [ ] Lighthouse mobile scores reported with real measured numbers (say so if you cannot measure).
- [ ] Build passes with no TypeScript errors; any warnings listed.

At the end give me: files changed, how to run it, how to deploy it, and the placeholders I still need to fill (Kakao JS key and domain registration, CV PDFs, paper venue/PDF link, project screenshots and outcome metrics, reviewed KO/BN translations, 3D model attribution).

---

## KICKOFF MESSAGE (paste this into the Agent Manager)

```
Read SPEC.md fully. Do not write code yet. First reply with: (1) your project plan and folder structure, (2) the libraries you will install and why, (3) the top 5 risks (especially Lenis/GSAP sync, 3D performance, trilingual typography) and how you will handle them, (4) any decisions you need from me. Then wait for me to say "start stage 1". After each stage, report and wait for "next".
```

