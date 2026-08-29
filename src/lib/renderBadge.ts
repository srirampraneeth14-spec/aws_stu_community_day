/**
 * Shared canvas badge renderer.
 *
 * One function produces the composited badge (template + photo + name).
 * Called by:
 *   – Badge.tsx   → live preview on every keystroke / photo change
 *   – BadgeOverlay.tsx → final render + download source
 */

const TEMPLATE_SRC = "/main_template.png";
const FRAME = {
  x: 0.246,
  y: 0.361,
  width: 0.541,
  height: 0.373,
  radius: 0.02,
};

/* ── helpers ────────────────────────────────────── */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load image: ${src}`));
    image.src = src;
  });
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const safe = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + safe, y);
  ctx.lineTo(x + w - safe, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + safe);
  ctx.lineTo(x + w, y + h - safe);
  ctx.quadraticCurveTo(x + w, y + h, x + w - safe, y + h);
  ctx.lineTo(x + safe, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - safe);
  ctx.lineTo(x, y + safe);
  ctx.quadraticCurveTo(x, y, x + safe, y);
  ctx.closePath();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(w / iw, h / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  ctx.drawImage(img, x + (w - sw) / 2, y + (h - sh) / 2, sw, sh);
}

function drawNameText(ctx: CanvasRenderingContext2D, tplW: number, tplH: number, trimmed: string) {
  if (!trimmed) return;

  let fontSize = Math.floor(tplW * 0.055);
  const maxNameWidth = tplW * 0.62;
  do {
    ctx.font = `700 ${fontSize}px Inter, system-ui, sans-serif`;
    if (ctx.measureText(trimmed).width <= maxNameWidth || fontSize <= 28) break;
    fontSize -= 2;
  } while (fontSize > 28);

  const fx = tplW * FRAME.x;
  const fy = tplH * FRAME.y;
  const fw = tplW * FRAME.width;
  const fh = tplH * FRAME.height;
  const fr = tplW * FRAME.radius;
  const frameBottom = fy + fh;

  // Semi-transparent dark backing bar at the end (bottom) of the photo frame
  const barPaddingY = Math.max(12, Math.round(fontSize * 0.28));
  const barH = fontSize + barPaddingY * 2;
  const barY = frameBottom - barH;
  const barX = fx;
  const barW = fw;

  const nx = tplW / 2;
  const ny = barY + barH / 2;

  // Draw backing gradient fading from down (bottom) to top
  ctx.save();
  roundedRectPath(ctx, fx, fy, fw, fh, fr);
  ctx.clip();

  const gradient = ctx.createLinearGradient(0, frameBottom, 0, barY);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.45)");
  gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.2)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(barX, barY, barW, barH);
  ctx.restore();

  // Plain solid white name text in the middle
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(trimmed, nx, ny);
}

/* ── public API ─────────────────────────────────── */

export interface BadgeRenderResult {
  canvas: HTMLCanvasElement;
  dataUrl: string;
}

/**
 * Render the badge onto a fresh canvas and return both the canvas element
 * (for `toBlob` download) and a data-URL (for `<img src>`).
 */
export async function renderBadge(photoSrc: string, name: string): Promise<BadgeRenderResult> {
  const trimmed = name.trim();
  const [template, attendee] = await Promise.all([loadImage(TEMPLATE_SRC), loadImage(photoSrc)]);

  const dpr = window.devicePixelRatio || 1;
  const tplW = template.naturalWidth;
  const tplH = template.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(tplW * dpr);
  canvas.height = Math.round(tplH * dpr);
  canvas.style.width = `${tplW}px`;
  canvas.style.height = `${tplH}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to initialize canvas context.");

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, tplW, tplH);

  // Photo slot coordinates
  const fx = tplW * FRAME.x;
  const fy = tplH * FRAME.y;
  const fw = tplW * FRAME.width;
  const fh = tplH * FRAME.height;
  const fr = tplW * FRAME.radius;

  // Draw template
  ctx.drawImage(template, 0, 0, tplW, tplH);

  // Draw attendee photo, clipped to slot
  ctx.save();
  roundedRectPath(ctx, fx, fy, fw, fh, fr);
  ctx.clip();
  drawImageCover(ctx, attendee, fx, fy, fw, fh);
  ctx.restore();

  // Draw name text (shrink-to-fit, with drop shadow)
  drawNameText(ctx, tplW, tplH, trimmed);

  const dataUrl = canvas.toDataURL("image/png");
  return { canvas, dataUrl };
}

/**
 * Pre-render the badge background (template + clipped photo) at native
 * resolution. Reuse across multiple name-text renders to skip the
 * expensive image-load and cover-fit math on every keystroke.
 */
export async function createBadgeBackground(photoSrc: string): Promise<HTMLCanvasElement> {
  const [template, attendee] = await Promise.all([loadImage(TEMPLATE_SRC), loadImage(photoSrc)]);

  const tplW = template.naturalWidth;
  const tplH = template.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = tplW;
  canvas.height = tplH;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to initialize canvas context.");

  ctx.clearRect(0, 0, tplW, tplH);

  const fx = tplW * FRAME.x;
  const fy = tplH * FRAME.y;
  const fw = tplW * FRAME.width;
  const fh = tplH * FRAME.height;
  const fr = tplW * FRAME.radius;

  ctx.drawImage(template, 0, 0, tplW, tplH);

  ctx.save();
  roundedRectPath(ctx, fx, fy, fw, fh, fr);
  ctx.clip();
  drawImageCover(ctx, attendee, fx, fy, fw, fh);
  ctx.restore();

  return canvas;
}

/**
 * Fast path: composite a cached background canvas + name text.
 * Skips all image loading and cover-fit math.
 */
export function renderBadgeFromCache(bgCanvas: HTMLCanvasElement, name: string): BadgeRenderResult {
  const trimmed = name.trim();
  const tplW = bgCanvas.width;
  const tplH = bgCanvas.height;

  const dpr = window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(tplW * dpr);
  canvas.height = Math.round(tplH * dpr);
  canvas.style.width = `${tplW}px`;
  canvas.style.height = `${tplH}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to initialize canvas context.");

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.drawImage(bgCanvas, 0, 0, tplW, tplH);

  drawNameText(ctx, tplW, tplH, trimmed);

  const dataUrl = canvas.toDataURL("image/png");
  return { canvas, dataUrl };
}
