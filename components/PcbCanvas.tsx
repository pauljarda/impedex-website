"use client";

import { useEffect, useRef } from "react";

export default function PcbCanvas() {
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

      /* iso projection - diamond grid centered, covers whole viewport */
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
