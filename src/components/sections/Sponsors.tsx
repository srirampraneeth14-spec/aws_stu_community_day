import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SPONSORS } from "@/data/event";
import { theme } from "@/lib/theme";

const TIER_STYLES: Record<string, { color: string; sub: string }> = {
  "Title Sponsor": {
    color: "linear-gradient(120deg,#F5F3FF,#C4B5FD)",
    sub: "tier.title",
  },
  "Venue Partner": {
    color: `linear-gradient(120deg,${theme.purpleLight},${theme.purple})`,
    sub: "partner.venue",
  },
};

const DEFAULT_TIER_STYLE = {
  color: `linear-gradient(120deg,${theme.purpleLight},${theme.purple})`,
  sub: "partner",
};

export function Sponsors() {
  return (
    <section id="sponsors" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="6"
          eyebrow="Sponsors"
          title={
            <>
              Powered by <span className="text-gradient-aws">believers</span>.
            </>
          }
          subtitle="The companies and communities that make this day possible. Hover to learn what they build."
        />

        <div className="mt-12 space-y-10">
          {(Object.keys(SPONSORS) as Array<keyof typeof SPONSORS>).map((tier) => {
            const tierStyle = TIER_STYLES[tier] ?? DEFAULT_TIER_STYLE;
            return (
              <div key={tier}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        background: tierStyle.color,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {tier}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {tierStyle.sub}
                    </p>
                  </div>
                  <div
                    className="h-px flex-1 translate-y-1 bg-gradient-to-r from-white/10 to-transparent"
                    style={{ marginLeft: 24 }}
                  />
                </div>
                <div className="mt-4 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {SPONSORS[tier].map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (i % 4) * 0.04 }}
                      className="glass group relative h-36 overflow-hidden rounded-2xl p-5"
                    >
                      <div className="flex h-full items-center justify-center transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0">
                        {s.logo ? (
                          <div className="flex h-20 w-full items-center justify-center rounded-xl bg-white/95 px-5 py-3 shadow-sm">
                            <img
                              src={s.logo}
                              alt={s.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="text-center text-lg font-semibold text-white">
                            {s.name}
                          </div>
                        )}
                      </div>
                      <p className="pointer-events-none absolute inset-x-5 bottom-5 translate-y-4 text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {s.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
