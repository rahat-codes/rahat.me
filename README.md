# Rahat Md Mahadi Hasan — Personal Portfolio

> **"Building reliable AI systems and the apps around them."**
> A motion-led, trilingual (EN / 한국어 / বাংলা) technical portfolio for Rahat Md Mahadi Hasan, AI & Computer Engineering student at Tongmyong University, Busan, South Korea.

---

## 🛠 Tech Stack

- **Framework:** React 18 (`18.3.1`) + TypeScript (`5.7.3`) + Vite (`6.2.0`)
- **Styling:** Tailwind CSS (`3.4.17`) with custom HUD design tokens & fluid typography
- **Routing:** React Router DOM (`6.28.2`) with trilingual prefix routing (`/:lang/*`)
- **Motion:** GSAP (`3.12.7`) + `@gsap/react` (`2.1.2`) + Lenis (`1.1.20`) driven by a single unified RAF ticker
- **3D Graphics:** `@react-three/fiber` (`8.17.14`) + `@react-three/drei` (`9.121.5`) + Three.js (`0.174.0`)
- **i18n:** `react-i18next` (`15.4.1`) with complete EN / KO / BN locales and English fallback
- **Backend / CMS:** Firebase Auth + Firestore (`11.4.0`) with offline seed data fallback
- **Hosting:** Vercel (SPA rewrites via `vercel.json`) / Firebase Hosting

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js `>= 18` (LTS recommended)
- npm `>= 9`

### 2. Installation
```bash
git clone https://github.com/rahat-codes/rahat.me.git
cd rahat.me
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your Firebase configuration keys and optional Kakao Maps JavaScript key.

### 4. Development Server
```bash
npm run dev
```

### 5. Typecheck, Lint & Build
```bash
npm run typecheck
npm run lint
npm run build
```

---

## 📁 Repository Structure

```text
rahat.me/
├── public/                 # Static assets (fonts, images, sitemap, 3D models)
├── src/
│   ├── components/         # Reusable HUD components, 3D canvas, sections
│   ├── data/seed/          # Offline-first trilingual seed datasets
│   ├── hooks/              # Custom hooks (Lenis, device tiers, scroll spy)
│   ├── lib/
│   │   ├── firebase.ts     # Firebase client init & Firestore repository
│   │   └── motion/         # GSAP helper modules sharing the Lenis ticker
│   ├── locales/            # Trilingual i18n JSON namespaces (EN, KO, BN)
│   ├── pages/              # Route views (Home, Case Study, Styleguide, Admin)
│   ├── router/             # React Router configuration
│   └── types/              # Strict TypeScript definitions
├── firestore.rules         # Strict production security rules
├── vercel.json             # Vercel SPA rewrite definitions
└── firebase.json           # Firebase emulator & rules config
```

---

## 🔒 Security & Privacy

- **Zero PII Exposure:** Phone number, home address, and date of birth are strictly excluded.
- **Honeypot & Rate-Limiting:** Contact form protected with honeypot validation and client cooldowns.
- **Firestore Security Rules:** Read access for published items only; public writes restricted exclusively to validated contact messages; all management operations locked to allow-listed admin UID.

---

## 📜 License & Attributions

- Code: MIT License
- Personal content & papers: © Rahat Md Mahadi Hasan

