import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="1"
            eyebrow="About"
            title={<>A conference <span className="text-gradient-cool">by the community</span>, for anyone learning the cloud.</>}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-base leading-relaxed text-white/70 sm:text-lg"
          >
            <p>
              AWS Community Day is a full day of talks, workshops, and hallway conversations
              organized by the local AWS community. Whether you&apos;ve just heard about
              &ldquo;the cloud&rdquo; or you&apos;ve been running production workloads for a
              decade, you&apos;ll find something here that moves you forward.
            </p>
            <p>
              Every speaker, mentor, and volunteer is here because they love this stuff and
              they want you to love it too. No gatekeeping. Beginners welcomed at the front.
            </p>
            <div className="glass mt-6 rounded-2xl p-5 font-mono text-sm text-white/70">
              <span className="text-[#22C55E]">$</span> whoami
              <br />
              <span className="text-white">builder</span>
              <br />
              <span className="text-[#22C55E]">$</span> deploy --your potential
              <br />
              <span className="text-[#FF9900]">→ Build Once. Scale Forever.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}