import { motion } from "framer-motion";
import { Clock, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WORKSHOPS } from "@/data/event";
import { theme, rgba } from "@/lib/theme";

function levelStyle(level: string) {
  switch (level) {
    case "Beginner":
      return { color: theme.awsLight, bg: rgba(theme.aws, 0.15) };
    case "Beginner to Intermediate":
      return { color: theme.purpleLight, bg: rgba(theme.purple, 0.15) };
    case "Intermediate":
      return { color: theme.purple, bg: rgba(theme.purpleMuted, 0.18) };
    default:
      return { color: theme.purpleDark, bg: rgba(theme.purpleDark, 0.2) };
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
          subtitle="Three parallel hands-on workshops, 1:45 PM – 4:15 PM. Bring your laptop."
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
