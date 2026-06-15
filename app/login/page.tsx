"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, setRememberPreference } from "@/lib/supabase";
import Image from "next/image";
import { ArrowLeft, Lock, Mail, User, ShieldCheck, Eye, EyeOff, Check } from "lucide-react";

// Password rules used to gate sign-up.
const PW_RULES = [
  { label: "Minim 8 caractere", test: (p: string) => p.length >= 8 },
  { label: "O literă mare", test: (p: string) => /[A-Z]/.test(p) },
  { label: "O literă mică", test: (p: string) => /[a-z]/.test(p) },
  { label: "O cifră", test: (p: string) => /\d/.test(p) },
];

export default function LoginPage() {
  const router = useRouter();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passedRules = PW_RULES.filter((r) => r.test(password)).length;
  const passwordStrong = passedRules === PW_RULES.length;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setError("");

    // On sign-up, enforce a strong password before hitting the network.
    if (!isLoginMode && !passwordStrong) {
      setError("Parola trebuie să respecte toate cerințele de mai jos.");
      return;
    }

    setLoading(true);

    if (isLoginMode) {
      // Persist the "remember me" choice before signing in so the cookie
      // adapter knows whether to write persistent or session cookies.
      setRememberPreference(remember);

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

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

  function switchMode(mode: boolean) {
    setIsLoginMode(mode);
    setMessage("");
    setError("");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] font-sans text-white">
      <img
        src="/repair.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/92 to-[#07111f]/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-[#07111f]/70" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6">
        <header className="flex items-center justify-between py-8">
          <a href="/" className="flex items-center">
            <div className="relative h-20 w-56 md:h-24 md:w-72">
              <Image
                src="/logo.png"
                alt="IMPEDEX"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
          </a>

          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white/75 transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={15} />
            Înapoi la site
          </a>
        </header>

        <div className="grid flex-1 items-center gap-12 pb-14 lg:grid-cols-[1fr_440px]">
          <section className="hidden max-w-xl lg:block">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75">
              <ShieldCheck size={14} className="text-[#16785F]" />
              Acces securizat
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white xl:text-6xl">
              Gestionează
              <span className="block">reparațiile</span>
              <span className="block text-[#16785F]">într-un singur loc</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-slate-300">
        
            </p>
          </section>

          <section className="mx-auto w-full max-w-[440px]">
            <div className="rounded-[2.5rem] border border-white/10 bg-white p-8 text-slate-900 shadow-2xl shadow-black/35 md:p-9">
              <div className="mb-8 flex rounded-2xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-black transition-all ${
                    isLoginMode
                      ? "bg-white text-[#07111f] shadow-sm"
                      : "text-slate-500 hover:text-[#07111f]"
                  }`}
                >
                  Autentificare
                </button>

                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-black transition-all ${
                    !isLoginMode
                      ? "bg-white text-[#07111f] shadow-sm"
                      : "text-slate-500 hover:text-[#07111f]"
                  }`}
                >
                  Cont nou
                </button>
              </div>

              <div className="mb-7">
                <h2 className="text-2xl font-black text-[#07111f]">
                  {isLoginMode ? "Bine ai revenit!" : "Creează un cont"}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {isLoginMode
                    ? "Introdu datele pentru a accesa platforma."
                    : "Completează datele pentru a începe."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLoginMode && (
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Nume complet
                    </label>

                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        required={!isLoginMode}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 pl-12 font-semibold outline-none transition-all focus:border-[#0B6B5E] focus:bg-white"
                        placeholder="Ex: Popescu Ion"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 pl-12 font-semibold outline-none transition-all focus:border-[#0B6B5E] focus:bg-white"
                      placeholder="nume@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Parolă
                  </label>

                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 pl-12 pr-12 font-semibold outline-none transition-all focus:border-[#0B6B5E] focus:bg-white"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-[#0B6B5E]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password requirements — only while creating an account */}
                  {!isLoginMode && (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
                      {PW_RULES.map((rule) => {
                        const ok = rule.test(password);
                        return (
                          <div
                            key={rule.label}
                            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                              ok ? "text-[#0B6B5E]" : "text-slate-400"
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-full ${
                                ok ? "bg-[#0B6B5E] text-white" : "bg-slate-200 text-slate-400"
                              }`}
                            >
                              <Check size={11} strokeWidth={3} />
                            </span>
                            {rule.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Remember me — only when logging in */}
                {isLoginMode && (
                  <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#0B6B5E] accent-[#0B6B5E]"
                    />
                    Ține-mă minte pe acest dispozitiv
                  </label>
                )}

                {message && (
                  <p className="rounded-xl bg-green-50 p-3 text-sm font-bold text-green-700">
                    {message}
                  </p>
                )}

                {error && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-2xl py-4 text-base font-black uppercase tracking-widest text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                    isLoginMode
                      ? "bg-[#07111f] hover:bg-[#1B1F20]"
                      : "bg-[#0b3d2e] hover:bg-[#0f4d3a]"
                  }`}
                >
                  {loading
                    ? "Se procesează..."
                    : isLoginMode
                    ? "Autentificare"
                    : "Creează cont"}
                </button>
              </form>

              <div className="mt-7 text-center">
                <button
                  type="button"
                  onClick={() => switchMode(!isLoginMode)}
                  className="text-sm font-bold text-[#07111f] hover:underline"
                >
                  {isLoginMode
                    ? "Nu ai cont? Înregistrează-te"
                    : "Ai deja cont? Autentifică-te"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}