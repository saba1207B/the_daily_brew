import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, RefreshCw } from 'lucide-react';

interface NotFound404Props {
  onReturnHome?: () => void;
}

const MISHAPS = [
  'Someone asked for decaf and broke the espresso universe.',
  'Our barista was practicing latte art and poured this URL into another dimension.',
  'The coffee beans were roasted at 500°C and evaporated completely.',
  'This page took a wrong turn at Chennai Central and got lost in the coffee estates.',
];

export default function NotFound404({ onReturnHome }: NotFound404Props) {
  const randomMishap = MISHAPS[Math.floor(Math.random() * MISHAPS.length)];

  const handleGoHome = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#FFF0E5] px-6 py-12 text-[#1C0D07] select-none overflow-hidden">
      {/* Subtle warm coffee aura background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 select-none"
      >
        <div className="absolute -top-1/4 -right-1/4 h-[60vw] w-[60vw] rounded-full bg-[#CA5600]/15 filter blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[60vw] w-[60vw] rounded-full bg-[#1C0D07]/15 filter blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Animated Coffee Cup Breaking Giphy */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-4 flex items-center justify-center"
        >
          <img
            src="/assets/images/404-coffee-broken.gif"
            alt="Coffee cup breaking doodle animation"
            width={340}
            height={260}
            className="h-44 sm:h-52 md:h-60 w-auto object-contain mix-blend-multiply contrast-[1.2] brightness-[1.03]"
            fetchPriority="high"
          />
        </motion.div>

        {/* 404 Large Display */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex items-center gap-3 font-serif text-[clamp(3.5rem,8vw,6.5rem)] font-normal leading-none text-[#1C0D07]"
        >
          <span>4</span>
          <span className="italic text-[#CA5600]">0</span>
          <span>4</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C0D07]"
        >
          Oops! We Spilled The Beans.
        </motion.h1>

        {/* Humorous Explanation */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#705446] max-w-md"
        >
          {randomMishap}
        </motion.p>

        {/* Humorous café status note */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-5 rounded-xl border border-[#1C0D07]/10 bg-white/70 px-5 py-3 text-xs sm:text-[13px] text-[#553C30] shadow-sm backdrop-blur-sm"
        >
          <p className="flex items-center gap-2 justify-center font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span>Diagnosis: 0% Caffeine detected on this URL</span>
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleGoHome}
            className="group inline-flex items-center gap-3 rounded-none bg-[#1C0D07] px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#FFF0E5] shadow-md transition-all duration-300 hover:bg-[#CA5600] hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <ArrowLeft
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back To Fresh Coffee</span>
          </button>

          <a
            href="/#menu"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#menu';
            }}
            className="group inline-flex items-center gap-2.5 border border-[#1C0D07]/20 bg-transparent px-6 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#1C0D07] transition-all duration-300 hover:bg-[#1C0D07]/5 active:scale-95 cursor-pointer"
          >
            <Coffee size={16} strokeWidth={1.8} className="text-[#CA5600]" />
            <span>View The Menu</span>
          </a>
        </motion.div>

        {/* Little footer footer note */}
        <p className="mt-12 text-[11px] uppercase tracking-[0.24em] text-[#705446]/60">
          The Daily Brew {'\u00B7'} Specialty Coffee Chennai
        </p>
      </div>
    </div>
  );
}

