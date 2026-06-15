"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  WrenchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  device_type: string;
  issue_description: string;
  status: string;
  created_at: string;
  updated_at?: string;
};

// Status values are stored in the DB (English) — only the displayed label is RO.
const statusOptions = ["All", "New", "In Progress", "Completed"];
const statusLabels: Record<string, string> = {
  All: "Toate statusurile",
  New: "Noi",
  "In Progress": "În lucru",
  Completed: "Finalizate",
};

const statusConfig = {
  New: {
    label: "Nou",
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-400/30",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    icon: ExclamationTriangleIcon,
  },
  "In Progress": {
    label: "În lucru",
    bg: "bg-blue-500/15",
    text: "text-blue-300",
    border: "border-blue-400/30",
    dot: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]",
    icon: ArrowPathIcon,
  },
  Completed: {
    label: "Finalizat",
    bg: "bg-[#16785F]/15",
    text: "text-[#16785F]",
    border: "border-[#16785F]/30",
    dot: "bg-[#16785F] shadow-[0_0_8px_rgba(61,179,149,0.6)]",
    icon: CheckCircleIcon,
  },
} as const;

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("repair_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as Request[];
    setRequests(rows);
    if (rows.length > 0 && !selectedId) {
      setSelectedId(rows[0].id);
    }
    setLoading(false);
  };

  const filteredRequests = useMemo(() => {
    const term = search.toLowerCase().trim();
    return requests.filter((req) => {
      const matchesSearch =
        !term ||
        req.full_name?.toLowerCase().includes(term) ||
        req.email?.toLowerCase().includes(term) ||
        req.phone?.toLowerCase().includes(term) ||
        req.device_type?.toLowerCase().includes(term) ||
        req.issue_description?.toLowerCase().includes(term);

      const matchesStatus = statusFilter === "All" || req.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const selectedRequest = useMemo(
    () => filteredRequests.find((r) => r.id === selectedId) ?? filteredRequests[0] ?? null,
    [filteredRequests, selectedId]
  );

  useEffect(() => {
    if (!selectedRequest && filteredRequests.length > 0) {
      setSelectedId(filteredRequests[0].id);
    }
  }, [filteredRequests, selectedRequest]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("repair_requests")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
      setUpdatingId(null);
      return;
    }

    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    setUpdatingId(null);
  };

  const counts = {
    total: requests.length,
    new: requests.filter((r) => r.status === "New").length,
    inProgress: requests.filter((r) => r.status === "In Progress").length,
    completed: requests.filter((r) => r.status === "Completed").length,
  };

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("ro-RO", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Cereri reparații</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Gestionează cererile primite, urmărește progresul și actualizează statusul.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={WrenchIcon} label="Total" value={counts.total} tone="slate" />
        <StatCard icon={ExclamationTriangleIcon} label="Noi" value={counts.new} tone="amber" />
        <StatCard icon={ArrowPathIcon} label="În lucru" value={counts.inProgress} tone="blue" />
        <StatCard icon={CheckCircleIcon} label="Finalizate" value={counts.completed} tone="emerald" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Caută după nume, email, telefon, dispozitiv..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-5 text-slate-100 placeholder-slate-500 outline-none transition focus:border-[#16785F]/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#16785F]/15"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-4 pr-10 text-slate-100 outline-none transition focus:border-[#16785F]/50 focus:ring-2 focus:ring-[#16785F]/15"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#1B1F20] text-slate-100">
                {statusLabels[opt] ?? opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDownIcon className="h-5 w-5 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        {/* Queue */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">Listă cereri</h2>
            <span className="text-sm text-slate-400">{filteredRequests.length} afișate</span>
          </div>

          <div className="max-h-[70vh] space-y-3 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center text-slate-500">
                  Se încarcă cererile...
                </motion.div>
              ) : filteredRequests.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-16 text-center text-slate-500">
                  Nicio cerere găsită
                </motion.div>
              ) : (
                filteredRequests.map((req) => {
                  const isSelected = selectedId === req.id;
                  const status = statusConfig[req.status as keyof typeof statusConfig] || statusConfig.New;
                  const StatusIcon = status.icon;

                  return (
                    <motion.button
                      key={req.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedId(req.id)}
                      className={`group w-full rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-[#16785F]/50 bg-[#16785F]/10 ring-1 ring-[#16785F]/20"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-white">{req.full_name || "Fără nume"}</p>
                          <p className="mt-1 truncate text-sm text-slate-400">{req.device_type || "Dispozitiv necunoscut"}</p>
                        </div>
                        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${status.bg} ${status.border} ${status.text}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">
                        {req.issue_description || "Fără descriere."}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span className="max-w-[55%] truncate">{req.email || "—"}</span>
                        <span>{formatDate(req.created_at)}</span>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Detail */}
        <div className="min-h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <AnimatePresence mode="wait">
            {!selectedRequest ? (
              <motion.div key="no-selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full items-center justify-center p-10 text-center">
                <div className="max-w-md">
                  <p className="text-xl font-semibold text-slate-300">Nicio cerere selectată</p>
                  <p className="mt-3 text-sm text-slate-400">
                    Selectează o cerere din listă pentru a-i vedea detaliile și a actualiza statusul.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key={selectedRequest.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="space-y-8 p-6 lg:p-8">
                {/* Header */}
                <div className="border-b border-white/10 pb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Detalii cerere</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{selectedRequest.full_name}</h2>
                  <p className="mt-2 text-sm text-slate-400">Creat la {formatDate(selectedRequest.created_at)}</p>
                </div>

                {/* Status controls */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {(() => {
                    const st = statusConfig[selectedRequest.status as keyof typeof statusConfig] || statusConfig.New;
                    const StatusIcon = st.icon;
                    return (
                      <div className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-sm font-medium ${st.bg} ${st.border} ${st.text}`}>
                        <StatusIcon className="h-5 w-5" />
                        {st.label}
                      </div>
                    );
                  })()}

                  <div className="flex items-center gap-3">
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
                      disabled={updatingId === selectedRequest.id}
                      className="min-w-[170px] rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-slate-100 outline-none transition focus:border-[#16785F]/50 focus:ring-2 focus:ring-[#16785F]/15 disabled:opacity-50"
                    >
                      {statusOptions
                        .filter((s) => s !== "All")
                        .map((s) => (
                          <option key={s} value={s} className="bg-[#1B1F20] text-slate-100">
                            {statusConfig[s as keyof typeof statusConfig]?.label ?? s}
                          </option>
                        ))}
                    </select>

                    {updatingId === selectedRequest.id && (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                        <ArrowPathIcon className="h-5 w-5 text-[#16785F]" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailItem icon={UserIcon} label="Client" value={selectedRequest.full_name} />
                  <DetailItem icon={DevicePhoneMobileIcon} label="Dispozitiv" value={selectedRequest.device_type} />
                  <DetailItem icon={EnvelopeIcon} label="Email" value={selectedRequest.email} />
                  <DetailItem icon={PhoneIcon} label="Telefon" value={selectedRequest.phone} />
                  <DetailItem icon={CalendarIcon} label="Creat" value={formatDate(selectedRequest.created_at)} />
                  <DetailItem icon={ClockIcon} label="Actualizat" value={formatDate(selectedRequest.updated_at)} />
                </div>

                {/* Reported issue */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Defect raportat</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                    {selectedRequest.issue_description || "Fără descriere."}
                  </p>
                </div>

                {/* Notes */}
                <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Pași următori / Note interne</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    • Atribuie tehnician • Adaugă preț și piese • Încarcă poze/video • Setează termen estimativ • Notează comunicarea cu clientul
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────

const toneMap = {
  slate: "text-slate-300 bg-slate-500/10",
  amber: "text-amber-300 bg-amber-500/10",
  blue: "text-blue-300 bg-blue-500/10",
  emerald: "text-[#16785F] bg-[#16785F]/10",
} as const;

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${toneMap[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-sm text-slate-400">{label}</p>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="rounded-lg bg-white/5 p-2.5">
        <Icon className="h-5 w-5 text-slate-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 truncate font-medium text-slate-200">{value || "—"}</p>
      </div>
    </div>
  );
}
