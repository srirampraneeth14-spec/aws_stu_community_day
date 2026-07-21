import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let i = 0;
    const handler = (e: KeyboardEvent) => {
      const expected = CODE[i];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        i += 1;
        if (i === CODE.length) {
          setOpen(true);
          i = 0;
          window.setTimeout(() => setOpen(false), 4000);
        }
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[80] grid place-items-center"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.7, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            className="glass-strong relative rounded-3xl px-8 py-6 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF9900]">
              // secret unlocked
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              <span className="text-gradient-aws">Cloud &gt; Limits</span>
            </p>
            <p className="mt-1 font-mono text-xs text-white/60">
              git commit -m &quot;See you at AWS Community Day&quot;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
