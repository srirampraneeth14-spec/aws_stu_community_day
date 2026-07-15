import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, MapPin, User } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { AGENDA, type AgendaItem } from "@/data/event";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Cloud", "AI", "DevOps", "Workshops"] as const;
type Filter = (typeof FILTERS)[number];

function trackColor(track: AgendaItem["track"]) {
  switch (track) {
    case "AI": return "#8B5CF6";
    case "DevOps": return "#22C55E";
    case "Workshops": return "#38BDF8";
    default: return "#FF9900";
  }
}

export function Agenda() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = AGENDA.filter((it) => filter === "All" || it.track === filter);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="agenda" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="4"
          eyebrow="Agenda"
          title={<>One day. <span className="text-gradient-cool">Twelve moments.</span></>}
          subtitle="Scroll to see the day fill in. Filter by track to plan yours."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
                filter === f
                  ? "border-transparent bg-white text-black"
                  : "border-white/10 text-white/70 hover:border-white/20 hover:text-white",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={ref} className="relative mt-12 pl-6 sm:pl-10">
          <div className="absolute bottom-0 left-2 top-0 w-px bg-white/10 sm:left-4" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2 top-0 w-px sm:left-4"
          >
            <div className="h-full w-full bg-gradient-to-b from-[#FF9900] via-[#38BDF8] to-[#8B5CF6]" />
          </motion.div>

          <ul className="space-y-4">
            {items.map((it, i) => (
              <motion.li
                key={`${it.time}-${it.title}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative"
              >
                <span
                  className="absolute -left-[19px] top-5 h-3 w-3 rounded-full ring-4 ring-[#09090B] sm:-left-[27px]"
                  style={{ background: trackColor(it.track), boxShadow: `0 0 14px ${trackColor(it.track)}` }}
                />
                <div className="glass rounded-2xl p-5">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-sm font-semibold text-white">
                      <Clock className="mr-1 inline h-3.5 w-3.5 text-white/50" />
                      {it.time}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                      style={{ background: `${trackColor(it.track)}22`, color: trackColor(it.track) }}
                    >
                      {it.track}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      {it.room}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{it.title}</h3>
                  {it.speaker && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
                      <User className="h-3.5 w-3.5 text-white/40" />
                      {it.speaker}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}