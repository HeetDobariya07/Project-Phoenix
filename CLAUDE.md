# CLAUDE.md - Project Phoenix AI Assistant Guide

> **Last Updated**: 2025-11-15
> **Project**: Project Phoenix - Cervical Cancer Cell Classification
> **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion

---

## 🎯 Project Overview

**Project Phoenix** is a medical AI application focused on **cervical cancer cell classification** using explainable AI. The project combines machine learning research (Jupyter notebooks) with a modern web interface built on Next.js.

**Mission Statement**: Like the Phoenix rising from ashes, this project aims to catch disease early through ML-powered microscopic image analysis, turning potential devastation into stories of renewal through early diagnosis.

### Project Structure

```
Project-Phoenix/
├── Phoenix/
│   └── phoenix-app/              # Next.js 16 web application
│       ├── src/
│       │   ├── app/              # Next.js App Router pages
│       │   ├── components/       # Reusable React components
│       │   ├── config/           # Centralized configuration
│       │   ├── lib/              # Utility functions
│       │   └── types/            # TypeScript type definitions
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.ts
├── Fine Tuning/                  # ML model training
│   ├── 1_Preliminary Research and Testing/
│   ├── 2_ConvNeXt Transfer Learning/
│   └── 3_Explainability Incorporation/
├── Image Preprocessing/          # Data preprocessing pipelines
├── ConvNeXt_Finetuning_v0_1.ipynb
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend (phoenix-app)

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 16.0.1 | React framework with App Router |
| **React** | React | 19.2.0 | UI library |
| **Language** | TypeScript | ^5 | Type safety |
| **Styling** | Tailwind CSS | ^4 | Utility-first CSS |
| **Animation** | Framer Motion | ^12.23.24 | Advanced animations |
| **Smooth Scroll** | Lenis | ^1.3.15 | Smooth scrolling |
| **Icons** | Lucide React | ^0.552.0 | Icon library |
| **3D Graphics** | Three.js | ^0.181.1 | 3D rendering |
| **Themes** | next-themes | ^0.4.6 | Dark/light mode |

### Build & Development Tools

- **ESLint**: Code linting (`eslint-config-next`)
- **React Compiler**: Babel plugin for React optimization
- **PostCSS**: CSS processing with Tailwind v4
- **Vercel**: Deployment platform

### Machine Learning

- **Framework**: Jupyter notebooks
- **Model**: ConvNeXt (Transfer Learning)
- **Focus**: Image preprocessing, fine-tuning, explainability (XAI)

---

## 📁 Detailed Directory Guide

### `/Phoenix/phoenix-app/src/app/` - Next.js App Router

**Convention**: File-based routing with Next.js App Router

```
app/
├── layout.tsx           # Root layout with fonts & metadata
├── page.tsx            # Homepage (route: /)
├── globals.css         # Global styles & CSS variables
├── about/
│   └── page.tsx        # About page (route: /about)
└── team/
    └── page.tsx        # Team page (route: /team)
```

**Key Files**:
- **`layout.tsx`**: Sets up fonts (Michroma, Poppins, Playfair Display), metadata, and wraps all pages with `RootLayoutWrapper`
- **`globals.css`**: Tailwind v4 imports, custom variants, CSS variables for theming

### `/Phoenix/phoenix-app/src/components/` - React Components

**Convention**: All components are TypeScript `.tsx` files with centralized exports via `index.ts`

**Component Categories**:

#### Layout Components
- **`page-layout.tsx`**: Main page wrapper with interactive gradient background
- **`root-layout-wrapper.tsx`**: Root-level wrapper handling global layout concerns
- **`interactive-gradient-background.tsx`**: Animated gradient that responds to mouse movement

#### Navigation Components
- **`navigation-dock.tsx`**: Main navigation dock component
- **`bottom-nav-bar.tsx`**: Mobile bottom navigation bar
- **`dock.tsx`**: Reusable dock UI component

#### Section Components
- **`hero-section.tsx`**: Hero section with title/subtitle
- **`footer.tsx`**: Footer with links and copyright
- **`hover-footer.tsx`**: Footer with text hover effects
- **`team.tsx`**: Team member display section
- **`classification-showcase.tsx`**: Showcases cell classification results

#### Animation/Effect Components
- **`page-transition.tsx`**: Page transition animations
- **`page-transition-wrapper.tsx`**: Wrapper for page transitions
- **`bend-text.tsx`**: Text with bending animation effect
- **`progressive-blur.tsx`**: Progressive blur effect
- **`Oliver Paralax.tsx`**: Parallax image gallery (exported as `ParallaxGallery`)
- **`gallery-animation.tsx`**: Cell classification gallery with animations
- **`digital-serenity-animated-landing-page.tsx`**: Animated landing page component

#### Interactive Components
- **`interactive-selector.tsx`**: Interactive selection UI
- **`interactive-image-accordion.tsx`**: Image accordion with hover effects

**Import Pattern**:
```typescript
// ✅ Good: Use centralized exports
import { HeroSection, Footer, PageLayout } from "@/components";

// ❌ Avoid: Direct file imports
import { HeroSection } from "@/components/hero-section";
```

### `/Phoenix/phoenix-app/src/config/` - Configuration

**Convention**: Centralized constants and configuration for consistency

- **`navigation.ts`**:
  - Navigation items (`NAV_ITEMS`)
  - Animation config (`NAV_ANIMATION_CONFIG`)
  - Layout constants (`NAV_LAYOUT`)
  - Helper functions: `findNavItemByHref()`, `getNavIndexByHref()`

- **`constants.ts`**:
  - Site config (`SITE_CONFIG`)
  - Footer links (`FOOTER_LINKS`)
  - Hero config (`HERO_CONFIG`)
  - Gradient config (`GRADIENT_CONFIG`)
  - Animation durations (`ANIMATION_DURATIONS`)

**Usage Example**:
```typescript
import { NAV_ITEMS, SITE_CONFIG } from "@/config/navigation";
```

### `/Phoenix/phoenix-app/src/types/` - TypeScript Types

**Convention**: Centralized type definitions for component props

```typescript
// Example types defined:
- HeroSectionProps
- FooterProps
- PageLayoutProps
- InteractiveGradientBackgroundProps
- TextHoverEffectProps
```

### `/Phoenix/phoenix-app/src/lib/` - Utilities

- **`utils.ts`**: Contains `cn()` function for merging Tailwind classes
  ```typescript
  import { cn } from "@/lib/utils";
  // Merges clsx and tailwind-merge for optimal class handling
  ```

---

## 🎨 Design System

### Fonts

Three Google Fonts configured in `layout.tsx`:

1. **Michroma** (400): Primary display font
   - Variable: `--font-michroma`
   - Used for: Headings, hero text

2. **Poppins** (100-900): Body text
   - Variable: `--font-poppins`
   - Used for: General content

3. **Playfair Display** (400-900): Decorative serif
   - Variable: `--font-playfair`
   - Used for: Emphasis, quotes

### Color System

Defined in `globals.css` with CSS variables:
- `--color-background` / `--color-foreground`
- `--color-primary` / `--color-primary-foreground`
- `--color-secondary` / `--color-secondary-foreground`
- `--color-accent` / `--color-accent-foreground`
- `--color-muted` / `--color-muted-foreground`
- Chart colors: `--color-chart-1` through `--color-chart-5`

### Border Radius

- `--radius-sm`: `calc(var(--radius) - 4px)`
- `--radius-md`: `calc(var(--radius) - 2px)`
- `--radius-lg`: `var(--radius)`
- `--radius-xl`: `calc(var(--radius) + 4px)`

---

## 🚀 Development Workflows

### Setting Up the Development Environment

```bash
# Navigate to the app directory
cd Phoenix/phoenix-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

### Development Server

- **URL**: `http://localhost:3000`
- **Hot Reload**: Enabled by default
- **React Compiler**: Enabled in `next.config.ts`

---

## 📝 Key Conventions for AI Assistants

### 1. File Creation & Modification

#### When Creating New Components

```typescript
// 1. Create component file: src/components/my-component.tsx
"use client"; // Add if using hooks or interactivity

import { type MyComponentProps } from "@/types";

export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}

// 2. Add type definition to: src/types/index.ts
export interface MyComponentProps {
  prop1: string;
  prop2?: number;
  className?: string; // Always include for flexibility
}

// 3. Export from: src/components/index.ts
export { MyComponent } from "./my-component";
```

#### When Creating New Pages

```typescript
// src/app/my-page/page.tsx
import { PageLayout, MyComponent } from "@/components";

export default function MyPage() {
  return (
    <PageLayout>
      <MyComponent />
    </PageLayout>
  );
}

// Don't forget to add to navigation if needed (src/config/navigation.ts)
```

### 2. Styling Conventions

```typescript
// ✅ Use the cn() utility for conditional classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes here",
  condition && "conditional-class",
  props.className // Always spread user className last
)} />

// ✅ Use Tailwind CSS classes
// ✅ Use CSS variables for colors: text-primary, bg-secondary
// ✅ Use responsive prefixes: md:, lg:, xl:
// ✅ Use dark mode: dark:text-white
```

### 3. Animation Best Practices

```typescript
import { motion } from "framer-motion";

// Use Framer Motion for animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>

// Reference animation constants from config
import { ANIMATION_DURATIONS, NAV_ANIMATION_CONFIG } from "@/config";
```

### 4. Navigation Updates

When adding a new page to navigation:

```typescript
// src/config/navigation.ts

// 1. Import icon
import { Home, Info, Users, YourNewIcon } from "lucide-react";

// 2. Add to NAV_ITEMS
export const NAV_ITEMS: readonly NavigationItem[] = [
  // ... existing items
  {
    label: "Your Page",
    icon: YourNewIcon,
    href: "/your-page",
    description: "Description for accessibility",
  },
] as const;

// 3. Create page in src/app/your-page/page.tsx
```

### 5. Type Safety

```typescript
// ✅ Always define prop types
interface ComponentProps {
  required: string;
  optional?: number;
}

// ✅ Use 'as const' for readonly objects
export const CONFIG = {
  value: "something"
} as const;

// ✅ Export types from @/types
import type { MyType } from "@/types";
```

### 6. Import Aliases

```typescript
// ✅ Use path aliases (configured in tsconfig.json)
import { Component } from "@/components";
import { NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import type { Props } from "@/types";

// ❌ Avoid relative imports
import { Component } from "../../components/component";
```

### 7. Responsive Design

```typescript
// Mobile-first approach with Tailwind breakpoints
<div className="
  w-full           // Mobile: full width
  md:w-1/2         // Tablet: half width
  lg:w-1/3         // Desktop: third width
  text-sm          // Mobile: small text
  md:text-base     // Tablet+: normal text
" />
```

### 8. Accessibility

```typescript
// ✅ Include aria labels for interactive elements
<button aria-label="Close menu">
  <XIcon />
</button>

// ✅ Use semantic HTML
<nav>, <header>, <footer>, <main>, <article>, <section>

// ✅ Include descriptions in navigation items
{
  label: "Home",
  icon: Home,
  href: "/",
  description: "Return to home page", // For screen readers
}
```

---

## 🔍 Common Patterns

### Page Structure Pattern

```typescript
// Standard page layout
import { PageLayout, HeroSection, Footer } from "@/components";

export default function Page() {
  return (
    <PageLayout>
      <HeroSection
        title="Title"
        subtitle="Subtitle"
      />

      {/* Page content */}

      <Footer />
    </PageLayout>
  );
}
```

### Client Component Pattern

```typescript
"use client"; // Required for hooks, events, state

import { useState } from "react";
import { motion } from "framer-motion";

export function InteractiveComponent() {
  const [state, setState] = useState(false);

  return (
    <motion.div
      onClick={() => setState(!state)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Configuration-Driven Pattern

```typescript
// Define config in src/config/
export const FEATURE_CONFIG = {
  items: [
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
  ],
  animation: { duration: 0.3 },
} as const;

// Use in component
import { FEATURE_CONFIG } from "@/config";

export function Component() {
  return (
    <>
      {FEATURE_CONFIG.items.map(item => (
        <div key={item.id}>{item.label}</div>
      ))}
    </>
  );
}
```

---

## 🧪 Machine Learning Components

### Jupyter Notebooks Structure

```
Fine Tuning/
├── 1_Preliminary Research and Testing/
│   └── Initial exploration and baseline models
├── 2_ConvNeXt Transfer Learning/
│   └── Transfer learning with ConvNeXt architecture
└── 3_Explainability Incorporation/
    └── Adding XAI (Explainable AI) features

Image Preprocessing/
├── Final Image Preprocessing Pipeline.ipynb
├── Image Preprocessing_v3.ipynb
└── Testing Pipelines/
```

### Working with ML Components

- **Preprocessing**: All image preprocessing pipelines in `Image Preprocessing/`
- **Model Training**: ConvNeXt fine-tuning notebooks in `Fine Tuning/`
- **Root Notebook**: `ConvNeXt_Finetuning_v0_1.ipynb` in project root

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Framer Motion type errors
```bash
# Solution: Ensure @types/react is installed
npm install --save-dev @types/react@^19
```

**Issue**: Tailwind classes not applying
```bash
# Check globals.css has:
@import "tailwindcss";
@import "tw-animate-css";
```

**Issue**: Path alias not resolving
```json
// Verify tsconfig.json has:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 📋 AI Assistant Checklist

When working on this project, ensure you:

- ✅ **Read existing code** before creating new components
- ✅ **Use TypeScript** with proper type definitions
- ✅ **Follow the centralized export pattern** (components/index.ts)
- ✅ **Add types to src/types/index.ts** for new component props
- ✅ **Update navigation config** when adding new pages
- ✅ **Use path aliases** (@/components, @/config, etc.)
- ✅ **Include className prop** for component flexibility
- ✅ **Use cn() utility** for conditional Tailwind classes
- ✅ **Follow mobile-first** responsive design
- ✅ **Add accessibility attributes** (aria-label, descriptions)
- ✅ **Use Framer Motion** for animations
- ✅ **Test responsive behavior** across breakpoints
- ✅ **Maintain consistency** with existing patterns

---

## 📚 Important Files Reference

### Must-Read Before Making Changes

| File | Purpose | When to Update |
|------|---------|----------------|
| `src/config/navigation.ts` | Navigation structure | Adding new pages |
| `src/config/constants.ts` | Site-wide constants | Changing site metadata |
| `src/components/index.ts` | Component exports | Adding new components |
| `src/types/index.ts` | Type definitions | Creating new component props |
| `src/app/layout.tsx` | Root layout & fonts | Changing global layout |
| `src/app/globals.css` | Global styles | Adding CSS variables |
| `next.config.ts` | Next.js config | Build/deployment changes |
| `tsconfig.json` | TypeScript config | Path aliases, compiler options |

---

## 🎯 Project-Specific Guidelines

### Medical/Scientific Context

- **Accuracy**: Ensure medical terminology is accurate
- **Sensitivity**: Handle medical data with appropriate care
- **Citations**: Reference research when implementing XAI features
- **Performance**: Optimize for image-heavy content (cell images)

### Brand Voice

- **Professional**: Medical research project tone
- **Hopeful**: "Phoenix rising" metaphor
- **Scientific**: Evidence-based, explainable
- **Accessible**: Clear explanations for non-technical users

---

## 🔗 Related Documentation

- **Next.js 16 Docs**: https://nextjs.org/docs
- **React 19 Docs**: https://react.dev
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Lucide Icons**: https://lucide.dev

---

## 📄 Metadata

```yaml
Project: Project Phoenix
Domain: Medical AI / Cervical Cancer Detection
Frontend: Next.js 16 + React 19 + TypeScript
Styling: Tailwind CSS v4 + Framer Motion
ML Stack: Jupyter + ConvNeXt + XAI
Deployment: Vercel
Repository: Meet2304/Project-Phoenix
Author: Meet Patel
Last Updated: 2025-11-15
```

---

**End of CLAUDE.md**

*This document should be updated whenever significant architectural changes are made to the project.*
