"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Geometric shape components with increasing sides
const Triangle = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4 L26 24 L2 24 Z" fill="white" />
  </svg>
);

const Square = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="4" width="20" height="20" fill="white" />
  </svg>
);

const Pentagon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 2 L26 10 L22 24 L6 24 L2 10 Z" fill="white" />
  </svg>
);

const Hexagon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 2 L24 8 L24 20 L14 26 L4 20 L4 8 Z" fill="white" />
  </svg>
);

const Octagon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M10 2 L18 2 L26 10 L26 18 L18 26 L10 26 L2 18 L2 10 Z" fill="white" />
  </svg>
);

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const options = [
    {
      title: "Metaplastic",
      description: "Normal cell transformation",
      image: "/images/Landing%20Page/Metaplastic.jpg",
      icon: <Triangle />,
      sides: 3
    },
    {
      title: "Dyskeratotic",
      description: "Abnormal keratinization",
      image: "/images/Landing%20Page/Dyskeratotic.jpg",
      icon: <Square />,
      sides: 4
    },
    {
      title: "Koilocytotic",
      description: "HPV-related changes",
      image: "/images/Landing%20Page/Koilocytotic.jpg",
      icon: <Pentagon />,
      sides: 5
    },
    {
      title: "Superficial Intermediate",
      description: "Middle layer cells",
      image: "/images/Landing%20Page/Superficial%20Intermediate.jpg",
      icon: <Hexagon />,
      sides: 6
    },
    {
      title: "Parabasal",
      description: "Deep layer structure",
      image: "/images/Landing%20Page/Parabasal.jpg",
      icon: <Octagon />,
      sides: 8
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-transparent font-sans text-white"> 
      {/* Header Section */}
      <div className="w-full max-w-4xl px-6 mt-10 mb-4 text-center">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-wide drop-shadow-xl leading-tight"
          style={{
            opacity: 0,
            transform: 'translateY(-20px)',
            animation: 'fadeInFromTop 0.8s ease-in-out 0.3s forwards',
            fontFamily: "var(--font-michroma)",
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          Explainable AI Classification
        </h1>
        <p 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed"
          style={{
            opacity: 0,
            transform: 'translateY(-20px)',
            animation: 'fadeInFromTop 0.8s ease-in-out 0.6s forwards',
            fontFamily: "var(--font-poppins)",
            letterSpacing: '0.02em'
          }}
        >
          Project Phoenix uses explainable AI to detect and understand cervical cancer cells — making diagnosis more transparent and accurate.
        </p>
      </div>

      <div className="h-8 sm:h-12"></div>

      {/* Options Container - Responsive sizing */}
      <div className="flex w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] h-[300px] xs:h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] mx-auto px-2 sm:px-4 items-stretch overflow-x-auto overflow-y-hidden scrollbar-hide relative">
        {options.map((option, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer min-w-[50px] sm:min-w-[70px] md:min-w-[80px]"
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
              backgroundPosition: 'center',
              backgroundColor: 'transparent',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minHeight: '100px',
              margin: 0,
              borderRadius: 0,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? '#fff' : '#292929',
              boxShadow: activeIndex === index 
                ? '0 20px 60px rgba(0,0,0,0.50)' 
                : '0 10px 30px rgba(0,0,0,0.30)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              willChange: 'flex-grow, box-shadow, background-size, background-position',
              transition: 'all 0.7s ease-in-out'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div 
              className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out h-[100px] sm:h-[120px]"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                boxShadow: activeIndex === index 
                  ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000' 
                  : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
              }}
            ></div>
            
            {/* Label with icon and info */}
            <div className="absolute left-0 right-0 bottom-3 sm:bottom-5 flex items-center justify-start h-10 sm:h-12 z-[2] pointer-events-none px-2 sm:px-4 gap-2 sm:gap-3 w-full">
              <div className="min-w-[36px] max-w-[36px] h-[36px] sm:min-w-[48px] sm:max-w-[48px] sm:h-[48px] md:min-w-[52px] md:max-w-[52px] md:h-[52px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                {option.icon}
              </div>
              <div className="text-white whitespace-pre relative overflow-hidden">
                <div 
                  className="font-bold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div 
                  className="text-xs sm:text-sm md:text-base text-gray-300 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Inline styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInFromTop {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  );
};

export default InteractiveSelector;
