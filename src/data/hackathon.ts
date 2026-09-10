// ─── Hackathon Data ──────────────────────────────────────────────────────────
// All content extracted from the reference hackathon page (public/index.html).
// Used by both the homepage preview section and the full /hackathon route.

import { REGISTRATION_URL } from "./event";

export const HACKATHON_REGISTRATION_URL = REGISTRATION_URL;
export const IS_HACKATHON_REGISTRATION_OPEN = false;

/** Project submission form URL */
export const SUBMISSION_FORM_URL: string = "https://forms.gle/z22eHTawTrEtATsN9";

// ─── Stats ───────────────────────────────────────────────────────────────────

export const HACKATHON_STATS = [
  { value: "₹30,000", label: "Prize pool · AI & dev tools" },
  { value: "Up to 10", label: "Finalist teams" },
  { value: "1 Week", label: "Build period" },
  { value: "Sep 16", label: "Submission deadline" },
] as const;

// ─── Challenge ───────────────────────────────────────────────────────────────

export const HACKATHON_CHALLENGE = {
  quote:
    "Build a real-world Agentic AI system that can reason, plan, and take actions to solve a meaningful problem. Your solution should demonstrate genuine AI/agentic capability — not just a wrapper around an existing chatbot or API.",
  description:
    "Pick any problem domain you care about. What matters is that your system does real work: multi-step reasoning, tool use, autonomous decision-making, memory and context management, or end-to-end task completion.",
  domains: [
    "finance",
    "healthcare",
    "education",
    "enterprise productivity",
    "developer tools",
    "data",
    "sustainability",
    "consumer apps",
    "your own idea",
  ],
  examples:
    "Need a starting point? Think of an agent that reads research papers and produces briefs, automates a campus workflow end to end, monitors financial data and acts on it, or triages and resolves support requests on its own.",
} as const;

// ─── Format (How It Works) ───────────────────────────────────────────────────

export const HACKATHON_FORMAT = [
  {
    stage: "stage.01 · build & submit",
    title: "Open Build Round — Online",
    items: [
      "Register solo or as a team (up to 2 members)",
      "Build your working prototype during the build period",
      "Submit your project by September 16, 11:59 PM",
      "Eligible submissions are reviewed and up to 10 finalist teams are selected for the final judging round",
    ],
  },
  {
    stage: "stage.02 · finals · sep 19 · in person",
    title: "Final Demo & Judging Round",
    items: [
      "Finalists present at Raghu Engineering College during AWS Student Community Day 2026",
      "5 minutes — live demo + presentation",
      "3 minutes — Q&A with the judging panel",
      "Each judge independently scores every finalist; the judging panel selects the winning teams, announced at the event",
    ],
  },
] as const;

// ─── Eligibility & Submission ────────────────────────────────────────────────

export const HACKATHON_ELIGIBILITY_CARDS = [
  {
    idx: "01 · eligibility",
    title: "Open to All Students",
    body: "Students from Raghu Engineering College and any other college or university may participate. Individual participants or teams of up to 2.",
  },
  {
    idx: "02 · tech stack",
    title: "Any Technology",
    body: "Use the stack of your choice — any models, frameworks, or infrastructure. Use of AWS services is encouraged but not mandatory.",
  },
  {
    idx: "03 · requirement",
    title: "Working Prototype Required",
    body: "Slides and ideas alone don't advance. Every submission must include a functioning implementation you can demonstrate live.",
  },
] as const;

export const HACKATHON_SUBMISSION_CHECKLIST = [
  "Working prototype — a usable implementation, not just an idea",
  "GitHub repository — public, or private with organizer access",
  "One-page solution brief — problem, solution, AI/agent architecture, tech stack, key technical decisions, and observed results",
  "2–3 minute demo video — showing the working system",
] as const;

export const HACKATHON_SUBMISSION_NOTE =
  "The submission form, a solution brief template, and a participant guide will be emailed to all registered teams well before the deadline.";

export const HACKATHON_FINALIST_REQUIREMENTS = [
  "Working prototype: required",
  "Original work built for this hackathon: required",
  "Meaningful AI/agentic component: required",
  "Complete submission before deadline: required",
  "Team able to demonstrate and explain its own implementation: required",
] as const;

// ─── Timeline ────────────────────────────────────────────────────────────────

export const HACKATHON_TIMELINE = [
  {
    date: "Sep 10",
    title: "Submissions Open",
    desc: "Submit your project.",
    isFinal: true,
  },
  {
    date: "Sep 16",
    title: "Submission Deadline",
    desc: "Prototype, GitHub repo, solution brief, and demo video due.",
    isFinal: false,
  },
  {
    date: "Sep 17",
    title: "Finalists Announced",
    desc: "Up to 10 teams selected for the final round.",
    isFinal: false,
  },
  {
    date: "Sep 19",
    title: "Final Demo & Judging Round",
    desc: "Live demos and judging at Raghu Engineering College, followed by results and awards. Exact session timing will be announced with the event agenda.",
    isFinal: false,
  },
] as const;

// ─── Judging Rubric ──────────────────────────────────────────────────────────

export const HACKATHON_RUBRIC = [
  {
    criterion: "Technical Implementation & System Architecture",
    points: 25,
    desc: "Quality of implementation, system design, appropriate use of models/APIs/tools/infrastructure, engineering decisions, completeness of the working system.",
  },
  {
    criterion: "Agentic AI Design & Capability",
    points: 20,
    desc: "Genuine agentic behavior — reasoning and planning, tool use, decision-making, multi-step execution, memory/context management, autonomous task completion.",
  },
  {
    criterion: "Evaluation, Reliability & Responsible AI",
    points: 20,
    desc: "How you evaluate your system: accuracy, robustness, failure handling, hallucination mitigation, safety considerations — evidence the solution actually works.",
  },
  {
    criterion: "Innovation & Technical Originality",
    points: 15,
    desc: "Novelty of the approach and originality in applying AI — going beyond a basic wrapper or an obvious implementation.",
  },
  {
    criterion: "Real-World Utility & Practicality",
    points: 10,
    desc: "Importance of the problem, usefulness and feasibility of the solution, ability to operate in a realistic environment, potential impact.",
  },
  {
    criterion: "Working Demo & Technical Communication",
    points: 10,
    desc: "Quality of the live demonstration and your ability to explain architecture, design decisions, limitations, and results — including answers to judges' technical questions.",
  },
] as const;

// ─── Judging Panel ───────────────────────────────────────────────────────────

export const HACKATHON_JUDGES = [
  {
    name: "Ramakant Yadav",
    org: "Founder @ Scalar Field",
    bio: "AI, technology & entrepreneurship — building AI-driven products.",
    tba: false,
  },
  {
    name: "Neha Prasad",
    org: "Analytics Specialist @ Amazon Web Services",
    bio: "Data, analytics, AI & cloud — advising organizations on large-scale data and AI solutions.",
    tba: false,
  },
  {
    name: "To Be Announced",
    org: "Industry Expert",
    bio: "Additional panel members will be announced soon.",
    tba: true,
  },
] as const;

// ─── Prizes ──────────────────────────────────────────────────────────────────

export const HACKATHON_PRIZES = [
  {
    medal: "🥇",
    amount: "₹15,000",
    desc: "worth of AI & Developer Tools\n+ Winner certificate",
    highlight: true,
  },
  {
    medal: "🥈",
    amount: "₹10,000",
    desc: "worth of AI & Developer Tools\n+ Winner certificate",
    highlight: false,
  },
  {
    medal: "🥉",
    amount: "₹5,000",
    desc: "worth of AI & Developer Tools\n+ Winner certificate",
    highlight: false,
  },
] as const;

export const HACKATHON_PRIZE_POOL =
  "total prize pool: ₹30,000 worth of AI & Developer Tools · all finalists receive finalist certificates";

// ─── Rules ───────────────────────────────────────────────────────────────────

export const HACKATHON_RULES = [
  "All work must be original and built for this hackathon. Pre-existing projects are not eligible.",
  "Open-source frameworks, public APIs, and foundation models may be used — clearly disclose what you built versus what you used.",
  "A working prototype is mandatory. Idea-only or slides-only submissions will not advance to the final round.",
  "Teams must be able to demonstrate and explain their own implementation during judging.",
  "Plagiarism or misrepresentation of work leads to disqualification.",
  "The judging panel's decisions are final.",
] as const;

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const HACKATHON_FAQ = [
  {
    q: "Can I participate alone?",
    a: "Yes. You can compete individually or in a team of up to 2 members.",
  },
  {
    q: "Do I have to use AWS?",
    a: "No. You're free to use any technology stack. AWS services are encouraged but not mandatory.",
  },
  {
    q: "I'm not from Raghu Engineering College. Can I enter?",
    a: "Yes. The hackathon is open to students from any college or university.",
  },
  {
    q: 'What counts as "agentic AI"?',
    a: "Systems that go beyond a single prompt-response: reasoning and planning, calling tools/APIs, making decisions, executing multi-step workflows, managing memory or context, or completing tasks autonomously.",
  },
  {
    q: "Where and how do I submit?",
    a: "A submission form link, along with a solution brief template and participant guide, will be emailed to all registered teams before the deadline. You'll submit your GitHub repo link, demo video link, and solution brief through the form.",
  },
  {
    q: "Do I need to pay for AI APIs to build my prototype?",
    a: "No. Free tiers from several LLM providers are more than enough for a working prototype. A resources list will be shared with registered teams.",
  },
  {
    q: "Do all team members need to attend the finals in person?",
    a: "Finalist teams present in person at Raghu Engineering College on September 19. At least one member must be present to demo; full-team attendance is strongly encouraged.",
  },
] as const;
