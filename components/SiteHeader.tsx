"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import LogoMark from "./LogoMark";

const NAV = [
  { label: "Diagnosticare", href: "/diagnosticare" },
  { label: "Despre noi", href: "/despre" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#FFFFFF]/10 bg-[#0c1626]/60 py-1 backdrop-blur-md">
      <div className="relative flex w-full items-center justify-between px-6 md:px-12">
        <div className="flex flex-1 justify-start">
          <a href="/" className="flex items-center">
            <div className="relative h-[4.25rem] w-56 md:h-[5rem] md:w-72">
              <LogoMark sizes="(max-width: 768px) 160px, 240px" priority light />
            </div>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-12 text-base font-semibold tracking-normal lg:flex xl:gap-16">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  active ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <a
            href="/login"
            className="hidden items-center gap-2 rounded-md bg-[#0B6B5E] px-5 py-2 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#0A5A4F] lg:flex"
          >
            <User size={16} />
            <span>Cont client</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Meniu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#FFFFFF]/20 bg-[#16785F]/5 text-[#FFFFFF] transition hover:bg-[#16785F]/10 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="border-t border-[#FFFFFF]/10 bg-[#0c1626]/60 px-6 py-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-base font-semibold tracking-normal transition-colors ${
                    active ? "bg-[#16785F]/10 text-white" : "text-white/80 hover:bg-[#16785F]/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0B6B5E] px-5 py-3 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#0A5A4F]"
            >
              <User size={16} />
              <span>Cont client</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
