"use client";

import React from "react";
import { InteractiveGradientBackground } from "./interactive-gradient-background";

interface PageLayoutProps {
  children: React.ReactNode;
  intensity?: number;
  interactive?: boolean;
  dark?: boolean;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  intensity = 1,
  interactive = true,
  dark = false,
  className = "",
}) => {
  return (
    <InteractiveGradientBackground
      intensity={intensity}
      interactive={interactive}
      dark={dark}
      className={`flex flex-col items-center justify-between ${className}`}
    >
      {children}
    </InteractiveGradientBackground>
  );
};

export default PageLayout;
