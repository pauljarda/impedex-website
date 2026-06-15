"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  Package,
  AlertTriangle,
  Plus,
  Minus,
  Search,
  Pencil,
  Trash2,
  X,
  MapPin,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import PartIcon from "@/components/admin/PartIcon";

type Part = {
  id: string;
  name: string;
  category: string | null;
  quantity: number;
  min_quantity: number;
  location: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const CATEGORIES = [
  "Diodă",
  "Rezistor",
  "Condensator",
  "Tranzistor",
  "Circuit integrat",
  "Conector",
  "Siguranță",
  "Cablu",
  "Altele",
];

type FormState = {
  name: string;
  category: string;
  quantity: string;
  min_quantity: string;
  location: string;
  notes: string;
};

const emptyForm: FormState = {
  name: "",
  category: CATEGORIES[0],
  quantity: "0",
  min_quantity: "0",
  location: "",
  notes: "",
};

export default function InventoryPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [busyId, setBusyId] = useState<string | null>(null);

  // Modal: null = closed, "new" = creating, Part = editing.
  const [editing, setEditing] = useState<Part | "new" | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchParts();
  }, []);

  async function fetchParts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("inventory_parts")
      .select("*")
      .order("name", { ascending: true });
    if (error) {
      console.error("inventory fetch error:", error);
    }
    setParts((data ?? []) as Part[]);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return parts.filter((p) => {
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        (p.category ?? "").toLowerCase().includes(term) ||
        (p.location ?? "").toLowerCase().includes(term);
      const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [parts, search, categoryFilter]);

  const stats = useMemo(() => {
    const totalUnits = parts.reduce((sum, p) => sum + p.quantity, 0);
    const lowStock = parts.filter((p) => p.quantity <= p.min_quantity).length;
    return { types: parts.length, totalUnits, lowStock };
  }, [parts]);

  async function adjustQty(part: Part, delta: number) {
    const next = Math.max(0, part.quantity + delta);
    if (next === part.quantity) return;
    setBusyId(part.id);
    // Optimistic update.
    setParts((prev) =>
      prev.map((p) => (p.id === part.id ? { ...p, quantity: next } : p))
    );
    const { error } = await supabase
      .from("inventory_parts")
      .update({ quantity: next, updated_at: new Date().toISOString() })
      .eq("id", part.id);
    if (error) {
      console.error("adjust error:", error);
      // Roll back on failure.
      setParts((prev) =>
        prev.map((p) => (p.id === part.id ? { ...p, quantity: part.quantity } : p))
      );
    }
    setBusyId(null);
  }

  function openNew() {
    setForm(emptyForm);
    setFormError("");
    setEditing("new");
  }

  function openEdit(part: Part) {
    setForm({
      name: part.name,
      category: part.category ?? CATEGORIES[0],
      quantity: String(part.quantity),
      min_quantity: String(part.min_quantity),
      location: part.location ?? "",
      notes: part.notes ?? "",
    });
    setFormError("");
    setEditing(part);
  }

  async function savePart(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const name = form.name.trim();
    if (!name) {
      setFormError("Numele piesei este obligatoriu.");
      return;
    }
    const quantity = Math.max(0, parseInt(form.quantity, 10) || 0);
    const min_quantity = Math.max(0, parseInt(form.min_quantity, 10) || 0);

    const payload = {
      name,
      category: form.category,
      quantity,
      min_quantity,
      location: form.location.trim() || null,
      notes: form.notes.trim() || null,
      updated_at: new Date().toISOString(),
    };

    setSaving(true);
    if (editing === "new") {
      const { error } = await supabase.from("inventory_parts").insert(payload);
      if (error) {
        setFormError("Nu am putut salva piesa.");
        setSaving(false);
        return;
      }
    } else if (editing) {
      const { error } = await supabase
        .from("inventory_parts")
        .update(payload)
        .eq("id", editing.id);
      if (error) {
        setFormError("Nu am putut actualiza piesa.");
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    setEditing(null);
    fetchParts();
  }

  async function deletePart(part: Part) {
    if (!confirm(`Ștergi „${part.name}" din stoc?`)) return;
    setBusyId(part.id);
    const { error } = await supabase
      .from("inventory_parts")
      .delete()
      .eq("id", part.id);
    if (error) {
      console.error("delete error:", error);
      setBusyId(null);
      return;
    }
    setParts((prev) => prev.filter((p) => p.id !== part.id));
    setBusyId(null);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stoc piese</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gestionează piesele din atelier — cantități, locație și alerte de stoc scăzut.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#16785F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f5f4b]"
        >
          <Plus size={16} />
          Adaugă piesă
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Boxes} label="Tipuri de piese" value={stats.types} tone="slate" />
        <StatCard icon={Package} label="Total bucăți" value={stats.totalUnits} tone="green" />
        <StatCard icon={AlertTriangle} label="Stoc scăzut" value={stats.lowStock} tone="amber" />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Caută după nume, categorie, locație..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-11 pr-5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#16785F] focus:ring-2 focus:ring-[#16785F]/15"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-slate-800 outline-none transition focus:border-[#16785F] focus:ring-2 focus:ring-[#16785F]/15 sm:w-56"
        >
          <option value="All">Toate categoriile</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-base font-semibold text-slate-900">Piese</h2>
          <span className="text-sm text-slate-400">{filtered.length} afișate</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-400">
            <Loader2 size={18} className="animate-spin" />
            Se încarcă stocul...
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-700">
              {parts.length === 0 ? "Niciun produs în stoc" : "Nicio piesă găsită"}
            </p>
            <p className="mt-1.5 text-sm text-slate-500">
              {parts.length === 0
                ? "Adaugă prima piesă cu butonul „Adaugă piesă”."
                : "Încearcă alt termen de căutare sau altă categorie."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((p) => {
              const low = p.quantity <= p.min_quantity;
              return (
                <div
                  key={p.id}
                  className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center"
                >
                  {/* Icon + info */}
                  <div className="flex min-w-0 flex-1 items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <PartIcon category={p.category} size={20} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        {p.category && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                            {p.category}
                          </span>
                        )}
                        {low && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                            <AlertTriangle size={11} />
                            Stoc scăzut
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span>Prag minim: {p.min_quantity}</span>
                        {p.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} />
                            {p.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustQty(p, -1)}
                      disabled={busyId === p.id || p.quantity === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Scade"
                    >
                      <Minus size={16} />
                    </button>
                    <span
                      className={`min-w-[3rem] text-center text-lg font-bold tabular-nums ${
                        low ? "text-amber-600" : "text-slate-900"
                      }`}
                    >
                      {p.quantity}
                    </span>
                    <button
                      onClick={() => adjustQty(p, 1)}
                      disabled={busyId === p.id}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Crește"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Editează"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deletePart(p)}
                      disabled={busyId === p.id}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                      aria-label="Șterge"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
            onClick={() => !saving && setEditing(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  {editing === "new" ? "Adaugă piesă" : "Editează piesă"}
                </h3>
                <button
                  onClick={() => !saving && setEditing(null)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={savePart} className="space-y-4">
                <Field label="Nume piesă">
                  <input
                    autoFocus
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Ex: Diodă 1N4007"
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Categorie">
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className={inputCls}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Locație">
                    <input
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="Ex: Sertar A3"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Cantitate">
                    <input
                      type="number"
                      min={0}
                      value={form.quantity}
                      onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Prag minim (alertă)">
                    <input
                      type="number"
                      min={0}
                      value={form.min_quantity}
                      onChange={(e) => setForm((f) => ({ ...f, min_quantity: e.target.value }))}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Note (opțional)">
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Ex: pentru surse de alimentare"
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {formError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-red-200">
                    {formError}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    disabled={saving}
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#16785F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f5f4b] disabled:opacity-60"
                  >
                    {saving && <Loader2 size={15} className="animate-spin" />}
                    {editing === "new" ? "Adaugă" : "Salvează"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#16785F] focus:ring-2 focus:ring-[#16785F]/15";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const toneMap = {
  slate: "text-slate-600 bg-slate-100",
  amber: "text-amber-600 bg-amber-50",
  green: "text-[#16785F] bg-[#16785F]/10",
} as const;

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Boxes;
  label: string;
  value: number;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${toneMap[tone]}`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value.toLocaleString("ro-RO")}</p>
      <p className="mt-0.5 text-sm text-slate-500">{label}</p>
    </div>
  );
}
