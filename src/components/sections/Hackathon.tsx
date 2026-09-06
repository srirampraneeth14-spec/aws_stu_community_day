import { motion } from "framer-motion";
import { ArrowRight, Bot, Calendar, Trophy, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { HACKATHON_STATS, HACKATHON_CHALLENGE } from "@/data/hackathon";
import { theme, rgba } from "@/lib/theme";

const STAT_ICONS = [Trophy, Users, Calendar, Calendar] as const;

export function Hackathon() {
  return (
    <section id="hackathon" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="5"
          eyebrow="Hackathon"
          title={
            <>
              AI Innovation{" "}
              <span className="text-gradient-aws">Hackathon</span>
            </>
          }
          subtitle="Building Real-World Agentic AI Systems — a two-stage competition with a ₹30,000 prize pool of AI & developer tools. Build it, demo it, win it."
        />

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {HACKATHON_STATS.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={s.label}
                className="flex flex-col gap-1 bg-[#0c0814] px-5 py-4"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className="h-3.5 w-3.5"
                    style={{ color: theme.purpleLight }}
                  />
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    {s.value}
                  </span>
                </div>
                <span className="font-tech text-[10px] uppercase tracking-[0.14em] text-white/45">
                  {s.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ── Challenge teaser + domains ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="glass mt-8 overflow-hidden rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${rgba(theme.purpleLight, 0.22)}, ${rgba(theme.purple, 0.22)})`,
              }}
            >
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                The Challenge
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {HACKATHON_CHALLENGE.description}
              </p>
            </div>
          </div>

          {/* Domain chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {HACKATHON_CHALLENGE.domains.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/10 px-3 py-1 font-tech text-[11px] text-white/50"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <Link
            to="/hackathon"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight text-black shadow-[0_2px_12px_rgba(214,163,75,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(214,163,75,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A34B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            style={{
              background:
                "linear-gradient(120deg, #B7791F, #D6A34B 60%, #B7791F)",
            }}
          >
            View Full Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="font-tech text-xs text-white/40">
            // challenge · timeline · judging · prizes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
