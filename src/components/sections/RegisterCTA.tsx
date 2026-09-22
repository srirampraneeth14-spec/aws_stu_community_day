import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { IS_EVENT_COMPLETED, IS_REGISTRATION_OPEN, REGISTRATION_URL } from "@/data/event";

export function RegisterCTA() {
  return (
    <section id="register" className="relative pt-24 pb-6 sm:pt-32 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 p-10 sm:p-16"
          style={{
            background:
              "radial-gradient(1200px 400px at 20% 0%, rgba(255,255,255,0.06), transparent 62%), radial-gradient(1000px 400px at 100% 100%, rgba(255,255,255,0.04), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
          }}
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="relative">
            {IS_EVENT_COMPLETED ? (
              <>
                <p className="font-tech text-xs uppercase tracking-[0.3em] text-green">
                  // event.completed
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Thank You for an <span className="text-gradient-cool">Amazing Day!</span>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                  AWS Student Community Day Vizag 2026 has officially concluded! Thank you to our 600+ attendees, inspiring speakers, dedicated faculty, generous sponsors, and tireless student organizers who made this milestone gathering a resounding success.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-5 py-2.5 text-sm font-semibold text-green shadow-[0_0_16px_rgba(124,203,140,0.15)]">
                    <span className="h-2 w-2 rounded-full bg-green" />
                    Event Completed · See You Next Time!
                  </div>
                  <MagneticButton onClick={() => (window.location.hash = "#agenda")}>
                    Explore Agenda <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-tech text-xs text-white/50 underline underline-offset-4 transition-colors hover:text-white/80"
                  >
                    View on KonfHub
                  </a>
                  <span className="font-tech text-xs text-white/40">// Thank you builders</span>
                </div>
              </>
            ) : IS_REGISTRATION_OPEN ? (
              <>
                <p className="font-tech text-xs uppercase tracking-[0.3em] text-purple-light">
                  // registration.open
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Ready to <span className="text-gradient-cool">Build the Future?</span>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                  Grab your ticket, save your seat in the workshops that matter to you, and come meet
                  the community IRL. We&apos;ll bring the coffee.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <MagneticButton>
                      Register Now <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </a>
                  <MagneticButton variant="ghost" onClick={() => (window.location.hash = "#agenda")}>
                    See what&apos;s on
                  </MagneticButton>
                  <span className="font-tech text-xs text-white/40">// Deploy Your Potential</span>
                </div>
              </>
            ) : (
              <>
                <p className="font-tech text-xs uppercase tracking-[0.3em] text-rose-400">
                  // registration.closed
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Registrations are <span className="text-gradient-aws">Now Closed!</span>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
                  Thank you for the tremendous enthusiasm! All passes have been claimed and registrations are officially closed. If you secured your spot, we look forward to seeing you at Raghu Engineering College on Saturday, September 19!
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-5 py-2.5 text-sm font-semibold text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.15)]">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Registrations Closed · Housefull
                  </div>
                  <MagneticButton onClick={() => (window.location.hash = "#agenda")}>
                    Explore Agenda <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-tech text-xs text-white/50 underline underline-offset-4 transition-colors hover:text-white/80"
                  >
                    View on KonfHub
                  </a>
                  <span className="font-tech text-xs text-white/40">// See you at the cloud</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
