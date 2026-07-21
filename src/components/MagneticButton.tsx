import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

export function MagneticButton({
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A34B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
        variant === "primary" &&
          "text-black shadow-[0_10px_30px_-12px_rgba(201,161,90,0.4)] hover:shadow-[0_10px_40px_-10px_rgba(201,161,90,0.55)]",
        variant === "ghost" && "border border-white/15 text-white hover:bg-white/5",
        className,
      )}
      {...(rest as object)}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: "linear-gradient(120deg, #B7791F, #D6A34B 60%, #B7791F)" }}
        />
      )}
      {children}
    </motion.button>
  );
}
