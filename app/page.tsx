"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Phone,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("repair_requests").insert([
      {
        full_name: fullName,
        phone,
        device_type: deviceType,
        issue_description: issueDescription,
      },
    ]);

    if (!error) {
      setFormSubmitted(true);
      setFullName("");
      setPhone("");
      setDeviceType("");
      setIssueDescription("");
      setTimeout(() => setFormSubmitted(false), 5000);
    }

    setIsSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-[#07111f] font-sans text-white">
      <header
        className={`fixed top-0 z-50 w-full border-b border-white/10 bg-[#07111f]/95 backdrop-blur-md transition-all duration-300 ${
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
          src="/repair.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-150"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/80 to-[#07111f]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-[#07111f]/50" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-24 lg:px-8">
          <div className="max-w-4xl">

            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Reparații TV, laptopuri și electronice industriale
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Diagnostic și reparații pentru TV-uri, telefoane, laptopuri, surse, plăci electronice și echipamente industriale.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-[#1f6f5b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#195c4b]"
              >
                Contactează service-ul
              </a>

              <a
                href="#magazin"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-slate-100"
              >
                Vezi produse
                <ArrowRight size={15} />
              </a>
            </div>
           <div className="mt-10 flex flex-wrap gap-10 border-l-2 border-emerald-500 pl-6">
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
        </div>
      </section>

     <section id="ce-reparam" className="bg-[#07111f] px-6 py-24 text-white">
  <div className="mx-auto max-w-7xl">
    <div className="mb-14">
      <p className="mb-3 text-sm font-semibold text-emerald-300">
        Ce reparăm
      </p>

      <h2 className="text-4xl font-bold">
        Echipamente și sisteme electronice
      </h2>

      <p className="mt-4 max-w-2xl text-white/60">
        De la electronice de uz casnic până la echipamente industriale și
        sisteme fotovoltaice.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        "Televizoare",
        "Telefoane",
        "Laptopuri",
        "Console",
        "Monitoare",
        "Surse de alimentare",
        "Invertoare fotovoltaice",
        "Plăci electronice industriale",
      ].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]"
        >
          <h3 className="text-lg font-semibold">{item}</h3>

          <p className="mt-3 text-sm leading-6 text-white/55">
            Diagnostic, depanare și reparație.
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section id="contact" className="bg-[#07111f] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-10 shadow-2xl shadow-black/20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white/70">
              <ShieldCheck size={14} className="text-emerald-300" />
              Ticket direct în sistem
            </div>

            <h2 className="mb-8 text-5xl font-bold leading-tight">
              Hai să vorbim.
            </h2>

            <p className="max-w-sm text-sm font-medium leading-7 text-white/60">
              Trimite solicitarea, iar cererea ajunge direct în sistemul IMPEDEX
              pentru urmărire și administrare.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 font-semibold">
                <Mail className="text-emerald-300" />
                contact@impedex.ro
              </div>

              <div className="flex items-center gap-4 font-semibold">
                <Phone className="text-emerald-300" />
                +40 7xx xxx xxx
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-slate-900 shadow-2xl shadow-black/25">
            {formSubmitted ? (
              <div className="py-20 text-center font-semibold text-green-600">
                Solicitare trimisă cu succes!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Nume"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-5 font-medium outline-none transition focus:border-emerald-600 focus:bg-white"
                  />

                  <input
                    type="text"
                    placeholder="Telefon"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-5 font-medium outline-none transition focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Dispozitiv (ex: Samsung TV, Laptop Dell)"
                  required
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-5 font-medium outline-none transition focus:border-emerald-600 focus:bg-white"
                />

                <textarea
                  rows={5}
                  placeholder="Descrie defectul pe scurt..."
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-5 font-medium outline-none transition focus:border-emerald-600 focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-[#1f6f5b] py-4 text-sm font-semibold text-white transition hover:bg-[#195c4b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#07111f] px-6 py-12 text-center text-white">
        <p className="text-sm text-white/45">
          © {new Date().getFullYear()} IMPEDEX · Reparații Electronice
          Profesionale
        </p>
      </footer>
    </main>
  );
}