# BottomNavBar Component

A highly modular, accessible navigation component with smooth animations and routing integration.

## Features

✨ **Smart Routing**
- Automatic pathname synchronization
- Browser back/forward support
- Prefetching for instant loads
- Prevents duplicate navigation

🎨 **Smooth Animations**
- Expandable labels with spring physics
- Fade transitions
- Scale feedback on interaction
- Mount/unmount animations

♿ **Accessibility**
- ARIA labels and landmarks
- Keyboard navigation support
- Focus visible states
- Screen reader descriptions

⚡ **Performance**
- Memoized configurations
- Optimized re-renders
- Link prefetching
- Minimal bundle size

## Architecture

### Component Hierarchy
```
BottomNavBar (Container)
└── NavButton (Individual items)
    ├── Link (Next.js routing)
    └── motion.button (Animation wrapper)
        ├── Icon (Lucide icon)
        └── AnimatedLabel (Expandable text)
```

### Separation of Concerns

1. **Configuration** (`src/config/navigation.ts`)
   - Navigation items
   - Animation constants
   - Layout values
   - Helper functions

2. **Presentation** (`src/components/bottom-nav-bar.tsx`)
   - Component structure
   - UI rendering
   - Event handlers

3. **Styling** (Tailwind CSS classes)
   - Responsive design
   - Dark mode support
   - Hover/focus states

## Usage

### Basic
```tsx
import { BottomNavBar } from "@/components";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <BottomNavBar />
    </>
  );
}
```

### With Custom Styling
```tsx
<BottomNavBar 
  className="bottom-8 shadow-xl" 
  stickyBottom={true} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes |
| `stickyBottom` | `boolean` | `true` | Fix to viewport bottom |

## Sub-Components

### NavButton
Individual navigation button with routing logic.

**Props:**
- `item`: NavigationItem object
- `index`: Position in nav array
- `isActive`: Current active state
- `onNavigate`: Click handler function

### AnimatedLabel
Expandable label with smooth width transitions.

**Props:**
- `isActive`: Controls expansion
- `label`: Text to display

## Styling

### Theme Variables
Uses project-specific colors:
- Background: `neutral-900/80` with backdrop blur
- Border: `white/10`
- Active state: `white/10` background
- Hover: `white/5` background
- Text: `white` (active), `white/70` (inactive)

### Responsive Breakpoints
- Mobile: Compact icons only when inactive
- Desktop: Full labels visible when active
- Max width: `95vw` for small screens

## Animation Details

### Spring Physics
```typescript
{
  stiffness: 350,  // Snappy response
  damping: 32,     // Smooth settling
}
```

### Timing Functions
- Width transitions: Spring physics
- Opacity: 0.19s linear
- Tap scale: 0.97 (3% compression)
- Mount: Spring with stiffness 300

## Best Practices

✅ **DO:**
- Keep navigation items under 6 for optimal UX
- Use descriptive labels (1-2 words)
- Include accessibility descriptions
- Test on mobile and desktop
- Verify all routes exist

❌ **DON'T:**
- Modify navigation config directly in component
- Disable prefetching (impacts performance)
- Remove ARIA labels
- Use complex animation overrides
- Hard-code routes or labels

## Testing Checklist

- [ ] All navigation items render correctly
- [ ] Active state matches current route
- [ ] Browser back/forward syncs active state
- [ ] Animations are smooth (no jank)
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Mobile responsiveness verified
- [ ] Touch targets are adequate (44x44px min)

## Customization

### Changing Animation Speed
Edit `src/config/navigation.ts`:
```typescript
export const NAV_ANIMATION_CONFIG = {
  spring: { stiffness: 300, damping: 30 }, // Slower
  // or
  spring: { stiffness: 400, damping: 35 }, // Faster
}
```

### Adjusting Label Width
```typescript
export const NAV_LAYOUT = {
  mobileLabel: 80, // Wider labels
}
```

### Custom Colors
Modify Tailwind classes in component:
```tsx
className={cn(
  isActive
    ? "bg-blue-500/20 text-blue-400"  // Custom active
    : "text-gray-400 hover:bg-gray-800"  // Custom inactive
)}
```

## Troubleshooting

### Active state not syncing
- Verify routes in `navigation.ts` match `app` directory
- Check pathname is being read correctly
- Ensure useEffect dependency array is correct

### Animations stuttering
- Check for excessive re-renders
- Verify spring physics values are reasonable
- Disable motion for debugging: `initial={false}`

### Links not navigating
- Confirm routes exist in app directory
- Check for event.preventDefault() issues
- Verify router.push() is being called

## Related Files

- `src/config/navigation.ts` - Navigation configuration
- `src/components/page-transition-wrapper.tsx` - Page transitions
- `src/app/layout.tsx` - Root layout
- `src/lib/utils.ts` - Utility functions (cn)
