import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import CoffeeCupIcon from '@/components/CoffeeCupIcon';
import { gsap } from '@/lib/gsap';
import { EASE_OUT } from '@/lib/motion';
import { NAV_ITEMS } from '@/data/navigation';
import { CONTACT } from '@/data/contact';
import { useLenis } from '@/context/LenisContext';

/**
 * Diagonal split clip-path text hover effect on the brand wordmark
 */
function ClipPathWordmark() {
  return (
    <div data-footer-reveal className="clip-path-wordmark relative select-none">
      {/* Base Layer: Crisp reflective champagne white */}
      <p
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #FFFFFF 0%, #FFF5DD 25%, #E6D8C6 75%, #FFFFFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className="wordmark-layer-base font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[1] tracking-tight cursor-pointer"
      >
        The Daily Brew
      </p>

      {/* Top Layer: Radiant Royal Gold, cut diagonally with CSS clip-path */}
      <p
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #FFF0B8 0%, #E6C26D 20%, #D4AF37 45%, #C29629 75%, #8C6821 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        className="wordmark-layer-top pointer-events-auto absolute inset-0 font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[1] tracking-tight cursor-pointer"
      >
        The Daily Brew
      </p>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(footer.querySelectorAll('[data-footer-reveal]'), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: footer, start: 'top 85%', once: true },
      });
    });

    return () => mm.revert();
  }, []);

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-charcoal text-cream/70">
      {/* Large brand wordmark */}
      <div className="mx-auto max-w-[1440px] px-6 pt-16 md:pt-20 md:px-10 lg:px-16">
        <div className="overflow-hidden border-b border-cream/10 pb-8 md:pb-10">
          <ClipPathWordmark />
        </div>
      </div>

      {/* Footer body */}
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:py-16 md:px-10 lg:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div data-footer-reveal className="lg:col-span-2">
            <a href="#home" className="group flex items-center gap-3 text-cream">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full border border-cream/30 transition-colors duration-300 group-hover:border-cream"
              >
                <CoffeeCupIcon className="size-6 text-cream transition-transform duration-300 group-hover:scale-105" />
              </span>
              <span className="font-serif text-lg uppercase tracking-[0.18em]">The Daily Brew</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/50">
              Good Coffee. Good Food. Good Moments. — Your everyday specialty coffee destination in Chennai.
            </p>
          </div>

          {/* Navigation */}
          <nav data-footer-reveal aria-label="Footer navigation">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-cream/30">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm transition-colors duration-300 hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact shortcuts */}
          <div data-footer-reveal>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-cream/30">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm transition-colors duration-300 hover:text-cream break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-sm transition-colors duration-300 hover:text-cream"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="text-sm">{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          data-footer-reveal
          className="mt-12 md:mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-cream/40">
            © 2026 The Daily Brew. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={handleBackToTop}
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cream/50 transition-colors duration-300 hover:text-cream cursor-pointer"
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-current transition-colors duration-300">
              <ArrowUp
                aria-hidden="true"
                size={12}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-0.5"
              />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Very Bottom Edge Quote */}
      <div className="border-t border-cream/5 bg-black/40 py-4 px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] text-center">
        <p className="text-xs sm:text-[13px] tracking-wider text-cream/50 font-sans">
          Website Contributions; Baked by: <span className="text-caramel font-medium tracking-wide">Sabareesh M</span>
        </p>
      </div>
    </footer>
  );
}
