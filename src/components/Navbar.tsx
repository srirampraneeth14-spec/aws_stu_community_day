import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Cloud, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/event";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "backdrop-blur-xl" : "backdrop-blur-0",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.4) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 text-white">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg"
              style={{ background: "linear-gradient(135deg,#FF9900,#8B5CF6)" }}
            >
              <Cloud className="h-4 w-4 text-black" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">AWS Community Day</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                where builders meet the cloud
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#register"
              className="hidden whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_-12px_rgba(255,153,0,0.8)] transition-transform hover:scale-[1.02] sm:inline-flex"
              style={{ background: "linear-gradient(120deg, #FF9900, #FFB84D 60%, #FF9900)" }}
            >
              Register Now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-3 top-[64px] z-50 lg:hidden"
        >
          <div className="glass-strong rounded-2xl p-3">
            <ul className="grid grid-cols-2 gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl px-4 py-3 text-center text-sm font-semibold text-black"
              style={{ background: "linear-gradient(120deg, #FF9900, #FFB84D 60%, #FF9900)" }}
            >
              Register Now
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}