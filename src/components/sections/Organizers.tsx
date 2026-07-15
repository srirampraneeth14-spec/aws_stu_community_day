import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CREW, FACULTY } from "@/data/event";

type Organizer = { name: string; role: string; pill: string; image?: string; linkedin?: string };

const SUBSECTION_STYLES = {
  Faculty: {
    color: "linear-gradient(120deg,#7DD3FC,#38BDF8)",
    sub: "advisors",
  },
  Crew: {
    color: "linear-gradient(120deg,#FFD494,#FF9900)",
    sub: "AWS Team REC",
  },
} as const;

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function Avatar({
  person,
  index,
  className = "h-14 w-14",
}: {
  person: Organizer;
  index: number;
  className?: string;
}) {
  if (person.image) {
    return (
      <img
        src={person.image}
        alt={person.name}
        className={`${className} shrink-0 rounded-2xl object-cover object-top`}
      />
    );
  }

  return (
    <div
      className={`grid ${className} shrink-0 place-items-center rounded-2xl text-base font-black text-black`}
      style={{
        background:
          index % 3 === 0
            ? "linear-gradient(135deg,#FFB84D,#FF9900)"
            : index % 3 === 1
              ? "linear-gradient(135deg,#7DD3FC,#38BDF8)"
              : "linear-gradient(135deg,#C4B5FD,#8B5CF6)",
      }}
    >
      {initials(person.name)}
    </div>
  );
}

function LinkedInLink({ person }: { person: Organizer }) {
  return (
    <a
      href={person.linkedin ?? "#"}
      target={person.linkedin ? "_blank" : undefined}
      rel={person.linkedin ? "noopener noreferrer" : undefined}
      aria-label={`${person.name} LinkedIn`}
      onClick={(e) => e.stopPropagation()}
      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-[#FF9900]/50 hover:text-white"
    >
      <Linkedin className="h-3.5 w-3.5" />
    </a>
  );
}

function OrganizerDetailDialog({
  person,
  index,
  open,
  onOpenChange,
  variant,
}: {
  person: Organizer | null;
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "faculty" | "crew";
}) {
  if (!person) return null;

  const shadowClass =
    variant === "faculty" ? "shadow-[#38BDF8]/10" : "shadow-[#FF9900]/10";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-black/90"
        className={`glass-strong max-w-md border-white/10 bg-[#0a0f1a]/95 p-8 text-center shadow-2xl ${shadowClass} sm:rounded-3xl [&>button]:text-white/70 [&>button]:hover:text-white`}
      >
        <div className="flex flex-col items-center">
          <Avatar person={person} index={index} className="h-52 w-52 sm:h-60 sm:w-60" />
          <DialogTitle className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            {person.name}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-white/60 sm:text-lg">
            {person.role}
          </DialogDescription>
          <div className="mt-4 inline-flex items-center gap-2">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
              {person.pill}
            </span>
            <LinkedInLink person={person} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InteractiveOrganizerGrid({
  people,
  variant,
}: {
  people: Organizer[];
  variant: "faculty" | "crew";
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? people[selectedIndex] : null;

  const hoverShadowClass =
    variant === "faculty"
      ? "hover:shadow-[#38BDF8]/15"
      : "hover:shadow-[#FF9900]/15";

  const pillHoverClass =
    variant === "faculty"
      ? "group-hover:border-[#38BDF8]/30"
      : "group-hover:border-[#FF9900]/30";

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((o, i) => (
          <motion.div
            key={`${o.name}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              opacity: { duration: 0.45, delay: (i % 3) * 0.05 },
              y: { duration: 0.45, delay: (i % 3) * 0.05 },
              scale: { type: "spring", stiffness: 320, damping: 22 },
              default: { type: "spring", stiffness: 320, damping: 22 },
            }}
            whileHover={{ scale: 1.08, y: -6 }}
            onClick={() => setSelectedIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIndex(i);
              }
            }}
            role="button"
            tabIndex={0}
            className={`glass group relative z-0 flex cursor-pointer items-center gap-4 rounded-2xl p-5 hover:z-10 hover:shadow-2xl ${hoverShadowClass}`}
            style={{ transformOrigin: "center center" }}
          >
            <Avatar person={o} index={i} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-white">
                {o.name}
              </p>
              <p className="text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {o.role}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors duration-300 group-hover:text-white/70 ${pillHoverClass}`}
                >
                  {o.pill}
                </span>
                <LinkedInLink person={o} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <OrganizerDetailDialog
        person={selected}
        index={selectedIndex ?? 0}
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
        variant={variant}
      />
    </>
  );
}

export function Organizers() {
  return (
    <section id="organizers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="8"
          eyebrow="Organizers"
          title={<>The people behind the day.</>}
          subtitle="Faculty advisors and volunteers who make AWS Community Day possible."
        />

        <div className="mt-12 space-y-10">
          <div>
            <div className="flex items-baseline justify-between">
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{
                    background: SUBSECTION_STYLES.Faculty.color,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Faculty
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {SUBSECTION_STYLES.Faculty.sub}
                </p>
              </div>
              <div
                className="h-px flex-1 translate-y-1 bg-gradient-to-r from-white/10 to-transparent"
                style={{ marginLeft: 24 }}
              />
            </div>
            <InteractiveOrganizerGrid people={FACULTY} variant="faculty" />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{
                    background: SUBSECTION_STYLES.Crew.color,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  The Crew making it happen.
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {SUBSECTION_STYLES.Crew.sub}
                </p>
              </div>
              <div
                className="h-px flex-1 translate-y-1 bg-gradient-to-r from-white/10 to-transparent"
                style={{ marginLeft: 24 }}
              />
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
              Volunteers on nights and weekends because they believe in this community.
            </p>
            <InteractiveOrganizerGrid people={CREW} variant="crew" />
          </div>
        </div>
      </div>
    </section>
  );
}
