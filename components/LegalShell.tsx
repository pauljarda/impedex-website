import type { ReactNode } from "react";
import PcbCanvas from "@/components/PcbCanvas";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[#07111f] font-sans text-white">
      <PcbCanvas />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-36 lg:px-8">
        <p className="mb-3 text-sm font-semibold text-emerald-300">Legal</p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-white/40">Ultima actualizare: {updated}</p>

        <div
          className="mt-10 space-y-4 text-sm leading-7 text-white/65
            [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white
            [&_h2:first-child]:mt-0
            [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
            [&_a]:text-emerald-300 hover:[&_a]:underline
            [&_strong]:text-white/85"
        >
          {children}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
