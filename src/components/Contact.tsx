import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { EASE_OUT } from '@/lib/motion';
import { CONTACT } from '@/data/contact';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(section.querySelectorAll('[data-contact-reveal]'), {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-title"
      className="relative bg-espresso text-cream"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left: heading + CTA */}
          <div className="lg:col-span-6">
            <p
              data-contact-reveal
              className="text-xs font-medium uppercase tracking-[0.28em] text-caramel-light"
            >
              Visit Us
            </p>
            <h2
              id="contact-title"
              data-contact-reveal
              className="mt-6 text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-cream"
            >
              Let's brew{' '}
              <span className="italic text-caramel">something great.</span>
            </h2>
            <p
              data-contact-reveal
              className="mt-8 max-w-sm text-base leading-relaxed text-cream/70"
            >
              We'd love to have you in. Come find your favourite corner at The Daily Brew in Chennai.
            </p>

            <motion.a
              href={`mailto:${CONTACT.email}`}
              data-contact-reveal
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="mt-10 inline-flex items-center gap-3 border border-cream/30 px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-cream transition-colors duration-500 hover:border-caramel hover:bg-caramel-deep"
            >
              <Mail aria-hidden="true" size={16} strokeWidth={1.5} />
              Say Hello
            </motion.a>
          </div>

          {/* Right: contact details */}
          <div className="flex flex-col justify-center gap-8 lg:col-span-5 lg:col-start-8">
            {/* Divider line */}
            <div
              data-contact-reveal
              className="h-px w-full bg-cream/15"
            />

            <ContactItem
              icon={<Mail aria-hidden="true" size={18} strokeWidth={1.5} />}
              label="Email"
              href={`mailto:${CONTACT.email}`}
              value={CONTACT.email}
            />

            <div className="h-px w-full bg-cream/15" />

            <ContactItem
              icon={<Phone aria-hidden="true" size={18} strokeWidth={1.5} />}
              label="Phone"
              href={CONTACT.phoneHref}
              value={CONTACT.phoneDisplay}
            />

            <div className="h-px w-full bg-cream/15" />

            <div className="flex gap-5">
              <span className="mt-0.5 text-caramel">
                <MapPin aria-hidden="true" size={18} strokeWidth={1.5} />
              </span>
              <div>
                <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-cream/40">
                  Location
                </span>
                <span className="mt-1 block font-serif text-xl text-cream">
                  {CONTACT.location}
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-cream/15" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  href,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-5 transition-opacity duration-300 hover:opacity-70"
    >
      <span className="mt-0.5 text-caramel">{icon}</span>
      <div>
        <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-cream/40">
          {label}
        </span>
        <span className="mt-1 block font-serif text-xl text-cream group-hover:text-caramel-light transition-colors duration-300">
          {value}
        </span>
      </div>
    </a>
  );
}

