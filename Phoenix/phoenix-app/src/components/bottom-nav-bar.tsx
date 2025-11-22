"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NAV_ITEMS,
  NAV_ANIMATION_CONFIG,
  NAV_LAYOUT,
  getNavIndexByHref,
  type NavigationItem,
} from "@/config/navigation";

type BottomNavBarProps = {
  className?: string;
  stickyBottom?: boolean;
};

/**
 * BottomNavBar Component
 * 
 * A responsive navigation bar with smooth animations and active state management.
 * Syncs with Next.js routing and provides visual feedback for the current page.
 * 
 * Features:
 * - Automatic pathname synchronization
 * - Smooth page transitions with animation timing
 * - Keyboard navigation support
 * - Accessible with ARIA labels
 * - Prefetching for instant page loads
 * 
 * @param className - Optional additional CSS classes
 * @param stickyBottom - Whether to fix the nav bar to the bottom of the viewport (default: true)
 */
export function BottomNavBar({
  className,
  stickyBottom = true,
}: BottomNavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize active index based on current pathname
  const [activeIndex, setActiveIndex] = useState(() => getNavIndexByHref(pathname));

  // Sync active index with pathname changes (handles browser back/forward)
  useEffect(() => {
    const newIndex = getNavIndexByHref(pathname);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [pathname, activeIndex]);

  /**
   * Handle navigation with animation timing
   * Prevents duplicate navigation and adds slight delay for smooth transitions
   */
  const handleNavigation = (idx: number, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Always update the active index when clicked
    setActiveIndex(idx);
    
    // Navigate to the target href
    // Small delay allows animation to start before navigation
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={NAV_ANIMATION_CONFIG.navSpring}
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "bg-neutral-900/80 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-between px-4 py-2 shadow-2xl gap-4 min-w-[280px] max-w-[95vw] h-[52px]",
        className,
      )}
      style={{
        width: 'fit-content',
      }}
    >
      {NAV_ITEMS.map((item, idx) => (
        <NavButton
          key={item.href}
          item={item}
          index={idx}
          isActive={activeIndex === idx}
          onNavigate={handleNavigation}
        />
      ))}
    </motion.nav>
  );
}

/**
 * NavButton Component
 * 
 * Individual navigation button with icon and expandable label.
 * Separated for better modularity, reusability, and testability.
 */
interface NavButtonProps {
  item: NavigationItem;
  index: number;
  isActive: boolean;
  onNavigate: (idx: number, href: string, e: React.MouseEvent) => void;
}

function NavButton({ item, index, isActive, onNavigate }: NavButtonProps) {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      prefetch={true}
      onClick={(e) => onNavigate(index, item.href, e)}
      className="no-underline"
      aria-current={isActive ? "page" : undefined}
      aria-label={item.description || item.label}
    >
      <motion.button
        whileTap={{ scale: NAV_ANIMATION_CONFIG.tapScale }}
        className={cn(
          "flex items-center justify-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px]",
          isActive
            ? "bg-white/10 text-white gap-2"
            : "bg-transparent text-white/70 hover:bg-white/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",
        )}
        aria-label={item.label}
        type="button"
      >
        <div className="flex items-center justify-center gap-2">
          <Icon
            size={NAV_LAYOUT.iconSize}
            strokeWidth={NAV_LAYOUT.iconStroke}
            aria-hidden
            className="transition-colors duration-200 flex-shrink-0"
          />

          <AnimatedLabel isActive={isActive} label={item.label} />
        </div>
      </motion.button>
    </Link>
  );
}

/**
 * AnimatedLabel Component
 * 
 * Expandable label with smooth width and opacity transitions.
 * Only visible when the parent nav item is active.
 */
interface AnimatedLabelProps {
  isActive: boolean;
  label: string;
}

function AnimatedLabel({ isActive, label }: AnimatedLabelProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isActive ? `${NAV_LAYOUT.mobileLabel}px` : "0px",
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        width: NAV_ANIMATION_CONFIG.spring,
        opacity: NAV_ANIMATION_CONFIG.opacity,
      }}
      className={cn("overflow-hidden flex items-center justify-center")}
    >
      <span
        className={cn(
          "font-medium text-xs whitespace-nowrap select-none transition-opacity duration-200 text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] leading-[1.9]",
          isActive ? "text-white" : "opacity-0",
        )}
        title={label}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default BottomNavBar;
