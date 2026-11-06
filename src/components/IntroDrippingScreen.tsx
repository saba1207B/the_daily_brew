import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import GooeyOverlayWebGL from '@/components/GooeyOverlayWebGL';
import ChocolateLiquidBackground from '@/components/ChocolateLiquidBackground';

export interface IntroDrippingScreenProps {
  children?: ReactNode;
  flowEngine?: 'webgl' | 'svg';
  colorTheme?: 'chocolate' | 'green';
}

/**
 * Opening start screen:
 * - Fluid cream canvas with animated chocolate dripping flow effect
 * - Authentic logo with adaptive contrast overlay
 * - Lens arch aperture reveal on scroll
 */
export default function IntroDrippingScreen({
  children,
  flowEngine = 'webgl',
  colorTheme = 'chocolate',
}: IntroDrippingScreenProps) {
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [smallScreen, setSmallScreen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return mobileAgent || window.matchMedia('(max-width: 767px)').matches;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const heroStickyRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const screenQuery = window.matchMedia('(max-width: 767px)');
    const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const updateScreenSize = () => setSmallScreen(mobileAgent || screenQuery.matches);
    updateScreenSize();

    const canUseWebGL = !mobileAgent && !screenQuery.matches && Boolean(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl'),
    );
    setWebglAvailable(canUseWebGL);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    updateMotionPreference();
    updateScreenSize();
    motionQuery.addEventListener('change', updateMotionPreference);
    screenQuery.addEventListener('change', updateScreenSize);
    return () => {
      motionQuery.removeEventListener('change', updateMotionPreference);
      screenQuery.removeEventListener('change', updateScreenSize);
    };
  }, []);

  // The mobile WebGL renderer has shown inconsistent output across Android
  // browser/GPU combinations. Use the deterministic SVG drip on phone-sized
  // screens and keep runtime WebGL enhancement on larger screens.
  const activeFlowEngine = !smallScreen && !reducedMotion && webglAvailable ? flowEngine : 'svg';

  useLayoutEffect(() => {
    const container = containerRef.current;
    const curtain = curtainRef.current;
    const heroSticky = heroStickyRef.current;
    const logoWrapper = logoWrapperRef.current;
    const cue = cueRef.current;
    if (!container || !curtain) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      const spaceSvg = isPortrait
        ? '/assets/transitions/space.svg'
        : '/assets/transitions/space-landscape.svg';
      const maskSize = isPortrait
        ? '10rem 20rem, 300% 300%'
        : '10rem 30rem, 500% 500%';

      // 1. Organic Lens Arch Curve Mask
      curtain.style.webkitMask = `url("/assets/transitions/tail.svg") center top no-repeat, url("${spaceSvg}") center center no-repeat`;
      curtain.style.mask = curtain.style.webkitMask;
      curtain.style.webkitMaskRepeat = 'no-repeat';
      curtain.style.maskRepeat = 'no-repeat';
      curtain.style.webkitMaskSize = maskSize;
      curtain.style.maskSize = maskSize;

      // 2. Hardware-accelerated Keyframe Animation
      const warpKeyframes = isPortrait
        ? [
            {
              webkitMaskPosition: '50% 120%, 50% 0%',
              maskPosition: '50% 120%, 50% 0%',
              transform: 'scale(1.04) translateY(0%)',
            },
            {
              offset: 0.5,
              webkitMaskPosition: '50% 120%, 50% 80%',
              maskPosition: '50% 120%, 50% 80%',
              transform: 'scale(1.0) translateY(-10%)',
            },
            {
              webkitMaskPosition: '50% -60%, 50% 140%',
              maskPosition: '50% -60%, 50% 140%',
              transform: 'scale(1.0) translateY(-100%)',
            },
          ]
        : [
            {
              webkitMaskPosition: '50% 120%, 50% 0%',
              maskPosition: '50% 120%, 50% 0%',
              transform: 'scale(1.04) translateY(0%)',
            },
            {
              offset: 0.5,
              webkitMaskPosition: '50% 120%, 50% 72%',
              maskPosition: '50% 120%, 50% 72%',
              transform: 'scale(1.0) translateY(-10%)',
            },
            {
              webkitMaskPosition: '50% -80%, 50% 140%',
              maskPosition: '50% -80%, 50% 140%',
              transform: 'scale(1.0) translateY(-100%)',
            },
          ];

      const warpAnim = curtain.animate(warpKeyframes, {
        duration: 1000,
        fill: 'both',
        easing: 'linear',
      });
      warpAnim.pause();
      warpAnim.currentTime = 0;

      // 3. ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.5}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            warpAnim.currentTime = Math.min(999, Math.max(0, p * 1000));

            if (heroSticky) {
              const sat = Math.round(30 + p * 70);
              const op = (0.45 + p * 0.55).toFixed(2);
              const scale = (1.04 - p * 0.04).toFixed(3);
              heroSticky.style.filter = `saturate(${sat}%)`;
              heroSticky.style.opacity = op;
              heroSticky.style.transform = `scale(${scale})`;
            }
          },
          onLeave: () => {
            curtain.style.visibility = 'hidden';
            if (heroSticky) {
              heroSticky.style.filter = 'saturate(100%)';
              heroSticky.style.opacity = '1';
              heroSticky.style.transform = 'scale(1)';
            }
          },
          onEnterBack: () => {
            curtain.style.visibility = 'visible';
          },
        },
      });

      if (logoWrapper) {
        tl.to(
          logoWrapper,
          {
            yPercent: -45,
            opacity: 0,
            scale: 0.95,
            ease: 'power1.in',
            duration: 0.35,
          },
          0,
        );
      }

      if (cue) {
        tl.to(
          cue,
          {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: 'power2.in',
          },
          0,
        );
      }
    });

    return () => mm.revert();
  }, [smallScreen]);

  const handleAutoWarp = () => {
    const finalScroll = Math.round(window.innerHeight * 1.5);
    window.scrollTo({ top: finalScroll, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      id="intro-reveal-wrapper"
      className="relative w-full h-[300vh]"
    >
      {/* Scroll distance marker for liquid flow */}
      <div
        id="intro-curtain-trigger"
        className="pointer-events-none absolute top-0 left-0 h-screen w-full"
        aria-hidden="true"
      />

      {/* Sticky Hero Container */}
      <div
        ref={heroStickyRef}
        id="hero-sticky-container"
        className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden z-10 will-change-transform"
      >
        {children}
      </div>

      {/* Fullscreen Curtain */}
      <div
        ref={curtainRef}
        id="intro-curtain"
        className="pointer-events-none fixed inset-0 z-[60] flex h-screen h-[100dvh] w-full origin-center flex-col items-center justify-center overflow-hidden bg-[#FFF0E5] shadow-[0_30px_90px_rgba(28,13,7,0.45)] will-change-transform"
      >
        {!smallScreen && activeFlowEngine === 'webgl' && (
          <GooeyOverlayWebGL
            colorTheme={colorTheme}
            colWidth={0.7}
            speed={0.2}
            scale={0.25}
            seed={0.231}
            triggerSelector="#intro-curtain-trigger"
            className="z-0"
          />
        )}

        {!smallScreen && activeFlowEngine === 'svg' && <ChocolateLiquidBackground />}

        {/* Center Overlay: Logo & Wordings */}
        <div
          ref={logoWrapperRef}
          className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none will-change-transform mix-blend-difference"
        >
          <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-[820px] transition-transform duration-700">
            <img
              src="/assets/images/white-logo-extracted.png"
              alt="The Daily Brew - Good Coffee. Good Food. Good Moments."
              width={820}
              height={410}
              className="h-auto w-full object-contain"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Scroll Cue with safe-area spacing */}
        <div
          ref={cueRef}
          role="button"
          tabIndex={0}
          onClick={handleAutoWarp}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleAutoWarp();
            }
          }}
          className="pointer-events-auto absolute bottom-8 pb-[env(safe-area-inset-bottom)] z-40 flex cursor-pointer flex-col items-center gap-2 text-xs uppercase tracking-[0.26em] text-espresso-soft transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span className="text-[11px] font-medium tracking-[0.24em] text-espresso/80 filter drop-shadow-[0_1px_3px_rgba(255,240,229,0.9)]">
            Scroll or tap to explore
          </span>
          <span
            aria-hidden="true"
            className="block h-8 w-px overflow-hidden bg-espresso/25"
          >
            <span className="block h-full w-full animate-cue bg-espresso" />
          </span>
        </div>
      </div>
    </div>
  );
}
