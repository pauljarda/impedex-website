"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PcbCanvas from "@/components/PcbCanvas";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconSolder, IconShieldTrace, IconClockPulse, IconVan } from "@/components/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const STATS = [
  { value: "30+", label: "Ani de experiență" },
  { value: "1-2 zile", label: "Timp de răspuns" },
  { value: "6 luni", label: "Garanție la reparații" },
  { value: "Național", label: "Ridicare prin curier" },
];

const VALUES = [
  {
    icon: IconSolder,
    title: "Reparație la nivel de componentă",
    text: "Nu schimbăm module întregi inutil. Identificăm exact componenta defectă și o înlocuim - mai ieftin și mai durabil.",
  },
  {
    icon: IconShieldTrace,
    title: "Transparență totală",
    text: "Primești un verdict clar și costul comunicat înainte de orice intervenție. Fără surprize la final.",
  },
  {
    icon: IconClockPulse,
    title: "Diagnostic rapid",
    text: "Răspundem la cererile de diagnosticare în 1-2 zile lucrătoare, ca să nu stai cu echipamentul blocat.",
  },
  {
    icon: IconVan,
    title: "Acoperire națională",
    text: "Oriunde te-ai afla în România, organizăm ridicarea și returul prin curier.",
  },
];

export default function DesprePage() {
  return (
    <main className="relative min-h-screen bg-[#07111f] font-sans text-[#FFFFFF]">
      <PcbCanvas />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-36 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-[#16785F]">Despre noi</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Service electronic cu peste 30 de ani de experiență
          </h1>
          <p className="mt-5 text-base leading-7 text-[#FFFFFF]/75">
            IMPEDEX este un service specializat în reparația electronicelor, de
            la aparatura de uz casnic până la echipamente industriale și sisteme
            fotovoltaice. Lucrăm la nivel de componentă, cu instrumente de
            măsură profesionale și o experiență acumulată în zeci de ani de
            depanare - de la televizoarele clasice până la invertoarele moderne.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-[#FFFFFF]/12 bg-[#0f1b2e] p-6 text-center"
            >
              <p className="text-3xl font-bold text-[#16785F]">{s.value}</p>
              <p className="mt-1.5 text-sm text-[#FFFFFF]/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <h2 className="mb-10 text-3xl font-bold">De ce ne aleg clienții</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-start gap-5 rounded-2xl border border-[#FFFFFF]/12 bg-[#0f1b2e] p-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#16785F]/8 text-[#16785F] ring-1 ring-[#16785F]/15">
                <v.icon size={22} />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[#FFFFFF]">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/75">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#FFFFFF]/12 bg-gradient-to-br from-[#16785F]/10 to-transparent p-8 sm:flex-row">
          <div>
            <h3 className="text-2xl font-bold">Ai un echipament defect?</h3>
            <p className="mt-2 text-sm text-[#FFFFFF]/75">Trimite-ne o cerere de diagnosticare și revenim rapid cu un verdict.</p>
          </div>
          <a
            href="/diagnosticare"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#0B6B5E] px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] shadow-lg shadow-black/30 transition-all hover:bg-[#0A5A4F]"
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
