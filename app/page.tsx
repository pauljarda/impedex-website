"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  User,
  Tv,
  Smartphone,
  CircuitBoard,
  Sun,
  ShieldCheck,
  Clock,
  Truck,
  FileText,
  Wrench,
  PackageCheck,
  Plus,
  Activity,
  Cpu,
  Zap,
} from "lucide-react";

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

function DiagBanner() {
  const [readout, setReadout] = useState({ v: "12.04", hz: "50.0", temp: "36.8" });
  const [mosfetDone, setMosfetDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setReadout({
        v: (11.9 + Math.random() * 0.35).toFixed(2),
        hz: (49.8 + Math.random() * 0.4).toFixed(1),
        temp: (36 + Math.random() * 2.5).toFixed(1),
      });
    }, 900);
    const mosfetCycle = setInterval(() => setMosfetDone(p => !p), 4200);
    return () => { clearInterval(id); clearInterval(mosfetCycle); };
  }, []);

  return (
    <div aria-hidden="true" className="relative z-10 border-y border-white/10 bg-[#0a1622]/65 backdrop-blur-md">
      <style>{`
        @keyframes hudWave { from { transform: translateX(0); } to { transform: translateX(-220px); } }
        @keyframes hudBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes hudScan { 0%, 100% { left: 4%; } 50% { left: 92%; } }
      `}</style>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-4 px-6 py-4 lg:px-8">
        {/* ── Oscilloscope segment ── */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-300" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">CH1</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "hudBlink 1.3s ease-in-out infinite" }} />
          </div>

          <div className="relative h-10 w-44 overflow-hidden rounded-md border border-white/5 bg-black/50">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 44" preserveAspectRatio="none">
              <line x1="0" y1="22" x2="220" y2="22" stroke="#1f6f5b" strokeWidth="0.5" opacity="0.3" />
              {[44, 88, 132, 176].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="44" stroke="#1f6f5b" strokeWidth="0.5" opacity="0.25" />
              ))}
            </svg>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 220 44">
              <g style={{ animation: "hudWave 3.2s linear infinite" }}>
                <path
                  d="M0,22 q11,-30 22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0 t22,0"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
              </g>
            </svg>
            <div
              className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-300/80 to-transparent"
              style={{ animation: "hudScan 3s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* ── Readouts ── */}
        <div className="flex items-center gap-2">
          {[
            { label: "Tensiune", value: `${readout.v} V` },
            { label: "Frecvență", value: `${readout.hz} Hz` },
            { label: "Temp.", value: `${readout.temp} °C` },
          ].map(r => (
            <div key={r.label} className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-center">
              <p className="text-[9px] uppercase tracking-wider text-white/40">{r.label}</p>
              <p className="font-mono text-[13px] font-semibold tabular-nums text-emerald-300">{r.value}</p>
            </div>
          ))}
        </div>

        <div className="hidden h-9 w-px bg-white/10 lg:block" />

        {/* ── Diagnostic inline ── */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <Cpu size={13} className="text-emerald-300" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">Diagnostic</span>
          </div>
          {[
            { name: "Sursă", ok: true },
            { name: "Condensatori", ok: true },
            { name: "MOSFET Q3", ok: mosfetDone },
          ].map(row => (
            <div key={row.name} className="flex items-center gap-2 text-[12px]">
              <span className="text-white/55">{row.name}</span>
              {row.ok ? (
                <span className="font-mono text-[11px] font-semibold text-emerald-300">OK</span>
              ) : (
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
                  <span className="h-1 w-1 rounded-full bg-amber-300" style={{ animation: "hudBlink 0.8s infinite" }} />
                  test…
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ── Badge ── */}
        <div className="ml-auto flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] py-1.5 pl-3 pr-3.5">
          <Zap size={12} className="text-emerald-300" />
          <span className="font-mono text-[11px] font-semibold text-emerald-300">+12V RAIL — OK</span>
        </div>
      </div>
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
          className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pb-16 pt-28 lg:px-8"
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

            <div className="mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "30+ ani",
                  sub: "Experiență",
                },
                {
                  icon: ShieldCheck,
                  title: "Garanție",
                  sub: "La reparații",
                },
                {
                  icon: Truck,
                  title: "Curier",
                  sub: "Din toată țara",
                },
              ].map((s) => (
                <div key={s.title} className="flex items-center gap-3">
                  <s.icon size={18} className="shrink-0 text-emerald-400" strokeWidth={1.75} />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{s.title}</p>
                    <p className="text-xs text-white/45">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <DiagBanner />

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
            icon: Tv,
            title: "Electronice de uz casnic",
            items: "TV-uri, monitoare, console, sisteme audio",
          },
          {
            icon: Smartphone,
            title: "Telefoane și laptopuri",
            items: "Laptopuri, telefoane, tablete, alimentare, conectori",
          },
          {
            icon: CircuitBoard,
            title: "Surse și plăci electronice",
            items: "Surse de alimentare, plăci de control, componente defecte",
          },
          {
            icon: Sun,
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
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/40 ring-1 ring-emerald-400/5"
    >
      <img
        src="/repair-section.png"
        alt="Reparații electronice IMPEDEX"
        className="h-[520px] w-full rounded-2xl object-cover opacity-90"
      />

      <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-[#07111f]/90 via-transparent to-transparent" />

      <div className="absolute bottom-10 left-10 right-10">
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
                    icon: FileText,
                    n: "01",
                    title: "Trimiți cererea",
                    text: "Descrii defectul și lași datele de contact.",
                  },
                  {
                    icon: Wrench,
                    n: "02",
                    title: "Verificăm solicitarea",
                    text: "Analizăm dacă echipamentul merită trimis la diagnostic.",
                  },
                  {
                    icon: Truck,
                    n: "03",
                    title: "Ridicare prin curier",
                    text: "După aprobare, curierul poate ridica produsul de la adresă.",
                  },
                  {
                    icon: PackageCheck,
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
