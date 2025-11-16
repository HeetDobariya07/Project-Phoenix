"use client";

import React, { useEffect, useRef, useState } from "react";
import { GradualSpacing } from "./ui/gradual-spacing";
import { HERO_CONFIG } from "@/config/constants";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "PHOENIX",
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Animate title words first
    const animateWords = () => {
      const allAnimatedElements = document.querySelectorAll('.word-animate');
      allAnimatedElements.forEach(element => {
        const delay = parseInt(element.getAttribute('data-delay') || '0') || 0;
        setTimeout(() => {
          if (element) (element as HTMLElement).style.animation = 'word-appear 0.8s ease-out forwards';
        }, delay);
      });
    };
    
    // Show subtitle after title animation completes
    const titleAnimationDuration = title.length * 100 + 800; // delay per letter + animation duration
    const subtitleTimeout = setTimeout(() => {
      setShowSubtitle(true);
    }, titleAnimationDuration);
    
    const timeoutId = setTimeout(animateWords, 500);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(subtitleTimeout);
    };
  }, [title]);

  // Split text into letters for title
  const titleLetters = title.split("");

  return (
    <>
      <style>{`
        @keyframes word-appear {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
            filter: blur(10px);
          }
          50% {
            opacity: 0.8;
            transform: translateY(10px) scale(0.95);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        .word-animate {
          display: inline-block;
          opacity: 0;
          margin: 0 0.05em;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        
        .word-animate:hover {
          color: #cbd5e1;
          transform: translateY(-2px);
        }
        
        .subtitle-word {
          display: inline-block;
          opacity: 0;
          margin: 0 0.2em;
          transition: transform 0.3s ease;
        }
      `}</style>
      <section 
        ref={sectionRef}
        className={`flex w-full flex-col items-center justify-center min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 relative ${className}`}
      >
        <div className="flex flex-col items-center justify-center text-center w-full max-w-full overflow-hidden relative z-10">
          {/* Title with letter-by-letter animation */}
          <h1
            className="font-bold leading-tight md:leading-none tracking-wider text-white drop-shadow-lg mb-8 sm:mb-12 md:mb-16"
            style={{
              fontFamily: "var(--font-michroma)",
              whiteSpace: "nowrap",
              fontSize: "clamp(2rem, 5vw + 1rem, 16rem)",
              transform: "scaleX(1.0)",
              transformOrigin: "center",
              letterSpacing: "clamp(0.05em, 4vw, 0.8em)",
              lineHeight: "1.2",
              paddingLeft: "clamp(0.05em, 1vw, 1em)",
            }}
          >
            {titleLetters.map((letter, index) => (
              <span
                key={`title-${index}`}
                className="word-animate"
                data-delay={index * 100}
              >
                {letter}
              </span>
            ))}
          </h1>
          
          {/* Horizontal line separator */}
          {showSubtitle && (
            <motion.div 
              className="w-32 sm:w-40 md:w-48 h-0.5 bg-white/60 mx-auto my-4 sm:my-6 md:my-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
              key="horizontal-line"
            />
          )}
          
          {/* Subtitle with GradualSpacing animation - shows after title */}
          {showSubtitle && (
            <div className="w-full max-w-[95vw] sm:max-w-full px-4 sm:px-6 md:px-8 flex flex-col items-center gap-1">
              {/* Mobile: Two lines */}
              <div className="block sm:hidden">
                <GradualSpacing
                  text={HERO_CONFIG.subtitle}
                  duration={0.2}
                  delayMultiple={0.05}
                  className="text-sm font-playfair font-light text-white/90 drop-shadow-md tracking-tight"
                  framerProps={{
                    hidden: { opacity: 0, transform: "translateY(30px) scale(0.8)", filter: "blur(10px)" },
                    visible: { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
                  }}
                />
                <GradualSpacing
                  text={HERO_CONFIG.subtitleLine2}
                  duration={0.2}
                  delayMultiple={0.05}
                  className="text-sm font-playfair font-light text-white/90 drop-shadow-md tracking-tight"
                  framerProps={{
                    hidden: { opacity: 0, transform: "translateY(30px) scale(0.8)", filter: "blur(10px)" },
                    visible: { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
                  }}
                />
              </div>
              {/* Desktop: Single line */}
              <div className="hidden sm:block">
                <GradualSpacing
                  text={`${HERO_CONFIG.subtitle} ${HERO_CONFIG.subtitleLine2}`}
                  duration={0.2}
                  delayMultiple={0.05}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-playfair font-light text-white/90 drop-shadow-md tracking-tight md:tracking-normal"
                  framerProps={{
                    hidden: { opacity: 0, transform: "translateY(30px) scale(0.8)", filter: "blur(10px)" },
                    visible: { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
