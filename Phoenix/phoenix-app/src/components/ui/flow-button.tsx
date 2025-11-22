'use client';
import { ArrowRight } from 'lucide-react';

export  function FlowButton({ text = "Modern Button", onClick, disabled, className = "" }: { text?: string; onClick?: () => void; disabled?: boolean; className?: string }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[2.5px] border-white/80 bg-black/60 px-5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-black hover:rounded-[12px] active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 left-[-25%] stroke-white fill-none z-[9] group-hover:left-4 sm:group-hover:left-5 group-hover:stroke-black transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 sm:-translate-x-4 group-hover:translate-x-3 sm:group-hover:translate-x-4 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-[50%] opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 right-4 sm:right-5 stroke-white fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-black transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />
    </button>
  );
}
