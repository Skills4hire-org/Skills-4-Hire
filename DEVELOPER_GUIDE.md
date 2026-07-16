# Skills4Hire — Developer Handoff Guide

> **Last Updated:** July 2026  
> **Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router v6 · Redux Toolkit · Lenis

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Getting Started](#2-getting-started)
3. [Project Structure](#3-project-structure)
4. [Architecture & Key Decisions](#4-architecture--key-decisions)
5. [Routing](#5-routing)
6. [Navigation System](#6-navigation-system)
7. [Smooth Scrolling (Lenis)](#7-smooth-scrolling-lenis)
8. [State Management](#8-state-management)
9. [Design System](#9-design-system)
10. [Key Components](#10-key-components)
11. [Pages](#11-pages)
12. [Hooks Reference](#12-hooks-reference)
13. [Data & Content](#13-data--content)
14. [Known Patterns & Conventions](#14-known-patterns--conventions)
15. [What's Left / TODO](#15-whats-left--todo)

---

## 1. Project Overview

**Skills4Hire** is a marketplace platform connecting customers (service buyers) with providers (skilled professionals). This repository is the **public-facing marketing website** bundled together with the **authenticated app** (dashboards, bookings, wallet, etc.).

The two surfaces share a single Vite build but are separated by layout:
- **Public routes** use `IndexLayout` (marketing header + footer)
- **Authenticated routes** use `HomeLayout` / `Layout` (app navigation, bottom tab bar, etc.)

---

## 2. Getting Started

```bash
# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev

# TypeScript type check (no emit)
npx tsc --noEmit

# Production build
npm run build
```

> **Node version:** 18+ recommended.

---

## 3. Project Structure

```
src/
├── App.tsx                 # Root: router config + Lenis smooth-scroll init
├── main.tsx                # ReactDOM entry point
├── declarations.d.ts       # Global type augmentations (window.lenis, Swiper CSS)
├── index.css               # Global styles (design tokens, Tailwind base)
│
├── api/                    # Axios API call functions
├── assets/
│   ├── data.ts             # ALL static content (nav links, services, FAQs, etc.)
│   └── images/             # Local image assets
│
├── components/
│   ├── about/              # Components used exclusively on /about
│   │   ├── Hero.tsx        # Banner image + animated stat cards
│   │   ├── Mission.tsx     # Dark bento-grid section
│   │   ├── Vision.tsx      # Two-column text + image section
│   │   └── CTA.tsx         # Final call-to-action with background image
│   │
│   ├── landing/            # Components used exclusively on /
│   │   ├── About.tsx       # Stats + image grid section
│   │   ├── Contact.tsx     # Contact form section
│   │   ├── FAQs.tsx        # Accordion FAQ section
│   │   ├── Features.tsx    # Feature highlights
│   │   ├── Hero.tsx        # Landing page hero
│   │   ├── HowItWorks.tsx  # Step-by-step explainer
│   │   ├── Services.tsx    # Scrolling ticker + service cards
│   │   └── Value.tsx       # Customer vs Provider bento cards
│   │
│   ├── global/             # Shared, reusable components
│   │   ├── AnimatedCounter.tsx  # Viewport-triggered number animation
│   │   ├── Container.tsx        # Max-width layout wrapper (use in every section)
│   │   ├── Logo2.tsx            # Brand logo
│   │   ├── ScrollToTop.tsx      # Resets scroll on page navigation
│   │   └── ShaderBackground.tsx # Animated canvas background
│   │
│   ├── header/
│   │   └── IndexHeader.tsx # Sticky public header (logo + nav + CTA buttons)
│   │
│   ├── navbars/
│   │   ├── IndexNavbar.tsx       # Desktop pill nav links
│   │   ├── MobileDropdownNav.tsx # Mobile hamburger → animated dropdown
│   │   └── Navbar.tsx            # Bottom tab bar (authenticated app only)
│   │
│   ├── footer/             # Footer components
│   ├── form/               # Form compositions (ContactForm, etc.)
│   ├── form-fields/        # Primitive inputs (FormInput, FormTextArea)
│   ├── layouts/            # Route layout wrappers
│   ├── sidebars/           # Sheet/drawer side nav (authenticated app)
│   └── ui/                 # shadcn/ui primitives (Sheet, Separator, etc.)
│
├── features/               # Redux slice files (userState, etc.)
├── hooks/                  # Custom React hooks (see Section 12)
├── pages/                  # Route-level page components
├── store.ts                # Redux store configuration
├── types/                  # Shared TypeScript types
└── utils/
    ├── format.ts           # Date/currency formatters, URL helpers
    ├── types.ts            # Application-level TypeScript types
    └── database.ts         # Static text for legal pages (Privacy, T&Cs)
```

---

## 4. Architecture & Key Decisions

### Single Repo, Two Surfaces
The public marketing site and authenticated dashboard live in the same Vite project. Separation is achieved via React Router layout components — not separate deployments.

### No API Calls on Public Pages
All content on `/`, `/about`, `/legal` is **static** — sourced from `src/assets/data.ts` and `src/utils/database.ts`. This keeps the marketing site fast and independently deployable.

### Mock Data
The authenticated app uses `initializeMockChat()` (called in `App.tsx`) to seed chat data for development. **Remove this before going to production.**

---

## 5. Routing

All routes are defined in `src/App.tsx` using `createBrowserRouter`.

| Path | Page | Layout |
|---|---|---|
| `/` | Landing | IndexLayout |
| `/about` | About | IndexLayout |
| `/legal?type=...` | Legal | IndexLayout |
| `/sign-up` | Sign Up | None |
| `/sign-in` | Sign In | None |
| `/home/*` | Dashboard | HomeLayout |
| `/onboarding/*` | Onboarding | Varies |

> **Blog:** The `/blog` route is **temporarily disabled**. The files still exist in `src/pages/` and `src/components/blog/`. To re-enable, add the route to `App.tsx` and the nav link to `src/assets/data.ts` — see Section 6.

---

## 6. Navigation System

The public nav has three parts that must stay in sync when making changes:

| Component | Visible | Purpose |
|---|---|---|
| `IndexNavbar` | Desktop (md+) | Pill-style links inside the header |
| `MobileDropdownNav` | Mobile only | Hamburger icon → animated dropdown panel |
| `SidebarNavSheet` | Mobile only | Legacy slide-in drawer (authenticated app only now) |

### Single Source of Truth

```ts
// src/assets/data.ts
export const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Services',   href: '/#services',  sectionId: 'services' },
  { label: 'FAQs',       href: '/#faqs',      sectionId: 'faqs' },
  { label: 'Contact Us', href: '/#contact',   sectionId: 'contact' },
]
```

Links with `sectionId` are **hash links** that scroll to a section on the home page.

### Re-enabling the Blog

```ts
// 1. Add to navLinks in src/assets/data.ts:
{ label: 'Blog', href: '/blog' },

// 2. Add to footerLinks in src/assets/data.ts:
{ label: 'Blog', url: '/blog' },

// 3. Add to router in src/App.tsx (inside IndexLayout children):
{ path: 'blog',     element: <Blog /> },
{ path: 'blog/:id', element: <BlogPost /> },
```

### Active State

Active state is computed by three cooperating hooks:
1. `useCurrentSection(sectionIds)` — uses IntersectionObserver, returns the currently visible section ID.
2. `useIsNavActive(currentSection, navSectionIds)` — returns a predicate to test if a given link object is active.
3. `useScrollToHash()` — scrolls to the `#hash` element when the page first loads.

---

## 7. Smooth Scrolling (Lenis)

The site uses [Lenis](https://lenis.darkroom.engineering/) for smooth scroll inertia.

### Initialization (App.tsx)

```ts
const lenis = new Lenis({ duration: 1.2, smoothWheel: true, ... })

// Expose on window so any component can call scrollTo() without prop-drilling.
// Type-safe via the Window augmentation in src/declarations.d.ts.
window.lenis = lenis

function raf(time: number) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

### Programmatic Scroll

```ts
// From any component:
window.lenis?.scrollTo(0)                          // scroll to top
window.lenis?.scrollTo('#services')                // scroll to element
window.lenis?.scrollTo(0, { immediate: true })     // instant (no animation)

// Safe fallback pattern:
window.lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: 'smooth' })
```

### ScrollToTop Component

`src/components/global/ScrollToTop.tsx` resets scroll on every route change (except browser Back/Forward). It resets both native `window.scrollTo` and `window.lenis` to ensure they stay in sync.

---

## 8. State Management

Redux Toolkit is used for global state. The store is configured in `src/store.ts`.

The key slice for public pages is `userState`:
- `userType: 'customer' | 'serviceProvider'` — drives which tab links appear in the authenticated bottom nav.

---

## 9. Design System

### Colour

```
bg-primary           Brand colour (defined in index.css as CSS variable)
text-primary
border-primary/20    Semi-transparent border
bg-primary/10        Tinted background for badges
```

### Page Background

```
bg-[#F9F9F6]   Warm off-white used on all public pages
```

### Layout Container

Every section should be wrapped in `<Container>`:

```tsx
<Container className="py-20 md:py-32">
  ...
</Container>
// Max-width: max-w-6xl (default), xl:max-w-7xl on extra-wide screens
// Horizontal padding: px-2 sm:px-4
```

### Section Badge Pattern

```tsx
<div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-[8px] px-4 py-1.5">
  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
  <span className="text-xs font-semibold text-primary tracking-wide uppercase">Label</span>
</div>
```

### Border Radius

| Element | Class |
|---|---|
| Cards, inputs, badges | `rounded-[8px]` |
| Buttons | `rounded-[4px]` |
| Large image containers | `rounded-2xl` |

### Section Heading Scale

```
text-4xl md:text-5xl lg:text-[60px] font-semibold tracking-tighter leading-[1.1]
```

### Scroll Animation Convention

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
```

Always use `viewport={{ once: true }}` — animations should not replay on re-scroll.

---

## 10. Key Components

### `AnimatedCounter`
**`src/components/global/AnimatedCounter.tsx`**

Animates a number from `from` to `to` when it enters the viewport. Used in the About hero stat cards and the Landing About section.

```tsx
<AnimatedCounter from={0} to={2000} suffix="+" />
<AnimatedCounter from={0} to={100} suffix="%" />
```

### `Container`
**`src/components/global/Container.tsx`**

Every public section should use this for consistent padding and max-width. Pass additional classes for vertical padding:

```tsx
<Container className="py-16 md:py-24">
  ...
</Container>
```

### `MobileDropdownNav`
**`src/components/navbars/MobileDropdownNav.tsx`**

Hamburger menu for mobile. Includes:
- Click-outside auto-close (`useEffect` + `mousedown`)
- Route-change auto-close (`useEffect` on pathname/hash)
- `aria-expanded`, `aria-controls`, `aria-current` for accessibility

### `IndexHeader`
**`src/components/header/IndexHeader.tsx`**

Sticky public header. Desktop: `IndexNavbar` + "Get Started" button. Mobile: "Sign up" button + `MobileDropdownNav`.

---

## 11. Pages

### Landing (`/`) — `src/pages/Landing.tsx`

Section order:
1. `Hero` — Headline + CTA + background
2. `About` — Stats + image collage  
3. `Features` — Feature highlights
4. `Services` — Scrolling ticker + cards
5. `HowItWorks` — Step explainer
6. `Value` — Customer vs Provider bento cards
7. `FAQs` — Accordion questions
8. `Contact` — Contact form

### About (`/about`) — `src/pages/About2.tsx`

Section order:
1. `Hero` — Banner image + mission statement + animated stat cards
2. `Mission` — Dark section with 4-image bento grid
3. `Vision` — Two-column text + image layout
4. `CTA` — Full-width call-to-action with background image

---

## 12. Hooks Reference

### `useScrollToHash`
**`src/hooks/useScrollToHash.ts`**

On mount, checks if the URL has a `#hash` and scrolls the matching DOM element into view. Only activates on the home page (`pathname === '/'`).

```ts
// Usage — call inside any component that hosts hash-target sections
useScrollToHash()
```

### `useCurrentSection`
**`src/hooks/useCurrentSection.ts`**

Uses `IntersectionObserver` to track which section is currently most visible on screen. Returns the `id` of that section or `null` if not on the home page.

```ts
const currentSection = useCurrentSection(['services', 'faqs', 'contact'])
```

### `useIsNavActive`
**`src/hooks/useIsNavActive.ts`**

Returns a function that tests whether a given nav link object should render as "active". Handles both hash links and page links.

```ts
const isActive = useIsNavActive(currentSection, ['services', 'faqs', 'contact'])
// then:
isActive(link) // → boolean
```

---

## 13. Data & Content

### Primary Content File

**`src/assets/data.ts`** is the single source of truth for all static content:
- `navLinks` — navigation menu
- `footerLinks` — footer columns
- `contact` — email + phone
- `services` — service categories
- `faqs` — FAQ accordion content
- `testimonials` — customer quotes

### Legal Content

**`src/utils/database.ts`** contains the full text for the Privacy Policy and Terms & Conditions pages, stored as arrays of string paragraphs.

### Contact Email

Currently set to `Support@theskills4hire.com`. It appears in:
- `data.ts` line ~1684 (footer link label + URL)
- `data.ts` line ~1698 (contact section)
- `database.ts` line ~1016 (Terms & Conditions text)
- `database.ts` line ~1091 (Privacy Policy text)

---

## 14. Patterns & Conventions

### Image Loading

```tsx
// LCP (above-fold) images — load immediately
<img loading="eager" fetchPriority="high" ... />

// All other images — lazy load
<img loading="lazy" ... />

// Decorative background images — hidden from screen readers
<img alt="" aria-hidden="true" ... />
```

### Never Use `style={{ backgroundImage }}`

Use a proper `<img>` element with `object-cover` instead. Inline style image URLs are a minor XSS risk if the source ever becomes dynamic.

```tsx
// ❌ Avoid
<div style={{ backgroundImage: `url(${img})` }} />

// ✅ Correct
<img src={img} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
```

### Type Safety

- Avoid `any` — use explicit types or `unknown`
- Global types go in `src/declarations.d.ts`
- App-level types go in `src/utils/types.ts` or `src/types/`

### Shared Components

Before building a new component, check `src/components/global/`. If a pattern is used in 2+ places, extract it there (as we did with `AnimatedCounter`).

---

## 15. What's Left / TODO

### High Priority (Before Launch)

- [ ] **Remove mock data** — Delete `initializeMockChat()` call in `src/App.tsx`
- [ ] **Wire up Contact Form** — `ContactForm.tsx` has an empty `handleSubmit`. Connect to a backend or email service (Resend / EmailJS / Formspree)
- [ ] **Blog page** — Re-enable when content is ready (see Section 6)
- [ ] **Sign-up / Sign-in** — Ensure full production validation, error handling, and email verification

### Medium Priority

- [ ] **SEO meta tags** — Add `<title>` and `<meta name="description">` to each public page via `react-helmet-async` or Vite's `vite-plugin-html`
- [ ] **Open Graph tags** — For social media previews when pages are shared
- [ ] **404 Page** — No `*` catch-all route exists. Create `NotFound.tsx` and register it in the router
- [ ] **Environment variables** — API base URLs and keys should move to `.env` / `.env.production`

### Nice to Have

- [ ] **`useIsNavActive` typing** — The `link` parameter uses `any`. Export a `NavLink` type from `data.ts` and use it here
- [ ] **Accessibility audit** — Run Lighthouse / axe to catch any remaining a11y issues
- [ ] **Image optimisation** — Consider converting `.jpg`/`.png` assets to `.webp` for better load times
