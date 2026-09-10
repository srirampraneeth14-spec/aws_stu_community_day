import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Plus,
} from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SubmissionGate } from "@/components/SubmissionGate";
import { theme, rgba } from "@/lib/theme";
import {
  HACKATHON_STATS,
  HACKATHON_CHALLENGE,
  HACKATHON_FORMAT,
  HACKATHON_ELIGIBILITY_CARDS,
  HACKATHON_SUBMISSION_CHECKLIST,
  HACKATHON_SUBMISSION_NOTE,
  HACKATHON_FINALIST_REQUIREMENTS,
  HACKATHON_TIMELINE,
  HACKATHON_RUBRIC,
  HACKATHON_JUDGES,
  HACKATHON_PRIZES,
  HACKATHON_PRIZE_POOL,
  HACKATHON_RULES,
  HACKATHON_FAQ,
  HACKATHON_REGISTRATION_URL,
  IS_HACKATHON_REGISTRATION_OPEN,
} from "@/data/hackathon";

/* ── Shared animation preset ── */
const fadeUp = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5 } as const,
};

/* ════════════════════════════════════════════════════════════════════════════ */

export function HackathonPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      {/* ── Top bar (simplified navbar) ── */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${rgba(theme.black, 0.82)} 0%, ${rgba(theme.black, 0.45)} 100%)`,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <nav
          aria-label="Hackathon navigation"
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Back link */}
          <Link
            to="/"
            hash="hackathon"
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          {/* Brand */}
          <a href="/#top" className="flex shrink-0 items-center gap-2.5 text-white">
            <span
              className="grid h-8 w-8 shrink-0 aspect-square place-items-center rounded-lg shadow-sm"
              style={{ background: theme.brandIconGradient }}
            >
              <Cloud className="h-4 w-4 shrink-0 text-black" />
            </span>
            <span className="hidden shrink-0 flex-col leading-none whitespace-nowrap sm:flex">
              <span className="text-sm font-bold tracking-tight">
                AWS Community Day
              </span>
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-white/45">
                AI Innovation Hackathon
              </span>
            </span>
          </a>

          {/* Register CTA */}
          {IS_HACKATHON_REGISTRATION_OPEN ? (
            <a
              href={HACKATHON_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-black shadow-[0_2px_12px_rgba(214,163,75,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(214,163,75,0.45)] sm:inline-flex"
              style={{
                background:
                  "linear-gradient(120deg, #B7791F, #D6A34B 60%, #B7791F)",
              }}
            >
              Register Now
            </a>
          ) : (
            <button
              onClick={() => {
                document
                  .getElementById("submit")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-purple-500/40 bg-purple-500/15 px-4 py-1.5 text-xs font-semibold text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all hover:bg-purple-500/25 sm:inline-flex cursor-pointer"
            >
              Submit Project <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  HERO                                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 15% 0%, rgba(124,58,237,0.18), transparent 70%), radial-gradient(500px 260px at 85% 20%, rgba(255,153,0,0.1), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Badge pill */}
          {IS_HACKATHON_REGISTRATION_OPEN ? (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,153,0,0.35)] bg-[rgba(255,153,0,0.08)] px-4 py-1.5 font-tech text-xs tracking-[0.08em] text-[#FFB84D]">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse-glow" />
              Registrations open · Closes September 15
            </span>
          ) : (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 font-tech text-xs tracking-[0.08em] text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse-glow" />
              Hackathon Submissions in Progress
            </span>
          )}

          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI Innovation{" "}
            <span className="text-gradient-aws">Hackathon</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
            <strong className="text-white">
              Building Real-World Agentic AI Systems.
            </strong>{" "}
            A two-stage competition organized by the AWS Student Builder Group,
            Raghu Engineering College, as part of AWS Student Community Day Vizag
            2026. Build a working agentic AI prototype, demo it live before an
            industry judging panel, and win.
          </p>

          <p className="mt-4 font-tech text-sm text-green">
            <span className="text-white/45">$ </span>
            build --demo --get-judged --win
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {IS_HACKATHON_REGISTRATION_OPEN ? (
              <a
                href={HACKATHON_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <MagneticButton>
                  Register Now <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </a>
            ) : (
              <MagneticButton
                onClick={() => {
                  document
                    .getElementById("submit")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Submit Project <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            )}
            <MagneticButton
              onClick={() => {
                document
                  .getElementById("challenge")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              The Challenge
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => {
                document
                  .getElementById("judging")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Judging Criteria
            </MagneticButton>
          </div>

          {/* Meta chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              "📅 Finals · Sep 19, 2026",
              "📍 Raghu Engineering College, Visakhapatnam",
              "👤 Solo or teams up to 2",
            ].map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 px-3 py-1 font-tech text-xs text-white/50"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Stats grid */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {HACKATHON_STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 bg-[#0c0814] px-5 py-4"
              >
                <span className="text-xl font-extrabold tracking-tight text-white">
                  {s.value}
                </span>
                <span className="font-tech text-[10px] uppercase tracking-[0.14em] text-white/45">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  THE CHALLENGE                                                     */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section id="challenge" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="1"
            eyebrow="Challenge"
            title={
              <>
                The{" "}
                <span className="text-gradient-cool">Challenge</span>
              </>
            }
          />

          {/* Quote block */}
          <motion.div
            {...fadeUp}
            className="mt-8 max-w-3xl rounded-r-2xl border-l-4 border-purple bg-[#0c0814] px-6 py-5 text-base font-medium leading-relaxed text-white/90"
          >
            Build a real-world{" "}
            <span className="text-purple-light">Agentic AI system</span> that
            can reason, plan, and take actions to solve a meaningful problem.
            Your solution should demonstrate genuine AI/agentic capability — not
            just a wrapper around an existing chatbot or API.
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-white/60"
          >
            {HACKATHON_CHALLENGE.description}
          </motion.p>

          {/* Domain chips */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {HACKATHON_CHALLENGE.domains.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/10 px-3 py-1 font-tech text-xs text-white/50"
              >
                {d}
              </span>
            ))}
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-white/60"
          >
            {HACKATHON_CHALLENGE.examples}
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  HOW IT WORKS                                                      */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="2"
            eyebrow="Format"
            title={
              <>
                How it{" "}
                <span className="text-gradient-cool">works</span>
              </>
            }
            subtitle="This is not a build-in-one-afternoon event. You get two weeks to build something real, and the finals on September 19 are a live demo and judging round."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {HACKATHON_FORMAT.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass overflow-hidden rounded-2xl p-6"
              >
                <span className="font-tech text-[11px] uppercase tracking-widest text-white/30">
                  {f.stage}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {f.title}
                </h3>
                <ul className="mt-4 grid gap-2 pl-4">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="list-disc text-sm leading-relaxed text-white/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  ELIGIBILITY & SUBMISSION                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="3"
            eyebrow="Eligibility & Submission"
            title={
              <>
                Who can enter &{" "}
                <span className="text-gradient-cool">what you submit</span>
              </>
            }
          />

          {/* Top row — 3-col eligibility cards */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {HACKATHON_ELIGIBILITY_CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass overflow-hidden rounded-2xl p-6"
              >
                <span className="font-tech text-[11px] uppercase tracking-widest text-white/30">
                  {c.idx}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom row — 2-col submission details */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="glass overflow-hidden rounded-2xl p-6"
            >
              <span className="font-tech text-[11px] uppercase tracking-widest text-white/30">
                submission.checklist
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Your Submission Must Include
              </h3>
              <ul className="mt-4 grid gap-2 pl-4">
                {HACKATHON_SUBMISSION_CHECKLIST.map((item) => (
                  <li
                    key={item}
                    className="list-disc text-sm leading-relaxed text-white/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-white/35">
                {HACKATHON_SUBMISSION_NOTE}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="glass overflow-hidden rounded-2xl p-6"
            >
              <span className="font-tech text-[11px] uppercase tracking-widest text-white/30">
                finalist.gate
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Minimum Finalist Requirements
              </h3>
              <ul className="mt-4 grid gap-2 pl-4">
                {HACKATHON_FINALIST_REQUIREMENTS.map((item) => (
                  <li
                    key={item}
                    className="list-disc text-sm leading-relaxed text-white/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  TIMELINE                                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section id="timeline" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="4"
            eyebrow="Timeline"
            title={
              <>
                Key{" "}
                <span className="text-gradient-cool">milestones</span>
              </>
            }
          />

          <motion.div
            {...fadeUp}
            className="relative mt-12 grid max-w-2xl gap-0"
          >
            {HACKATHON_TIMELINE.map((t, i) => (
              <div
                key={t.title}
                className="grid grid-cols-[6rem_1.5rem_1fr] gap-x-4 pb-7 sm:grid-cols-[9rem_1.5rem_1fr]"
              >
                {/* Date */}
                <span className="hidden text-right font-tech text-sm text-[#FFB84D] sm:block">
                  {t.date}
                </span>
                {/* Dot + line */}
                <div className="relative flex justify-center">
                  <span
                    className="relative z-10 mt-1 h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: t.isFinal ? theme.aws : theme.purpleMuted,
                      background: t.isFinal ? theme.aws : theme.black,
                    }}
                  />
                  {i < HACKATHON_TIMELINE.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-4 bottom-0 w-px -translate-x-1/2"
                      style={{ background: "rgba(255,255,255,0.16)" }}
                    />
                  )}
                </div>
                {/* Body */}
                <div>
                  <span className="mb-0.5 block font-tech text-xs text-[#FFB84D] sm:hidden">
                    {t.date}
                  </span>
                  <b className="text-sm font-bold text-white">{t.title}</b>
                  <span className="mt-0.5 block text-sm text-white/50">
                    {t.desc}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  JUDGING CRITERIA                                                  */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section id="judging" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="5"
            eyebrow="Judging Criteria"
            title={
              <>
                Judging Criteria —{" "}
                <span className="text-gradient-aws">100 Points</span>
              </>
            }
            subtitle="Every finalist is evaluated independently by each member of the judging panel against the framework below. Final score is the average of all judges' scores; the panel resolves any ties."
          />

          <div className="mt-10 grid max-w-3xl gap-3">
            {HACKATHON_RUBRIC.map((r, i) => (
              <motion.div
                key={r.criterion}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass overflow-hidden rounded-2xl px-5 py-4"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-bold text-white">
                    {r.criterion}
                  </span>
                  <span className="shrink-0 font-tech text-sm text-[#FFB84D]">
                    {r.points} pts
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${r.points}%`,
                      background: `linear-gradient(90deg, ${theme.purple}, ${theme.purpleLight})`,
                    }}
                  />
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-white/50">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  JUDGING PANEL                                                     */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="6"
            eyebrow="Judging Panel"
            title={
              <>
                Meet the{" "}
                <span className="text-gradient-cool">judges</span>
              </>
            }
            subtitle="An independent panel of industry and technology professionals with expertise across AI, cloud, data, and engineering. Each judge evaluates and scores every finalist team's work independently, and the panel selects the winning teams based on the consolidated scores."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {HACKATHON_JUDGES.map((j, i) => (
              <motion.div
                key={j.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass overflow-hidden rounded-2xl p-6 ${j.tba ? "border-dashed opacity-75" : ""}`}
              >
                <span className="inline-block rounded-full border border-[rgba(255,153,0,0.35)] px-3 py-0.5 font-tech text-[10px] uppercase tracking-[0.15em] text-[#FFB84D]">
                  Judge
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{j.name}</h3>
                <p className="text-sm font-semibold text-purple-light">
                  {j.org}
                </p>
                <p className="mt-2 text-sm text-white/60">{j.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  PRIZES                                                            */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="7"
            eyebrow="Prizes"
            title={
              <>
                What you{" "}
                <span className="text-gradient-aws">win</span>
              </>
            }
            subtitle="Winners receive AI & developer tools — subscriptions, platform credits, and builder tools to keep building and shipping after the hackathon."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {HACKATHON_PRIZES.map((p, i) => (
              <motion.div
                key={p.medal}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass relative overflow-hidden rounded-2xl p-6"
                style={
                  p.highlight
                    ? {
                        borderColor: "rgba(255,153,0,0.5)",
                        background: `linear-gradient(180deg, rgba(255,153,0,0.08), ${rgba(theme.blackElevated, 1)} 60%)`,
                      }
                    : undefined
                }
              >
                <span className="text-3xl">{p.medal}</span>
                <div className="mt-2 text-3xl font-black tracking-tight text-white">
                  {p.amount}
                </div>
                <p className="mt-1 whitespace-pre-line text-sm text-white/50">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 font-tech text-sm text-white/50">
            <span className="text-white/30">// </span>
            {HACKATHON_PRIZE_POOL}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  RULES                                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="8"
            eyebrow="Rules"
            title={
              <>
                Competition{" "}
                <span className="text-gradient-cool">rules</span>
              </>
            }
          />

          <motion.div {...fadeUp} className="mt-10 grid max-w-3xl gap-3">
            {HACKATHON_RULES.map((rule) => (
              <div
                key={rule}
                className="flex gap-3 text-sm leading-relaxed text-white/60"
              >
                <span className="shrink-0 font-tech text-green">→</span>
                {rule}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  FAQ                                                               */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="9"
            eyebrow="FAQ"
            title={
              <>
                Frequently{" "}
                <span className="text-gradient-cool">asked</span>
              </>
            }
          />

          <motion.div {...fadeUp} className="mt-10 max-w-3xl">
            <Accordion.Root type="single" collapsible className="space-y-3">
              {HACKATHON_FAQ.map((f, i) => (
                <Accordion.Item
                  key={f.q}
                  value={`item-${i}`}
                  className="glass overflow-hidden rounded-2xl"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-white transition-colors hover:bg-white/5 data-[state=open]:bg-white/5">
                      <span className="text-base font-semibold">{f.q}</span>
                      <Plus className="h-4 w-4 shrink-0 text-white/60 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden text-sm text-white/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="px-5 pb-5 pt-1 leading-relaxed">{f.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/*  SUBMISSION ACCESS                                                 */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section id="submit" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {IS_HACKATHON_REGISTRATION_OPEN ? (
            <motion.div
              {...fadeUp}
              className="relative overflow-hidden rounded-[32px] border border-white/10 p-10 text-center sm:p-16"
              style={{
                background:
                  "radial-gradient(1200px 400px at 20% 0%, rgba(255,255,255,0.06), transparent 62%), radial-gradient(1000px 400px at 100% 100%, rgba(255,255,255,0.04), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
              }}
            >
              <div className="grid-bg absolute inset-0 opacity-40" />
              <div className="relative">
                <p className="font-tech text-xs uppercase tracking-[0.3em] text-purple-light">
                  // registration.open
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
                  Ready to Build{" "}
                  <span className="text-gradient-cool">Something Real?</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
                  Two weeks to build. Five minutes to demo. One panel to convince.
                  <br />
                  Registration is open — closes September 15.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={HACKATHON_REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <MagneticButton>
                      Register for the Hackathon{" "}
                      <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <div>
              <SectionHeading
                id="10"
                eyebrow="Submission Access"
                title={
                  <>
                    Ready to Submit?{" "}
                    <span className="text-gradient-cool">Unlock Project Submission</span>
                  </>
                }
                subtitle="Registrations are now closed. Registered teams and builders can enter their Booking ID below to access the project submission portal."
                align="center"
              />
              <SubmissionGate />
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 text-xs text-white/35 sm:px-6 lg:px-8">
          <p>
            AI Innovation Hackathon · AWS Student Community Day Vizag 2026
          </p>
          <p className="font-tech">
            Organized by AWS Student Builder Group · Raghu Engineering College,
            Visakhapatnam
          </p>
        </div>
      </footer>
    </div>
  );
}
