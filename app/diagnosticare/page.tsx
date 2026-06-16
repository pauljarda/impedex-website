"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, UserCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PcbCanvas from "@/components/PcbCanvas";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { IconDoc, IconMultimeter, IconVan, IconBoxCheck } from "@/components/icons";

const DEVICE_TYPES = [
  "TV / Monitor",
  "Laptop / PC",
  "Telefon / Tabletă",
  "Sursă de alimentare",
  "Placă electronică",
  "Echipament industrial",
  "Sistem fotovoltaic / Invertor",
  "Altele",
];

const STEPS = [
  { icon: IconDoc, n: "01", title: "Trimiți cererea", text: "Completezi formularul cu defectul și datele de contact." },
  { icon: IconMultimeter, n: "02", title: "Verificăm", text: "Analizăm dacă echipamentul merită trimis la diagnostic." },
  { icon: IconVan, n: "03", title: "Ridicare curier", text: "După aprobare, curierul ridică produsul de la adresă." },
  { icon: IconBoxCheck, n: "04", title: "Reparație și retur", text: "Reparăm, testăm și trimitem echipamentul înapoi." },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function DiagnosticarePage() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    device_type: "",
    issue_description: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedInName, setLoggedInName] = useState<string | null>(null);

  // If the visitor is logged in, prefill name/email so they don't retype them.
  // The submitted request is linked to their account server-side.
  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !active) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (!active) return;
      const name = profile?.full_name ?? "";
      setLoggedInName(name || user.email || null);
      setForm((f) => ({
        ...f,
        full_name: f.full_name || name,
        email: f.email || user.email || "",
      }));
    })();
    return () => {
      active = false;
    };
  }, []);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/repair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "request failed");
      }
      setStatus("success");
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMsg(
        "Nu am putut trimite cererea. Reîncearcă sau scrie-ne direct la contact@impedex.ro."
      );
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-xl border border-[#FFFFFF]/12 bg-[#0f1b2e] px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#FFFFFF]/40 outline-none transition focus:border-[#16785F]/45 focus:bg-[#16243c] focus:ring-2 focus:ring-[#16785F]/12";

  return (
    <main className="relative min-h-screen bg-[#07111f] font-sans text-[#FFFFFF]">
      <PcbCanvas />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-[#16785F]">Diagnosticare</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Solicită o diagnosticare
          </h1>
          <p className="mt-4 text-base leading-7 text-[#FFFFFF]/75">
            Descrie defectul echipamentului și datele de contact. Revenim în
            1-2 zile lucrătoare cu un verdict și, dacă reparația merită
            încercată, organizăm ridicarea prin curier din toată țara.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          {/* ── Form / success ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-[#FFFFFF]/12 bg-[#0f1b2e] p-6 shadow-xl shadow-black/30 sm:p-8"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#16785F]/8 text-[#16785F] ring-1 ring-[#16785F]/25">
                  <CheckCircle2 size={32} />
                </span>
                <h2 className="mt-6 text-2xl font-bold">Cererea a fost trimisă!</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#FFFFFF]/75">
                  Mulțumim, {form.full_name.split(" ")[0] || "👋"}. Am primit
                  solicitarea și revenim în 1-2 zile lucrătoare la datele lăsate.
                </p>
                <a
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#0B6B5E] px-6 py-3 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#0A5A4F]"
                >
                  Înapoi la pagina principală
                  <ArrowRight size={15} />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {loggedInName && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#16785F]/25 bg-[#16785F]/10 px-4 py-3 text-sm text-[#FFFFFF]/80">
                    <UserCheck size={16} className="shrink-0 text-[#16785F]" />
                    <span>
                      Trimiți ca <span className="font-semibold text-white">{loggedInName}</span> — cererea apare în contul tău.
                    </span>
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#FFFFFF]/80">Nume complet</label>
                    <input
                      required
                      type="text"
                      value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      placeholder="Ion Popescu"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#FFFFFF]/80">Telefon</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="07xx xxx xxx"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#FFFFFF]/80">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="adresa@email.ro"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#FFFFFF]/80">Tip echipament</label>
                  <select
                    required
                    value={form.device_type}
                    onChange={(e) => update("device_type", e.target.value)}
                    className={`${inputBase} appearance-none`}
                  >
                    <option value="" disabled className="bg-[#07111f] text-[#FFFFFF]">Alege tipul echipamentului</option>
                    {DEVICE_TYPES.map((d) => (
                      <option key={d} value={d} className="bg-[#07111f] text-[#FFFFFF]">{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#FFFFFF]/80">Descrierea defectului</label>
                  <textarea
                    required
                    rows={5}
                    value={form.issue_description}
                    onChange={(e) => update("issue_description", e.target.value)}
                    placeholder="Ex: TV-ul nu mai pornește, se aude un țiuit din sursă..."
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0B6B5E] px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] shadow-lg shadow-black/30 transition-all hover:bg-[#0A5A4F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      Trimite cererea
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-[#FFFFFF]/55">
                  Prin trimitere ești de acord cu prelucrarea datelor conform politicii de confidențialitate.
                </p>
              </form>
            )}
          </motion.div>

          {/* ── Process steps ── */}
          <div>
            <h2 className="mb-6 text-lg font-bold">Cum funcționează</h2>
            <div className="space-y-4">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-4 rounded-2xl border border-[#FFFFFF]/12 bg-[#0f1b2e] p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#16785F]/8 text-[#16785F] ring-1 ring-[#16785F]/15">
                    <s.icon size={20} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-[#FFFFFF]/50">{s.n}</span>
                      <h3 className="font-semibold text-[#FFFFFF]">{s.title}</h3>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#FFFFFF]/70">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
