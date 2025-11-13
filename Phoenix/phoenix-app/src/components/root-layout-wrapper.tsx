'use client';

import React, { useEffect, useState } from 'react';
import { InteractiveGradientBackground } from './interactive-gradient-background';
import { PageTransitionWrapper } from './page-transition-wrapper';
import { BottomNavBar } from './bottom-nav-bar';

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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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
      
      {/* Navigation rendered as separate fixed element */}
      {mounted && (
        <div style={{ 
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '0 0 1rem 0',
        }}>
          <div style={{ pointerEvents: 'auto' }}>
            <BottomNavBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayoutWrapper;
