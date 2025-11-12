/**
 * Navigation Configuration
 * 
 * Centralized navigation structure for the application.
 * This file exports the navigation items and related types to maintain consistency
 * across all navigation components.
 * 
 * To add a new page:
 * 1. Import the icon from lucide-react
 * 2. Add a new entry to NAV_ITEMS with label, icon, and href
 * 3. Ensure the href matches your page route in the app directory
 */

import { Home, Info, Users, type LucideIcon } from "lucide-react";

/**
 * Navigation Item Interface
 * Defines the structure of each navigation item
 */
export interface NavigationItem {
  /** Display label for the navigation item */
  label: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Route path (must match app directory structure) */
  href: string;
  /** Optional description for accessibility */
  description?: string;
}

/**
 * Navigation Items
 * The main navigation structure for the application
 */
export const NAV_ITEMS: readonly NavigationItem[] = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    description: "Return to the home page",
  },
  {
    label: "About",
    icon: Info,
    href: "/about",
    description: "Learn about Project Phoenix",
  },
  {
    label: "Team",
    icon: Users,
    href: "/team",
    description: "Meet the team behind Project Phoenix",
  },
] as const;

/**
 * Animation Configuration
 * Consistent animation values used across navigation components
 */
export const NAV_ANIMATION_CONFIG = {
  /** Spring animation for width transitions */
  spring: { stiffness: 350, damping: 32 },
  /** Fade animation duration */
  opacity: { duration: 0.19 },
  /** Margin animation duration */
  marginLeft: { duration: 0.19 },
  /** Scale on tap/click */
  tapScale: 0.97,
  /** Initial nav mount animation */
  navSpring: { type: "spring" as const, stiffness: 300, damping: 26 },
} as const;

/**
 * Layout Configuration
 */
export const NAV_LAYOUT = {
  /** Width of expanded label in pixels */
  mobileLabel: 72,
  /** Icon size in pixels */
  iconSize: 22,
  /** Icon stroke width */
  iconStroke: 2,
} as const;

/**
 * Helper function to find navigation item by href
 * @param href - The route path to search for
 * @returns The navigation item or undefined if not found
 */
export function findNavItemByHref(href: string): NavigationItem | undefined {
  return NAV_ITEMS.find(item => item.href === href);
}

/**
 * Helper function to get the index of a navigation item by href
 * @param href - The route path to search for
 * @returns The index of the navigation item or -1 if not found
 */
export function getNavIndexByHref(href: string): number {
  return NAV_ITEMS.findIndex(item => item.href === href);
}
