import { useCallback, useEffect, useRef, useState } from "react";
import { renderBadge } from "@/lib/renderBadge";

/*
 * ════════════════════════════════════════════════════════════════
 *  BadgeOverlay — Polaroid camera badge generator overlay
 *
 *  EJECTION TECHNIQUE (UNMODIFIED):
 *    <div class="eject-window" style="overflow:hidden; height:Xpx">
 *      <img style="transform:translateY(-100%) → translateY(0%)" />
 *    </div>
 *    Top of photo appears first at the slot seam, slides down.
 *    After full reveal → settle-tip animation (rotate 1.5deg + 3px drop).
 * ════════════════════════════════════════════════════════════════
 */

type OverlayStage = "intro" | "shutter" | "developing" | "ejected" | "complete";

interface BadgeOverlayProps {
  photoSrc: string;
  name: string;
  onClose: () => void;
  onReset: () => void;
}

export function BadgeOverlay({ photoSrc, name, onClose, onReset }: BadgeOverlayProps) {
  const [stage, setStage] = useState<OverlayStage>("intro");
  const [badgeDataUrl, setBadgeDataUrl] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const INTRO_MS = reducedMotion ? 50 : 400;
  const SHUTTER_MS = reducedMotion ? 50 : 350;
  const EJECT_DELAY_MS = reducedMotion ? 50 : 300; // pause before eject starts
  const EJECT_DURATION_MS = reducedMotion ? 100 : 1100; // translateY transition
  const SETTLE_MS = reducedMotion ? 50 : 200;

  /* ── Appear ── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShowOverlay(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Stage machine (Automatic capture flow) ── */
  useEffect(() => {
    let timer: number;
    switch (stage) {
      case "intro":
        timer = window.setTimeout(() => setStage("shutter"), INTRO_MS);
        break;
      case "shutter":
        renderBadge(photoSrc, name)
          .then(({ canvas, dataUrl }) => {
            canvasRef.current = canvas;
            setBadgeDataUrl(dataUrl);
          })
          .catch(() => onClose());
        timer = window.setTimeout(() => setStage("developing"), SHUTTER_MS);
        break;
      case "developing":
        // After a short pause, trigger the translateY reveal
        timer = window.setTimeout(() => {
          setPhotoRevealed(true);
        }, EJECT_DELAY_MS);
        break;
      case "ejected":
        timer = window.setTimeout(() => setStage("complete"), SETTLE_MS);
        break;
      default:
        return;
    }
    return () => window.clearTimeout(timer);
  }, [stage, photoSrc, name, onClose, INTRO_MS, SHUTTER_MS, EJECT_DELAY_MS, SETTLE_MS]);

  /* When the translateY transition ends → move to ejected (settle) */
  const handleTransitionEnd = useCallback(() => {
    if (stage === "developing" && photoRevealed) {
      setStage("ejected");
    }
  }, [stage, photoRevealed]);

  /* ── Focus trap + Escape ── */
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    closeRef.current?.focus();
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  /* ── Download ── */
  const onDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "scd-2026-badge.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }, "image/png");
  }, []);

  /* ── Derived state ── */
  const isShutter = stage === "shutter";
  const isDeveloping = stage === "developing";
  const isEjected = stage === "ejected";
  const isComplete = stage === "complete";
  const showDownload = isComplete;

  /* Camera body animation class */
  const cameraAnimClass = (() => {
    if (reducedMotion) return "";
    if (stage === "intro") return "cam-breathe";
    if (isShutter) return "cam-recoil";
    // Recoil again at ejection start as a "push" cue
    if (isDeveloping && photoRevealed) return "cam-recoil";
    return "";
  })();

  /* Badge aspect ratio: template is ~3:4 portrait */
  const BADGE_ASPECT = 3 / 2; // height / width  (new template is 1024×1536 = 2:3)

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Badge generator"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: showOverlay ? "blur(6px)" : "blur(0px)",
        backgroundColor: showOverlay ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0)",
        transition: "backdrop-filter 0.3s, background-color 0.3s",
        overflowY: "auto",
        padding: "1rem",
      }}
    >
      {/* Google Font for SCD 2026 wordmark */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&display=swap"
      />

      {/* Close button */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close badge generator"
        style={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.5)",
          color: "rgba(255,255,255,0.8)",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        ✕
      </button>

      {/* Full-screen flash strobe */}
      {isShutter && (
        <div
          className={reducedMotion ? "" : "cam-flash"}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.92)",
            zIndex: 10001,
            pointerEvents: "none",
            opacity: reducedMotion ? 0 : undefined,
          }}
        />
      )}

      {/*
        ══════════════════════════════════════════════════
        CONTENT WRAPPER
        Fixed 340px width on desktop (260px on mobile <480px).
        Centered via parent flexbox, no transform scaling.
        ══════════════════════════════════════════════════
      */}
      <div
        className="camera-overlay-frame"
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: showOverlay ? 1 : 0,
          transform: showOverlay ? "none" : "translateY(16px)",
          transition: reducedMotion
            ? "opacity 0.1s"
            : "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        {/*
          ══════════════════════════════════════════════════
          CAMERA UNIT — camera (with embedded slot) + eject window
          ══════════════════════════════════════════════════
        */}
        <div style={{ width: "100%", position: "relative" }}>
          {/* Camera body wrapper — carries breathe/recoil animations */}
          <div className={cameraAnimClass} style={{ transformOrigin: "bottom center" }}>
            {/* ───────────────────────────────────
                CAMERA BODY — 340px fixed rounded square
                Rich darker lavender gradient:
                linear-gradient(135deg, #B99FE0 0%, #8C6FC7 50%, #5B3D96 100%)
                ─────────────────────────────────── */}
            <div
              className="camera-overlay-body"
              style={{
                borderRadius: "24%",
                background: "linear-gradient(135deg, #B99FE0 0%, #8C6FC7 50%, #5B3D96 100%)",
                boxShadow:
                  "0 12px 36px -6px rgba(45,20,80,0.65), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(35,15,65,0.4)",
                border: "1.5px solid rgba(220,200,250,0.4)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* ── RECTANGULAR FLASH — Left side of AWS REC heading ── */}
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "44px",
                  width: "32px",
                  height: "17px",
                  borderRadius: "4px",
                  background: "linear-gradient(145deg, #A88FCF 0%, #7E5DB2 100%)",
                  boxShadow:
                    "inset 0 1px 2px rgba(40,20,70,0.35), inset 0 -1px 1px rgba(255,255,255,0.45), 0 1px 3px rgba(40,15,70,0.3)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  zIndex: 6,
                  overflow: "hidden",
                }}
              >
                {/* Horizontal Fresnel prism lines */}
                <div
                  style={{
                    position: "absolute",
                    inset: "2px",
                    borderRadius: "2px",
                    background:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 4px)",
                  }}
                />
                {isShutter && !reducedMotion && (
                  <div
                    className="cam-flash"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "4px",
                      background: "rgba(255,255,255,0.95)",
                    }}
                  />
                )}
              </div>

              {/* ── "AWS REC" — Centered directly ABOVE the lens, bold purple #6B21A8 ── */}
              <div
                style={{
                  position: "absolute",
                  top: "36px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-tech)",
                    fontWeight: 800,
                    fontSize: "16px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#6B21A8",
                    textShadow: "0 1px 2px rgba(255,255,255,0.45)",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}
                >
                  AWS REC
                </span>
              </div>

              {/* ── GREEN STATUS LED — Right side, close to AWS REC ── */}
              <div
                style={{
                  position: "absolute",
                  top: "39px",
                  right: "54px",
                  width: "12px",
                  height: "12px",
                  zIndex: 6,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background:
                      isDeveloping || isEjected || isComplete ? "#6ee76e" : "rgba(60,35,95,0.7)",
                    boxShadow: isDeveloping ? "0 0 10px 3px rgba(110,231,110,0.75)" : "none",
                    transition: "background 0.3s, box-shadow 0.3s",
                  }}
                />
                {isDeveloping && !reducedMotion && (
                  <div
                    className="animate-pulse-glow"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "rgba(110,231,110,0.6)",
                      filter: "blur(4px)",
                    }}
                  />
                )}
              </div>

              {/* ── LOGO 2 (Left of lens — Community Logo, pure transparent PNG) ── */}
              <img
                src="/logo2.png"
                alt="Community Logo"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                  zIndex: 5,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />

              {/* ── LOGO 1 (Right of lens — AWS SCD Logo, ENLARGED / BIG) ── */}
              <img
                src="/logo1.png"
                alt="AWS SCD Logo"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "68px",
                  height: "68px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                  zIndex: 5,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />

              {/* ── CENTER LENS — ~50% of body, rich saturated purple ── */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50%",
                  aspectRatio: "1",
                  zIndex: 4,
                }}
              >
                {/* Outer housing ring — deeper purple */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7C56B8 0%, #5B3D96 50%, #432874 100%)",
                    padding: "8%",
                    boxShadow:
                      "0 4px 14px rgba(35,15,65,0.45), inset 0 1px 1px rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "stretch",
                  }}
                >
                  {/* Middle ring — deep dark violet */}
                  <div
                    style={{
                      width: "100%",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #5B3D96 0%, #432874 50%, #301B54 100%)",
                      padding: "7%",
                      boxShadow: "inset 0 1px 4px rgba(0,0,0,0.35)",
                      display: "flex",
                      alignItems: "stretch",
                      position: "relative",
                    }}
                  >
                    {/* Inner glass — dark violet-black */}
                    <div
                      className={isShutter && !reducedMotion ? "cam-iris" : ""}
                      style={{
                        width: "100%",
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle at 35% 30%, #38205C 0%, #1A0D30 60%, #0D0518 100%)",
                        boxShadow:
                          "inset 0 4px 18px rgba(0,0,0,0.85), 0 0 0 1px rgba(140,100,200,0.15)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Inner subtle ring */}
                      <div
                        style={{
                          position: "absolute",
                          inset: "18%",
                          borderRadius: "50%",
                          border: "1px solid rgba(180,150,230,0.12)",
                        }}
                      />
                      {/* Specular highlight — subtle small white blob, max 15% diameter */}
                      <div
                        style={{
                          position: "absolute",
                          top: "14%",
                          left: "16%",
                          width: "14%",
                          height: "11%",
                          borderRadius: "50%",
                          background:
                            "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)",
                          filter: "blur(2px)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── "SCD 2026" — Centered in the gap BETWEEN bottom of lens and top of slot ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: "17px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "#581C87",
                    textShadow: "0 1px 2px rgba(255,255,255,0.35)",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  SCD 2026
                </span>
              </div>

              {/* ───────────────────────────────────
                  EMBEDDED SLOT — Horizontal cut line
                  inside the lower area of camera face.
                  Width: 100% of camera body.
                  ─────────────────────────────────── */}
              <div
                style={{
                  width: "100%",
                  height: "12px",
                  marginTop: "auto",
                  background: "linear-gradient(180deg, #180D28 0%, #0C0516 100%)",
                  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.1)",
                  position: "relative",
                  zIndex: 6,
                }}
              />
            </div>
          </div>

          {/* ───────────────────────────────────
              EJECT WINDOW — (UNMODIFIED ANIMATION)
              Directly below the slot's bottom edge (zero gap).
              Photo inside starts at translateY(-100%),
              animates to translateY(0%).
              ─────────────────────────────────── */}
          <div
            style={{
              width: "100%",
              aspectRatio: `1 / ${BADGE_ASPECT}`,
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
              marginTop: "0",
            }}
          >
            {/* Tilt wrapper — fires ONLY after translateY finishes */}
            <div
              className={isEjected && !reducedMotion ? "cam-settle" : ""}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                transformOrigin: "top center",
                transform:
                  isComplete && !reducedMotion ? "rotate(1.5deg) translateY(3px)" : undefined,
              }}
            >
              {/* The sliding photo — translateY(-100%) → translateY(0%) */}
              <div
                onTransitionEnd={handleTransitionEnd}
                style={{
                  position: "absolute",
                  top: 0,
                  left: "8%",
                  width: "84%",
                  height: "100%",
                  transform: photoRevealed ? "translateY(0%)" : "translateY(-100%)",
                  transition: reducedMotion
                    ? "transform 0.1s linear"
                    : `transform ${EJECT_DURATION_MS}ms cubic-bezier(.22,.8,.28,1)`,
                }}
              >
                {/* Polaroid card */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "white",
                    padding: "6px 6px 28px 6px",
                    boxSizing: "border-box",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={badgeDataUrl ?? "/main_template.png"}
                    alt="Your generated badge"
                    style={{
                      display: "block",
                      width: "100%",
                      flex: 1,
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ═══ End camera unit ═══ */}

        {/* ── Download area ── */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            opacity: showDownload ? 1 : 0,
            transform: showDownload ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.35s 0.15s, transform 0.35s 0.15s",
            pointerEvents: showDownload ? "auto" : "none",
          }}
        >
          <button
            type="button"
            onClick={onDownload}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight text-black shadow-[0_10px_30px_-12px_rgba(255,153,0,0.45)] transition-all hover:shadow-[0_10px_40px_-10px_rgba(255,153,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
            style={{
              background: "linear-gradient(120deg, #e68a00, #FF9900 60%, #e68a00)",
            }}
          >
            {downloaded ? "Downloaded ✓" : "Download Badge"}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white/90"
          >
            Generate another
          </button>
        </div>
      </div>
    </div>
  );
}
