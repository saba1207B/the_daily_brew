import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MENU_ITEMS, type MenuItem } from '@/data/menu';

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Header section text reveal
      gsap.from(section.querySelectorAll('[data-menu-reveal]'), {
        y: 45,
        rotate: 1.5,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      // Staggered card transitions and interactive reveals
      const cardWrappers = section.querySelectorAll<HTMLElement>('[data-card-wrapper]');

      cardWrappers.forEach((wrapper, i) => {
        const card = wrapper.querySelector<HTMLElement>('[data-fullscreen-card]');
        const image = wrapper.querySelector<HTMLElement>('[data-card-image]');
        const imageCard = wrapper.querySelector<HTMLElement>('[data-image-container]');
        const textLines = wrapper.querySelectorAll<HTMLElement>('[data-line]');
        const priceGlow = wrapper.querySelector<HTMLElement>('[data-price-glow]');

        if (!card) return;

        // Clip-Path wipe reveal for subsequent cards
        if (i > 0) {
          gsap.fromTo(
            card,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            }
          );
        }

        // Parallax image elevation
        if (image) {
          const isColdCoffee = MENU_ITEMS[i]?.id === 'cold-coffee';
          gsap.fromTo(
            image,
            { scale: isColdCoffee ? 1.02 : 1.2, yPercent: isColdCoffee ? 0 : 5 },
            {
              scale: 1.0,
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            }
          );
        }

        // Image container lateral entrance
        if (imageCard) {
          gsap.from(imageCard, {
            x: i % 2 === 0 ? 30 : -30,
            opacity: 0.4,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 70%',
              toggleActions: 'play reverse restart reverse',
            },
          });
        }

        // Line-by-line kinetic text reveal
        if (textLines.length > 0) {
          gsap.fromTo(
            textLines,
            { yPercent: 120, rotate: 2, opacity: 0 },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 65%',
                toggleActions: 'play reverse restart reverse',
              },
            }
          );
        }

        // Price glow pulse
        if (priceGlow) {
          gsap.fromTo(
            priceGlow,
            { scale: 0.94, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 55%',
                toggleActions: 'play reverse restart reverse',
              },
            }
          );
        }

        // Smooth background fade on previous card as new card arrives
        if (i < cardWrappers.length - 1) {
          gsap.to(card, {
            scale: 0.96,
            filter: 'blur(3px)',
            opacity: 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: cardWrappers[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      aria-labelledby="menu-title"
      className="relative bg-[#1C0D07] text-[#FFF0E5]"
    >
      {/* Editorial Section Header */}
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 md:px-12 lg:px-16 lg:pt-36 lg:pb-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-10">
          <div className="max-w-xl">
            <p
              data-menu-reveal
              className="text-xs font-semibold uppercase tracking-[0.28em] text-caramel"
            >
              Curated Offerings
            </p>
            <h2
              id="menu-title"
              data-menu-reveal
              className="mt-4 font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-[#FFF0E5]"
            >
              The Daily Menu
            </h2>
          </div>
          <div className="max-w-md">
            <p
              data-menu-reveal
              className="max-w-sm text-xs md:text-sm leading-relaxed text-[#FFF0E5]/75 md:text-right"
            >
              Every item is freshly roasted, pulled, baked, and served to order using single-origin
              beans and authentic farm-fresh ingredients.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Screen Scroll-Driven Showcase */}
      <div ref={cardsContainerRef} className="relative w-full">
        {MENU_ITEMS.map((item, index) => (
          <FullScreenMenuCard
            key={item.id}
            item={item}
            index={index}
            total={MENU_ITEMS.length}
          />
        ))}
      </div>

      {/* Bottom spacer rule */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="border-t border-white/10 py-10 md:py-14" />
      </div>
    </section>
  );
}

interface FullScreenMenuCardProps {
  item: MenuItem;
  index: number;
  total: number;
}

function FullScreenMenuCard({ item, index }: FullScreenMenuCardProps) {
  const isDark = item.theme === 'dark';

  return (
    <div data-card-wrapper className="relative w-full h-[180vh]">
      <article
        data-fullscreen-card
        style={{
          zIndex: 10 + index,
          backgroundColor: isDark ? '#1C0D07' : '#FFF0E5',
        }}
        className={`sticky top-0 flex h-screen h-[100dvh] w-full items-center justify-center overflow-hidden border-t will-change-transform ${
          isDark
            ? 'border-white/10 text-[#FFF0E5] shadow-[0_-30px_70px_rgba(0,0,0,0.55)]'
            : 'border-espresso/15 text-[#281208] shadow-[0_-30px_70px_rgba(40,18,8,0.22)]'
        }`}
        aria-label={`${item.name} — ₹${item.price}`}
      >
        {/* Hyperspace threshold accent line */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 inset-x-0 h-[2px] ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-[#E5B582]/80 to-transparent shadow-[0_0_12px_rgba(229,181,130,0.6)]'
              : 'bg-gradient-to-r from-transparent via-[#CA5600]/60 to-transparent shadow-[0_0_10px_rgba(202,86,0,0.4)]'
          }`}
        />

        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-25 select-none"
        >
          <div
            className="absolute -right-1/4 -top-1/4 h-[65vw] w-[65vw] rounded-full filter blur-[120px]"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(217,168,120,0.22) 0%, rgba(28,13,7,0) 70%)'
                : 'radial-gradient(circle, rgba(202,86,0,0.14) 0%, rgba(255,240,229,0) 70%)',
            }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 h-[55vw] w-[55vw] rounded-full filter blur-[100px]"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(80,38,18,0.3) 0%, rgba(28,13,7,0) 70%)'
                : 'radial-gradient(circle, rgba(140,70,30,0.1) 0%, rgba(255,240,229,0) 70%)',
            }}
          />
        </div>

        {/* Viewport Single-Glance Container */}
        <div className="relative z-10 mx-auto flex h-full max-h-screen max-h-[100dvh] w-full flex-col justify-center px-6 py-4 sm:py-6 md:px-12 lg:px-16">
          <div className="grid w-full items-center gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Column: Typography, Tagline, Description, Price */}
            <div
              data-card-content
              className="flex flex-col justify-center order-2 lg:order-1 lg:col-span-7 space-y-2.5 sm:space-y-4 md:space-y-6"
            >
              <div>
                <div className="overflow-hidden pb-1">
                  <h3
                    data-line
                    className={`font-serif text-[clamp(2.2rem,5vw,5.25rem)] font-normal leading-[1.04] ${
                      isDark ? 'text-cream' : 'text-espresso'
                    }`}
                  >
                    {item.name}
                  </h3>
                </div>
                <div className="overflow-hidden pb-1 mt-1 sm:mt-2">
                  <p
                    data-line
                    className={`text-sm sm:text-lg md:text-xl font-medium tracking-wide ${
                      isDark ? 'text-caramel' : 'text-caramel-deep'
                    }`}
                  >
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Product Description */}
              <div className="overflow-hidden pb-1">
                <p
                  data-line
                  className={`max-w-2xl text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed ${
                    isDark ? 'text-cream/90 font-light' : 'text-espresso/85 font-normal'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Price with Glow Effect */}
              <div
                data-price-glow
                className="flex items-baseline gap-4 pt-1 sm:pt-2 will-change-transform"
              >
                <span
                  className={`font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight select-none transition-all duration-500 ${
                    isDark
                      ? 'text-[#E5B582] [text-shadow:0_0_20px_rgba(229,181,130,0.8),0_0_40px_rgba(217,168,120,0.5)] hover:[text-shadow:0_0_28px_rgba(229,181,130,0.95),0_0_55px_rgba(217,168,120,0.7)]'
                      : 'text-[#8B3E05] [text-shadow:0_0_18px_rgba(202,86,0,0.45),0_0_38px_rgba(229,181,130,0.35)] hover:[text-shadow:0_0_26px_rgba(202,86,0,0.7),0_0_50px_rgba(229,181,130,0.5)]'
                  }`}
                >
                  ₹{item.price}
                </span>
                <div
                  className={`flex flex-col text-[10px] sm:text-xs md:text-sm uppercase tracking-widest leading-tight ${
                    isDark ? 'text-cream/70' : 'text-espresso/70'
                  }`}
                >
                  <span
                    className={`tracking-wider font-semibold ${
                      isDark
                        ? 'text-caramel [text-shadow:0_0_12px_rgba(217,168,120,0.4)]'
                        : 'text-caramel-deep [text-shadow:0_0_10px_rgba(202,86,0,0.25)]'
                    }`}
                  >
                    Specialty Price
                  </span>
                  <span className={`text-[10px] sm:text-[11px] ${isDark ? 'text-cream/60' : 'text-espresso/60'}`}>
                    Taxes incl.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Image Showcase */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 lg:col-span-5">
              <div
                data-image-container
                className="relative w-full max-w-xs sm:max-w-md lg:max-w-none will-change-transform"
              >
                <div
                  className={`relative aspect-[4/3] sm:aspect-square lg:aspect-[4/5] max-h-[26vh] sm:max-h-[36vh] md:max-h-[46vh] xl:max-h-[52vh] w-full overflow-hidden rounded-2xl sm:rounded-3xl border shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out hover:scale-[1.02] ${
                    isDark
                      ? 'border-white/15 bg-espresso/40'
                      : 'border-espresso/15 bg-white/70 shadow-[0_25px_60px_rgba(40,18,8,0.25)]'
                  }`}
                >
                  <img
                    data-card-image
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover will-change-transform ${
                      item.id === 'cold-coffee'
                        ? 'object-top origin-top'
                        : 'object-center origin-center'
                    }`}
                  />
                </div>

                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-5 inset-x-10 h-8 rounded-full filter blur-xl ${
                    isDark ? 'bg-caramel/25' : 'bg-caramel/15'
                  }`}
                />
              </div>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
