"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Plus, MapPin } from "lucide-react";
import LogoMark from "./LogoMark";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = [
  { q: "Cât durează diagnosticarea?", a: "În majoritatea cazurilor răspundem în 1-2 zile lucrătoare." },
  { q: "Pot trimite prin curier?", a: "Da. Organizăm ridicarea din orice localitate din România." },
  { q: "Cine plătește transportul?", a: "Costul este comunicat înainte de confirmarea reparației." },
  { q: "Oferiți garanție la reparații?", a: "Da, lucrările sunt testate și au 6 luni garanție comunicată la confirmare." },
  { q: "Ce se întâmplă dacă reparația nu este posibilă?", a: "Vă informăm gratuit și returnăm dispozitivul fără niciun cost." },
];

export default function SiteFooter() {
  return (
    <motion.footer
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 bg-[#022e2a] px-6 py-6 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">

          {/* Left: logo + 3 categories */}
          <div className="flex-1">
            {/* Logo — centered above the 3 columns */}
            <div className="relative mx-auto mb-8 h-28 w-[32rem]">
              <LogoMark sizes="512px" light center />
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold text-white">Informații</h4>
                <div className="mt-3 space-y-2 text-sm text-white/80">
                  <a href="/#ce-reparam" className="block hover:text-white">Servicii</a>
                  <a href="/diagnosticare" className="block hover:text-white">Diagnosticare</a>
                  <a href="/despre" className="block hover:text-white">Despre noi</a>
                  <a href="/contact" className="block hover:text-white">Contact</a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white">Legal</h4>
                <div className="mt-3 space-y-2 text-sm text-white/80">
                  <a href="/privacy-policy" className="block hover:text-white">Privacy Policy</a>
                  <a href="/cookies" className="block hover:text-white">Politica Cookies</a>
                  <a href="/gdpr" className="block hover:text-white">GDPR</a>
                  <a href="/termeni-si-conditii" className="block hover:text-white">Termeni și condiții</a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white">Contact</h4>
                <div className="mt-3 space-y-2 text-sm text-white/70">
                  <p className="flex items-center gap-2">
                    <Mail size={15} className="text-[#16785F]" />
                    contact@impedex.ro
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="text-[#16785F]" />
                    +40 7xx xxx xxx
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#16785F]" />
                    Locație:
                  </p>
                </div>

                <a
                  href="https://wa.me/407xxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#022e2a] transition hover:bg-white/90"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden w-px self-stretch bg-white/15 lg:block mx-10" />

          {/* Right: FAQ */}
          <div className="w-full lg:w-[400px]">
            <h4 className="text-lg font-bold text-white">Întrebări frecvente</h4>
            <div className="mt-3 space-y-2">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 transition hover:border-[#16785F]/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white">
                    {item.q}
                    <Plus size={15} className="shrink-0 text-[#16785F] transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-white/75">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2 border-t border-white/15 pt-4 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} IMPEDEX · Reparații Electronice Profesionale</p>
        <p>Română (România)</p>
      </div>
    </motion.footer>
  );
}
