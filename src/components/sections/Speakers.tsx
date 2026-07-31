import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SPEAKERS } from "@/data/event";

type Speaker = { name: string; role: string; company: string; linkedin?: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function LinkedInLink({ name, linkedin }: { name: string; linkedin?: string }) {
  if (!linkedin) return null;

  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} LinkedIn`}
      onClick={(e) => e.stopPropagation()}
      className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-[#38BDF8]/50 hover:text-white"
    >
      <Linkedin className="h-3.5 w-3.5" />
    </a>
  );
}

function SpeakerAvatar({ person, index, className = "h-16 w-16" }: { person: Speaker; index: number; className?: string }) {
  return (
    <div
      className={`grid ${className} shrink-0 place-items-center rounded-2xl text-lg font-black text-black`}
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

function SpeakerDetailDialog({
  person,
  index,
  open,
  onOpenChange,
}: {
  person: Speaker | null;
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!person) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-black/90"
        className="glass-strong max-w-md border-white/10 bg-[#0a0f1a]/95 p-8 text-center shadow-2xl shadow-[#38BDF8]/10 sm:rounded-3xl [&>button]:text-white/70 [&>button]:hover:text-white"
      >
        <div className="flex flex-col items-center">
          <SpeakerAvatar person={person} index={index} className="h-52 w-52 sm:h-60 sm:w-60" />
          <DialogTitle className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            {person.name}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-white/60 sm:text-lg">
            {person.role}
          </DialogDescription>
          <div className="mt-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
            {person.company}
          </div>
          <div className="mt-4">
            <LinkedInLink name={person.name} linkedin={person.linkedin} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Speakers() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? (SPEAKERS[selectedIndex] as Speaker) : null;

  return (
    <section id="speakers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="5"
          eyebrow="Speakers"
          title={
            <>
              The <span className="text-gradient-aws">humans</span> behind the sessions.
            </>
          }
          subtitle="AWS Heroes, Community Builders, and engineers doing the actual work."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((speaker, i) => (
            <motion.article
              key={speaker.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                opacity: { duration: 0.45, delay: (i % 4) * 0.05 },
                y: { duration: 0.45, delay: (i % 4) * 0.05 },
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
              className="glass group relative z-0 cursor-pointer overflow-hidden rounded-2xl p-5 hover:z-10 hover:shadow-2xl hover:shadow-[#38BDF8]/15"
              style={{ transformOrigin: "center center" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background:
                    i % 3 === 0
                      ? "radial-gradient(circle, #FF9900, transparent 70%)"
                      : i % 3 === 1
                        ? "radial-gradient(circle, #38BDF8, transparent 70%)"
                        : "radial-gradient(circle, #8B5CF6, transparent 70%)",
                }}
              />
              <SpeakerAvatar person={speaker as Speaker} index={i} />
              <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-300 group-hover:text-white">
                {speaker.name}
              </h3>
              <p className="text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {speaker.role}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 transition-colors duration-300 group-hover:text-white/60">
                @ {speaker.company}
              </p>
              <div className="mt-4 flex gap-1.5">
                <LinkedInLink name={speaker.name} linkedin={speaker.linkedin} />
              </div>
            </motion.article>
          ))}
        </div>
        <SpeakerDetailDialog
          person={selected}
          index={selectedIndex ?? 0}
          open={selectedIndex !== null}
          onOpenChange={(open) => !open && setSelectedIndex(null)}
        />
      </div>
    </section>
  );
}
