import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }

    // Fallback: if element is never detected as in-view after 3s, snap to final value
    const fallback = window.setTimeout(() => {
      if (mv.get() === 0 && to > 0) mv.set(to);
    }, 3000);
    return () => clearTimeout(fallback);
  }, [inView, mv, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
