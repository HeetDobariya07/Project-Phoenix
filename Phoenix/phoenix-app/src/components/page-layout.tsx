"use client";

import React from "react";
import { ProgressiveBlur } from "./progressive-blur";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-between overflow-x-hidden ${className}`}>
      <ProgressiveBlur position="top" height="200px" blurAmount="20px" className="z-[9998]" />
      {children}
      <ProgressiveBlur position="bottom" height="200px" blurAmount="20px" className="z-[9998]" />
    </div>
  );
};

export default PageLayout;
