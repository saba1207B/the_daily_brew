# The Daily Brew ☕

A motion-driven web experience for **The Daily Brew**, a specialty coffee destination in Chennai.

Designed and engineered with fluid typography, responsive layout stackings optimized for Android and iOS mobile browsers, GPU-accelerated canvas interactions, and editorial café aesthetics.

---

## Features

- **Full Mobile & Desktop Responsiveness**: Engineered for Android (Chrome, Firefox, Samsung Internet) and iOS (Safari WebKit) with safe-area insets (`env(safe-area-inset-*)`), dynamic viewport units (`100dvh`), and zero horizontal overflow.
- **Device-adaptive intro**: Desktop browsers get the chocolate liquid intro; mobile browsers get a clean cream logo screen with the same scroll-driven aperture transition and no liquid renderer.
- **Editorial Hero Section**: Bold Cormorant Garamond typography paired with full-bleed artisanal coffee photography.
- **Full-Screen Menu Showcase**: ScrollTrigger-driven product cards with kinetic text wipe reveals, dynamic parallax elevation, and radiant pricing aura.
- **Twinkling Golden Star Cursor**: High-DPI Canvas 2D particle system emitting 4-pointed golden stars and glowing dust on desktop (gracefully disabled on mobile touchscreens).
- **Smooth Scrolling & Transitions**: Lenis smooth scrolling and GSAP section/menu transitions remain active across desktop and mobile browsers.
- **Interactive Wordmark**: Split-diagonal clip-path text sweep in the footer.
- **Custom 404 Experience**: Café-themed error page with playful coffee animations and quick return navigation.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Motion**:
  - [GSAP](https://gsap.com/) (GreenSock) + ScrollTrigger
  - [Framer Motion](https://www.framer.com/motion/)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Typography**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) & [Manrope](https://fonts.google.com/specimen/Manrope) via `@fontsource`
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn / pnpm

### Installation

```bash
# Clone or navigate to the project directory
cd the-daily-brew

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build optimized bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
├── public/
│   ├── assets/
│   │   ├── images/         # Optimized photography & café animations
│   │   └── transitions/    # SVG mask aperture shapes
│   └── favicon.svg
├── src/
│   ├── components/         # React UI & animation components
│   │   ├── About.tsx
│   │   ├── AnimatedCustomCursor.tsx
│   │   ├── ChocolateLiquidBackground.tsx
│   │   ├── CoffeeCupIcon.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── GooeyOverlayWebGL.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── IntroDrippingScreen.tsx
│   │   ├── Menu.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── NotFound404.tsx
│   │   ├── SmoothScrollProvider.tsx
│   │   └── WhiteCoffeeLoader.tsx
│   ├── context/            # Lenis smooth scroll React context
│   ├── data/               # Menu items, contact info, navigation items
│   ├── lib/                # GSAP configuration and easing curves
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Global typography, viewport & CSS layer definitions
│   └── main.tsx            # React application entry point
├── index.html              # HTML shell with mobile viewport-fit and meta tags
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Palette and font family definitions
└── vite.config.ts          # Vite build pipeline and path aliases
```

---

## Credits

Website Contributions; Baked by: **Sabareesh M**

