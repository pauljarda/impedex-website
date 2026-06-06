"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, User } from "lucide-react";

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

      <section id="reparații" className="relative min-h-screen overflow-hidden">
        <img
          src="/repair-section.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/80 to-[#07111f]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-[#07111f]/50" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#07111f]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-28 lg:px-8"
        >
          <div className="max-w-4xl">
            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Reparații TV, laptopuri și electronice industriale
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Diagnostic și reparații pentru TV-uri, telefoane, laptopuri,
              surse, plăci electronice și echipamente industriale.
            </p>

            <div className="mt-10 flex max-w-4xl flex-col gap-4 sm:flex-row">
              <a
                href="/diagnosticare"
                className="inline-flex min-w-[210px] items-center justify-center rounded-md bg-[#1f6f5b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#195c4b]"
              >
                Solicită diagnosticare
              </a>

              <a
                href="#ce-reparam"
                className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-md bg-white px-7 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-slate-100"
              >
                Vezi ce reparăm
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="mt-10 grid max-w-4xl gap-8 border-l-2 border-emerald-500 pl-6 sm:grid-cols-3">
              <div>
                <p className="text-lg font-semibold text-white">
                  30+ ani experiență
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Reparații și diagnoză electronică
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold text-white">
                  TV • Telefoane • Laptopuri
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Diagnostic și reparații profesionale
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold text-white">
                  Industrial & Fotovoltaic
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Invertoare, surse și plăci electronice
                </p>
              </div>
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
  className="bg-[#07111f] px-6 py-24 text-white"
>
  <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
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
            title: "Electronice de uz casnic",
            items: "TV-uri, monitoare, console, sisteme audio",
          },
          {
            title: "Telefoane și laptopuri",
            items: "Laptopuri, telefoane, tablete, alimentare, conectori",
          },
          {
            title: "Surse și plăci electronice",
            items: "Surse de alimentare, plăci de control, componente defecte",
          },
          {
            title: "Industrial & fotovoltaic",
            items: "Invertoare solare, controlere, echipamente industriale",
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
          >
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
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4"
    >
      <img
        src="/repair.png"
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
        className="bg-[#07111f] px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="mb-14">
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

              <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "1. Trimiți cererea",
                    text: "Descrii defectul și lași datele de contact.",
                  },
                  {
                    title: "2. Verificăm solicitarea",
                    text: "Analizăm dacă echipamentul merită trimis la diagnostic.",
                  },
                  {
                    title: "3. Ridicare prin curier",
                    text: "După aprobare, curierul poate ridica produsul de la adresă.",
                  },
                  {
                    title: "4. Reparație și retur",
                    text: "Reparăm, testăm și trimitem echipamentul înapoi.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <a
                href="/diagnosticare"
                className="mt-10 inline-flex items-center justify-center rounded-md bg-[#1f6f5b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#195c4b]"
              >
                Solicită diagnosticare
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Întrebări frecvente
              </h3>

              <div className="space-y-4">
                <details className="rounded-xl border border-white/10 p-4">
                  <summary className="cursor-pointer font-medium">
                    Cât durează diagnosticarea?
                  </summary>
                  <p className="mt-3 text-sm text-white/60">
                    În majoritatea cazurilor răspundem în 1-2 zile lucrătoare.
                  </p>
                </details>

                <details className="rounded-xl border border-white/10 p-4">
                  <summary className="cursor-pointer font-medium">
                    Ce se întâmplă dacă nu merită reparat?
                  </summary>
                  <p className="mt-3 text-sm text-white/60">
                    Te contactăm înainte de orice lucrare și îți prezentăm
                    opțiunile.
                  </p>
                </details>

                <details className="rounded-xl border border-white/10 p-4">
                  <summary className="cursor-pointer font-medium">
                    Pot trimite prin curier?
                  </summary>
                  <p className="mt-3 text-sm text-white/60">
                    Da. Putem organiza ridicarea produsului din orice localitate
                    din România.
                  </p>
                </details>

                <details className="rounded-xl border border-white/10 p-4">
                  <summary className="cursor-pointer font-medium">
                    Cine plătește transportul?
                  </summary>
                  <p className="mt-3 text-sm text-white/60">
                    Costul transportului este comunicat înainte de confirmarea
                    reparației.
                  </p>
                </details>

                <details className="rounded-xl border border-white/10 p-4">
                  <summary className="cursor-pointer font-medium">
                    Pot verifica statusul reparației?
                  </summary>
                  <p className="mt-3 text-sm text-white/60">
                    Da. Din contul client vei putea urmări fiecare etapă a
                    reparației.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.footer
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
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