"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import PcbCanvas from "@/components/PcbCanvas";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CONTACTS = [
  { icon: Mail, label: "Email", value: "contact@impedex.ro", href: "mailto:contact@impedex.ro" },
  { icon: Phone, label: "Telefon", value: "+40 7xx xxx xxx", href: "tel:+407" },
  { icon: MessageCircle, label: "WhatsApp", value: "Scrie-ne pe WhatsApp", href: "https://wa.me/407xxxxxxxx" },
];

const HOURS = [
  { d: "Luni – Vineri", h: "09:00 – 18:00" },
  { d: "Sâmbătă", h: "10:00 – 14:00" },
  { d: "Duminică", h: "Închis" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const update = (f: keyof typeof form, v: string) => setForm((s) => ({ ...s, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/repair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          device_type: "Mesaj contact",
          issue_description: form.message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-400/15";

  return (
    <main className="relative min-h-screen bg-[#07111f] font-sans text-white">
      <PcbCanvas />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-emerald-300">Contact</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Ia legătura cu noi</h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            Scrie-ne pentru orice întrebare despre o reparație, un echipament
            sau procesul de diagnosticare. Răspundem rapid în timpul programului.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ── Contact details ── */}
          <div className="space-y-4">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/30 hover:bg-white/[0.05]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                  <c.icon size={19} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">{c.label}</p>
                  <p className="mt-0.5 font-medium text-white">{c.value}</p>
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2.5 text-white">
                <Clock size={18} className="text-emerald-300" />
                <h3 className="font-semibold">Program</h3>
              </div>
              <div className="mt-4 space-y-2">
                {HOURS.map((h) => (
                  <div key={h.d} className="flex items-center justify-between text-sm">
                    <span className="text-white/55">{h.d}</span>
                    <span className="font-medium text-white/85">{h.h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/55">
              <MapPin size={18} className="shrink-0 text-emerald-300" />
              Ridicare și retur prin curier din toată România.
            </div>
          </div>

          {/* ── Message form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 sm:p-8"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30">
                  <CheckCircle2 size={32} />
                </span>
                <h2 className="mt-6 text-2xl font-bold">Mesaj trimis!</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                  Mulțumim, revenim cât de curând la datele lăsate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/80">Nume</label>
                    <input required type="text" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Numele tău" className={inputBase} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white/80">Telefon</label>
                    <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="07xx xxx xxx" className={inputBase} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/80">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="adresa@email.ro" className={inputBase} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/80">Mesaj</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Cu ce te putem ajuta?" className={`${inputBase} resize-none`} />
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>Nu am putut trimite mesajul. Scrie-ne direct la contact@impedex.ro.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#1f6f5b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-[#195c4b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      Trimite mesajul
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
