'use client';

import React, { useEffect, useState } from 'react';
import { InteractiveGradientBackground } from './interactive-gradient-background';
import { PageTransitionWrapper } from './page-transition-wrapper';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

export const RootLayoutWrapper: React.FC<RootLayoutWrapperProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure this component never unmounts after initial mount
  return (
    <InteractiveGradientBackground
      key="persistent-gradient-background"
      intensity={1}
      interactive={true}
      dark={false}
      className="flex flex-col items-center justify-between"
    >
      {mounted ? (
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      ) : (
        <div style={{ minHeight: '100vh' }} />
      )}
    </InteractiveGradientBackground>
  );
};

export default RootLayoutWrapper;
