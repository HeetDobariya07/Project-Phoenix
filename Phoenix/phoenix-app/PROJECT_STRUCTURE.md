# Phoenix Project Structure

## Directory Overview

```
phoenix-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout with font configuration
│   │   ├── page.tsx            # Main landing page (uses modular components)
│   │   └── globals.css         # Global styles and CSS variables
│   ├── components/             # Reusable UI components
│   │   ├── hero-section.tsx    # Hero section component
│   │   ├── footer.tsx          # Footer component
│   │   ├── page-layout.tsx     # Page layout wrapper
│   │   ├── interactive-gradient-background.tsx
│   │   ├── hover-footer.tsx    # Hover effect components
│   │   ├── index.ts            # Barrel exports
│   │   └── README.md           # Component documentation
│   ├── config/                 # Configuration files
│   │   └── constants.ts        # App constants and configuration
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # Shared types and interfaces
│   └── lib/                    # Utility functions
│       └── utils.ts            # Helper utilities
└── public/                     # Static assets

```

## Architecture Principles

### 1. **Modularity**
- Each component is self-contained with its own logic and styling
- Components are composable and reusable
- Clear separation of concerns

### 2. **Type Safety**
- TypeScript interfaces for all component props
- Centralized type definitions in `types/index.ts`
- Proper type checking throughout the application

### 3. **Configuration Management**
- Constants extracted to `config/constants.ts`
- Easy to update site-wide settings
- Single source of truth for configuration

### 4. **Clean Imports**
- Barrel exports in `components/index.ts`
- Path aliases using `@/` prefix
- Simplified import statements

### 5. **Responsive Design**
- Mobile-first approach
- Breakpoint-based responsive classes
- Flexible layouts that adapt to all screen sizes

## Component Hierarchy

```
page.tsx
└── PageLayout
    ├── HeroSection
    │   ├── Title (PHOENIX)
    │   └── Subtitle
    └── Footer
        ├── TextHoverEffect
        ├── Navigation Links
        └── Copyright
```

## Styling Strategy

1. **Tailwind CSS** - Primary styling framework
2. **CSS Variables** - Custom font definitions
3. **Inline Styles** - Complex animations and transforms
4. **Responsive Classes** - Mobile-first breakpoints

## Font Configuration

Fonts are loaded via Next.js Font optimization:
- **Michroma** - Hero title (400 weight)
- **Poppins** - Body text (100-900 weights)
- **Playfair Display** - Subtitles (400-900 weights)

## Adding New Components

1. Create component file in `src/components/`
2. Define TypeScript interface in `src/types/index.ts`
3. Export component in `src/components/index.ts`
4. Import and use in pages with `@/components` alias

## Development Workflow

1. Run `npm run dev` to start development server
2. Components hot-reload on changes
3. TypeScript errors shown in terminal and editor
4. Lint and format code before committing
