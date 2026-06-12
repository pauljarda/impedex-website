"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, User, Plus } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ── Custom schematic-style icon set (hand-drawn, electronics themed) ── */

type CustomIconProps = { size?: number; className?: string };

function SchematicIcon({ size = 24, className, children }: CustomIconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function IconSolder(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M3.5 20.5 L10 14" />
      <path d="M9.5 14.5 L13.5 10.5 L15.5 12.5 L11.5 16.5 Z" />
      <path d="M15 11 C16.8 9.2 16.2 7.6 18 6.5 C19.2 5.8 20 6.5 20.5 7.2" opacity="0.85" />
      <circle cx="3.9" cy="20.1" r="1" fill="currentColor" stroke="none" />
      <path d="M7.5 11.5 c-0.5-1 0.5-1.4 0-2.4" opacity="0.45" />
    </SchematicIcon>
  );
}

function IconClockPulse(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M5.8 12 H8 l1.4-2.6 1.9 5 1.4-2.4 H18.2" opacity="0.9" />
      <circle cx="12" cy="5" r="0.8" fill="currentColor" stroke="none" opacity="0.7" />
    </SchematicIcon>
  );
}

function IconShieldTrace(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M12 3 L19 5.8 V11.3 C19 15.9 16.1 19.1 12 20.8 C7.9 19.1 5 15.9 5 11.3 V5.8 Z" />
      <path d="M12 7.5 V10.2 M12 10.2 L9.6 12.6 M12 10.2 L14.4 12.6" opacity="0.85" />
      <circle cx="9.6" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="12.6" r="0.9" fill="currentColor" stroke="none" />
    </SchematicIcon>
  );
}

function IconVan(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M2.5 7.5 H14 V16 H2.5 Z" />
      <path d="M14 10 H17.8 L20.8 13.2 V16 H14" />
      <path d="M15.2 10 V12.6 H18.4" opacity="0.7" />
      <circle cx="6.8" cy="17.6" r="1.7" />
      <circle cx="16.8" cy="17.6" r="1.7" />
      <path d="M0.8 10.2 H1.9 M0.8 13.2 H1.9" opacity="0.5" />
    </SchematicIcon>
  );
}

function IconTvWave(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="3" y="6.5" width="18" height="12" rx="2" />
      <path d="M9 6.5 L12 3.5 L15 6.5" opacity="0.7" />
      <path d="M6.8 12.5 q1.3-2.6 2.6 0 t2.6 0 t2.6 0 t2.6 0" opacity="0.9" />
      <path d="M9.5 18.5 v1.3 M14.5 18.5 v1.3" />
    </SchematicIcon>
  );
}

function IconPhonePulse(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="7.5" y="3" width="9" height="18" rx="2.2" />
      <path d="M10.8 5.2 h2.4" opacity="0.7" />
      <path d="M9.5 13 l1.2-1.8 1.6 3.2 1.2-1.8" opacity="0.9" />
      <circle cx="12" cy="18.4" r="0.85" fill="currentColor" stroke="none" opacity="0.8" />
    </SchematicIcon>
  );
}

function IconPcb(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="8" y="8" width="8" height="8" rx="1.4" />
      <circle cx="12" cy="12" r="1.3" opacity="0.9" />
      <path d="M10.5 8 V5.5 M13.5 8 V5.5 M10.5 16 v2.5 M13.5 16 v2.5 M8 10.5 H5.5 M8 13.5 H5.5 M16 10.5 h2.5 M16 13.5 h2.5" opacity="0.85" />
      <path d="M16 8 L18.7 5.3" />
      <circle cx="19.3" cy="4.7" r="1" fill="currentColor" stroke="none" />
      <path d="M8 16 L5.3 18.7" />
      <circle cx="4.7" cy="19.3" r="1" fill="currentColor" stroke="none" />
    </SchematicIcon>
  );
}

function IconSolar(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M6.5 13.5 L9.5 7 H20 L17 13.5 Z" />
      <path d="M10.8 9.2 H17.6 M9.7 11.3 H16.6 M13.2 7 L10.2 13.5" opacity="0.6" />
      <path d="M13 13.5 V17.5 M10 17.5 H16" />
      <circle cx="4.8" cy="4.8" r="1.9" />
      <path d="M4.8 1.5 V2.4 M1.5 4.8 H2.4 M7.2 2.4 L6.6 3 M2.4 7.2 L3 6.6" opacity="0.8" />
    </SchematicIcon>
  );
}

function IconDoc(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M6 3 H14.5 L18.5 7 V21 H6 Z" />
      <path d="M14.5 3 V7 H18.5" opacity="0.8" />
      <path d="M9 12 H15.5 M9 15 H15.5 M9 18 H12.5" opacity="0.7" />
    </SchematicIcon>
  );
}

function IconMultimeter(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <rect x="7" y="2.8" width="10" height="13.5" rx="2" />
      <circle cx="12" cy="8" r="2.4" />
      <path d="M12 8 L13.6 6.4" />
      <path d="M9.3 13.2 h1.6 M13.1 13.2 h1.6" opacity="0.6" />
      <path d="M9.5 16.3 C9.5 19.3 6.2 18.6 6.2 21.2 M14.5 16.3 C14.5 19.3 17.8 18.6 17.8 21.2" opacity="0.9" />
      <circle cx="6.2" cy="21.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.8" cy="21.6" r="0.9" fill="currentColor" stroke="none" />
    </SchematicIcon>
  );
}

function IconBoxCheck(p: CustomIconProps) {
  return (
    <SchematicIcon {...p}>
      <path d="M4 8.2 L12 4.2 L20 8.2 V15.8 L12 19.8 L4 15.8 Z" />
      <path d="M4 8.2 L12 12.2 L20 8.2 M12 12.2 V19.8" opacity="0.7" />
      <path d="M16.8 4.6 l1.3 1.3 L20.4 3.4" />
    </SchematicIcon>
  );
}

/*
 * Logo with live PCB traces: the greenish circuit lines + Ω pads baked into
 * logo.png are detected per-pixel at runtime, recoloured emerald and animated
 * (soft pulse + a light sweep travelling along the traces) on a canvas overlay
 * aligned with the white base logo underneath.
 */
function LogoMark({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let traceCanvas: HTMLCanvasElement | null = null;
    let imgW = 0;
    let imgH = 0;

    const img = new window.Image();
    img.src = "/logo.png";
    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;

      /* extract the greenish trace pixels and recolour them emerald */
      const off = document.createElement("canvas");
      off.width = imgW;
      off.height = imgH;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0);
      const data = octx.getImageData(0, 0, imgW, imgH);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2], a = px[i + 3];
        const isTrace = a > 30 && g > r + 14 && g >= b + 4;
        if (isTrace) {
          px[i] = 52; px[i + 1] = 211; px[i + 2] = 153;
        } else {
          px[i + 3] = 0;
        }
      }
      octx.putImageData(data, 0, 0);
      traceCanvas = off;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = box.clientWidth * dpr;
      canvas.height = box.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const cw = box.clientWidth;
      const ch = box.clientHeight;
      ctx.clearRect(0, 0, cw, ch);
      if (!traceCanvas || !imgW) return;

      /* replicate object-contain object-left positioning of the base image */
      const scale = Math.min(cw / imgW, ch / imgH);
      const dw = imgW * scale;
      const dh = imgH * scale;
      const dx = 0;
      const dy = (ch - dh) / 2;

      const t = performance.now() / 1000;

      /* breathing emerald glow */
      ctx.save();
      ctx.globalAlpha = 0.78 + 0.22 * Math.sin(t * 2.2);
      ctx.shadowColor = "rgba(52,211,153,0.85)";
      ctx.shadowBlur = 5;
      ctx.drawImage(traceCanvas, dx, dy, dw, dh);
      ctx.restore();

      /* light sweep travelling along the traces */
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      const bandW = dw * 0.28;
      const sx = dx - bandW + ((t * dw * 0.45) % (dw + bandW * 2));
      const grad = ctx.createLinearGradient(sx, 0, sx + bandW, 0);
      grad.addColorStop(0, "rgba(214,255,239,0)");
      grad.addColorStop(0.5, "rgba(214,255,239,0.9)");
      grad.addColorStop(1, "rgba(214,255,239,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(dx, dy, dw, dh);
      ctx.restore();
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <Image
        src="/logo.png"
        alt="IMPEDEX"
        fill
        sizes={sizes}
        className="object-contain object-left brightness-0 invert"
        priority={priority}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}

function PcbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const LABELS = ["3.3V", "CLK", "12V", "PWM", "GND", "SPI", "5V", "I2C", "VCC", "UART", "100R", "MOSFET", "RESET", "TX", "RX", "EN"];

    type Node = {
      col: number; row: number; x: number; y: number;
      pulse: number; pulseSpeed: number;
      labelIdx: number; showLabel: boolean; labelTimer: number; labelDur: number;
      isChip: boolean;
    };
    type Edge = { a: Node; b: Node };
    type Signal = { edge: Edge; t: number; speed: number; alpha: number; reverse: boolean };

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let signals: Signal[] = [];

    const spawnSignal = () => {
      if (edges.length === 0) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      signals.push({
        edge,
        t: 0,
        speed: 0.002 + Math.random() * 0.005,
        alpha: 0.7 + Math.random() * 0.3,
        reverse: Math.random() > 0.5,
      });
    };

    const buildScene = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* iso projection — diamond grid centered, covers whole viewport */
      const tileW = 96;
      const tileH = 44;
      const ox = W * 0.5;
      const oy = -H * 0.25;
      const iso = (col: number, row: number) => ({
        x: ox + (col - row) * (tileW / 2),
        y: oy + (col + row) * (tileH / 2),
      });

      nodes = [];
      edges = [];
      signals = [];

      /* generous range + offscreen culling so the grid always fills the screen */
      const RANGE = Math.ceil((W + H * 2) / tileH) + 8;
      for (let c = -RANGE; c < RANGE; c += 2) {
        for (let r = -RANGE; r < RANGE; r += 2) {
          const { x, y } = iso(c, r);
          if (x < -60 || x > W + 60 || y < -60 || y > H + 60) continue;
          nodes.push({
            col: c, row: r, x, y,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.008 + Math.random() * 0.014,
            labelIdx: Math.floor(Math.random() * LABELS.length),
            showLabel: Math.random() > 0.78,
            labelTimer: Math.floor(Math.random() * 200),
            labelDur: 140 + Math.random() * 200,
            isChip: Math.random() > 0.92,
          });
        }
      }

      const nodeMap = new Map<string, Node>();
      nodes.forEach(n => nodeMap.set(`${n.col},${n.row}`, n));
      nodes.forEach(n => {
        const right = nodeMap.get(`${n.col + 2},${n.row}`);
        const down = nodeMap.get(`${n.col},${n.row + 2}`);
        if (right) edges.push({ a: n, b: right });
        if (down) edges.push({ a: n, b: down });
      });

      for (let i = 0; i < 36; i++) spawnSignal();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Base grid lines */
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = "rgba(31,111,91,0.22)";
      ctx.beginPath();
      edges.forEach(({ a, b }) => {
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      });
      ctx.stroke();

      /* Brighter accent traces */
      ctx.lineWidth = 1.3;
      edges.forEach(({ a, b }, i) => {
        if (i % 5 !== 0) return;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, "rgba(52,211,153,0)");
        grad.addColorStop(0.5, "rgba(52,211,153,0.28)");
        grad.addColorStop(1, "rgba(52,211,153,0)");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      /* Nodes */
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed;
        const glow = 0.45 + 0.55 * Math.sin(n.pulse);

        if (n.isChip) {
          /* small iso chip */
          ctx.strokeStyle = `rgba(52,211,153,${0.3 + 0.25 * glow})`;
          ctx.fillStyle = "rgba(10,31,24,0.85)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y - 9);
          ctx.lineTo(n.x + 16, n.y);
          ctx.lineTo(n.x, n.y + 9);
          ctx.lineTo(n.x - 16, n.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(52,211,153,${0.22 * glow})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,243,208,${0.45 + 0.45 * glow})`;
          ctx.fill();
        }

        /* Radar ping */
        const ping = Math.sin(n.pulse * 0.35);
        if (ping > 0.96) {
          const r = ((ping - 0.96) / 0.04) * 30;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(110,231,183,${0.45 * (1 - r / 30)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        /* Floating label */
        if (n.showLabel) {
          n.labelTimer++;
          const cycle = n.labelTimer % n.labelDur;
          const fadeIn = Math.min(cycle / 25, 1);
          const fadeOut = Math.min((n.labelDur - cycle) / 25, 1);
          const alpha = Math.min(fadeIn, fadeOut) * 0.65;
          const drift = (cycle / n.labelDur) * 16;
          ctx.font = "600 10px ui-monospace, monospace";
          ctx.fillStyle = `rgba(110,231,183,${alpha})`;
          ctx.fillText(LABELS[n.labelIdx], n.x + 8, n.y - 6 - drift);
          if (cycle === 0) n.labelIdx = Math.floor(Math.random() * LABELS.length);
        }
      });

      /* Travelling signals with comet tail */
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.speed;
        if (s.t >= 1) {
          signals.splice(i, 1);
          spawnSignal();
          continue;
        }
        const t = s.reverse ? 1 - s.t : s.t;
        const { a, b } = s.edge;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;

        /* tail */
        const tailT = Math.max(0, Math.min(1, t + (s.reverse ? 0.1 : -0.1)));
        const tx = a.x + (b.x - a.x) * tailT;
        const ty = a.y + (b.y - a.y) * tailT;
        const tail = ctx.createLinearGradient(tx, ty, x, y);
        tail.addColorStop(0, "rgba(52,211,153,0)");
        tail.addColorStop(1, `rgba(52,211,153,${s.alpha * 0.5})`);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        /* head */
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8);
        grad.addColorStop(0, `rgba(212,252,234,${s.alpha})`);
        grad.addColorStop(0.4, `rgba(52,211,153,${s.alpha * 0.55})`);
        grad.addColorStop(1, "rgba(52,211,153,0)");
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    buildScene();
    draw();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildScene, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
        aria-hidden="true"
      />
      {/* subtle dark vignette so text stays readable over the animation */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 45%, rgba(7,17,31,0.82) 0%, rgba(7,17,31,0.35) 55%, transparent 100%)",
        }}
      />
    </>
  );
}

function ScopeKnob({ cx, cy, r, deg }: { cx: number; cy: number; r: number; deg: number }) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const x2 = cx + Math.cos(rad) * r * 0.72;
  const y2 = cy + Math.sin(rad) * r * 0.72;
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const a = ((-135 + i * 33.75 - 90) * Math.PI) / 180;
    return { x: cx + Math.cos(a) * (r + 5), y: cy + Math.sin(a) * (r + 5) };
  });
  return (
    <g>
      {ticks.map((tk, i) => (
        <circle key={i} cx={tk.x} cy={tk.y} r="0.9" fill="#475569" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="url(#scopeKnobGrad)" stroke="#0b1018" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#39465c" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
      <circle cx={cx} cy={cy} r={r * 0.45} fill="#141c28" stroke="#2b3850" strokeWidth="0.8" />
      <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function ScopeBtn({ x, y, w, label, led }: { x: number; y: number; w: number; label: string; led?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="18" rx="4" fill="#161e2b" stroke="#2b3a4f" strokeWidth="1" />
      <text x={x + w / 2 + (led ? 4 : 0)} y={y + 12.5} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#94a3b8">
        {label}
      </text>
      {led && <circle cx={x + 8} cy={y + 9} r="2" fill={led} />}
    </g>
  );
}

function ScopeBnc({ cx, cy, color, label }: { cx: number; cy: number; color: string; label: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="15" fill="#0a0f16" stroke="#46556b" strokeWidth="2.5" />
      <rect x={cx - 19} y={cy - 3} width="5" height="6" rx="1" fill="#46556b" />
      <rect x={cx + 14} y={cy - 3} width="5" height="6" rx="1" fill="#46556b" />
      <circle cx={cx} cy={cy} r="6.5" fill="#05080d" stroke="#5b6b82" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="2" fill="#1f2937" stroke="#64748b" strokeWidth="0.8" />
      <text x={cx} y={cy + 31} textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill={color}>
        {label}
      </text>
    </g>
  );
}

function HeroStats() {
  const items = [
    {
      icon: IconSolder,
      value: "30+ ani",
      label: "Experiență în electronice",
      detail: "De la TV-uri CRT la invertoare moderne — reparăm defecte din toate generațiile de echipamente.",
    },
    {
      icon: IconClockPulse,
      value: "1-2 zile",
      label: "Răspuns la diagnosticare",
      detail: "Analizăm cererea și revenim cu un verdict în zile lucrătoare, prin telefon sau email.",
    },
    {
      icon: IconShieldTrace,
      value: "Garanție",
      label: "La toate reparațiile",
      detail: "Fiecare lucrare este testată înainte de retur, iar garanția e comunicată la confirmare.",
    },
    {
      icon: IconVan,
      value: "Curier",
      label: "Ridicare din toată țara",
      detail: "Costul transportului este comunicat transparent, înainte de confirmarea reparației.",
    },
  ];
  return (
    <div className="w-full max-w-md lg:justify-self-end">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-sm font-semibold text-emerald-300"
      >
        De ce IMPEDEX
      </motion.p>
      {items.map((s, i) => (
        <motion.div
          key={s.value}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 + i * 0.13 }}
          className={`flex items-start gap-5 py-5 ${i < items.length - 1 ? "border-b border-white/10" : ""}`}
        >
          <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
            <s.icon size={22} />
          </span>
          <div>
            <div className="flex items-baseline gap-2.5">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
            <p className="mt-1.5 text-[13px] leading-6 text-white/40">{s.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ScopePanel() {
  const ch1Ref = useRef<SVGPathElement>(null);
  const ch2Ref = useRef<SVGPathElement>(null);
  const [meas, setMeas] = useState({ vpp: "6.42", vrms: "2.27", freq: "2.05", per: "488", duty: "47.6" });

  useEffect(() => {
    let raf: number;
    let t = 0;

    const animate = () => {
      t += 0.035;

      /* CH1 — sine with breathing amplitude and drifting wavelength */
      const amp = 52 + 16 * Math.sin(t * 0.5);
      const wavelength = 96 + 22 * Math.sin(t * 0.21);
      const k = (Math.PI * 2) / wavelength;
      let d1 = "M0,150";
      for (let x = 5; x <= 500; x += 5) {
        const env = 0.82 + 0.18 * Math.sin(t * 0.8 + x * 0.012);
        const y = 150 - amp * env * Math.sin(k * x - t * 2.2);
        d1 += ` L${x},${y.toFixed(1)}`;
      }
      ch1Ref.current?.setAttribute("d", d1);

      /* CH2 — 5V PWM square wave, duty cycle slowly drifting */
      const duty = 0.5 + 0.16 * Math.sin(t * 0.33);
      const period = 110;
      const hi = 216, lo = 253;
      const phase = (t * 46) % period;
      let d2 = `M${(-phase).toFixed(1)},${lo}`;
      for (let x = -phase; x < 500 + period; x += period) {
        const xr = x + period * duty;
        d2 += ` L${x.toFixed(1)},${hi} L${xr.toFixed(1)},${hi} L${xr.toFixed(1)},${lo} L${(x + period).toFixed(1)},${lo}`;
      }
      ch2Ref.current?.setAttribute("d", d2);

      raf = requestAnimationFrame(animate);
    };
    animate();

    const measId = setInterval(() => {
      const vpp = 6.3 + Math.random() * 0.35;
      const f = 2.0 + Math.random() * 0.12;
      setMeas({
        vpp: vpp.toFixed(2),
        vrms: (vpp * 0.3536).toFixed(2),
        freq: f.toFixed(2),
        per: (1000 / f).toFixed(0),
        duty: (44 + Math.random() * 9).toFixed(1),
      });
    }, 900);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(measId);
    };
  }, []);

  return (
    <div className="w-full" aria-hidden="true">
      <style>{`
        @keyframes scopeBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
      `}</style>

      <svg viewBox="0 0 760 470" className="block h-auto w-full">
        <defs>
          <linearGradient id="scopeBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#27334a" />
            <stop offset="12%" stopColor="#1b2435" />
            <stop offset="100%" stopColor="#0d1420" />
          </linearGradient>
          <radialGradient id="scopeKnobGrad" cx="0.35" cy="0.3" r="1">
            <stop offset="0%" stopColor="#3d4d68" />
            <stop offset="100%" stopColor="#1a2433" />
          </radialGradient>
          <linearGradient id="scopeGlare" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <pattern id="scopeScan" width="1" height="3" patternUnits="userSpaceOnUse">
            <rect width="1" height="1" fill="rgba(0,0,0,0.16)" />
          </pattern>
        </defs>

        {/* ── Chassis ── */}
        <rect x="2" y="2" width="756" height="466" rx="16" fill="url(#scopeBodyGrad)" stroke="#324158" strokeWidth="1.5" />
        <rect x="4" y="4" width="752" height="10" rx="8" fill="#ffffff" opacity="0.04" />

        {/* corner screws */}
        {[[16, 16], [744, 16], [16, 454], [744, 454]].map(([sx, sy], i) => (
          <g key={i}>
            <circle cx={sx} cy={sy} r="3.5" fill="#0c121c" stroke="#303c4f" strokeWidth="1" />
            <line x1={sx - 2} y1={sy} x2={sx + 2} y2={sy} stroke="#404e64" strokeWidth="0.8" transform={`rotate(${i * 40} ${sx} ${sy})`} />
          </g>
        ))}

        {/* vents */}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={544 + i * 14} y="16" width="4" height="20" rx="2" fill="#0a111c" />
        ))}

        {/* brand */}
        <text x="26" y="30" fontFamily="ui-sans-serif, system-ui" fontSize="14" fontWeight="700" letterSpacing="2.5" fill="#e2e8f0">
          IMPEDEX
        </text>
        <text x="26" y="42" fontFamily="monospace" fontSize="7.5" letterSpacing="1" fill="#64748b">
          DSO-2204 · DIGITAL STORAGE OSCILLOSCOPE · 200 MHz · 1 GSa/s
        </text>

        {/* power */}
        <circle cx="700" cy="29" r="2.5" fill="#34d399" style={{ animation: "scopeBlink 2.4s ease-in-out infinite" }} />
        <circle cx="722" cy="29" r="9" fill="#161e2b" stroke="#46556b" strokeWidth="1.5" />
        <line x1="722" y1="23.5" x2="722" y2="28" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M717.5,25.5 a6,6 0 1 0 9,0" fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />

        {/* ── Screen bezel + glass ── */}
        <rect x="22" y="52" width="470" height="334" rx="10" fill="#07090d" stroke="#1d2735" strokeWidth="1.5" />
        <rect x="32" y="62" width="450" height="314" rx="6" fill="#041009" />

        {/* status bar */}
        <rect x="40" y="69" width="30" height="15" rx="3" fill="#3a2a08" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="0.8" />
        <text x="55" y="80" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fbbf24">T&apos;D</text>
        <text x="84" y="80.5" fontFamily="monospace" fontSize="9.5" fill="#9ca3af">H 250µs/div</text>
        <text x="176" y="80.5" fontFamily="monospace" fontSize="9.5" fill="#9ca3af">D 0.00s</text>
        <text x="368" y="80.5" fontFamily="monospace" fontSize="9.5" fill="#64748b">SR 1.00GSa/s</text>

        {/* waveform area */}
        <svg x="36" y="92" width="442" height="206" viewBox="0 0 500 300" preserveAspectRatio="none">
          {/* graticule 10×8 */}
          <g stroke="#1f6f5b" strokeWidth="0.6">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={50 * (i + 1)} y1="0" x2={50 * (i + 1)} y2="300" opacity={i === 4 ? 0.4 : 0.16} />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={37.5 * (i + 1)} x2="500" y2={37.5 * (i + 1)} opacity={i === 3 ? 0.4 : 0.16} />
            ))}
          </g>
          {/* centre-axis fine ticks */}
          <g stroke="#34d399" strokeWidth="1" opacity="0.28">
            {Array.from({ length: 50 }, (_, i) => (
              <line key={`tx${i}`} x1={10 * i} y1="147.5" x2={10 * i} y2="152.5" />
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <line key={`ty${i}`} x1="247.5" y1={10 * i} x2="252.5" y2={10 * i} />
            ))}
          </g>
          {/* trigger level — 1.24 V on CH1 at 2 V/div */}
          <line x1="0" y1="127" x2="500" y2="127" stroke="#fbbf24" strokeWidth="1" strokeDasharray="6 5" opacity="0.4" />
          <path d="M500,127 l-10,-6 v12 z" fill="#fbbf24" opacity="0.7" />
          {/* CH2 — PWM (amber) */}
          <path ref={ch2Ref} d="M0,253 L500,253" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.8" />
          {/* CH1 — sine (emerald phosphor) */}
          <path
            ref={ch1Ref}
            d="M0,150 L500,150"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 5px rgba(52,211,153,0.7))" }}
          />
        </svg>

        {/* measurements strip */}
        <line x1="36" y1="304" x2="478" y2="304" stroke="#1f6f5b" strokeWidth="0.6" opacity="0.35" />
        <text x="40" y="320" fontFamily="monospace" fontSize="10" fill="#6ee7b7">Vpp={meas.vpp}V</text>
        <text x="112" y="320" fontFamily="monospace" fontSize="10" fill="#6ee7b7">Vrms={meas.vrms}V</text>
        <text x="196" y="320" fontFamily="monospace" fontSize="10" fill="#6ee7b7">Freq={meas.freq}kHz</text>
        <text x="290" y="320" fontFamily="monospace" fontSize="10" fill="#6ee7b7">Per={meas.per}µs</text>
        <text x="368" y="320" fontFamily="monospace" fontSize="10" fill="#fbbf24">Duty={meas.duty}%</text>

        {/* channel chips + trigger info */}
        <rect x="40" y="332" width="78" height="17" rx="3" fill="#062c1f" stroke="#34d399" strokeOpacity="0.5" strokeWidth="0.8" />
        <text x="79" y="344" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#34d399">1 ~ 2.00V/</text>
        <rect x="126" y="332" width="78" height="17" rx="3" fill="#2e2206" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="0.8" />
        <text x="165" y="344" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#fbbf24">2 ~ 5.00V/</text>
        <text x="478" y="344" textAnchor="end" fontFamily="monospace" fontSize="9" fill="#9ca3af">Trig 1 ↗ 1.24V</text>

        {/* scanlines + glare */}
        <rect x="32" y="62" width="450" height="314" rx="6" fill="url(#scopeScan)" />
        <rect x="32" y="62" width="450" height="314" rx="6" fill="url(#scopeGlare)" />

        {/* ── Controls column ── */}
        <ScopeBtn x={506} y={56} w={54} label="AUTO" led="#34d399" />
        <ScopeBtn x={566} y={56} w={72} label="RUN/STOP" led="#34d399" />
        <ScopeBtn x={644} y={56} w={56} label="SINGLE" />

        <text x="506" y="112" fontFamily="monospace" fontSize="8" letterSpacing="3" fill="#5b6b82">VERTICAL</text>
        <ScopeBtn x={506} y={124} w={50} label="CH1" led="#34d399" />
        <ScopeBtn x={506} y={148} w={50} label="CH2" led="#fbbf24" />
        <ScopeKnob cx={600} cy={142} r={14} deg={25} />
        <text x="600" y="170" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#64748b">POSITION</text>
        <ScopeKnob cx={682} cy={148} r={24} deg={-40} />
        <text x="682" y="186" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#64748b">SCALE</text>

        <line x1="506" y1="200" x2="744" y2="200" stroke="#ffffff" strokeOpacity="0.06" />

        <text x="506" y="216" fontFamily="monospace" fontSize="8" letterSpacing="3" fill="#5b6b82">HORIZONTAL</text>
        <ScopeKnob cx={570} cy={252} r={14} deg={60} />
        <text x="570" y="280" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#64748b">POSITION</text>
        <ScopeKnob cx={682} cy={254} r={22} deg={10} />
        <text x="682" y="290" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#64748b">SCALE</text>

        <line x1="506" y1="302" x2="744" y2="302" stroke="#ffffff" strokeOpacity="0.06" />

        <text x="506" y="318" fontFamily="monospace" fontSize="8" letterSpacing="3" fill="#5b6b82">TRIGGER</text>
        <ScopeKnob cx={570} cy={356} r={17} deg={-65} />
        <text x="570" y="388" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#64748b">LEVEL</text>
        <ScopeBtn x={630} y={340} w={56} label="MENU" />
        <ScopeBtn x={630} y={366} w={56} label="FORCE" />
        <text x="630" y="404" fontFamily="monospace" fontSize="7.5" fill="#fbbf24" opacity="0.8">EDGE ↗ CH1</text>

        {/* ── BNC inputs ── */}
        <ScopeBnc cx={70} cy={418} color="#34d399" label="CH1" />
        <ScopeBnc cx={134} cy={418} color="#fbbf24" label="CH2" />
        <ScopeBnc cx={198} cy={418} color="#94a3b8" label="EXT" />

        {/* ground lug */}
        <g stroke="#64748b" strokeWidth="1.3" strokeLinecap="round">
          <line x1="252" y1="406" x2="252" y2="416" />
          <line x1="244" y1="416" x2="260" y2="416" />
          <line x1="247" y1="420.5" x2="257" y2="420.5" />
          <line x1="250" y1="425" x2="254" y2="425" />
        </g>

        {/* probe comp */}
        <rect x="288" y="408" width="9" height="9" rx="1.5" fill="none" stroke="#64748b" strokeWidth="1.2" />
        <line x1="292.5" y1="404" x2="292.5" y2="400" stroke="#64748b" strokeWidth="1.2" />
        <text x="284" y="434" fontFamily="monospace" fontSize="6.5" fill="#5b6b82">PROBE COMP</text>
        <text x="288" y="443" fontFamily="monospace" fontSize="6.5" fill="#5b6b82">~3V 1kHz</text>

        <text x="506" y="446" fontFamily="monospace" fontSize="7.5" fill="#475569">BW 200 MHz · MEM 28 Mpts · WAVE 500k wfms/s</text>
      </svg>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#07111f] font-sans text-white">
      <PcbCanvas />
      <header
        className={`fixed top-0 z-50 w-full border-b border-white/10 bg-[#07111f]/55 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "py-1 shadow-lg shadow-black/20" : "py-2"
        }`}
      >
        <div className="relative flex w-full items-center justify-between px-6 md:px-12">
          <div className="flex flex-1 justify-start">
            <a href="/" className="flex items-center">
              <div
                className={`relative transition-all duration-300 ${
                  scrolled ? "h-14 w-40" : "h-18 w-52 md:h-20 md:w-60"
                }`}
              >
                <Image
                  src="/logo.png"
                  alt="IMPEDEX"
                  fill
                  sizes="(max-width: 768px) 160px, 240px"
                  className="object-contain object-left brightness-0 invert"
                  priority
                />
              </div>
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-16 text-base font-bold uppercase tracking-wider text-white/80 lg:flex xl:gap-24">
            <a href="#reparații" className="transition-colors hover:text-emerald-300">
              Service
            </a>
            <a href="#ce-reparam" className="transition-colors hover:text-emerald-300">
              Reparații
            </a>
            <a href="#contact" className="transition-colors hover:text-emerald-300">
              Contact
            </a>
          </nav>

          <div className="flex flex-1 justify-end">
            <a
              href="/login"
              className={`flex items-center gap-2 rounded-md border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-[#07111f] transition hover:bg-slate-100 ${
                scrolled ? "px-4 py-2" : "px-5 py-2"
              }`}
            >
              <User size={16} />
              <span>Cont client</span>
            </a>
          </div>
        </div>
      </header>

      <section id="reparații" className="relative min-h-[88vh] overflow-hidden">
        {/* ── Content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold leading-[1.07] tracking-[-0.03em] text-white sm:text-6xl">
              Reparații TV, laptopuri și electronice industriale
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Diagnostic și reparații pentru TV-uri, telefoane, laptopuri,
              surse, plăci electronice și echipamente industriale.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/diagnosticare"
                className="group inline-flex min-w-[210px] items-center justify-center gap-2 rounded-md bg-[#1f6f5b] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-0.5 hover:bg-[#195c4b] hover:shadow-xl hover:shadow-emerald-900/40"
              >
                Solicită diagnosticare
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#ce-reparam"
                className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-md bg-white px-7 py-3 text-sm font-semibold text-[#07111f] transition-all hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Vezi ce reparăm
                <ArrowRight size={15} />
              </a>
            </div>

          </div>
          <HeroStats />
        </motion.div>
      </section>

      <motion.section
  id="ce-reparam"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={fadeUp}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative overflow-hidden px-6 py-24 text-white"
>
  <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
    <div>
      <div className="mb-14">
        <p className="mb-3 text-sm font-semibold text-emerald-300">
          Ce reparăm
        </p>

        <h2 className="text-4xl font-bold">
          Reparații pentru electronice casnice și industriale
        </h2>

        <p className="mt-4 max-w-2xl text-white/60">
          De la electronice de uz casnic până la echipamente industriale,
          surse, plăci electronice și sisteme fotovoltaice.
        </p>
      </div>

      <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2">
        {[
          {
            icon: IconTvWave,
            title: "Electronice de uz casnic",
            items: "TV-uri, monitoare, console, sisteme audio",
          },
          {
            icon: IconPhonePulse,
            title: "Telefoane și laptopuri",
            items: "Laptopuri, telefoane, tablete, alimentare, conectori",
          },
          {
            icon: IconPcb,
            title: "Surse și plăci electronice",
            items: "Surse de alimentare, plăci de control, componente defecte",
          },
          {
            icon: IconSolar,
            title: "Industrial & fotovoltaic",
            items: "Invertoare solare, controlere, echipamente industriale",
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/[0.06]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/[0.06] blur-2xl transition-opacity duration-300 group-hover:bg-emerald-400/[0.14]" />
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-[#1f6f5b] text-white shadow-lg shadow-emerald-900/30">
              <item.icon size={22} />
            </div>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              {item.items}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 ring-1 ring-emerald-400/5"
    >
      <ScopePanel />

      <div className="px-3 pb-3 pt-6">
        <p className="text-sm font-semibold text-emerald-300">
          Diagnostic la nivel de componentă
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white">
          TV-uri, surse, plăci electronice și invertoare
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/65">
          Intervenții pentru electronice casnice, echipamente industriale și
          sisteme fotovoltaice.
        </p>
      </div>
    </motion.div>
  </div>
</motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden px-6 py-24 text-white"
      >

        <div className="relative z-10 mx-auto max-w-7xl">
          <div>
            <div>
              <div className="mb-14 max-w-2xl">
                <p className="mb-3 text-sm font-semibold text-emerald-300">
                  Reparații prin curier
                </p>

                <h2 className="text-4xl font-bold">
                  Poți trimite echipamentul din orice oraș
                </h2>

                <p className="mt-4 max-w-2xl text-white/60">
                  Completezi o cerere de diagnosticare, analizăm solicitarea,
                  iar dacă reparația merită încercată, putem organiza ridicarea
                  prin curier.
                </p>
              </div>

              <motion.div variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: IconDoc,
                    n: "01",
                    title: "Trimiți cererea",
                    text: "Descrii defectul și lași datele de contact.",
                  },
                  {
                    icon: IconMultimeter,
                    n: "02",
                    title: "Verificăm solicitarea",
                    text: "Analizăm dacă echipamentul merită trimis la diagnostic.",
                  },
                  {
                    icon: IconVan,
                    n: "03",
                    title: "Ridicare prin curier",
                    text: "După aprobare, curierul poate ridica produsul de la adresă.",
                  },
                  {
                    icon: IconBoxCheck,
                    n: "04",
                    title: "Reparație și retur",
                    text: "Reparăm, testăm și trimitem echipamentul înapoi.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                        <item.icon size={18} />
                      </span>
                      <span className="text-2xl font-bold tabular-nums text-white/10">
                        {item.n}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Poză cu CTA suprapus */}
              <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/repair.png"
                  alt="Service electronic IMPEDEX"
                  className="h-72 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">Ai nevoie de ajutor?</p>
                    <p className="mt-1 text-sm text-white/70">Scrie-ne și revenim cu un diagnostic rapid.</p>
                  </div>
                  <a
                    href="/diagnosticare"
                    className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#1f6f5b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-[#195c4b]"
                  >
                    Solicită diagnosticare
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.footer
        id="contact"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 border-t border-white/10 bg-[#050505] px-6 py-10 text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_500px]">
          <div>
            <div className="relative h-16 w-56">
              <Image
             src="/logo.png"
            alt="IMPEDEX"
             fill
              sizes="(max-width: 768px) 200px, 288px"
              className="object-contain object-left brightness-0 invert"
                  />
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
              Service electronic pentru TV-uri, telefoane, laptopuri, surse,
              plăci electronice, echipamente industriale și sisteme
              fotovoltaice.
            </p>

            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-white">Informații</h4>
                <div className="mt-3 space-y-2 text-sm text-white/55">
                  <a href="#reparații" className="block hover:text-white">
                    Service
                  </a>
                  <a href="#ce-reparam" className="block hover:text-white">
                    Ce reparăm
                  </a>
                  <a href="/diagnosticare" className="block hover:text-white">
                    Solicită diagnosticare
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white">Legal</h4>
                <div className="mt-3 space-y-2 text-sm text-white/55">
                  <a href="/privacy-policy" className="block hover:text-white">
                    Privacy Policy
                  </a>
                  <a href="/cookies" className="block hover:text-white">
                    Politica Cookies
                  </a>
                  <a href="/gdpr" className="block hover:text-white">
                    GDPR
                  </a>
                  <a
                    href="/termeni-si-conditii"
                    className="block hover:text-white"
                  >
                    Termeni și condiții
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white">Contact</h4>
                <div className="mt-3 space-y-2 text-sm text-white/60">
                  <p className="flex items-center gap-2">
                    <Mail size={15} className="text-emerald-300" />
                    contact@impedex.ro
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="text-emerald-300" />
                    +40 7xx xxx xxx
                  </p>
                </div>

                <a
                  href="https://wa.me/407xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-md bg-[#1f6f5b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#195c4b]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* FAQ — coloana dreaptă din footer */}
          <div>
            <h4 className="text-lg font-bold text-white">Întrebări frecvente</h4>
            <div className="mt-3 space-y-2">
              {[
                { q: "Cât durează diagnosticarea?", a: "În majoritatea cazurilor răspundem în 1-2 zile lucrătoare." },
                { q: "Pot trimite prin curier?", a: "Da. Organizăm ridicarea din orice localitate din România." },
                { q: "Cine plătește transportul?", a: "Costul este comunicat înainte de confirmarea reparației." },
                { q: "Oferiți garanție la reparații?", a: "Da, lucrările sunt testate și au garanție comunicată la confirmare." },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-emerald-400/25"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white">
                    {item.q}
                    <Plus size={15} className="shrink-0 text-emerald-300 transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-white/55">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} IMPEDEX · Reparații Electronice
            Profesionale
          </p>
          <p>Română (România)</p>
        </div>
      </motion.footer>
    </main>
  );
}
