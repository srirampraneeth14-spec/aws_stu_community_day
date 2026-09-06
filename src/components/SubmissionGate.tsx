import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Loader2,
  AlertCircle,
  ArrowRight,
  User,
  Mail,
  Ticket,
  Briefcase,
  GraduationCap,
  Building2,
  CalendarDays,
  BookOpen,
  RotateCcw,
  ShieldCheck,
  Hash,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SUBMISSION_FORM_URL } from "@/data/hackathon";
import { theme, rgba } from "@/lib/theme";

/* ── Types ── */

interface ParticipantData {
  booking_id: string;
  name: string;
  email: string;
  ticket_name: string;
  profession: string;
  college_name: string | null;
  academic_year: string | null;
  company_name: string | null;
  department: string | null;
  created_at: string;
  participant_order: string | number | null;
}

/* ── Helpers ── */

function maskEmail(email: string | null | undefined): string {
  if (!email) return "••••••••";
  const [local, domain] = email.split("@");
  if (!domain) return "****";
  const visible = local.slice(0, 2);
  const masked = "*".repeat(Math.max(local.length - 2, 2));
  return `${visible}${masked}@${domain}`;
}

function formatParticipantOrder(order: string | number | null | undefined): string {
  if (!order) return "Registered";
  const str = String(order).trim();
  if (str.toLowerCase().startsWith("participant")) return str;
  if (str.startsWith("#")) return `Participant ${str}`;
  return `Participant #${str}`;
}

const COOLDOWN_MS = 3000;

/* ── Component ── */

export function SubmissionGate() {
  const [bookingId, setBookingId] = useState("");
  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);
  const lastAttempt = useRef(0);

  const isSubmissionUrlReady =
    SUBMISSION_FORM_URL !== "PLACEHOLDER_ADD_LINK_HERE" &&
    SUBMISSION_FORM_URL.startsWith("http");

  const handleVerify = useCallback(async () => {
    const trimmed = bookingId.trim();
    if (!trimmed) {
      setError("Please enter your Booking ID.");
      return;
    }

    /* Client-side rate-limit */
    const now = Date.now();
    if (now - lastAttempt.current < COOLDOWN_MS) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), COOLDOWN_MS);
      return;
    }
    lastAttempt.current = now;

    setLoading(true);
    setError(null);

    try {
      let record: ParticipantData | null = null;

      // 1. Try secure RPC function first
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        "get_participant_with_order",
        { p_booking_id: trimmed },
      );

      if (!rpcError && rpcData && Array.isArray(rpcData) && rpcData.length > 0) {
        record = rpcData[0] as ParticipantData;
      } else {
        // 2. Fallback to direct query on eligible_bookings table
        const { data: tableData, error: tableError } = await supabase
          .from("eligible_bookings")
          .select(
            "booking_id, name, email, ticket_name, profession, college_name, academic_year, company_name, department, participant_order, created_at",
          )
          .ilike("booking_id", trimmed)
          .maybeSingle();

        if (!tableError && tableData) {
          record = tableData as ParticipantData;
        } else if (rpcError && tableError) {
          console.error("Supabase query error:", { rpcError, tableError });
          setError("Failed to verify Booking ID. Please check your database connection.");
          setLoading(false);
          return;
        }
      }

      if (!record) {
        setError("Booking ID not found — please check and try again.");
        setLoading(false);
        return;
      }

      setParticipant(record);
    } catch (err) {
      console.error("Verification error:", err);
      setError("Network error — please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  const handleReset = useCallback(() => {
    setParticipant(null);
    setBookingId("");
    setError(null);
  }, []);

  const isStudent =
    participant?.profession?.toLowerCase() === "student";

  /* ── Render ── */

  return (
    <div className="mt-12 mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {!participant ? (
          /* ───────── INPUT STATE ───────── */
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-2xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${rgba(theme.purpleDark, 0.15)}, ${rgba(theme.black, 0.6)})`,
            }}
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${rgba(theme.purple, 0.3)}, ${rgba(theme.purpleDark, 0.3)})`,
                  }}
                >
                  <ShieldCheck className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Verify Your Registration
                  </h3>
                  <p className="text-xs text-white/40">
                    Enter your booking ID to unlock the submission form
                  </p>
                </div>
              </div>

              {/* Input row */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    placeholder="e.g. AWSCD-1234"
                    value={bookingId}
                    onChange={(e) => {
                      setBookingId(e.target.value);
                      if (error) setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleVerify();
                    }}
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 disabled:opacity-50"
                  />
                </div>
                <button
                  onClick={handleVerify}
                  disabled={loading || cooldown || !bookingId.trim()}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    background: loading
                      ? rgba(theme.purple, 0.3)
                      : `linear-gradient(135deg, ${theme.purple}, ${theme.purpleDark})`,
                  }}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  {loading
                    ? "Verifying…"
                    : cooldown
                      ? "Wait…"
                      : "Verify"}
                </button>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 flex items-start gap-2 overflow-hidden rounded-lg border border-rose-500/20 bg-rose-500/[0.08] px-3 py-2.5"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    <p className="text-xs text-rose-300">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locked submission button */}
            <div className="border-t border-white/[0.06] px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/25">
                  <Lock className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    Submit Project — Locked
                  </span>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/20">
                  Verify to unlock
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ───────── VERIFIED STATE ───────── */
          <motion.div
            key="verified"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl border border-emerald-500/20"
            style={{
              background: `linear-gradient(135deg, ${rgba("#065F46", 0.15)}, ${rgba(theme.black, 0.6)})`,
            }}
          >
            {/* Verified header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Verified ✓
                  </p>
                  <p className="text-[10px] text-white/40">
                    Booking ID confirmed
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-white/50 transition-colors hover:border-white/20 hover:text-white/70 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Change ID
              </button>
            </div>

            {/* Participant details */}
            <div className="px-6 py-5 sm:px-8">
              {/* Participant order badge */}
              <div className="mb-5 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${rgba(theme.purple, 0.25)}, ${rgba(theme.purpleDark, 0.25)})`,
                    color: theme.purpleLight,
                  }}
                >
                  <User className="h-3 w-3" />
                  {formatParticipantOrder(participant.participant_order)}
                </span>
                <span className="font-tech text-[10px] uppercase tracking-wider text-white/25">
                  registered
                </span>
              </div>

              {/* Details grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailRow
                  icon={<User className="h-3.5 w-3.5" />}
                  label="Name"
                  value={participant.name}
                />
                <DetailRow
                  icon={<Mail className="h-3.5 w-3.5" />}
                  label="Email"
                  value={maskEmail(participant.email)}
                />
                <DetailRow
                  icon={<Ticket className="h-3.5 w-3.5" />}
                  label="Ticket"
                  value={participant.ticket_name}
                />
                <DetailRow
                  icon={<Briefcase className="h-3.5 w-3.5" />}
                  label="Profession"
                  value={participant.profession}
                />

                {/* Conditional student fields */}
                {isStudent && participant.college_name && (
                  <DetailRow
                    icon={<Building2 className="h-3.5 w-3.5" />}
                    label="College"
                    value={participant.college_name}
                  />
                )}
                {isStudent && participant.academic_year && (
                  <DetailRow
                    icon={<CalendarDays className="h-3.5 w-3.5" />}
                    label="Year"
                    value={participant.academic_year}
                  />
                )}
                {isStudent && participant.department && (
                  <DetailRow
                    icon={<BookOpen className="h-3.5 w-3.5" />}
                    label="Department"
                    value={participant.department}
                  />
                )}

                {/* Conditional company field for working professionals */}
                {!isStudent && participant.company_name && (
                  <DetailRow
                    icon={<Building2 className="h-3.5 w-3.5" />}
                    label="Company"
                    value={participant.company_name}
                  />
                )}
              </div>
            </div>

            {/* Unlocked submission button */}
            <div className="border-t border-emerald-500/10 px-6 py-4 sm:px-8">
              {isSubmissionUrlReady ? (
                <a
                  href={SUBMISSION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,197,94,0.25)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #059669, #047857)",
                  }}
                >
                  <Unlock className="h-4 w-4" />
                  Submit Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                <div className="flex flex-col items-center gap-2 py-1">
                  <div
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white/40"
                    style={{
                      background: rgba(theme.purpleDark, 0.2),
                    }}
                  >
                    <Unlock className="h-4 w-4" />
                    Submit Your Project
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] text-white/30">
                    Submission form link will be available soon
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Detail Row Sub-component ── */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-white/40">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-white/30">
          {label}
        </p>
        <p className="truncate text-sm text-white/80">{value || "—"}</p>
      </div>
    </div>
  );
}
