import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { TRACKS } from "@/data/event";

export function Tracks() {
  return (
    <section id="tracks" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="3"
          eyebrow="Tracks"
          title={
            <>
              Nine tracks. <span className="text-gradient-aws">One ecosystem.</span>
            </>
          }
          subtitle="Follow one path or roam freely — every session is designed to be approachable at first, ambitious by the end."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {TRACKS.map((t, i) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[t.icon] ?? Icons.Layers;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                className="glass group flex items-center justify-between rounded-2xl p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg transition-transform group-hover:scale-110"
                    style={{
                      background:
                        i % 3 === 0
                          ? "linear-gradient(135deg, rgba(255,153,0,0.3), rgba(255,153,0,0.05))"
                          : i % 3 === 1
                            ? "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(56,189,248,0.05))"
                            : "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.05))",
                    }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      track.{t.tag}
                    </p>
                  </div>
                </div>
                <Icons.ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
