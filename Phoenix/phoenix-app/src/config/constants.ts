// Site configuration
export const SITE_CONFIG = {
  name: "Phoenix",
  title: "PHOENIX",
  description: "Cervical Cancer Cell Classification",
  copyright: "© 2025 Phoenix Project. All rights reserved.",
} as const;

// Footer navigation links
export const FOOTER_LINKS = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#documentation", label: "Documentation" },
  { href: "#contact", label: "Contact" },
] as const;

// Hero section configuration
export const HERO_CONFIG = {
  title: "PHOENIX",
  subtitle: "Cervical Cancer Cell Classification",
} as const;

// Interactive gradient background configuration
export const GRADIENT_CONFIG = {
  intensity: 1,
  interactive: true,
  dark: false,
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;
