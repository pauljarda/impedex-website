"use client";

import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
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
  User 
} from "lucide-react";

const theme = {
  primary: "#0b3d2e",    
  secondary: "#041b4a",  
  accent: "#f59e0b",     
  bg: "#f8fafc",         
  text: "#1e293b",       
  muted: "#64748b"       
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("repair_requests").insert([
      {
        full_name: fullName,
        phone: phone,
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
    <main style={{ backgroundColor: theme.bg, color: theme.text }} className="min-h-screen font-sans selection:bg-[#0b3d2e]/10">
      
      {/* STABLE HEADER SYSTEM */}
      <div className="h-20 md:h-24"> 
        <header 
          className={`fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all duration-500 ease-in-out ${
            scrolled ? "py-1 shadow-lg" : "py-0 md:py-0" 
          }`}
        >
          <div className="flex w-full items-center justify-between px-6 md:px-12 relative">
            
            {/* LOGO: ALL THE WAY LEFT */}
            <div className="flex-1 flex justify-start">
              <a href="#" className="flex items-center transition-transform hover:scale-105 active:scale-95">
                <div className={`relative transition-all duration-500 ease-in-out ${
                  scrolled ? "h-16 w-44" : "h-20 w-56 md:h-28 md:w-80"
                }`}>
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

            {/* NAV: CENTERED WITH BOLDER FONT */}
            <nav className="hidden gap-10 text-sm font-black uppercase tracking-wider lg:flex absolute left-1/2 -translate-x-1/2" style={{ color: theme.secondary }}>
              {["Reparații", "Magazin", "Avantaje", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="relative transition-all hover:text-[#0b3d2e] hover:-translate-y-0.5 group">
                  {item}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#0b3d2e] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* SIMPLE OUTLINED BUTTON: ALL THE WAY RIGHT */}
            <div className="flex-1 flex justify-end">
              <a
                href="/login"
                style={{ color: theme.secondary, borderColor: theme.secondary }}
                className={`group flex items-center gap-2 rounded-full border-2 font-black uppercase tracking-widest transition-all duration-500 hover:bg-[#041b4a] hover:text-white ${
                  scrolled ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-xs"
                }`}
              >
                <User size={scrolled ? 14 : 18} />
                <span>Cont Client</span>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-8 md:p-20 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: theme.primary }}>
              <Zap size={12} /> Service Autorizat
            </div>
            <h1 className="text-4xl font-black md:text-6xl leading-tight" style={{ color: theme.secondary }}>
              Reparații electronice și produse <span style={{ color: theme.primary }}>verificate corect</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl font-medium" style={{ color: theme.muted }}>
              Echipamente testate riguros în laboratorul IMPEDEX pentru performanță maximă.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#contact" style={{ backgroundColor: theme.primary }} className="rounded-full px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:scale-105 transition-transform">
                Programează reparație
              </a>
              <a href="#contact" className="rounded-full border-2 px-8 py-4 text-xs font-black uppercase tracking-widest transition-all" style={{ borderColor: theme.accent, color: theme.secondary }}>
                Cere ofertă
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="reparații" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black uppercase md:text-5xl" style={{ color: theme.secondary }}>Expertiză Tehnică</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 bg-[#0b3d2e] rounded-full" />
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {[{ title: "TV & Monitoare", icon: <Tv /> }, { title: "Laptop & PC", icon: <Laptop /> }, { title: "Electronice", icon: <Cpu /> }, { title: "Diagnoză", icon: <Search /> }].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-100 bg-white p-10 shadow-sm hover:-translate-y-2 transition-all duration-300">
              <div className="mb-6 h-12 w-12" style={{ color: theme.primary }}>{item.icon}</div>
              <h3 className="text-xl font-black" style={{ color: theme.secondary }}>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* MAGASIN PREVIEW */}
      <section id="magazin" className="bg-slate-900 py-32 text-white rounded-[3rem] mx-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black uppercase">Produse Verificate</h2>
              <p className="opacity-60 mt-2 font-medium">Garanție și calitate IMPEDEX.</p>
            </div>
            <a href="#" className="text-amber-400 font-black uppercase tracking-widest hover:underline flex items-center gap-2">Magazin <ArrowRight size={16}/></a>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {["Premium Laptop", "Pro Display", "Hardware", "Gadgets"].map((item) => (
              <div key={item} className="rounded-[2rem] bg-white/5 p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="aspect-square rounded-2xl bg-white/5 mb-6" />
                <h3 className="text-xl font-black">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-[3rem] p-12 text-white shadow-xl" style={{ backgroundColor: theme.secondary }}>
            <h2 className="text-5xl font-black mb-8 leading-tight">Hai să<br/>vorbim.</h2>
            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4 font-bold"><Mail className="text-amber-400" /> contact@impedex.ro</div>
              <div className="flex items-center gap-4 font-bold"><Phone className="text-amber-400" /> +40 7xx xxx xxx</div>
            </div>
          </div>
          <div className="rounded-[3rem] border border-slate-200 bg-white p-10 shadow-2xl">
            {formSubmitted ? (
               <div className="text-center py-20 text-green-600 font-black uppercase">Solicitare Trimisă cu Succes!</div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Nume" required value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full rounded-2xl border-2 border-slate-100 p-5 outline-none focus:border-[#0b3d2e] bg-slate-50 font-bold" />
                  <input type="text" placeholder="Telefon" required value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full rounded-2xl border-2 border-slate-100 p-5 outline-none focus:border-[#0b3d2e] bg-slate-50 font-bold" />
                </div>
                <input type="text" placeholder="Dispozitiv (ex: Samsung TV, Laptop Dell)" required value={deviceType} onChange={(e)=>setDeviceType(e.target.value)} className="w-full rounded-2xl border-2 border-slate-100 p-5 outline-none focus:border-[#0b3d2e] bg-slate-50 font-bold" />
                <textarea rows={4} placeholder="Descrie defectul pe scurt..." required value={issueDescription} onChange={(e)=>setIssueDescription(e.target.value)} className="w-full rounded-2xl border-2 border-slate-100 p-5 outline-none focus:border-[#0b3d2e] bg-slate-50 font-bold" />
                <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl py-6 bg-[#0b3d2e] text-white font-black uppercase tracking-widest hover:opacity-95 transition-all shadow-lg">
                  {isSubmitting ? "Se trimite..." : "Trimite Solicitarea"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-slate-200">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">© {new Date().getFullYear()} IMPEDEX · Engineering Solutions</p>
      </footer>
    </main>
  );
}