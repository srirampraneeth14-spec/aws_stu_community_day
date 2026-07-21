import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SPONSORS } from "@/data/event";

const TIER_STYLES: Record<string, { color: string; sub: string }> = {
  Platinum: { color: "linear-gradient(120deg,#E5E7EB,#9CA3AF)", sub: "tier.platinum" },
  Gold: { color: "linear-gradient(120deg,#FFD494,#FF9900)", sub: "tier.gold" },
  Silver: { color: "linear-gradient(120deg,#CBD5E1,#94A3B8)", sub: "tier.silver" },
  Community: { color: "linear-gradient(120deg,#8B5CF6,#38BDF8)", sub: "tier.community" },
};

export function Sponsors() {
  return (
    <section id="sponsors" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="7"
          eyebrow="Sponsors"
          title={
            <>
              Powered by <span className="text-gradient-aws">believers</span>.
            </>
          }
          subtitle="The companies and communities that make this day possible. Hover to learn what they build."
        />

        <div className="mt-12 space-y-10">
          {(Object.keys(SPONSORS) as Array<keyof typeof SPONSORS>).map((tier) => (
            <div key={tier}>
              <div className="flex items-baseline justify-between">
                <div>
                  <p
                    className="text-2xl font-bold"
                    style={{
                      background: TIER_STYLES[tier].color,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {tier}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {TIER_STYLES[tier].sub}
                  </p>
                </div>
                <div
                  className="h-px flex-1 translate-y-1 bg-gradient-to-r from-white/10 to-transparent"
                  style={{ marginLeft: 24 }}
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SPONSORS[tier].map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.04 }}
                    className="glass group relative h-32 overflow-hidden rounded-2xl p-5"
                  >
                    <div className="flex h-full items-center justify-center text-center text-lg font-semibold text-white transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0">
                      {s.name}
                    </div>
                    <p className="pointer-events-none absolute inset-x-5 bottom-5 translate-y-4 text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
