import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SPEAKERS } from "@/data/event";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export function Speakers() {
  return (
    <section id="speakers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="5"
          eyebrow="Speakers"
          title={<>The <span className="text-gradient-aws">humans</span> behind the sessions.</>}
          subtitle="AWS Heroes, Community Builders, and engineers doing the actual work."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-2xl p-5"
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
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-black text-black"
                style={{
                  background:
                    i % 3 === 0
                      ? "linear-gradient(135deg,#FFB84D,#FF9900)"
                      : i % 3 === 1
                        ? "linear-gradient(135deg,#7DD3FC,#38BDF8)"
                        : "linear-gradient(135deg,#C4B5FD,#8B5CF6)",
                }}
              >
                {initials(s.name)}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{s.name}</h3>
              <p className="text-sm text-white/60">{s.role}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                @ {s.company}
              </p>
              <div className="mt-4 flex gap-1.5">
                {[Twitter, Github, Linkedin].map((Icon, ii) => (
                  <a
                    key={ii}
                    href="#"
                    aria-label={`${s.name} social`}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-[#FF9900]/50 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}