"use client";
import Image from "next/image";

const repairItems = [
  "TV & Monitoare",
  "Laptopuri & PC",
  "Plăci electronice",
  "Diagnoză",
];

const productItems = [
  "Laptopuri",
  "Monitoare",
  "Componente",
  "Electronice",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#b5b5b5_0%,#a5a5a5_18%,#c2c2c2_36%,#9e9e9e_52%,#d2d2d2_68%,#a5a5a5_84%,#b2b2b2_100%),repeating-linear-gradient(45deg,#bebebe_0px,#bebebe_3px,#c8c8c8_3px,#c8c8c8_6px)] text-[#041b4a]">
      {/* Header — ultra-slim version */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#d0d0d0]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 h-[52px] sm:h-[58px] md:h-16">
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="IMPEDEX"
              width={865}
              height={349}
              className="h-[38px] sm:h-[44px] md:h-22 w-auto object-contain drop-shadow-sm"
              priority
            />
          </a>
          <nav className="hidden gap-5 sm:gap-6 text-xs sm:text-sm font-semibold text-[#041b4a] lg:flex">
            <a href="#reparatii" className="hover:opacity-75 transition-opacity">Reparații</a>
            <a href="#magazin" className="hover:opacity-75 transition-opacity">Magazin</a>
            <a href="#avantaje" className="hover:opacity-75 transition-opacity">Avantaje</a>
            <a href="#contact" className="hover:opacity-75 transition-opacity">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-[#041b4a]/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#041b4a] transition hover:bg-[#041b4a] hover:text-white"
          >
            Cere ofertă
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="rounded-[1.75rem] sm:rounded-[2rem] border border-gray-500/25 bg-gradient-to-br from-[#dcdcdc] via-[#c8c8c8] to-[#b8b8b8] p-7 sm:p-9 md:p-10 shadow-[inset_0_3px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.07),0_12px_35px_rgba(0,0,0,0.14)]">
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-700 font-medium">
            Service electronic & produse verificate
          </p>
          <h1 className="text-3.5xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#041b4a]">
            Reparații electronice și produse second-hand{" "}
            <span className="text-[#0b3d2e]">verificate corect</span>
          </h1>
          <p className="mt-5 sm:mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-gray-800">
            IMPEDEX oferă reparații profesioniste și echipamente verificate,
            într-un format curat, premium și serios, cu un look tehnic inspirat
            din materiale metalice și electronică de precizie.
          </p>
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="rounded-full bg-[#0b3d2e] px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Programează reparație
            </a>
            <a
              href="#magazin"
              className="rounded-full border border-[#041b4a]/30 bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0] px-6 py-2.5 sm:py-3 text-sm font-semibold text-[#041b4a] transition hover:brightness-105"
            >
              Vezi produse
            </a>
          </div>
        </div>
      </section>

      {/* Reparații */}
      <section id="reparatii" className="mx-auto max-w-7xl px-5 sm:px-6 py-14 sm:py-20">
        <h2 className="mb-8 sm:mb-10 text-2.5xl sm:text-3xl font-bold text-[#041b4a]">Ce reparăm</h2>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {repairItems.map((item, i) => (
            <div
              key={item}
              className="group rounded-2xl sm:rounded-3xl border border-gray-500/25 bg-gradient-to-br from-[#e0e0e0] via-[#d0d0d0] to-[#c2c2c2] p-6 sm:p-7 shadow-[inset_0_3px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.06),0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:shadow-[inset_0_3px_0_rgba(255,255,255,0.5),0_16px_40px_rgba(0,0,0,0.16)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#041b4a]">{item}</h3>
              <p className="mt-3 text-sm text-gray-800">
                Diagnostic și reparații profesioniste, cu intervenții curate și evaluare serioasă.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Magazin */}
      <section id="magazin" className="mx-auto max-w-7xl px-5 sm:px-6 py-14 sm:py-20">
        <h2 className="mb-8 sm:mb-10 text-2.5xl sm:text-3xl font-bold text-[#041b4a]">Produse Second-Hand</h2>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productItems.map((item, i) => (
            <div
              key={item}
              className="group rounded-2xl sm:rounded-3xl border border-gray-500/25 bg-gradient-to-br from-[#e0e0e0] via-[#d0d0d0] to-[#c2c2c2] p-6 sm:p-7 shadow-[inset_0_3px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.06),0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:shadow-[inset_0_3px_0_rgba(255,255,255,0.5),0_16px_40px_rgba(0,0,0,0.16)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 flex h-24 sm:h-28 items-center justify-center">
                <div className="h-16 sm:h-20 w-16 sm:w-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 shadow-inner" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#041b4a]">{item}</h3>
              <p className="mt-3 text-sm text-gray-800">
                Produse testate, verificate și pregătite pentru vânzare într-un format curat și profesionist.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-5 sm:px-6 py-14 sm:py-20">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-500/25 bg-gradient-to-br from-[#dcdcdc] via-[#c8c8c8] to-[#b8b8b8] p-8 sm:p-10 shadow-[inset_0_3px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.07),0_12px_35px_rgba(0,0,0,0.14)]">
          <h2 className="text-2.5xl sm:text-3xl font-bold text-[#041b4a]">Contactează-ne</h2>
          <p className="mt-4 text-sm sm:text-base text-gray-800">
            Scrie-ne sau sună-ne pentru reparații sau produse disponibile. Răspuns clar și rapid.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:contact@impedex.ro"
              className="rounded-full bg-[#041b4a] px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              contact@impedex.ro
            </a>
            <a
              href="tel:+40700000000"
              className="rounded-full border border-[#041b4a]/30 bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0] px-6 py-2.5 sm:py-3 text-sm font-semibold text-[#041b4a] transition hover:brightness-105"
            >
              Sună-ne
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-500/25 py-7 sm:py-8 text-center text-xs sm:text-sm text-gray-800 bg-[#b0b0b0]/70 backdrop-blur-sm">
        © {new Date().getFullYear()} IMPEDEX · Reparații Electronice Profesionale
      </footer>
    </main>
  );
}