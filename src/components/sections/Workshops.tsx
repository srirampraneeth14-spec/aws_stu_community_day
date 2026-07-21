import { motion } from "framer-motion";
import { Clock, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WORKSHOPS } from "@/data/event";

function levelStyle(level: string) {
  switch (level) {
    case "Beginner":
      return { color: "#22C55E", bg: "rgba(34,197,94,0.15)" };
    case "Intermediate":
      return { color: "#38BDF8", bg: "rgba(56,189,248,0.15)" };
    default:
      return { color: "#8B5CF6", bg: "rgba(139,92,246,0.15)" };
  }
}

export function Workshops() {
  return (
    <section id="workshops" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="6"
          eyebrow="Workshops"
          title={
            <>
              Bring a laptop. <span className="text-gradient-cool">Leave with code.</span>
            </>
          }
          subtitle="Guided, hands-on labs across three levels. Mentors on hand for every session."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WORKSHOPS.map((w, i) => {
            const s = levelStyle(w.level);
            return (
              <motion.article
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                whileHover={{ y: -6 }}
                className="glass group relative overflow-hidden rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg"
                    style={{ background: s.bg }}
                  >
                    <Terminal className="h-4 w-4" style={{ color: s.color }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {w.level}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{w.desc}</p>
                <div className="mt-5 flex items-center gap-4 font-mono text-[11px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {w.duration}
                  </span>
                  <span>lab.{String(i + 1).padStart(2, "0")}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
