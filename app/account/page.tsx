"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LogOut,
  Mail,
  User as UserIcon,
  CalendarDays,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PcbCanvas from "@/components/PcbCanvas";

type Profile = {
  id: string;
  full_name: string | null;
  role: "customer" | "admin" | string;
  created_at: string;
};

type Request = {
  id: string;
  device_type: string | null;
  issue_description: string | null;
  status: string | null;
  created_at: string;
};

// DB stores English status values; we only translate the label.
const statusConfig: Record<
  string,
  { label: string; cls: string; icon: typeof AlertTriangle }
> = {
  New: {
    label: "Nou",
    cls: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
    icon: AlertTriangle,
  },
  "In Progress": {
    label: "În lucru",
    cls: "bg-blue-500/15 text-blue-300 ring-blue-400/30",
    icon: Loader2,
  },
  Completed: {
    label: "Finalizat",
    cls: "bg-[#16785F]/15 text-[#16785F] ring-[#16785F]/30",
    icon: CheckCircle2,
  },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }
      if (!active) return;
      setEmail(user.email ?? "");

      const [{ data: prof }, { data: reqs }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        // Explicit user_id filter (defence in depth) on top of the RLS policy
        // so a customer only ever sees their own requests.
        supabase
          .from("repair_requests")
          .select("id, device_type, issue_description, status, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (!active) return;
      setProfile(prof as Profile | null);
      setRequests((reqs ?? []) as Request[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const name = profile?.full_name || "Client IMPEDEX";

  return (
    <main className="relative min-h-screen bg-[#07111f] font-sans text-[#FFFFFF]">
      <PcbCanvas />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-36 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#16785F]">Contul meu</p>
            <h1 className="text-4xl font-bold leading-tight">
              Bună, {name.split(" ")[0]} 👋
            </h1>
            <p className="mt-2 text-[#FFFFFF]/55">
              Aici îți vezi cererile de diagnosticare și statusul lor.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#FFFFFF]/15 bg-[#FFFFFF]/5 px-5 py-2.5 text-sm font-semibold text-[#FFFFFF]/80 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={16} />
            Deconectare
          </button>
        </div>

        {loading ? (
          <div className="mt-12 flex items-center gap-3 text-[#FFFFFF]/50">
            <Loader2 size={18} className="animate-spin" />
            Se încarcă...
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Profile card */}
            <div className="h-fit rounded-2xl border border-[#FFFFFF]/12 bg-[#0f1b2e] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#16785F] to-[#0B6B5E] text-base font-bold text-white">
                  {name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{name}</p>
                  <p className="text-xs capitalize text-[#16785F]">
                    {profile?.role === "admin" ? "Administrator" : "Client"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <InfoRow icon={Mail} label="Email" value={email || "—"} />
                <InfoRow icon={UserIcon} label="Nume" value={profile?.full_name || "—"} />
                <InfoRow
                  icon={CalendarDays}
                  label="Membru din"
                  value={profile?.created_at ? fmtDate(profile.created_at) : "—"}
                />
                {profile?.role === "admin" && (
                  <a
                    href="/admin"
                    className="mt-2 flex items-center gap-2 rounded-lg bg-[#16785F]/10 px-3 py-2.5 text-sm font-semibold text-[#16785F] ring-1 ring-[#16785F]/20 transition hover:bg-[#16785F]/15"
                  >
                    <ShieldCheck size={16} />
                    Panou administrare
                  </a>
                )}
              </div>
            </div>

            {/* Requests */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Cererile mele</h2>
                <a
                  href="/diagnosticare"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16785F] hover:text-[#16785F]/80"
                >
                  Cerere nouă
                  <ArrowRight size={14} />
                </a>
              </div>

              {requests.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#FFFFFF]/15 bg-[#FFFFFF]/[0.02] px-6 py-14 text-center">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16785F]/10 text-[#16785F]">
                    <Wrench size={26} />
                  </span>
                  <p className="text-lg font-semibold text-white">
                    Nu ai trimis încă nicio cerere
                  </p>
                  <p className="mt-1.5 max-w-sm text-sm text-[#FFFFFF]/50">
                    Trimite o cerere de diagnosticare și o vei urmări de aici.
                  </p>
                  <a
                    href="/diagnosticare"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#0B6B5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0A5A4F]"
                  >
                    Solicită diagnosticare
                    <ArrowRight size={15} />
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((r, i) => {
                    const st = statusConfig[r.status ?? ""] ?? statusConfig.New;
                    const StatusIcon = st.icon;
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="rounded-2xl border border-[#FFFFFF]/12 bg-[#0f1b2e] p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-white">
                              {r.device_type || "Echipament"}
                            </p>
                            <p className="mt-0.5 text-xs text-[#FFFFFF]/40">
                              Trimisă la {fmtDate(r.created_at)}
                            </p>
                          </div>
                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ${st.cls}`}
                          >
                            <StatusIcon size={13} />
                            {st.label}
                          </span>
                        </div>
                        {r.issue_description && (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#FFFFFF]/60">
                            {r.issue_description}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-[#FFFFFF]/35" />
      <div className="min-w-0">
        <p className="text-xs text-[#FFFFFF]/40">{label}</p>
        <p className="truncate font-medium text-[#FFFFFF]/85">{value}</p>
      </div>
    </div>
  );
}
