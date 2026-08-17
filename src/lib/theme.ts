/** Shared theme tokens — Register Now button colors are intentionally excluded. */
export const theme = {
  aws: "#FF9900",
  awsLight: "#FFB84D",
  awsDark: "#CC7A00",
  purple: "#9333EA",
  purpleLight: "#A78BFA",
  purpleMuted: "#7C3AED",
  purpleDark: "#5B21B6",
  black: "#050508",
  blackElevated: "#0C0814",
  foreground: "#F4F0FF",
  muted: "#9B8FB8",
  success: "#A78BFA",
  devops: "#7C3AED",
  glassBorder: "rgba(147, 51, 234, 0.14)",
  glowAws: "rgba(255, 153, 0, 0.35)",
  glowPurple: "rgba(147, 51, 234, 0.4)",
} as const;

export function rgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
