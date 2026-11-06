import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { EASE_OUT } from '@/lib/motion';

const HERO_LINES = ['Your Everyday', 'Coffee', 'Destination'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const image = imageRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (panel && image) {
        tl.fromTo(
          panel,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' },
          0,
        ).fromTo(image, { scale: 1.2 }, { scale: 1.08, duration: 1.6 }, 0);
      }

      tl.from(section.querySelectorAll('[data-hero-eyebrow]'), { y: 12, opacity: 0, duration: 0.5 }, 0.1)
        .from(section.querySelectorAll('[data-hero-line]'), { yPercent: 100, duration: 0.6, stagger: 0.08 }, 0.15)
        .from(section.querySelectorAll('[data-hero-body]'), { y: 12, opacity: 0, duration: 0.5 }, 0.3)
        .from(section.querySelectorAll('[data-hero-cta]'), { y: 12, opacity: 0, duration: 0.5 }, 0.4)
        .from(section.querySelectorAll('[data-hero-cue]'), { opacity: 0, duration: 0.5 }, 0.5);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative flex h-full min-h-screen min-h-[100dvh] w-full flex-col overflow-hidden bg-[#FFF0E5] md:flex-row"
    >
      {/* Left Column: Hero Editorial Typography */}
      <div className="relative z-30 flex h-full min-h-screen min-h-[100dvh] w-full flex-col justify-center px-6 pt-24 pb-16 sm:px-10 sm:pt-28 md:w-7/12 md:px-12 md:pt-32 lg:w-1/2 lg:pl-[max(3rem,calc((100vw-1440px)/2+3.5rem))] lg:pr-10">
        <p
          data-hero-eyebrow
          className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.28em] text-espresso-soft"
        >
          <span aria-hidden="true" className="h-px w-8 sm:w-10 bg-caramel-deep" />
          Specialty Coffee {'\u00B7'} Chennai
        </p>

        <h1
          id="hero-title"
          className="mt-3 sm:mt-4 font-serif text-[clamp(2.6rem,5vw,5.4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-espresso"
        >
          <span className="sr-only">Your Everyday Coffee Destination</span>
          <span aria-hidden="true" className="block">
            {HERO_LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <span
                  data-hero-line
                  className={`block ${index === 1 ? 'pl-[0.35em] italic font-serif text-caramel-deep' : ''}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p
          data-hero-body
          className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg md:text-xl lg:text-[21px] font-normal leading-relaxed text-espresso-soft"
        >
          From freshly brewed coffee to delicious bites, discover your favourite spot to relax,
          recharge and reconnect.
        </p>

        {/* Explore Our Menu CTA Button */}
        <div data-hero-cta className="mt-6 sm:mt-8 flex items-center">
          <motion.a
            href="#menu"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="group inline-flex items-center justify-center gap-3 rounded-none bg-espresso px-8 py-4 sm:px-9 sm:py-4.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-cream shadow-md transition-all duration-300 hover:bg-caramel-deep hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Explore Our Menu</span>
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-caramel"
            />
          </motion.a>
        </div>

        {/* Mobile-Only Grounded Coffee Image Card */}
        <div className="mt-8 block md:hidden w-full overflow-hidden rounded-2xl shadow-lg border border-espresso/10">
          <img
            src="/assets/images/01_alternate_hero_banner.jpg"
            alt="Steaming cappuccino beside a golden croissant on a warm wooden café table"
            width={800}
            height={400}
            className="h-48 sm:h-56 w-full object-cover object-[24%_50%]"
            loading="eager"
          />
        </div>
      </div>

      {/* Right Column: Hero Banner Image Panel (Desktop / Tablet) */}
      <div
        ref={panelRef}
        className="relative z-10 hidden md:block md:w-5/12 lg:w-1/2 h-full min-h-screen min-h-[100dvh] overflow-hidden"
      >
        <img
          ref={imageRef}
          src="/assets/images/01_alternate_hero_banner.jpg"
          alt="Steaming cappuccino beside a golden croissant on a warm wooden café table with The Daily Brew branding"
          width={1672}
          height={545}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[28%_60%] scale-[1.12] origin-bottom transition-transform duration-700"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent" />
      </div>

      {/* Floating Scroll Cue */}
      <div
        data-hero-cue
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-8 sm:left-12 lg:left-16 z-30 hidden items-center gap-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-espresso-soft lg:flex"
      >
        <span className="relative h-10 w-px overflow-hidden bg-espresso/25">
          <span className="absolute inset-0 origin-top animate-cue bg-espresso" />
        </span>
        Scroll
      </div>
    </section>
  );
}
