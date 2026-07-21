import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CLOUD_NODES } from "@/data/event";

type Node = { id: string; x: number; y: number; r: number };

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

export function CloudNetwork() {
  const [hover, setHover] = useState<string | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const size = 480;

  const nodesWithOffset = useMemo(() => NODES, []);

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
    >
      {/* halo */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,153,0,0.28), rgba(56,189,248,0.18) 40%, transparent 70%)",
        }}
      />

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative h-full w-full"
        role="img"
        aria-label="Interactive cloud network illustration"
      >
        <defs>
          <radialGradient id="node-orange" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFD494" />
            <stop offset="60%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#7A4600" />
          </radialGradient>
          <radialGradient id="node-blue" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#B8E5FF" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0B4A6A" />
          </radialGradient>
          <radialGradient id="node-purple" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#D6C6FF" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B1E7A" />
          </radialGradient>
          <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF9900" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* concentric guide rings */}
        {[0.35, 0.55, 0.75].map((s, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={(size / 2) * s}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
          />
        ))}

        {/* links */}
        {LINKS.map(([a, b], i) => {
          const na = nodesWithOffset[a];
          const nb = nodesWithOffset[b];
          return (
            <line
              key={i}
              x1={(na.x / 100) * size}
              y1={(na.y / 100) * size}
              x2={(nb.x / 100) * size}
              y2={(nb.y / 100) * size}
              stroke="url(#link)"
              strokeWidth={
                hover && (nodesWithOffset[a].id === hover || nodesWithOffset[b].id === hover)
                  ? 1.6
                  : 0.9
              }
              strokeDasharray="4 6"
              style={{ animation: `dash ${8 + i * 0.5}s linear infinite` }}
            />
          );
        })}

        {/* traveling packets */}
        {LINKS.slice(0, 6).map(([a, b], i) => {
          const na = nodesWithOffset[a];
          const nb = nodesWithOffset[b];
          return (
            <motion.circle
              key={`p${i}`}
              r={2.5}
              fill="#FFB84D"
              initial={{ cx: (na.x / 100) * size, cy: (na.y / 100) * size, opacity: 0 }}
              animate={{
                cx: [(na.x / 100) * size, (nb.x / 100) * size],
                cy: [(na.y / 100) * size, (nb.y / 100) * size],
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

        {/* nodes */}
        {nodesWithOffset.map((n, i) => {
          const grad =
            i % 3 === 0
              ? "url(#node-orange)"
              : i % 3 === 1
                ? "url(#node-blue)"
                : "url(#node-purple)";
          const cx = (n.x / 100) * size;
          const cy = (n.y / 100) * size;
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
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
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

      {/* label chip */}
      <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
        {hover ? `> ${hover}` : "> hover a node"}
      </div>
    </div>
  );
}
