import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { CloudNetwork } from "@/components/CloudNetwork";
import { CountUp } from "@/components/CountUp";
import { MagneticButton } from "@/components/MagneticButton";
import { EVENT_DATE, EVENT_VENUE_NAME, STATS, VENUE_MAPS_URL } from "@/data/event";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32 lg:pt-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
            Registration open · Learn · Build · Connect · Grow
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Where Builders
            <br />
            Meet the{" "}
            <span className="text-gradient-aws">Cloud.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            A one-day, community-run AWS conference for students, developers, architects,
            and the cloud-curious. Deep talks, hands-on workshops, and the kind of people
            you&apos;ll want to build the future with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton onClick={() => (window.location.hash = "#register")}>
              Register Now <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => (window.location.hash = "#agenda")}
            >
              Explore Agenda
            </MagneticButton>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#38BDF8]" /> {EVENT_DATE}
            </span>
            <a
              href={VENUE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <MapPin className="h-4 w-4 text-[#FF9900]" /> {EVENT_VENUE_NAME}
            </a>
            <span className="flex items-center gap-2 font-mono text-xs text-white/40">
              <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" /> // sudo attend aws-community-day
            </span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-4"
              >
                <p className="text-3xl font-bold text-white">
                  <CountUp to={s.value} />
                  <span className="text-[#FF9900]">{s.suffix}</span>
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <CloudNetwork />
        </motion.div>
      </div>
    </section>
  );
}