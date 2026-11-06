import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COFFEE_STEPS = [
  'Waking up the espresso machine...',
  'Grinding single-origin Arabica beans...',
  'Milk is boiling to silky micro-foam...',
  'Adding a pinch of sweetness...',
  'Pouring the delicate heart latte art...',
  'Almost ready to serve... get ready!',
];

interface WhiteCoffeeLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export default function WhiteCoffeeLoader({
  onComplete,
  minDurationMs = 9800,
}: WhiteCoffeeLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Smooth Progress increment timed with the full animation
  useEffect(() => {
    const startTime = performance.now();
    let animId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / minDurationMs) * 100);
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 400);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [minDurationMs, onComplete]);

  // Rotate coffee brewing steps
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % COFFEE_STEPS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Lock scroll during initial load
  useEffect(() => {
    if (!isDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDone]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="initial-white-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col items-center justify-center bg-white px-6 select-none touch-none"
        >
          {/* Coffee Animation */}
          <div className="relative mb-4 flex items-center justify-center">
            <img
              src="/assets/images/coffee-loader.gif"
              alt="Brewing Coffee Animation"
              width={320}
              height={240}
              className="h-40 sm:h-52 md:h-60 w-auto object-contain mix-blend-multiply contrast-[1.45] brightness-[1.08]"
              fetchPriority="high"
            />
          </div>

          {/* Progress Header */}
          <div className="flex items-center justify-between w-60 sm:w-80 mb-2.5">
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-[0.32em] uppercase text-[#1C0D07]">
              Loading...
            </span>
            <span className="font-mono text-xs sm:text-sm font-medium tracking-widest text-[#CA5600]">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-60 sm:w-80 h-1 sm:h-1.5 bg-[#1C0D07]/10 rounded-full overflow-hidden mb-5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#D9A878] via-[#CA5600] to-[#1C0D07]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Brewing Steps */}
          <div className="h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIndex}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="text-xs sm:text-sm font-medium tracking-wide text-[#705446] text-center"
              >
                {COFFEE_STEPS[stepIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
