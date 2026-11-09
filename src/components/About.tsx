/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const ABOUT_LEAD = 'At The Daily Brew, we believe every great day starts with a good cup of coffee.';
const ABOUT_BODY = 'Enjoy freshly brewed beverages, delicious food and a welcoming atmosphere.';
const LEAD_WORDS = ABOUT_LEAD.split(' ');

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lead = leadRef.current;
    if (!section || !lead) return;

    const frame = section.querySelector<HTMLElement>('[data-about-media]');
    const image = section.querySelector<HTMLElement>('[data-about-image]');
    if (!frame || !image) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Word-by-word opacity scrub on scroll
      gsap.fromTo(
        lead.querySelectorAll('[data-about-word]'),
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: lead,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      );

      // Image frame clip reveal
      gsap.fromTo(
        frame,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: frame, start: 'top 80%', once: true },
        },
      );

      // Subtle image parallax
      gsap.fromTo(
        image,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      // Body text stagger reveal
      gsap.from(section.querySelectorAll('[data-about-reveal]'), {
        y: 32,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 60%', once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-title"
      className="relative bg-beige"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-40">
        {/* Media frame */}
        <div
          data-about-media
          className="relative overflow-hidden bg-espresso-soft lg:col-span-5"
          style={{ aspectRatio: '306/354' }}
        >
          <img
            data-about-image
            src="/assets/images/03_alternate_iced_coffee.jpg"
            alt="Iced coffee over ice in a tall glass beside a metal straw"
            width={306}
            height={354}
            loading="lazy"
            decoding="async"
            className="absolute inset-x-0 w-full object-cover"
            style={{ top: '-8%', height: '116%' }}
          />
        </div>

        {/* Text content */}
        <div className="lg:col-span-6 lg:col-start-7">
          <p
            data-about-reveal
            className="text-xs font-medium uppercase tracking-[0.28em] text-caramel-deep"
          >
            About
          </p>
          <h2
            id="about-title"
            ref={leadRef}
            className="mt-6 max-w-xl text-[clamp(2rem,3.8vw,3.75rem)] leading-[1.2] text-espresso"
          >
            {LEAD_WORDS.map((word, index) => (
              <span key={`${index}-${word}`}>
                <span data-about-word>{word}</span>
                {index < LEAD_WORDS.length - 1 ? ' ' : null}
              </span>
            ))}
          </h2>
          <p
            data-about-reveal
            className="mt-10 max-w-lg text-lg leading-[1.5] text-espresso-soft"
          >
            {ABOUT_BODY}
          </p>
          <a
            href="#contact"
            data-about-reveal
            className="group mt-10 inline-flex w-fit items-center gap-3 border-b border-espresso pb-1 text-sm font-medium uppercase tracking-[0.16em]"
          >
            Find us in Chennai
            <ArrowRight
              aria-hidden="true"
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
