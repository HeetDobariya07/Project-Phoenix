# Navigation System Documentation

This directory contains the centralized navigation configuration for the Project Phoenix application.

## Structure

### `navigation.ts`
The main configuration file that exports:
- Navigation items (routes, labels, icons)
- Animation configuration
- Layout constants
- Helper functions

## Usage

### Adding a New Navigation Item

1. **Import the icon** (from lucide-react):
```typescript
import { Home, Info, Users, Settings } from "lucide-react";
```

2. **Add to NAV_ITEMS**:
```typescript
export const NAV_ITEMS: readonly NavigationItem[] = [
  // ... existing items
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    description: "Configure application settings",
  },
] as const;
```

3. **Create the corresponding page** in `src/app/settings/page.tsx`

### Using in Components

```typescript
import { NAV_ITEMS, getNavIndexByHref } from "@/config/navigation";

// Get all items
const items = NAV_ITEMS;

// Find index by route
const currentIndex = getNavIndexByHref(pathname);
```

## Best Practices

1. **Immutability**: NAV_ITEMS is readonly to prevent accidental modifications
2. **Type Safety**: All navigation items are strongly typed
3. **Single Source of Truth**: All navigation configuration in one place
4. **Accessibility**: Include descriptions for screen readers
5. **Icons**: Use Lucide icons for consistency

## Configuration Options

### NavigationItem Interface
- `label`: Display text (required)
- `icon`: Lucide icon component (required)
- `href`: Route path matching app directory (required)
- `description`: Accessibility description (optional)

### Animation Config
Control animation timing and easing for consistent UX:
- `spring`: Width transitions (stiffness: 350, damping: 32)
- `opacity`: Fade duration (0.19s)
- `tapScale`: Button press scale (0.97)
- `navSpring`: Mount animation settings

### Layout Config
Sizing and spacing constants:
- `mobileLabel`: Expanded label width (72px)
- `iconSize`: Icon dimensions (22px)
- `iconStroke`: Icon stroke width (2)

## Examples

### Basic Navigation Item
```typescript
{
  label: "Home",
  icon: Home,
  href: "/",
  description: "Return to home page",
}
```

### Nested Route
```typescript
{
  label: "Analysis",
  icon: BarChart,
  href: "/dashboard/analysis",
  description: "View detailed analysis",
}
```

## Testing

When adding new navigation items, verify:
- ✅ Route exists in `src/app` directory
- ✅ Icon imports correctly from lucide-react
- ✅ Label is concise (1-2 words ideal)
- ✅ Description is descriptive for screen readers
- ✅ Active state highlights correctly
- ✅ Navigation transitions smoothly
