"use client";

import React from "react";
import { Home, Info } from "lucide-react";
import Link from "next/link";

interface NavigationDockProps {
  className?: string;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({ className = "" }) => {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ${className}`}>
      <div className="flex items-center gap-3 rounded-[28px] bg-neutral-900/80 px-4 py-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg sm:gap-5 sm:rounded-[36px] sm:px-6 sm:py-3">
        <DockIcon icon={Home} label="Home" href="/" />
        <DockIcon icon={Info} label="About" href="/about" />
      </div>
    </div>
  );
};

interface DockIconProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

function DockIcon({ icon: Icon, label, href }: DockIconProps) {
  return (
    <Link href={href}>
      <button
        className="group relative grid h-12 w-12 place-items-center rounded-xl ring-1 ring-white/10 bg-gradient-to-b from-neutral-800/60 to-neutral-900/70 backdrop-blur-xl shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-105 sm:h-14 sm:w-14 before:absolute before:inset-[-2px] before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:before:shadow-[0_0_0_0_rgba(255,255,255,0.18),0_12px_30px_-10px_rgba(0,0,0,0.7)]"
        aria-label={label}
      >
        <Icon
          className="h-5 w-5 text-white/85 transition-transform duration-200 group-hover:scale-110 sm:h-6 sm:w-6"
          strokeWidth={2.1}
        />
        <span className="absolute -bottom-8 whitespace-nowrap text-[10px] tracking-wide text-white/90 bg-neutral-900/90 px-2 py-1 rounded-md sm:text-[11px] opacity-0 invisible translate-y-1.5 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
          {label}
        </span>
      </button>
    </Link>
  );
}

export default NavigationDock;
