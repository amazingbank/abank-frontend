# Project Summary: The Amazing Bank (奇迹银行)

## Overview

**The Amazing Bank** is a modern banking platform's frontend web application — a marketing/landing-page style SPA designed to showcase banking products (checking, savings, credit cards, loans) and provide an online banking portal entry point. The project is currently a static frontend with no backend integration.

- **License**: MIT (c) 2025 The Amazing Bank
- **Documentation**: [README.md](README.md) (EN) | [README_cn.md](README_cn.md) (CN)

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| UI Framework | React | ^18.3.1 |
| Type System | TypeScript | ^5.5.3 |
| Build Tool | Vite | ^5.4.2 |
| CSS Framework | Tailwind CSS | ^3.4.1 |
| CSS Processing | PostCSS + Autoprefixer | ^8.4.35 / ^10.4.18 |
| Routing | React Router DOM | ^7.2.0 |
| Icons | Lucide React | ^0.344.0 |
| Linting | ESLint (flat config) | ^9.9.1 |

---

## Project Structure

```
├── index.html                  # Vite SPA shell
├── package.json                # Project manifest
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript root config (project references)
├── tsconfig.app.json           # TypeScript config for src/
├── tsconfig.node.json          # TypeScript config for Vite/node tooling
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS pipeline (Tailwind + Autoprefixer)
├── eslint.config.js            # ESLint flat config
└── src/
    ├── main.tsx                # Application entry point
    ├── App.tsx                 # Root component with React Router
    ├── index.css               # Global styles + custom animations
    ├── vite-env.d.ts           # Vite type reference
    └── components/
        ├── Header.tsx          # Navigation bar (logo, links, CTA)
        ├── Footer.tsx          # Footer with 4-column link grid
        ├── Home.tsx            # Landing page (hero + features + CTA)
        └── InterestCalculator.tsx  # Stub calculator (not wired up)
```

---

## Components

### `App.tsx`
Root component. Wraps the app in `<BrowserRouter>` with `<Routes>`. Only active route: `/` → `<Home />`. Renders `<Header>` and `<Footer>` on every page.

### `Header.tsx`
Top navigation bar with logo (Lucide `Landmark` icon), brand name, desktop nav links (Home, Personal, Business, About), and "Online Banking" CTA button. **No mobile navigation** (nav items hidden on mobile with no hamburger menu).

### `Footer.tsx`
Four-column grid footer (Products, Company, Resources, Legal). Each column has 4 placeholder links (`href="#"`). Dark background.

### `Home.tsx`
Landing page with three sections:
- **Hero**: Headline, subtext, "Get Started" CTA, Unsplash banking image
- **Features**: Three animated cards — Secure Banking (Shield), Savings Accounts (PiggyBank), Credit Cards (CreditCard)
- **CTA Banner**: "Open Account" call-to-action

### `InterestCalculator.tsx`
Stub component rendering `<div>Helo Calucator</div>` (typos present). Route is commented out in `App.tsx`. Not linked in navigation.

---

## Build Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server with HMR |
| `build` | `vite build` | Production build → `dist/` |
| `lint` | `eslint .` | Lint all files |
| `preview` | `vite preview` | Preview production build |

---

## Dependencies

**Runtime (4)**: `react`, `react-dom`, `react-router-dom`, `lucide-react`

**Dev (12)**: `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `@types/react`, `@types/react-dom`

---

## Custom CSS Animations

Defined in `src/index.css`:

- **`float`**: Vertical floating motion (translateY, 3s infinite loop) — used on feature icons
- **`slideUp`**: Fade-in + slide-up entrance (0.5s, runs once) — used on hero text

---

## Current Status & Known Gaps

| Area | Status |
|------|--------|
| Interest Calculator | Stub only, route commented out, has typos |
| Mobile Navigation | Not implemented (nav hidden on mobile, no hamburger menu) |
| All Links | Placeholder `href="#"` (Personal, Business, About, Online Banking, etc.) |
| Testing | No test framework, no test files, zero coverage |
| Backend/API | No integration, no data fetching, no state management library |
| Environment Config | No `.env` files or environment-specific configuration |

---

## Vite Configuration Notes

- Uses `@vitejs/plugin-react` for React Fast Refresh
- Excludes `lucide-react` from dependency optimization (likely a bundling workaround)
- TypeScript uses project references: `tsconfig.app.json` (ES2020, React JSX, strict) and `tsconfig.node.json` (ES2022)
