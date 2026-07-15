import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WHY_ATTEND } from "@/data/event";

export function WhyAttend() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="2"
          eyebrow="Why Attend"
          title={<>Six good reasons. <span className="text-white/50">One extraordinary day.</span></>}
          subtitle="From your first Lambda to your next architecture decision — there's a room for every stage of your cloud journey."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ATTEND.map((c, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[c.icon] ?? Icons.Circle;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group glass relative overflow-hidden rounded-2xl p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{ background: "radial-gradient(circle, rgba(255,153,0,0.5), transparent 70%)" }}
                />
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, rgba(255,153,0,0.25), rgba(139,92,246,0.25))" }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
                <span className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-widest text-white/30">
                  0{i + 1} · reason
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}