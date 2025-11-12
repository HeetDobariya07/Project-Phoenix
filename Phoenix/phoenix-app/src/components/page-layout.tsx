"use client";

import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
