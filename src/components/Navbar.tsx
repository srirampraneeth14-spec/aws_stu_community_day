import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { theme, rgba } from "@/lib/theme";
import { Cloud, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IS_EVENT_COMPLETED, IS_REGISTRATION_OPEN, NAV_LINKS } from "@/data/event";

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
            background: `linear-gradient(180deg, ${rgba(theme.black, 0.82)} 0%, ${rgba(theme.black, 0.45)} 100%)`,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <a href="#top" className="flex shrink-0 items-center gap-2.5 text-white">
            <span
              className="grid h-8 w-8 shrink-0 aspect-square place-items-center rounded-lg shadow-sm"
              style={{ background: theme.brandIconGradient }}
            >
              <Cloud className="h-4 w-4 shrink-0 text-black" />
            </span>
            <span className="flex shrink-0 flex-col leading-none whitespace-nowrap">
              <span className="text-sm font-bold tracking-tight">AWS Community Day</span>
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-white/45">
                where builders meet the cloud
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] text-white/70 transition-colors hover:bg-white/5 hover:text-white 2xl:px-3 2xl:py-1.5 2xl:text-sm"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {IS_EVENT_COMPLETED ? (
              <a
                href="#register"
                className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-green/30 bg-green/10 px-4 py-1.5 text-xs font-semibold text-green shadow-[0_0_12px_rgba(124,203,140,0.15)] transition-all duration-300 hover:bg-green/20 sm:inline-flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green" />
                Event Completed
              </a>
            ) : IS_REGISTRATION_OPEN ? (
              <a
                href="#register"
                className="hidden shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-black shadow-[0_2px_12px_rgba(214,163,75,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(214,163,75,0.45)] sm:inline-flex"
                style={{ background: "linear-gradient(120deg, #B7791F, #D6A34B 60%, #B7791F)" }}
              >
                Register Now
              </a>
            ) : (
              <a
                href="#register"
                className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)] transition-all duration-300 hover:bg-rose-500/20 sm:inline-flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Registrations Closed
              </a>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white xl:hidden"
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
          className="fixed inset-x-3 top-[64px] z-50 xl:hidden"
        >
          <div
            className="rounded-2xl border border-white/20 p-3 shadow-2xl shadow-black/50"
            style={{
              background: `linear-gradient(180deg, ${rgba(theme.blackElevated, 0.96)} 0%, ${rgba(theme.blackElevated, 0.92)} 100%)`,
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            <ul className="grid grid-cols-2 gap-1">
              {NAV_LINKS.map((l, idx) => (
                <li
                  key={l.id}
                  className={cn(
                    idx === NAV_LINKS.length - 1 && NAV_LINKS.length % 2 !== 0 && "col-span-2 text-center",
                  )}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            {IS_EVENT_COMPLETED ? (
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-green/30 bg-green/10 px-4 py-3 text-center text-sm font-semibold text-green transition-all duration-300 hover:bg-green/20"
              >
                <span className="h-2 w-2 rounded-full bg-green" />
                Event Completed
              </a>
            ) : IS_REGISTRATION_OPEN ? (
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_2px_12px_rgba(214,163,75,0.25)] transition-all duration-300 hover:shadow-[0_0_18px_rgba(214,163,75,0.45)]"
                style={{ background: "linear-gradient(120deg, #B7791F, #D6A34B 60%, #B7791F)" }}
              >
                Register Now
              </a>
            ) : (
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm font-semibold text-rose-300 transition-all duration-300 hover:bg-rose-500/20"
              >
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Registrations Closed
              </a>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
