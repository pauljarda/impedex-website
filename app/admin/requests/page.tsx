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

const statusOptions = ["All", "New", "In Progress", "Completed"];

const statusConfig = {
  New: {
    label: "New",
    bg: "bg-amber-500/20",
    text: "text-amber-300",
    border: "border-amber-500/40",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    icon: ExclamationTriangleIcon,
  },
  "In Progress": {
    label: "In Progress",
    bg: "bg-blue-500/20",
    text: "text-blue-300",
    border: "border-blue-500/40",
    dot: "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]",
    icon: ArrowPathIcon,
  },
  Completed: {
    label: "Completed",
    bg: "bg-emerald-500/20",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
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
      const matchesSearch = !term ||
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

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
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
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "-";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Repair Requests
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Manage incoming repair jobs, track progress, and update ticket status
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <StatCard icon={WrenchIcon} label="Total" value={counts.total} color="text-indigo-400" />
          <StatCard icon={ExclamationTriangleIcon} label="New" value={counts.new} color="text-amber-400" />
          <StatCard icon={ArrowPathIcon} label="In Progress" value={counts.inProgress} color="text-blue-400" />
          <StatCard icon={CheckCircleIcon} label="Completed" value={counts.completed} color="text-emerald-400" />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, phone, device..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 bg-gray-900/50 border border-gray-700/60 rounded-2xl text-gray-100 placeholder-gray-500 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/30 focus:bg-gray-900/70 transition-all backdrop-blur-md shadow-inner"
            />
          </div>

          <div className="relative w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-gray-900/50 border border-gray-700/60 rounded-2xl text-gray-100 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/30 transition-all backdrop-blur-md appearance-none shadow-inner"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-gray-900 text-gray-100">
                  {opt === "All" ? "All Statuses" : opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
          {/* Ticket Queue */}
          <div className="rounded-3xl border border-gray-800/40 bg-gray-900/30 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-800/40">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Ticket Queue</h2>
                <span className="text-sm text-gray-400 font-medium">
                  {filteredRequests.length} shown
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center text-gray-500"
                  >
                    Loading repair requests...
                  </motion.div>
                ) : filteredRequests.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center text-gray-500"
                  >
                    No matching requests found
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
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedId(req.id)}
                        className={`group w-full rounded-2xl p-5 text-left border transition-all duration-300 backdrop-blur-sm ${
                          isSelected
                            ? "border-indigo-500/60 bg-gradient-to-br from-indigo-950/50 to-gray-900/50 shadow-[0_0_35px_rgba(99,102,241,0.25)]"
                            : "border-gray-800/50 bg-gray-900/40 hover:bg-gray-800/50 hover:border-gray-700/60"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-lg truncate text-gray-100 group-hover:text-indigo-300 transition-colors">
                              {req.full_name || "Unnamed Customer"}
                            </p>
                            <p className="mt-1.5 text-sm text-gray-400 truncate">
                              {req.device_type || "Unknown device"}
                            </p>
                          </div>

                          <div
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${status.bg} ${status.border} ${status.text}`}
                          >
                            <span className={`h-3 w-3 rounded-full ${status.dot} animate-pulse-subtle`} />
                            <StatusIcon className="h-4 w-4" />
                            {req.status}
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-300 line-clamp-2 leading-6">
                          {req.issue_description || "No issue description provided."}
                        </p>

                        <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                          <span className="truncate max-w-[55%]">{req.email || "-"}</span>
                          <span>{formatDate(req.created_at)}</span>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="rounded-3xl border border-gray-800/40 bg-gray-900/30 backdrop-blur-xl shadow-2xl min-h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
              {!selectedRequest ? (
                <motion.div
                  key="no-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center p-10 text-center"
                >
                  <div className="max-w-md">
                    <p className="text-2xl font-semibold text-gray-300">No ticket selected</p>
                    <p className="mt-4 text-gray-400">
                      Select a repair request from the queue to view its details and update status.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedRequest.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 lg:p-10 space-y-10"
                >
                  {/* Header */}
                  <div className="pb-8 border-b border-gray-800/40">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Ticket Details</p>
                    <h2 className="mt-3 text-3xl font-bold text-white">
                      {selectedRequest.full_name}
                    </h2>
                    <p className="mt-3 text-gray-400">
                      Created {formatDate(selectedRequest.created_at)}
                    </p>
                  </div>

                  {/* Status controls */}
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    {(() => {
                      const st = statusConfig[selectedRequest.status as keyof typeof statusConfig] || statusConfig.New;
                      const StatusIcon = st.icon;

                      return (
                        <div
                          className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-base font-medium border ${st.bg} ${st.border} ${st.text}`}
                        >
                          <StatusIcon className="h-5 w-5" />
                          {selectedRequest.status}
                        </div>
                      );
                    })()}

                    <div className="flex items-center gap-4">
                      <select
                        value={selectedRequest.status}
                        onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
                        disabled={updatingId === selectedRequest.id}
                        className="min-w-[180px] px-5 py-3 bg-gray-900/60 border border-gray-700/60 rounded-2xl text-gray-100 focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/30 transition-all backdrop-blur-md disabled:opacity-50"
                      >
                        {statusOptions
                          .filter((s) => s !== "All")
                          .map((s) => (
                            <option key={s} value={s} className="bg-gray-900 text-gray-100">
                              {s}
                            </option>
                          ))}
                      </select>

                      {updatingId === selectedRequest.id && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        >
                          <ArrowPathIcon className="h-6 w-6 text-indigo-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <DetailItem icon={UserIcon} label="Customer" value={selectedRequest.full_name} />
                    <DetailItem icon={DevicePhoneMobileIcon} label="Device" value={selectedRequest.device_type} />
                    <DetailItem icon={EnvelopeIcon} label="Email" value={selectedRequest.email} />
                    <DetailItem icon={PhoneIcon} label="Phone" value={selectedRequest.phone} />
                    <DetailItem icon={CalendarIcon} label="Created" value={formatDate(selectedRequest.created_at)} />
                    <DetailItem icon={ClockIcon} label="Last Updated" value={formatDate(selectedRequest.updated_at)} />
                  </div>

                  {/* Reported Issue */}
                  <div className="rounded-2xl bg-gray-900/50 border border-gray-800/40 p-7">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                      Reported Issue
                    </h3>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {selectedRequest.issue_description || "No description provided."}
                    </p>
                  </div>

                  {/* Next Steps / Notes */}
                  <div className="rounded-2xl border border-dashed border-gray-700/50 bg-gray-900/30 p-7">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                      Next Steps / Internal Notes
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      • Assign technician • Add pricing & parts • Upload photos/videos • Set estimated completion • Log customer communication
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Helper Components
// ────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-gray-800/40 bg-gray-900/40 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color.replace("text-", "bg-").replace("400", "950/40")}`}>
          <Icon className={`h-7 w-7 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-gray-400 font-medium">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-gray-900/50 border border-gray-800/40 p-6">
      <div className="p-3 rounded-xl bg-gray-800/50">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <p className="mt-2 font-medium text-gray-200 truncate">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}