import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CLOUD_NODE_SYNOPSIS, CLOUD_NODES } from "@/data/event";
import { theme, rgba } from "@/lib/theme";

type Node = { id: (typeof CLOUD_NODES)[number]; x: number; y: number; r: number };

const NODES: Node[] = [
  { id: CLOUD_NODES[0], x: 50, y: 50, r: 26 },
  { id: CLOUD_NODES[1], x: 22, y: 30, r: 18 },
  { id: CLOUD_NODES[2], x: 78, y: 26, r: 20 },
  { id: CLOUD_NODES[3], x: 15, y: 72, r: 16 },
  { id: CLOUD_NODES[4], x: 86, y: 74, r: 18 },
  { id: CLOUD_NODES[5], x: 50, y: 12, r: 14 },
  { id: CLOUD_NODES[6], x: 50, y: 88, r: 16 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 5],
  [2, 5],
  [1, 3],
  [2, 4],
  [3, 6],
  [4, 6],
];

const CENTER_INDEX = 0;
const SVG_SIZE = 480;

function synopsisOffset(node: Node) {
  const gap = 22;
  const radiusPx = (node.r / SVG_SIZE) * 520 + gap;

  if (node.x > 38 && node.x < 62 && node.y > 38 && node.y < 62) {
    return { x: `${radiusPx}px`, y: "-50%" };
  }
  if (node.y <= 22) return { x: "-50%", y: `${radiusPx}px` };
  if (node.y >= 78) return { x: "-50%", y: `calc(-100% - ${radiusPx}px)` };
  if (node.x <= 28) return { x: `${radiusPx}px`, y: "-50%" };
  if (node.x >= 72) return { x: `calc(-100% - ${radiusPx}px)`, y: "-50%" };
  if (node.y < 50) return { x: "-50%", y: `${radiusPx}px` };
  return { x: "-50%", y: `calc(-100% - ${radiusPx}px)` };
}

function synopsisArrowStyle(node: Node) {
  if (node.x > 38 && node.x < 62 && node.y > 38 && node.y < 62) {
    return { left: -5, top: "50%", marginTop: -5, borderTop: "none", borderRight: "none" };
  }
  if (node.y <= 22) {
    return { top: -5, left: "50%", marginLeft: -5, borderBottom: "none", borderRight: "none" };
  }
  if (node.y >= 78) {
    return { bottom: -5, left: "50%", marginLeft: -5, borderTop: "none", borderLeft: "none" };
  }
  if (node.x <= 28) {
    return { left: -5, top: "50%", marginTop: -5, borderTop: "none", borderRight: "none" };
  }
  if (node.x >= 72) {
    return { right: -5, top: "50%", marginTop: -5, borderBottom: "none", borderLeft: "none" };
  }
  if (node.y < 50) {
    return { top: -5, left: "50%", marginLeft: -5, borderBottom: "none", borderRight: "none" };
  }
  return { bottom: -5, left: "50%", marginLeft: -5, borderTop: "none", borderLeft: "none" };
}

export function CloudNetwork() {
  const [selected, setSelected] = useState<(typeof CLOUD_NODES)[number] | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const nodesWithOffset = useMemo(() => NODES, []);
  const selectedNode = nodesWithOffset.find((n) => n.id === selected) ?? null;
  const activeId = selected;

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      onMouseLeave={() => setMouse(null)}
      onClick={() => setSelected(null)}
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${rgba(theme.aws, 0.24)}, ${rgba(theme.purple, 0.16)} 42%, transparent 70%)`,
        }}
      />

      <svg
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="relative h-full w-full"
        role="img"
        aria-label="Interactive cloud network illustration"
        onClick={(e) => e.stopPropagation()}
      >
        <defs>
          <radialGradient id="node-orange" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFD494" />
            <stop offset="60%" stopColor={theme.aws} />
            <stop offset="100%" stopColor={theme.awsDark} />
          </radialGradient>
          <radialGradient id="node-purple" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor={theme.purpleGlow} />
            <stop offset="50%" stopColor={theme.purpleDark} />
            <stop offset="100%" stopColor={theme.purpleDeep} />
          </radialGradient>
          <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.aws} stopOpacity="0.75" />
            <stop offset="50%" stopColor={theme.purpleLight} stopOpacity="0.55" />
            <stop offset="100%" stopColor={theme.purple} stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {[0.35, 0.55, 0.75].map((s, i) => (
          <circle
            key={i}
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={(SVG_SIZE / 2) * s}
            fill="none"
            stroke={rgba(theme.purple, 0.12)}
          />
        ))}

        {LINKS.map(([a, b], i) => {
          const na = nodesWithOffset[a];
          const nb = nodesWithOffset[b];
          const isActive = activeId && (na.id === activeId || nb.id === activeId);
          return (
            <line
              key={i}
              x1={(na.x / 100) * SVG_SIZE}
              y1={(na.y / 100) * SVG_SIZE}
              x2={(nb.x / 100) * SVG_SIZE}
              y2={(nb.y / 100) * SVG_SIZE}
              stroke="url(#link)"
              strokeWidth={isActive ? 1.6 : 0.9}
              strokeDasharray="4 6"
              style={{ animation: `dash ${8 + i * 0.5}s linear infinite` }}
            />
          );
        })}

        {LINKS.slice(0, 6).map(([a, b], i) => {
          const na = nodesWithOffset[a];
          const nb = nodesWithOffset[b];
          return (
            <motion.circle
              key={`p${i}`}
              r={2.5}
              fill={theme.awsLight}
              initial={{ cx: (na.x / 100) * SVG_SIZE, cy: (na.y / 100) * SVG_SIZE, opacity: 0 }}
              animate={{
                cx: [(na.x / 100) * SVG_SIZE, (nb.x / 100) * SVG_SIZE],
                cy: [(na.y / 100) * SVG_SIZE, (nb.y / 100) * SVG_SIZE],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          );
        })}

        {nodesWithOffset.map((n, i) => {
          const isCenter = i === CENTER_INDEX;
          const grad = isCenter ? "url(#node-orange)" : "url(#node-purple)";
          const cx = (n.x / 100) * SVG_SIZE;
          const cy = (n.y / 100) * SVG_SIZE;
          const dist = mouse ? Math.hypot(mouse.x - n.x, mouse.y - n.y) : 100;
          const boost = Math.max(0, 1 - dist / 25);

          return (
            <g key={n.id}>
              <circle
                cx={cx}
                cy={cy}
                r={n.r + 10 + boost * 6}
                fill={grad}
                opacity={0.15 + boost * 0.35}
                style={{ filter: "blur(6px)" }}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={n.r}
                fill={grad}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={0.8}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((prev) => (prev === n.id ? null : n.id));
                }}
                whileHover={{ scale: 1.12 }}
                style={{ transformOrigin: `${cx}px ${cy}px`, cursor: "pointer" }}
              />
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={10}
                fontFamily="JetBrains Mono, monospace"
                pointerEvents="none"
                opacity={0.9}
              >
                {n.id}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
        {selected ? `> ${selected}` : "> click a node"}
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-20 w-[min(220px,calc(100%-2.5rem))]"
            style={{
              left: `${selectedNode.x}%`,
              top: `${selectedNode.y}%`,
              transform: `translate(${synopsisOffset(selectedNode).x}, ${synopsisOffset(selectedNode).y})`,
            }}
          >
            <div
              className="relative rounded-xl border border-white/18 p-3.5 shadow-2xl shadow-black/50 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(14, 10, 24, 0.96) 0%, rgba(8, 6, 16, 0.94) 100%)",
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-purple-light">
                {selectedNode.id}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/90">
                {CLOUD_NODE_SYNOPSIS[selectedNode.id]}
              </p>
              <span
                aria-hidden
                className="absolute h-2.5 w-2.5 rotate-45 border border-white/18"
                style={{
                  background: "rgba(12, 9, 20, 0.96)",
                  ...synopsisArrowStyle(selectedNode),
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
