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
      className="relative z-10 bg-[#022e2a] px-6 py-7 text-[#FFFFFF]"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_500px]">
        <div>
          <div className="relative h-16 w-56">
            <LogoMark sizes="(max-width: 768px) 200px, 288px" light />
          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#FFFFFF]/65">
            Service electronic pentru TV-uri, telefoane, laptopuri, surse,
            plăci electronice, echipamente industriale și sisteme
            fotovoltaice.
          </p>

          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-[#FFFFFF]">Informații</h4>
              <div className="mt-3 space-y-2 text-sm text-[#FFFFFF]/65">
                <a href="/#ce-reparam" className="block hover:text-white">Servicii</a>
                <a href="/diagnosticare" className="block hover:text-white">Diagnosticare</a>
                <a href="/despre" className="block hover:text-white">Despre noi</a>
                <a href="/contact" className="block hover:text-white">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#FFFFFF]">Legal</h4>
              <div className="mt-3 space-y-2 text-sm text-[#FFFFFF]/65">
                <a href="/privacy-policy" className="block hover:text-white">Privacy Policy</a>
                <a href="/cookies" className="block hover:text-white">Politica Cookies</a>
                <a href="/gdpr" className="block hover:text-white">GDPR</a>
                <a href="/termeni-si-conditii" className="block hover:text-white">Termeni și condiții</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#FFFFFF]">Contact</h4>
              <div className="mt-3 space-y-2 text-sm text-[#FFFFFF]/70">
                <p className="flex items-center gap-2">
                  <Mail size={15} className="text-[#16785F]" />
                  contact@impedex.ro
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-[#16785F]" />
                  +40 7xx xxx xxx
                </p>
                <a
                  href="https://www.google.com/maps/place/Romania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <MapPin size={15} className="text-[#16785F]" />
                  Acoperire: toată România
                </a>
              </div>

              <a
                href="https://wa.me/407xxxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-md bg-[#FFFFFF] px-5 py-2.5 text-sm font-semibold text-[#004643] transition hover:bg-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* FAQ - coloana dreaptă din footer */}
        <div>
          <h4 className="text-lg font-bold text-[#FFFFFF]">Întrebări frecvente</h4>
          <div className="mt-3 space-y-2">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#FFFFFF]/15 bg-[#FFFFFF]/[0.04] px-4 py-3 transition hover:border-[#16785F]/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#FFFFFF]">
                  {item.q}
                  <Plus size={15} className="shrink-0 text-[#16785F] transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/60">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-4 border-t border-[#FFFFFF]/15 pt-5 text-sm text-[#FFFFFF]/45 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} IMPEDEX · Reparații Electronice
          Profesionale
        </p>
        <p>Română (România)</p>
      </div>
    </motion.footer>
  );
}
