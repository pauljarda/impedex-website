"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

function PcbBoard({ idPrefix }: { idPrefix: string }) {
  const glow = `${idPrefix}Glow`;
  const soft = `${idPrefix}Soft`;
  const dot = `${idPrefix}Dot`;
  return (
    <svg
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 760"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={dot}>
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="1" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <filter id={glow}>
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={soft}><feGaussianBlur stdDeviation="0.3" /></filter>
      </defs>

      {/* Grid */}
      <g stroke="#1f6f5b" strokeWidth="0.5" opacity="0.12" fill="none">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={60 * i} x2="600" y2={60 * i} />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={60 * i} y1="0" x2={60 * i} y2="760" />
        ))}
      </g>

      {/* Primary traces (draw in) */}
      <g className="pcb-trace" stroke="#34d399" strokeWidth="1.4" fill="none" opacity="0.5" filter={`url(#${soft})`}>
        <line x1="80" y1="80" x2="80" y2="680" />
        <line x1="300" y1="80" x2="300" y2="680" />
        <line x1="520" y1="80" x2="520" y2="680" />
        <line x1="80" y1="80" x2="520" y2="80" />
        <line x1="300" y1="200" x2="520" y2="200" />
        <line x1="80" y1="320" x2="300" y2="320" />
        <line x1="300" y1="440" x2="520" y2="440" />
        <line x1="80" y1="560" x2="300" y2="560" />
        <line x1="80" y1="680" x2="520" y2="680" />
        <line x1="520" y1="200" x2="420" y2="200" />
        <line x1="420" y1="200" x2="420" y2="320" />
        <line x1="420" y1="320" x2="300" y2="320" />
        <line x1="80" y1="320" x2="180" y2="320" />
        <line x1="180" y1="320" x2="180" y2="440" />
        <line x1="300" y1="560" x2="400" y2="560" />
        <line x1="400" y1="560" x2="400" y2="680" />
      </g>

      {/* Secondary traces */}
      <g stroke="#1f6f5b" strokeWidth="0.8" fill="none" opacity="0.35" filter={`url(#${soft})`}>
        <line x1="140" y1="140" x2="240" y2="140" />
        <line x1="240" y1="140" x2="240" y2="260" />
        <line x1="360" y1="120" x2="460" y2="120" />
        <line x1="460" y1="380" x2="460" y2="500" />
        <line x1="140" y1="600" x2="240" y2="600" />
        <line x1="360" y1="500" x2="460" y2="500" />
      </g>

      {/* IC chips */}
      <g fill="#0c2a20" stroke="#34d399" strokeWidth="1.2" opacity="0.6">
        <rect x="120" y="360" width="90" height="64" rx="5" />
        <rect x="350" y="240" width="64" height="90" rx="5" />
        <rect x="440" y="120" width="64" height="84" rx="5" />
        <rect x="330" y="600" width="84" height="60" rx="5" />
      </g>

      {/* SMD pads */}
      <g fill="none" stroke="#34d399" strokeWidth="1" opacity="0.5">
        <rect x="68" y="188" width="24" height="24" rx="3" />
        <rect x="288" y="308" width="24" height="24" rx="3" />
        <rect x="508" y="428" width="24" height="24" rx="3" />
        <rect x="168" y="548" width="24" height="24" rx="3" />
        <rect x="388" y="188" width="24" height="24" rx="3" />
      </g>

      {/* Vias (pulsing) */}
      <g className="pcb-via" fill="#34d399" opacity="0.85">
        {[
          [80,80],[300,80],[520,80],[300,200],[520,200],[80,320],[300,320],
          [300,440],[520,440],[80,560],[300,560],[80,680],[300,680],[520,680],
          [180,320],[180,440],[420,200],[420,320],[400,560],[400,680],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.7" />
            <circle cx={cx} cy={cy} r="2.4" />
          </g>
        ))}
      </g>

      {/* Glow accents (pulsing) */}
      <g className="pcb-glow" stroke="#6ee7b7" strokeWidth="1.6" fill="none" opacity="0.4" filter={`url(#${glow})`}>
        <line x1="80" y1="80" x2="80" y2="680" />
        <line x1="520" y1="80" x2="520" y2="680" />
        <line x1="80" y1="80" x2="520" y2="80" />
      </g>

      {/* Continuous current flowing along the buses */}
      <g className="pcb-flow" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" filter={`url(#${glow})`}>
        <line x1="80" y1="80" x2="80" y2="680" />
        <line x1="520" y1="80" x2="520" y2="680" />
        <line x1="300" y1="80" x2="300" y2="680" />
        <line x1="80" y1="80" x2="520" y2="80" />
        <line x1="80" y1="680" x2="520" y2="680" />
        <line x1="80" y1="320" x2="300" y2="320" />
        <line x1="300" y1="440" x2="520" y2="440" />
      </g>

      {/* Radar ping rings from key junctions */}
      <g fill="none" stroke="#6ee7b7" strokeWidth="1.5">
        {[
          [80, 80], [520, 680], [300, 440], [520, 200], [180, 440],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4">
            <animate attributeName="r" values="3;28" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Twinkling bright vias */}
      <g fill="#a7f3d0" filter={`url(#${glow})`}>
        {[
          [300, 80], [80, 320], [520, 440], [400, 680], [300, 200], [80, 560],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            className="pcb-twinkle"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>

      {/* Flowing signal comets (bright + many) */}
      <g filter={`url(#${glow})`}>
        {[
          { d: "M80,80 L80,680", dur: "3.5s" },
          { d: "M520,80 L520,680", dur: "4.2s" },
          { d: "M300,80 L300,680", dur: "5s" },
          { d: "M80,80 L520,80", dur: "3s" },
          { d: "M80,680 L520,680", dur: "3.4s" },
          { d: "M520,200 L420,200 L420,320 L300,320", dur: "4.5s" },
          { d: "M80,320 L300,320 L300,440 L520,440", dur: "5.5s" },
          { d: "M80,80 L180,80 L180,320 L80,320", dur: "4s" },
        ].map((p, i) => (
          <circle key={i} r="6" fill={`url(#${dot})`}>
            <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} begin={`${i * 0.45}s`} />
          </circle>
        ))}
      </g>
    </svg>
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
        <style>{`
          @keyframes pcbDraw { from { stroke-dashoffset: 1600; } to { stroke-dashoffset: 0; } }
          @keyframes pcbPulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.75; } }
          @keyframes viaGlow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
          @keyframes pcbFlow { to { stroke-dashoffset: -200; } }
          @keyframes pcbTwinkle { 0%,100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 1; transform: scale(1.25); } }
          .pcb-trace { stroke-dasharray: 1600; animation: pcbDraw 3s ease-out forwards; }
          .pcb-glow { animation: pcbPulse 3s ease-in-out infinite; }
          .pcb-via { animation: viaGlow 2.6s ease-in-out infinite; }
          .pcb-flow { stroke-dasharray: 4 18; animation: pcbFlow 2.2s linear infinite; }
          .pcb-twinkle { transform-box: fill-box; transform-origin: center; animation: pcbTwinkle 2s ease-in-out infinite; }
        `}</style>

        {/* Ambient green glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 75% 25%, rgba(31,111,91,0.20), transparent 65%)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#07111f]" />

        {/* ── PCB background — starts at the far right, fades into the page ── */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] opacity-50 lg:block">
          <PcbBoard idPrefix="pcbHero" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07111f]/45 to-[#07111f]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#07111f]" />
        </div>

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

      <motion.section
  id="ce-reparam"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={fadeUp}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative overflow-hidden bg-[#07111f] px-6 py-24 text-white"
>
  {/* Traveling PCB — now on the left */}
  <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[40%] opacity-50 lg:block">
    <PcbBoard idPrefix="pcbMid" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#07111f]/75 to-[#07111f]" />
  </div>

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
        className="relative overflow-hidden bg-[#07111f] px-6 py-24 text-white"
      >
        {/* Traveling PCB — back to the right, ending above the footer */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] opacity-50 lg:block">
          <PcbBoard idPrefix="pcbFoot" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07111f]/75 to-[#07111f]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#07111f]" />
        </div>

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
        className="border-t border-white/10 bg-[#080808] px-6 py-16 text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_500px]">
          <div>
            <div className="relative h-24 w-72">
              <Image
             src="/logo.png"
            alt="IMPEDEX"
             fill
              sizes="(max-width: 768px) 200px, 288px"
              className="object-contain object-left brightness-0 invert"
                  />
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
              Service electronic pentru TV-uri, telefoane, laptopuri, surse,
              plăci electronice, echipamente industriale și sisteme
              fotovoltaice.
            </p>

            <div className="mt-8 grid gap-10 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-white">Informații</h4>
                <div className="mt-5 space-y-3 text-sm text-white/55">
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
                <div className="mt-5 space-y-3 text-sm text-white/55">
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
                <div className="mt-5 space-y-3 text-sm text-white/60">
                  <p className="flex items-center gap-2">
                    <Mail size={15} className="text-emerald-300" />
                    contact@impedex.ro
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="text-emerald-300" />
                    +40 7xx xxx xxx
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="mt-1 text-emerald-300" />
                    Sângeorz-Băi, Bistrița-Năsăud
                  </p>
                </div>

                <a
                  href="https://wa.me/407xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-md bg-[#1f6f5b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#195c4b]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* FAQ — coloana dreaptă din footer */}
          <div>
            <h4 className="text-lg font-bold text-white">Întrebări frecvente</h4>
            <div className="mt-5 space-y-2">
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

        <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
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