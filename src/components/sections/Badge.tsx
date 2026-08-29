import { motion } from "framer-motion";
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Camera, FileImage, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BadgeOverlay } from "@/components/BadgeOverlay";
import { createBadgeBackground, renderBadgeFromCache } from "@/lib/renderBadge";

const TEMPLATE_SRC = "/main_template.png";

export function Badge() {
  const [name, setName] = useState("");
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [previewBadgeUrl, setPreviewBadgeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const bgCacheRef = useRef<HTMLCanvasElement | null>(null);
  const nameRef = useRef(name);
  nameRef.current = name;

  /* ── Cleanup blob URLs ── */
  useEffect(() => {
    return () => {
      if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
    };
  }, [uploadPreviewUrl]);

  /* ── Cache background when photo changes (expensive, runs once per photo) ── */
  useEffect(() => {
    if (!uploadPreviewUrl) {
      bgCacheRef.current = null;
      setPreviewBadgeUrl(null);
      return;
    }

    let cancelled = false;
    bgCacheRef.current = null;

    createBadgeBackground(uploadPreviewUrl)
      .then((bgCanvas) => {
        if (cancelled) return;
        bgCacheRef.current = bgCanvas;
        const { dataUrl } = renderBadgeFromCache(bgCanvas, nameRef.current);
        setPreviewBadgeUrl(dataUrl);
      })
      .catch(() => {
        if (cancelled) return;
        bgCacheRef.current = null;
        /* silently fall back to template */
        setPreviewBadgeUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [uploadPreviewUrl]);

  /* ── Fast name-only re-render on each keystroke (rAF, no debounce) ── */
  useEffect(() => {
    const bg = bgCacheRef.current;
    if (!bg) return;

    const rafId = requestAnimationFrame(() => {
      const { dataUrl } = renderBadgeFromCache(bg, name);
      setPreviewBadgeUrl(dataUrl);
    });

    return () => cancelAnimationFrame(rafId);
  }, [name]);

  /* ── File upload ── */
  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
    const nextUrl = URL.createObjectURL(file);
    setUploadPreviewUrl(nextUrl);
    setPreviewBadgeUrl(null);
    setError(null);
  };

  /* ── Open overlay (validates first) ── */
  const onGenerate = useCallback(() => {
    const trimmedName = name.trim();
    if (!uploadPreviewUrl) {
      setError("Please upload your photo first.");
      return;
    }
    if (!trimmedName) {
      setError("Please write your name before generating the badge.");
      return;
    }
    setError(null);
    setOverlayOpen(true);
  }, [name, uploadPreviewUrl]);

  /* ── Close overlay, restore focus ── */
  const onCloseOverlay = useCallback(() => {
    setOverlayOpen(false);
    // Restore focus to the generate button
    requestAnimationFrame(() => generateBtnRef.current?.focus());
  }, []);

  /* ── Reset overlay: clear everything for a fresh badge ── */
  const onResetOverlay = useCallback(() => {
    if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
    setUploadPreviewUrl(null);
    setPreviewBadgeUrl(null);
    setName("");
    bgCacheRef.current = null;
    setOverlayOpen(false);
    requestAnimationFrame(() => generateBtnRef.current?.focus());
  }, [uploadPreviewUrl]);

  return (
    <>
      <section id="badge" className="relative pt-6 pb-24 sm:pt-8 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="9"
            eyebrow="Badge"
            title={
              <>
                Create your <span className="text-gradient-aws">event badge</span>.
              </>
            }
            subtitle="Upload your image, add your name, and instantly generate your attendee badge."
          />

          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* ── Left column: live badge preview ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="glass overflow-hidden rounded-3xl border border-white/10"
            >
              <img
                src={previewBadgeUrl ?? TEMPLATE_SRC}
                alt="AWS Community Day badge preview"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* ── Right column: inputs + generate ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="glass flex flex-col justify-center rounded-3xl border border-white/10 p-6 sm:p-8"
            >
              <ol className="space-y-6">
                <li>
                  <label
                    htmlFor="badge-photo"
                    className="font-tech text-xs uppercase tracking-[0.24em] text-purple-light"
                  >
                    01 · Upload the image
                  </label>
                  <input
                    id="badge-photo"
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    className="mt-3 block w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black hover:border-white/30"
                  />
                </li>

                <li>
                  <label
                    htmlFor="badge-name"
                    className="font-tech text-xs uppercase tracking-[0.24em] text-purple-light"
                  >
                    02 · Write your name
                  </label>
                  <input
                    id="badge-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="mt-3 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-purple-light/60 focus:outline-none"
                  />
                </li>

                <li>
                  <p className="font-tech text-xs uppercase tracking-[0.24em] text-purple-light">
                    03 · Generate badge
                  </p>
                  <button
                    ref={generateBtnRef}
                    type="button"
                    onClick={onGenerate}
                    className="mt-3 w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-black shadow-[0_2px_12px_rgba(214,163,75,0.25)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_18px_rgba(214,163,75,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A34B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]"
                    style={{
                      background: "linear-gradient(120deg, #B7791F, #D6A34B 60%, #B7791F)",
                    }}
                  >
                    Generate Badge
                  </button>
                </li>
              </ol>

              {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

              {/* ── Guidelines & Privacy ── */}
              <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <Camera className="h-3.5 w-3.5 shrink-0 text-purple-light" />
                  <span>Use a clear, front-facing photo for best framing.</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileImage className="h-3.5 w-3.5 shrink-0 text-purple-light" />
                  <span>Supports JPG, PNG, and WEBP images.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-purple-light" />
                  <span>100% private — processed locally, never uploaded or stored.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full-screen overlay ── */}
      {overlayOpen && uploadPreviewUrl && (
        <BadgeOverlay
          photoSrc={uploadPreviewUrl}
          name={name}
          onClose={onCloseOverlay}
          onReset={onResetOverlay}
        />
      )}
    </>
  );
}
