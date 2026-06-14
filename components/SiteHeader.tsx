"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import LogoMark from "./LogoMark";

const NAV = [
  { label: "Servicii", href: "/servicii" },
  { label: "Diagnosticare", href: "/diagnosticare" },
  { label: "Despre noi", href: "/despre" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-white/10 bg-[#07111f]/55 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "py-1 shadow-lg shadow-black/20" : "py-2"
      }`}
    >
      <div className="relative flex w-full items-center justify-between px-6 md:px-12">
        <div className="flex flex-1 justify-start">
          <a href="/" className="flex items-center">
            <div
              className={`relative transition-all duration-300 ${
                scrolled ? "h-14 w-40" : "h-18 w-52 md:h-20 md:w-60"
              }`}
            >
              <LogoMark sizes="(max-width: 768px) 160px, 240px" priority />
            </div>
          </a>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-12 text-base font-bold uppercase tracking-wider lg:flex xl:gap-16">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  active ? "text-emerald-300" : "text-white/80 hover:text-emerald-300"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-1 justify-end">
          <a
            href="/login"
            className={`flex items-center gap-2 rounded-md border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-[#07111f] transition hover:bg-slate-100 ${
              scrolled ? "px-4 py-2" : "px-5 py-2"
            }`}
          >
            <User size={16} />
            <span>Cont client</span>
          </a>
        </div>
      </div>
    </header>
  );
}
