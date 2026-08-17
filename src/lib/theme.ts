/** Theme tokens — orange (aws*) is reserved for the landing-page CloudNetwork diagram only. */
export const theme = {
  aws: "#FF9900",
  awsLight: "#FFB84D",
  awsDark: "#CC7A00",
  purple: "#7C3AED",
  purpleLight: "#A78BFA",
  purpleMuted: "#8B5CF6",
  purpleDark: "#5B21B6",
  purpleDeep: "#3B0764",
  purpleGlow: "#6D28D9",
  green: "#7CCB8C",
  greenBright: "#22C55E",
  black: "#050508",
  blackElevated: "#0C0814",
  foreground: "#F4F0FF",
  muted: "#9B8FB8",
  /** Top-left brand mark — orange (top-left) → purple (bottom-right) */
  brandIconGradient: "linear-gradient(135deg, #FF9900 0%, #9B6DFF 100%)",
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

/** Purple accent shades for alternating UI elements (avatars, track chips, etc.) */
export const purpleAccent = (index: number) => {
  const shades = [theme.purpleLight, theme.purple, theme.purpleDark] as const;
  return shades[index % 3];
};

export function purpleGradient(index: number, alpha = 0.3) {
  const color = purpleAccent(index);
  return `linear-gradient(135deg, ${rgba(color, alpha)}, ${rgba(color, alpha * 0.18)})`;
}

export function purpleRadial(index: number) {
  const color = purpleAccent(index);
  return `radial-gradient(circle, ${color}, transparent 70%)`;
}

export function purpleAvatarGradient(index: number) {
  const pairs = [
    ["#E9D5FF", theme.purpleLight],
    ["#C4B5FD", theme.purple],
    ["#DDD6FE", theme.purpleDark],
  ] as const;
  const [from, to] = pairs[index % 3];
  return `linear-gradient(135deg, ${from}, ${to})`;
}
