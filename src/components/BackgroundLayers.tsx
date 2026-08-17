import { theme, rgba } from "@/lib/theme";

export function BackgroundLayers() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: theme.black }} />
      <div
        className="animate-aurora absolute -top-40 -left-40 h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${rgba(theme.aws, 0.14)}, transparent 62%)`,
        }}
      />
      <div
        className="animate-aurora absolute top-1/3 -right-40 h-[80vh] w-[80vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 70% 40%, ${rgba(theme.purple, 0.18)}, transparent 62%)`,
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-20vh] left-1/3 h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${rgba(theme.purpleDark, 0.16)}, transparent 62%)`,
          animationDelay: "-12s",
        }}
      />
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="noise absolute inset-0 opacity-[0.5] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, transparent 35%, ${rgba(theme.black, 0.75)} 100%)`,
        }}
      />
    </div>
  );
}
