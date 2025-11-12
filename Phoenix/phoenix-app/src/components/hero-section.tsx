"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "PHOENIX",
  subtitle = "Explainable Cervical Cancer Cell Classification",
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Animate words after component mounts
    const animateWords = () => {
      const allAnimatedElements = document.querySelectorAll('.word-animate, .subtitle-word');
      allAnimatedElements.forEach(element => {
        const delay = parseInt(element.getAttribute('data-delay') || '0') || 0;
        setTimeout(() => {
          if (element) (element as HTMLElement).style.animation = 'word-appear 0.8s ease-out forwards';
        }, delay);
      });
    };
    
    const timeoutId = setTimeout(animateWords, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Split text into letters for title
  const titleLetters = title.split("");
  const subtitleWords = subtitle.split(" ");

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
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 text-center w-full max-w-full overflow-hidden relative z-10">
          {/* Title with letter-by-letter animation */}
          <h1
            className="font-bold leading-tight md:leading-none tracking-wider text-white drop-shadow-lg"
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
          
          {/* Subtitle with word-by-word animation */}
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white/90 drop-shadow-md max-w-full px-2"
            style={{ 
              fontFamily: "var(--font-poppins)", 
              transform: "scaleX(1.0)",
              transformOrigin: "center",
            }}
          >
            {subtitleWords.map((word, index) => (
              <span
                key={`subtitle-${index}`}
                className="subtitle-word"
                data-delay={800 + index * 150}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
