import { Package } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Produse</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Aici vei adăuga, edita și gestiona produsele afișate pe site.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16785F]/10 text-[#16785F]">
          <Package size={26} />
        </span>
        <p className="text-lg font-semibold text-white">Secțiune în pregătire</p>
        <p className="mt-1.5 max-w-sm text-sm text-slate-400">
          Gestionarea produselor va fi disponibilă aici în curând.
        </p>
      </div>
    </div>
  );
}
