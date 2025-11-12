"use client";

import React from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "PHOENIX",
  subtitle = "Cervical Cancer Cell Classification",
  className = "",
}) => {
  return (
    <section className={`flex w-full flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-8 md:px-16 ${className}`}>
      <div className="flex flex-col items-center justify-center gap-6 text-center w-full max-w-full overflow-hidden">
        <h1
          className="font-bold leading-tight md:leading-none tracking-wider text-white drop-shadow-lg"
          style={{
            fontFamily: "var(--font-michroma)",
            whiteSpace: "nowrap",
            fontSize: "clamp(2.5rem, 6vw, 16rem)",
            transform: "scaleX(1.0)",
            transformOrigin: "center",
            letterSpacing: "clamp(0.05em, 5vw, 0.8em)",
            lineHeight: "1.4",
            paddingLeft: "clamp(0.05em, 1.5vw, 1em)",
          }}
        >
          {title}
        </h1>
        <p 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 drop-shadow-md max-w-full px-2"
          style={{ 
              fontFamily: "var(--font-poppins)", 
              transform: "scaleX(1.0)",
              transformOrigin: "center",
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
