import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getVisitorStats } from "@/lib/cloudflare";
import {
  Wrench,
  AlertTriangle,
  Loader,
  CheckCircle2,
  Users,
  Eye,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

export const dynamic = "force-dynamic";

type Req = {
  id: number | string;
  full_name: string | null;
  device_type: string | null;
  status: string | null;
  created_at: string;
};

const statusStyle: Record<string, string> = {
  New: "bg-amber-50 text-amber-700 ring-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-200",
  Completed: "bg-[#16785F]/10 text-[#16785F] ring-[#16785F]/25",
};

const statusLabel: Record<string, string> = {
  New: "Nou",
  "In Progress": "În lucru",
  Completed: "Finalizat",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminDashboard() {
  const [{ data: requests }, visitors] = await Promise.all([
    supabaseAdmin
      .from("repair_requests")
      .select("id, full_name, device_type, status, created_at")
      .order("created_at", { ascending: false }),
    getVisitorStats(),
  ]);

  const rows = (requests ?? []) as Req[];
  const counts = {
    total: rows.length,
    new: rows.filter((r) => r.status === "New").length,
    progress: rows.filter((r) => r.status === "In Progress").length,
    done: rows.filter((r) => r.status === "Completed").length,
  };
  const recent = rows.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Panou de control</h1>
        <p className="mt-1 text-sm text-slate-500">
          Privire de ansamblu asupra cererilor și a activității site-ului.
        </p>
      </div>

      {/* Request KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Wrench} label="Total cereri" value={counts.total} tone="slate" />
        <StatCard icon={AlertTriangle} label="Noi" value={counts.new} tone="amber" />
        <StatCard icon={Loader} label="În lucru" value={counts.progress} tone="blue" />
        <StatCard icon={CheckCircle2} label="Finalizate" value={counts.done} tone="green" />
      </div>

      {/* Visitors */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <BarChart3 size={18} className="text-[#16785F]" />
          <h2 className="text-base font-semibold text-slate-900">Vizitatori site</h2>
          <span className="ml-auto text-xs text-slate-400">via Cloudflare</span>
        </div>

        {visitors ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MiniStat icon={Users} label="Vizite (24h)" value={visitors.last24h.visits} />
            <MiniStat icon={Eye} label="Vizualizări (24h)" value={visitors.last24h.pageViews} />
            <MiniStat icon={Users} label="Vizite (7 zile)" value={visitors.last7d.visits} />
            <MiniStat icon={Eye} label="Vizualizări (7 zile)" value={visitors.last7d.pageViews} />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            <p className="font-medium text-slate-600">Statisticile de vizitatori nu sunt încă conectate.</p>
            <p className="mt-1.5">
              Adaugă un token Cloudflare ca să vezi vizitele direct aici. Până atunci,
              le poți vedea în dashboard-ul Cloudflare → Web Analytics.
            </p>
          </div>
        )}
      </section>

      {/* Recent requests */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Cereri recente</h2>
          <Link href="/admin/requests" className="inline-flex items-center gap-1 text-sm font-medium text-[#16785F] hover:underline">
            Vezi toate
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-slate-400">Nicio cerere încă.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map((r) => (
              <Link
                key={r.id}
                href="/admin/requests"
                className="flex items-center gap-4 px-6 py-3.5 transition hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{r.full_name || "Fără nume"}</p>
                  <p className="truncate text-sm text-slate-500">{r.device_type || "—"}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusStyle[r.status ?? ""] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
                  {statusLabel[r.status ?? ""] ?? r.status ?? "—"}
                </span>
                <span className="hidden shrink-0 text-xs text-slate-400 sm:block">{fmtDate(r.created_at)}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const toneMap = {
  slate: "text-slate-600 bg-slate-100",
  amber: "text-amber-600 bg-amber-50",
  blue: "text-blue-600 bg-blue-50",
  green: "text-[#16785F] bg-[#16785F]/10",
} as const;

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Wrench;
  label: string;
  value: number;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${toneMap[tone]}`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-0.5 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-500">
        <Icon size={15} />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 text-xl font-bold text-slate-900">{value.toLocaleString("ro-RO")}</p>
    </div>
  );
}
