"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import PcbCanvas from "@/components/PcbCanvas";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconTvWave, IconPhonePulse, IconPcb, IconSolar } from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const SERVICES = [
  {
    icon: IconTvWave,
    title: "Electronice de uz casnic",
    desc: "Diagnostic și reparație pentru aparatura de zi cu zi, la nivel de componentă.",
    items: ["TV-uri LED, OLED, QLED", "Monitoare și display-uri", "Console de jocuri", "Sisteme audio și amplificatoare"],
  },
  {
    icon: IconPhonePulse,
    title: "Telefoane și laptopuri",
    desc: "Probleme de alimentare, conectori, încărcare și componente de pe placă.",
    items: ["Laptopuri și PC-uri", "Telefoane și tablete", "Mufe de încărcare și conectori", "Circuite de alimentare"],
  },
  {
    icon: IconPcb,
    title: "Surse și plăci electronice",
    desc: "Reparații la nivel de componentă pentru surse și plăci de control.",
    items: ["Surse de alimentare", "Plăci de control și comandă", "Condensatori, MOSFET, regulatoare", "Reflow și relipire componente"],
  },
  {
    icon: IconSolar,
    title: "Industrial & fotovoltaic",
    desc: "Echipamente industriale și sisteme de energie solară.",
    items: ["Invertoare solare", "Controlere de încărcare", "Automatizări și PLC-uri", "Echipamente de putere"],
  },
];

export default function ServiciiPage() {
  return (
    <main className="relative min-h-screen bg-[#07111f] font-sans text-white">
      <PcbCanvas />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-36 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-emerald-300">Servicii</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Ce reparăm la IMPEDEX
          </h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            De la electronice de uz casnic până la echipamente industriale și
            sisteme fotovoltaice - diagnosticăm și reparăm la nivel de
            componentă, cu peste 30 de ani de experiență.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/[0.06] blur-2xl transition-opacity duration-300 group-hover:bg-emerald-400/[0.14]" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-[#1f6f5b] text-white shadow-lg shadow-emerald-900/30">
                <s.icon size={22} />
              </div>
              <h2 className="text-xl font-semibold text-white">{s.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-sm text-white/70">
                    <Check size={15} className="shrink-0 text-emerald-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 sm:flex-row">
          <div>
            <h3 className="text-2xl font-bold">Nu îți găsești echipamentul în listă?</h3>
            <p className="mt-2 text-sm text-white/60">
              Trimite-ne o cerere - analizăm orice tip de device și revenim cu un verdict.
            </p>
          </div>
          <a
            href="/diagnosticare"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#1f6f5b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-[#195c4b]"
          >
            Solicită diagnosticare
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
