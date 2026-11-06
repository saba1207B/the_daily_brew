import { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '@/context/LenisContext';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Smooth inertia physics with native mobile touch fallback
    const instance = new Lenis({
      lerp: 0.09,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
      autoResize: true,
    });

    const handleScroll = () => ScrollTrigger.update();
    const tick = (time: number) => instance.raf(time * 1000);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const targetEl = document.querySelector<HTMLElement>(href);
      if (targetEl) {
        e.preventDefault();

        if (
          'startViewTransition' in document &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          (document as any).startViewTransition(() => {
            instance.scrollTo(targetEl, {
              offset: -72,
              immediate: true,
            });
            window.history.pushState(null, '', href);
          });
        } else {
          instance.scrollTo(targetEl, {
            offset: -72,
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          window.history.pushState(null, '', href);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) || target?.isContentEditable) {
        return;
      }

      let delta = 0;
      let isAbsoluteTarget = false;
      let absoluteTarget = 0;

      if (e.key === 'ArrowDown') {
        delta = 100;
      } else if (e.key === 'ArrowUp') {
        delta = -100;
      } else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        delta = window.innerHeight * 0.75;
      } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        delta = -window.innerHeight * 0.75;
      } else if (e.key === 'Home') {
        isAbsoluteTarget = true;
        absoluteTarget = 0;
      } else if (e.key === 'End') {
        isAbsoluteTarget = true;
        absoluteTarget = instance.limit;
      } else {
        return;
      }

      e.preventDefault();

      const currentTarget =
        typeof instance.targetScroll === 'number' && !isNaN(instance.targetScroll)
          ? instance.targetScroll
          : instance.scroll;

      const destination = isAbsoluteTarget
        ? absoluteTarget
        : Math.max(0, Math.min(instance.limit, currentTarget + delta));

      instance.scrollTo(destination, {
        lerp: 0.12,
        immediate: false,
      });
    };

    instance.on('scroll', handleScroll);
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('keydown', handleKeyDown);

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);
    setLenis(instance);

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('keydown', handleKeyDown);
      instance.off('scroll', handleScroll);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
