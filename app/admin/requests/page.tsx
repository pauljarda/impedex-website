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
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "ring-amber-200",
    icon: ExclamationTriangleIcon,
  },
  "In Progress": {
    label: "În lucru",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "ring-blue-200",
    icon: ArrowPathIcon,
  },
  Completed: {
    label: "Finalizat",
    bg: "bg-[#16785F]/10",
    text: "text-[#16785F]",
    border: "ring-[#16785F]/25",
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
        <h1 className="text-2xl font-bold text-slate-900">Cereri reparații</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gestionează cererile primite, urmărește progresul și actualizează statusul.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={WrenchIcon} label="Total" value={counts.total} tone="slate" />
        <StatCard icon={ExclamationTriangleIcon} label="Noi" value={counts.new} tone="amber" />
        <StatCard icon={ArrowPathIcon} label="În lucru" value={counts.inProgress} tone="blue" />
        <StatCard icon={CheckCircleIcon} label="Finalizate" value={counts.completed} tone="green" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Caută după nume, email, telefon, dispozitiv..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-11 pr-5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#16785F] focus:ring-2 focus:ring-[#16785F]/15"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-4 pr-10 text-slate-800 outline-none transition focus:border-[#16785F] focus:ring-2 focus:ring-[#16785F]/15"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {statusLabels[opt] ?? opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDownIcon className="h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        {/* Queue */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <h2 className="text-base font-semibold text-slate-900">Listă cereri</h2>
            <span className="text-sm text-slate-400">{filteredRequests.length} afișate</span>
          </div>

          <div className="max-h-[70vh] divide-y divide-slate-100 overflow-y-auto">
            {loading ? (
              <div className="py-16 text-center text-slate-400">Se încarcă cererile...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="py-16 text-center text-slate-400">Nicio cerere găsită</div>
            ) : (
              filteredRequests.map((req) => {
                const isSelected = selectedId === req.id;
                const status = statusConfig[req.status as keyof typeof statusConfig] || statusConfig.New;
                const StatusIcon = status.icon;

                return (
                  <button
                    key={req.id}
                    onClick={() => setSelectedId(req.id)}
                    className={`block w-full px-5 py-4 text-left transition ${
                      isSelected ? "bg-[#16785F]/[0.06]" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-slate-900">{req.full_name || "Fără nume"}</p>
                        <p className="mt-0.5 truncate text-sm text-slate-500">{req.device_type || "Dispozitiv necunoscut"}</p>
                      </div>
                      <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${status.bg} ${status.border} ${status.text}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {req.issue_description || "Fără descriere."}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                      <span className="max-w-[55%] truncate">{req.email || "—"}</span>
                      <span>{formatDate(req.created_at)}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="min-h-[500px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <AnimatePresence mode="wait">
            {!selectedRequest ? (
              <motion.div key="no-selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full items-center justify-center p-10 text-center">
                <div className="max-w-md">
                  <p className="text-lg font-semibold text-slate-700">Nicio cerere selectată</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Selectează o cerere din listă pentru a-i vedea detaliile și a actualiza statusul.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key={selectedRequest.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-7 p-6 lg:p-8">
                {/* Header */}
                <div className="border-b border-slate-200 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Detalii cerere</p>
                  <h2 className="mt-1.5 text-xl font-bold text-slate-900">{selectedRequest.full_name}</h2>
                  <p className="mt-1.5 text-sm text-slate-500">Creat la {formatDate(selectedRequest.created_at)}</p>
                </div>

                {/* Status controls */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {(() => {
                    const st = statusConfig[selectedRequest.status as keyof typeof statusConfig] || statusConfig.New;
                    const StatusIcon = st.icon;
                    return (
                      <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ring-1 ${st.bg} ${st.border} ${st.text}`}>
                        <StatusIcon className="h-4 w-4" />
                        {st.label}
                      </div>
                    );
                  })()}

                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-500">Schimbă status:</label>
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
                      disabled={updatingId === selectedRequest.id}
                      className="min-w-[150px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-slate-800 outline-none transition focus:border-[#16785F] focus:ring-2 focus:ring-[#16785F]/15 disabled:opacity-50"
                    >
                      {statusOptions
                        .filter((s) => s !== "All")
                        .map((s) => (
                          <option key={s} value={s}>
                            {statusConfig[s as keyof typeof statusConfig]?.label ?? s}
                          </option>
                        ))}
                    </select>

                    {updatingId === selectedRequest.id && (
                      <ArrowPathIcon className="h-5 w-5 animate-spin text-[#16785F]" />
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
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Defect raportat</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-700">
                    {selectedRequest.issue_description || "Fără descriere."}
                  </p>
                </div>

                {/* Notes */}
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-5">
                  <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Pași următori / Note interne</h3>
                  <p className="text-sm leading-relaxed text-slate-500">
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
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${toneMap[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-0.5 text-sm text-slate-500">{label}</p>
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
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <div className="rounded-md bg-slate-100 p-2">
        <Icon className="h-5 w-5 text-slate-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-0.5 truncate font-medium text-slate-800">{value || "—"}</p>
      </div>
    </div>
  );
}
