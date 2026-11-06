import { useEffect, useState } from 'react';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Header from '@/components/Header';
import IntroDrippingScreen from '@/components/IntroDrippingScreen';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedCustomCursor from '@/components/AnimatedCustomCursor';
import WhiteCoffeeLoader from '@/components/WhiteCoffeeLoader';
import NotFound404 from '@/components/NotFound404';

// Presentation settings
export const ENABLE_INITIAL_LOADER = true;
export const ENABLE_INTRO_SCREEN = true;
const ENABLE_ANIMATED_CURSOR = true;

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname;
  });
  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.location.hash;
  });

  useEffect(() => {
    // Detect actual mobile browsers, not viewport width. Desktop Brave can be
    // resized below the mobile breakpoint while still needing the full intro.
    const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isActualMobile =
      'userAgentData' in navigator
        ? Boolean((navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData?.mobile)
        : mobileUserAgent.test(navigator.userAgent);
    const updateMobile = () => setIsMobile(isActualMobile);
    updateMobile();
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const is404 =
    (currentPath !== '/' && currentPath !== '') ||
    currentHash === '#404';

  if (is404) {
    return (
      <>
        {ENABLE_ANIMATED_CURSOR && !isMobile && <AnimatedCustomCursor />}
        <NotFound404
          onReturnHome={() => {
            window.history.pushState(null, '', '/');
            setCurrentPath('/');
            setCurrentHash('');
          }}
        />
      </>
    );
  }

  return (
    <SmoothScrollProvider>
      {ENABLE_INITIAL_LOADER && <WhiteCoffeeLoader minDurationMs={isMobile ? 1200 : 9800} />}
      {ENABLE_ANIMATED_CURSOR && !isMobile && <AnimatedCustomCursor />}
      <Header />
      <main>
        {ENABLE_INTRO_SCREEN ? (
          <IntroDrippingScreen>
            <Hero />
          </IntroDrippingScreen>
        ) : (
          <Hero />
        )}
        <About />
        <Menu />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
