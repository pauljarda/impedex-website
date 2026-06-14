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
      className="relative z-10 border-t border-white/10 bg-[#050505] px-6 py-10 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_500px]">
        <div>
          <div className="relative h-16 w-56">
            <LogoMark sizes="(max-width: 768px) 200px, 288px" />
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
                <a href="/servicii" className="block hover:text-white">Servicii</a>
                <a href="/diagnosticare" className="block hover:text-white">Diagnosticare</a>
                <a href="/despre" className="block hover:text-white">Despre noi</a>
                <a href="/contact" className="block hover:text-white">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white">Legal</h4>
              <div className="mt-3 space-y-2 text-sm text-white/55">
                <a href="/privacy-policy" className="block hover:text-white">Privacy Policy</a>
                <a href="/cookies" className="block hover:text-white">Politica Cookies</a>
                <a href="/gdpr" className="block hover:text-white">GDPR</a>
                <a href="/termeni-si-conditii" className="block hover:text-white">Termeni și condiții</a>
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
                <a
                  href="https://www.google.com/maps/place/Romania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <MapPin size={15} className="text-emerald-300" />
                  Acoperire: toată România
                </a>
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

        {/* FAQ - coloana dreaptă din footer */}
        <div>
          <h4 className="text-lg font-bold text-white">Întrebări frecvente</h4>
          <div className="mt-3 space-y-2">
            {FAQ.map((item) => (
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
  );
}
