"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Phone, Mail, User, ArrowRight, ShieldCheck, Wrench } from "lucide-react";

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
        className={`fixed top-0 z-50 w-full border-b border-white/10 bg-[#07111f]/90 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "py-1 shadow-lg shadow-black/20" : "py-2"
        }`}
      >
        <div className="relative flex w-full items-center justify-between px-6 md:px-12">
          <div className="flex flex-1 justify-start">
            <a href="/" className="flex items-center">
              <div
                className={`relative transition-all duration-300 ${
                  scrolled ? "h-16 w-44" : "h-20 w-56 md:h-24 md:w-72"
                }`}
              >
                <Image
                  src="/logo.png"
                  alt="IMPEDEX"
                  fill
                  sizes="(max-width: 768px) 176px, 288px"
                  className="object-contain object-left brightness-0 invert"
                  priority
                />
              </div>
            </a>
          </div>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-20 text-xs font-bold uppercase tracking-[0.18em] text-white/80 lg:flex xl:gap-28">
            {["Reparații", "Magazin", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:text-emerald-300"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex flex-1 justify-end">
            <a
              href="/login"
              className={`flex items-center gap-2 rounded-full border border-white/25 bg-white/5 font-bold uppercase tracking-widest text-white transition-all hover:border-emerald-300 hover:bg-white/10 ${
                scrolled ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-xs"
              }`}
            >
              <User size={scrolled ? 14 : 18} />
              <span>Cont Client</span>
            </a>
          </div>
        </div>
      </header>

      <section id="reparații" className="relative min-h-screen overflow-hidden">
        <img
          src="/repair.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/85 to-[#07111f]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-[#07111f]/45" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24 lg:px-8">
          <div className="max-w-3xl">
        

            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
              <span className="block">Reparații</span>
              <span className="block">electronice</span>
              <span className="block text-emerald-300">profesionale</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Diagnoză reală, intervenții profesionale și produse verificate
              înainte de vânzare.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-9 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#07111f] transition-all hover:bg-emerald-300"
              >
                Programează reparație
              </a>

              <a
                href="#magazin"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-9 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10"
              >
                Vezi produse
                <ArrowRight size={15} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="magazin" className="bg-[#07111f] px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                Magazin
              </p>
              <h2 className="text-4xl font-black uppercase">
                Produse verificate
              </h2>
              <p className="mt-3 max-w-xl font-medium text-white/55">
                Produse testate înainte de vânzare, pregătite pentru utilizare
                reală.
              </p>
            </div>

            <a
              href="#contact"
              className="flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-white/80 transition-all hover:bg-white/10"
            >
              Cere ofertă
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {["Laptop verificat", "Monitor testat", "Componente", "Gadgeturi"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <div className="mb-6 flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <Wrench size={34} className="text-emerald-300/60" />
                  </div>
                  <h3 className="text-lg font-black">{item}</h3>
                  <p className="mt-2 text-sm font-medium text-white/45">
                    Testat și pregătit pentru vânzare.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#07111f] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-12 shadow-2xl shadow-black/20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/70">
              <ShieldCheck size={14} className="text-emerald-300" />
              Ticket direct în sistem
            </div>

            <h2 className="mb-8 text-5xl font-black leading-tight">
              Hai să
              <br />
              vorbim.
            </h2>

            <p className="max-w-sm text-sm font-medium leading-7 text-white/55">
              Trimite solicitarea, iar cererea ajunge direct în sistemul
              IMPEDEX pentru urmărire și administrare.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 font-bold">
                <Mail className="text-emerald-300" />
                contact@impedex.ro
              </div>

              <div className="flex items-center gap-4 font-bold">
                <Phone className="text-emerald-300" />
                +40 7xx xxx xxx
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] border border-slate-200 bg-white p-10 text-slate-900 shadow-2xl shadow-black/25">
            {formSubmitted ? (
              <div className="py-20 text-center font-black uppercase text-green-600">
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
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 font-bold outline-none transition-all focus:border-emerald-600 focus:bg-white"
                  />

                  <input
                    type="text"
                    placeholder="Telefon"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 font-bold outline-none transition-all focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Dispozitiv (ex: Samsung TV, Laptop Dell)"
                  required
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 font-bold outline-none transition-all focus:border-emerald-600 focus:bg-white"
                />

                <textarea
                  rows={5}
                  placeholder="Descrie defectul pe scurt..."
                  required
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 font-bold outline-none transition-all focus:border-emerald-600 focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-[#0b3d2e] py-6 font-black uppercase tracking-widest text-white transition-all hover:bg-[#0f4d3a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#07111f] px-6 py-12 text-center text-white">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
          © {new Date().getFullYear()} IMPEDEX · Reparații Electronice Profesionale
        </p>
      </footer>
    </main>
  );
}