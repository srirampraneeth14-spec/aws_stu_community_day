import type { ReactNode } from "react";

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF9900]">
        <span className="text-white/40">#</span>
        {id.padStart(2, "0")} · {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">{subtitle}</p>
      )}
    </header>
  );
}