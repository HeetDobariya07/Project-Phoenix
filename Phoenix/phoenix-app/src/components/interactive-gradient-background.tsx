'use client';

import { useEffect, useRef } from 'react';

// Global singleton state to ensure persistence across ALL component instances
// This will NEVER reset unless the entire browser session ends
if (typeof window !== 'undefined') {
  if (!(window as any).__GRADIENT_START_TIME__) {
    (window as any).__GRADIENT_START_TIME__ = Date.now();
  }
  if (!(window as any).__GRADIENT_STATE__) {
    (window as any).__GRADIENT_STATE__ = { x: 0, y: 0 };
  }
}

const getGlobalStartTime = () => {
  if (typeof window !== 'undefined') {
    return (window as any).__GRADIENT_START_TIME__ || Date.now();
  }
  return Date.now();
};

const getGlobalState = () => {
  if (typeof window !== 'undefined') {
    return (window as any).__GRADIENT_STATE__ || { x: 0, y: 0 };
  }
  return { x: 0, y: 0 };
};

type InteractiveGradientBackgroundProps = {
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
  /** animation speed multiplier (higher = faster) */
  speed?: number;
};

export default function InteractiveGradientBackground({
  className = '',
  children,
  intensity = 1,
  interactive = false,
  initialOffset,
  dark = false,
  speed = 2,
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    // Prevent multiple animation loops
    if (mountedRef.current) return;
    mountedRef.current = true;

    const globalStartTime = getGlobalStartTime();
    const globalState = getGlobalState();

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const animationSpeed = prefersReduced ? 0.1 : speed;

    // Initialize with current global state for absolutely smooth transition
    host.style.setProperty('--posX', String(globalState.x * intensity));
    host.style.setProperty('--posY', String(globalState.y * intensity));

    const animate = () => {
      const elapsed = (Date.now() - globalStartTime) / 1000;
      const t = elapsed * animationSpeed;
      
      // Main circular motion - smooth, continuous loop
      const mainAngle = t * 0.3; // Main rotation speed
      const radius = 300; // Distance from center
      
      // Create a smooth circular path
      const x = Math.cos(mainAngle) * radius;
      const y = Math.sin(mainAngle) * radius;

      // Update global state
      globalState.x = x;
      globalState.y = y;

      host.style.setProperty('--posX', String(x * intensity));
      host.style.setProperty('--posY', String(y * intensity));

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [intensity, speed]);

  return (
    <div
      ref={ref}
      aria-label="Animated gradient background"
      role="img"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        // CSS vars default
        // @ts-ignore
        '--posX': '0',
        '--posY': '0',
      }}
    >
      {/* Light layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 0 : 1,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(200 200 200), rgb(22 0 45)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(250 255 0), rgb(36 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(20 175 125), rgb(0 10 255)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(255 77 0), rgb(0 200 255)),
            linear-gradient(60deg, rgb(255 0 0), rgb(120 86 255))
          `,
          backgroundBlendMode:
            'overlay, overlay, difference, difference, difference, normal',
        }}
      />
      {/* Dark layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(15 30 20), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(80 80 100), rgb(10 0 25)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(100 120 0), rgb(15 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(10 80 60), rgb(0 5 120)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(120 35 0), rgb(0 100 140)),
            linear-gradient(60deg, rgb(100 0 0), rgb(60 40 150))
          `,
          backgroundBlendMode:
            'overlay, overlay, difference, difference, difference, normal',
        }}
      />

      {/* Content */}
      {children ? (
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      ) : null}
    </div>
  );
}

export { InteractiveGradientBackground };
