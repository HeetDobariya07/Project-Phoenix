// Component prop types
export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterProps {
  hoverText?: string;
  description?: string;
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  intensity?: number;
  interactive?: boolean;
  dark?: boolean;
  className?: string;
}

export interface InteractiveGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  /** 0..1.5 strength */
  intensity?: number;
  /** enable pointer interaction */
  interactive?: boolean;
  /** initial offset in px */
  initialOffset?: { x?: number; y?: number };
  /** force dark mode look */
  dark?: boolean;
}

export interface TextHoverEffectProps {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}
