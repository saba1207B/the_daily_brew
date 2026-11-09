/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CoffeeCupIcon from '@/components/CoffeeCupIcon';
import MobileMenu from '@/components/MobileMenu';
import { NAV_ITEMS, type SectionId } from '@/data/navigation';
import { EASE_OUT } from '@/lib/motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<SectionId>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id as SectionId);
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const tone = menuOpen || !scrolled ? 'text-[#FFF0E5]' : 'text-espresso';
  const surface =
    scrolled && !menuOpen
      ? 'border-beige bg-cream/95 backdrop-blur-md shadow-sm'
      : 'border-transparent bg-transparent';
  const mobileSurface = !menuOpen
    ? 'max-md:border-beige max-md:bg-cream/95 max-md:text-espresso max-md:backdrop-blur-md'
    : '';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${tone} ${surface} ${mobileSurface} pt-[env(safe-area-inset-top)]`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
          <a href="#home" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-full border border-current/40 bg-black/5 backdrop-blur-[2px] transition-all duration-500 group-hover:border-current group-hover:scale-105"
            >
              <CoffeeCupIcon className="size-6 transition-transform duration-300" />
            </span>
            <span className="font-serif text-xl uppercase tracking-[0.18em] drop-shadow-[0_1px_3px_rgba(0,0,0,0.25)]">
              The Daily Brew
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10 lg:gap-12">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className="group relative block py-2 text-sm font-medium uppercase tracking-[0.16em]"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    {activeId === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-[2px] bg-caramel"
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center md:hidden cursor-pointer"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <motion.span
                className="absolute left-0 top-0 block h-[2px] w-6 bg-current"
                animate={menuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-[2px] w-6 bg-current"
                animate={menuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        activeId={activeId}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
