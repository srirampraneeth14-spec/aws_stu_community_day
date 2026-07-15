import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

export function AchievementPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 20000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="glass-strong flex items-start gap-3 rounded-2xl p-4 shadow-2xl">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #FF9900, #8B5CF6)" }}
            >
              <Sparkles className="h-5 w-5 text-black" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                Achievement unlocked
              </p>
              <p className="mt-1 text-sm font-semibold text-white">Future Cloud Builder ☁</p>
              <p className="mt-1 text-xs text-white/60">
                You&apos;ve been exploring for 20 seconds. Curiosity is deploy-ready.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Dismiss"
              className="rounded-md p-1 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}