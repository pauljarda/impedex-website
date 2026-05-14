"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Tv,
  Laptop,
  Cpu,
  Search,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  User,
} from "lucide-react";

const theme = {
  primary: "#0b3d2e",
  secondary: "#041b4a",
  accent: "#f59e0b",
  bg: "#f8fafc",
  text: "#1e293b",
  muted: "#64748b",
};

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

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
    <main
      style={{ backgroundColor: theme.bg, color: theme.text }}
      className="min-h-screen font-sans selection:bg-[#0b3d2e]/10"
    >
      {/* HEADER */}
      <div className="h-20 md:h-24">
        <header
          className={`fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all duration-500 ease-in-out ${
            scrolled ? "py-1 shadow-lg" : "py-0 md:py-0"
          }`}
        >
          <div className="relative flex w-full items-center justify-between px-6 md:px-12">
            {/* LOGO */}
            <div className="flex flex-1 justify-start">
              <a
                href="#"
                className="flex items-center transition-transform hover:scale-105 active:scale-95"
              >
                <div
                  className={`relative transition-all duration-500 ease-in-out ${
                    scrolled ? "h-16 w-44" : "h-20 w-56 md:h-28 md:w-80"
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="IMPEDEX"
                    fill
                    sizes="(max-width: 768px) 150px, 250px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </a>
            </div>

            {/* NAV */}
            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 gap-10 text-sm font-black uppercase tracking-wider lg:flex"
              style={{ color: theme.secondary }}
            >
              {["Reparații", "Magazin", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group relative transition-all hover:-translate-y-0.5 hover:text-[#0b3d2e]"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[#0b3d2e] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CLIENT BUTTON */}
            <div className="flex flex-1 justify-end">
              <a
                href="/login"
                className={`group flex items-center gap-2 rounded-full border-2 border-[#041b4a] text-[#041b4a] font-black uppercase tracking-widest transition-all duration-300 hover:border-[#0b3d2e] hover:bg-[#0b3d2e] hover:text-white hover:shadow-lg active:scale-95 ${
                  scrolled ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-xs"
                }`}
              >
                <User
                  size={scrolled ? 14 : 18}
                  className="transition-colors duration-300"
                />
                <span>Cont Client</span>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 shadow-2xl md:p-20">
          <div className="relative z-10 max-w-3xl">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white"
              style={{ backgroundColor: theme.primary }}
            >
              <Zap size={12} />
              Service Autorizat
            </div>

            <h1
              className="text-4xl font-black leading-tight md:text-6xl"
              style={{ color: theme.secondary }}
            >
              Reparații electronice și produse{" "}
              <span style={{ color: theme.primary }}>
                verificate corect
              </span>
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                style={{ backgroundColor: theme.primary }}
                className="rounded-full px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105"
              >
                Programează reparație
              </a>

              <a
                href="#contact"
                className="rounded-full border-2 px-8 py-4 text-xs font-black uppercase tracking-widest transition-all hover:bg-amber-400 hover:text-slate-950"
                style={{
                  borderColor: theme.accent,
                  color: theme.secondary,
                }}
              >
                Cere ofertă
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="reparații" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <h2
            className="text-3xl font-black uppercase md:text-5xl"
            style={{ color: theme.secondary }}
          >
            Expertiză Tehnică
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#0b3d2e]" />
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {[
            { title: "TV & Monitoare", icon: <Tv /> },
            { title: "Laptop & PC", icon: <Laptop /> },
            { title: "Electronice", icon: <Cpu /> },
            { title: "Diagnoză", icon: <Search /> },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-slate-100 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 h-12 w-12" style={{ color: theme.primary }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-black" style={{ color: theme.secondary }}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* MAGAZIN PREVIEW */}
      <section id="magazin" className="mx-4 rounded-[3rem] bg-slate-900 py-32 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-black uppercase">Produse Verificate</h2>
              <p className="mt-2 font-medium opacity-60">
                Garanție și calitate IMPEDEX.
              </p>
            </div>

            <a
              href="#"
              className="flex items-center gap-2 font-black uppercase tracking-widest text-amber-400 hover:underline"
            >
              Magazin
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {["Premium Laptop", "Pro Display", "Hardware", "Gadgets"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
                >
                  <div className="mb-6 aspect-square rounded-2xl bg-white/5" />
                  <h3 className="text-xl font-black">{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div
            className="rounded-[3rem] p-12 text-white shadow-xl"
            style={{ backgroundColor: theme.secondary }}
          >
            <h2 className="mb-8 text-5xl font-black leading-tight">
              Hai să
              <br />
              vorbim.
            </h2>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 font-bold">
                <Mail className="text-amber-400" />
                contact@impedex.ro
              </div>

              <div className="flex items-center gap-4 font-bold">
                <Phone className="text-amber-400" />
                +40 7xx xxx xxx
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="py-20 text-center font-black uppercase text-green-600">
                Solicitare Trimisă cu Succes!
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
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 font-bold outline-none focus:border-[#0b3d2e]"
                  />

                  <input
                    type="text"
                    placeholder="Telefon"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 font-bold outline-none focus:border-[#0b3d2e]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Dispozitiv (ex: Samsung TV, Laptop Dell)"
                  required
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 font-bold outline-none focus:border-[#0b3d2e]"
                />

                <textarea
                  rows={4}
                  placeholder="Descrie defectul pe scurt..."
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 font-bold outline-none focus:border-[#0b3d2e]"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-[#0b3d2e] py-6 font-black uppercase tracking-widest text-white shadow-lg transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite Solicitarea"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-16 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
          © {new Date().getFullYear()} IMPEDEX · Engineering Solutions
        </p>
      </footer>
    </main>
  );
}