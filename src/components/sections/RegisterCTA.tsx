import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export function RegisterCTA() {
  return (
    <section id="register" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 p-10 sm:p-16"
          style={{
            background:
              "radial-gradient(1200px 400px at 20% 0%, rgba(214,163,75,0.14), transparent 62%), radial-gradient(1000px 400px at 100% 100%, rgba(148,163,184,0.12), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
          }}
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-[#D6A34B]">
              // registration.open
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
              Ready to <span className="text-[#D7E0EA]">Build the Future?</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              Grab a free ticket, save your seat in the workshops that matter to you, and come meet
              the community IRL. We&apos;ll bring the coffee.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton>
                Register Now <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={() => (window.location.hash = "#agenda")}>
                See what&apos;s on
              </MagneticButton>
              <span className="font-tech text-xs text-white/40">// Deploy Your Potential</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
