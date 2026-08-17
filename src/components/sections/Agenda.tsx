import { motion, useScroll, useTransform } from "framer-motion";
import { theme } from "@/lib/theme";
import { useRef, useState } from "react";
import { ChevronDown, Clock, User } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AGENDA, type AgendaItem } from "@/data/event";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Cloud", "AI", "DevOps", "Workshops"] as const;
type Filter = (typeof FILTERS)[number];

function trackColor(track: AgendaItem["track"]) {
  switch (track) {
    case "AI":
      return theme.purpleLight;
    case "DevOps":
      return theme.purpleMuted;
    case "Workshops":
      return theme.purple;
    default:
      return theme.aws;
  }
}

function itemMatchesFilter(item: AgendaItem, filter: Filter) {
  if (filter === "All") return true;
  if (item.parallelTracks) {
    return item.parallelTracks.some((track) => track.track === filter);
  }
  return item.track === filter;
}

function visibleParallelTracks(item: AgendaItem, filter: Filter) {
  if (!item.parallelTracks) return [];
  if (filter === "All") return item.parallelTracks;
  return item.parallelTracks.filter((track) => track.track === filter);
}

function AgendaCard({
  item,
  filter,
  index,
}: {
  item: AgendaItem;
  filter: Filter;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const hasParallelTracks = Boolean(item.parallelTracks?.length);
  const tracks = visibleParallelTracks(item, filter);

  const cardBody = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-sm font-semibold text-white">
          <Clock className="mr-1 inline h-3.5 w-3.5 text-white/50" />
          {item.startTime} – {item.endTime}
        </span>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
          style={{
            background: `${trackColor(item.track)}22`,
            color: trackColor(item.track),
          }}
        >
          {item.track}
        </span>
      </div>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          {item.format && (
            <p className="mt-1 text-sm text-white/50">{item.format}</p>
          )}
          {item.speaker && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
              <User className="h-3.5 w-3.5 text-white/40" />
              {item.speaker}
            </p>
          )}
        </div>
        {hasParallelTracks && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 inline-flex shrink-0"
          >
            <ChevronDown className="h-5 w-5 text-white/50" />
          </motion.span>
        )}
      </div>
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="relative"
    >
      <span
        className="absolute -left-[19px] top-5 h-3 w-3 rounded-full ring-4 ring-[var(--black-base)] sm:-left-[27px]"
        style={{
          background: trackColor(item.track),
          boxShadow: `0 0 14px ${trackColor(item.track)}`,
        }}
      />
      {hasParallelTracks ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <motion.div
            layout
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "glass rounded-2xl overflow-hidden transition-[box-shadow,ring-color] duration-300",
              open && "ring-1 ring-purple/30 shadow-[0_8px_32px_rgba(5,5,8,0.45)]",
            )}
          >
            <CollapsibleTrigger className="group w-full cursor-pointer p-5 text-left transition-colors duration-200 hover:bg-white/[0.04] data-[state=open]:bg-white/[0.02]">
              {cardBody}
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <motion.div
                initial={false}
                animate={open ? "open" : "closed"}
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                }}
                className="space-y-2 border-t border-white/10 px-5 pb-5 pt-4"
              >
                {tracks.map((track) => (
                  <motion.div
                    key={track.title}
                    variants={{
                      open: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      },
                      closed: {
                        opacity: 0,
                        y: -10,
                        scale: 0.98,
                        filter: "blur(4px)",
                      },
                    }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                        style={{
                          background: `${trackColor(track.track)}22`,
                          color: trackColor(track.track),
                        }}
                      >
                        {track.track}
                      </span>
                      {track.level && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                          {track.level}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-medium text-white/90">
                      {track.title}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </motion.div>
        </Collapsible>
      ) : (
        <div className="glass rounded-2xl p-5">{cardBody}</div>
      )}
    </motion.li>
  );
}

export function Agenda() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = AGENDA.filter((it) => itemMatchesFilter(it, filter));
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
          title={
            <>
              One day. <span className="text-gradient-cool">Twelve moments.</span>
            </>
          }
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
            <div className="h-full w-full bg-gradient-to-b from-[var(--aws)] via-[var(--purple-light)] to-[var(--purple)]" />
          </motion.div>

          <ul className="space-y-4">
            {items.map((it, i) => (
              <AgendaCard
                key={`${it.startTime}-${it.title}`}
                item={it}
                filter={filter}
                index={i}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
