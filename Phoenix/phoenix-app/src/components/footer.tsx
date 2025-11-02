"use client";

import React from "react";
import { TextHoverEffect, FooterBackgroundGradient } from "./hover-footer";

interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  hoverText?: string;
  description?: string;
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  hoverText = "PHOENIX",
  description = "Advanced AI-powered cervical cancer cell classification system",
  links = [
    { href: "#about", label: "About" },
    { href: "#research", label: "Research" },
    { href: "#documentation", label: "Documentation" },
    { href: "#contact", label: "Contact" },
  ],
  copyright = "© 2025 Phoenix Project. All rights reserved.",
  className = "",
}) => {
  return (
    <footer className={`relative w-full border-t border-white/10 ${className}`}>
      <FooterBackgroundGradient />
      <div className="relative z-10 py-16 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* Hover Effect Text */}
          <div className="w-full max-w-4xl h-32 sm:h-40 md:h-48">
            <TextHoverEffect text={hoverText} duration={0.3} />
          </div>

          {/* Footer Content */}
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl">
              {description}
            </p>

            {/* Footer Links */}
            <nav className="flex flex-wrap gap-6 sm:gap-8 justify-center text-white/60 text-sm md:text-base">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-xs sm:text-sm text-white/40 mt-4">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
