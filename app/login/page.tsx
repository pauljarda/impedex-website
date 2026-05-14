"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { ShieldCheck, Zap, ArrowLeft, Lock, Mail, User } from "lucide-react";

// THEME CONFIG - Matching Home Page
const theme = {
  primary: "#0b3d2e",    // Deep Emerald
  secondary: "#041b4a",  // Deep Navy
  accent: "#f59e0b",     // Gold
  bg: "#f8fafc",         // Clean Slate
  text: "#1e293b",
  muted: "#64748b"
};

export default function LoginPage() {
  const router = useRouter();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (isLoginMode) {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("Eroare la încărcarea utilizatorului.");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        setError("Eroare la încărcarea profilului.");
        setLoading(false);
        return;
      }

      setLoading(false);
      if (profile.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
      return;
    }

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    setMessage("Cont creat cu succes! Acum te poți autentifica.");
    setLoading(false);
    setIsLoginMode(true);
    setPassword("");
  }

  return (
    <main style={{ backgroundColor: theme.bg, color: theme.text }} className="relative min-h-screen overflow-hidden font-sans">
      
      {/* DECORATIVE BACKGROUND SHAPES (From Home Page) */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-5 blur-3xl" style={{ backgroundColor: theme.primary }} />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full opacity-5 blur-3xl" style={{ backgroundColor: theme.secondary }} />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full opacity-5 blur-2xl -translate-x-1/2" style={{ backgroundColor: theme.accent }} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6">
        
        {/* SIMPLE HEADER */}
       {/* UPDATED LOGIN HEADER */}
<header className="flex items-center justify-between py-10">
  <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
    {/* Increased size to h-20 w-48 to make sub-text visible */}
    <div className="relative h-20 w-48 md:h-24 md:w-56">
      <Image 
        src="/logo.png" 
        alt="IMPEDEX" 
        fill
        sizes='( max-width: 768px ) 150px, ( max-width: 1200px ) 200px, 250px' 
        className="object-contain" // Removed object-left for better balance
        priority
      />
    </div>
  </a>
  <a href="/" className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
    <ArrowLeft size={16} /> Înapoi la site
  </a>
</header>

        <div className="grid flex-1 items-center gap-12 lg:grid-cols-2 pb-12">
          
          {/* LEFT SIDE: BRANDING */}
          <section className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white mb-6" style={{ backgroundColor: theme.secondary }}>
              <ShieldCheck size={14} /> Acces Securizat
            </div>
            <h1 className="text-5xl font-black leading-tight" style={{ color: theme.secondary }}>
              Gestionați reparațiile <br />
              <span style={{ color: theme.primary }}>într-un singur loc.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed max-w-md" style={{ color: theme.muted }}>
              Autentifică-te pentru a vedea statusul ticketelor tale sau pentru a accesa panoul de administrare IMPEDEX.
            </p>
            
            <div className="mt-10 flex items-center gap-4 text-sm font-bold" style={{ color: theme.secondary }}>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <span>Alătură-te celor peste 500 de clienți mulțumiți.</span>
            </div>
          </section>

          {/* RIGHT SIDE: LOGIN CARD */}
          <section className="mx-auto w-full max-w-md">
            <div className="rounded-[2.5rem] border border-slate-200 bg-white/70 p-8 shadow-2xl backdrop-blur-xl md:p-10">
              
              <div className="mb-8 flex rounded-2xl bg-slate-100 p-1">
                <button
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${isLoginMode ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                  style={{ color: theme.secondary }}
                >
                  Autentificare
                </button>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${!isLoginMode ? 'bg-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                  style={{ color: theme.secondary }}
                >
                  Cont Nou
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-black" style={{ color: theme.secondary }}>
                  {isLoginMode ? "Bine ai revenit!" : "Creează un cont"}
                </h2>
                <p className="text-sm mt-1" style={{ color: theme.muted }}>
                  {isLoginMode ? "Introdu datele pentru a accesa platforma." : "Completează datele pentru a începe."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLoginMode && (
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest" style={{ color: theme.muted }}>Nume Complet</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-2xl border border-slate-100 bg-white p-4 pl-12 outline-none transition-all focus:border-[#0b3d2e] focus:ring-4 focus:ring-[#0b3d2e]/5"
                        placeholder="Ex: Popescu Ion"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest" style={{ color: theme.muted }}>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-100 bg-white p-4 pl-12 outline-none transition-all focus:border-[#0b3d2e] focus:ring-4 focus:ring-[#0b3d2e]/5"
                      placeholder="nume@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest" style={{ color: theme.muted }}>Parolă</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-100 bg-white p-4 pl-12 outline-none transition-all focus:border-[#0b3d2e] focus:ring-4 focus:ring-[#0b3d2e]/5"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {message && <p className="text-sm font-bold text-green-600 bg-green-50 p-3 rounded-xl">{message}</p>}
                {error && <p className="text-sm font-bold text-red-500 bg-red-50 p-3 rounded-xl">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: isLoginMode ? theme.secondary : theme.primary }}
                  className="w-full rounded-2xl py-4 text-lg font-black uppercase tracking-widest text-white shadow-xl transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Se procesează..." : isLoginMode ? "Autentificare" : "Creează Cont"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-sm font-bold hover:underline"
                  style={{ color: theme.secondary }}
                >
                  {isLoginMode ? "Nu ai cont? Înregistrează-te" : "Ai deja cont? Autentifică-te"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}