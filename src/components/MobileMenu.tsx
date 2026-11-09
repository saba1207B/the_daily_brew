/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT } from '@/data/contact';
import { NAV_ITEMS, type SectionId } from '@/data/navigation';
import { useLenis } from '@/context/LenisContext';
import { EASE_OUT } from '@/lib/motion';

interface MobileMenuProps {
  open: boolean;
  activeId: SectionId;
  onClose: () => void;
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 48, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export default function MobileMenu({ open, activeId, onClose }: MobileMenuProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, lenis]);

  const handleNavigate = () => {
    lenis?.start();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="fixed inset-0 z-40 flex flex-col bg-espresso text-cream pt-[calc(72px+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]"
        >
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-6">
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.li key={item.id} variants={itemVariants} className="overflow-hidden">
                  <a
                    href={`#${item.id}`}
                    onClick={handleNavigate}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className="flex items-baseline gap-5 py-2 font-serif text-[clamp(2.5rem,12vw,4.5rem)] leading-[1.2]"
                  >
                    <span className="font-sans text-sm tracking-[0.2em] text-caramel-light">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className="border-t border-cream/15 px-6 pt-6 text-sm text-cream/80">
            <a href={`mailto:${CONTACT.email}`} className="break-all underline underline-offset-4">
              {CONTACT.email}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
