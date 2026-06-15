"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Wrench,
  Boxes,
  ExternalLink,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Cereri reparații", icon: Wrench },
  { href: "/admin/inventory", label: "Stoc piese", icon: Boxes },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function AdminShell({
  children,
  profile,
}: {
  children: ReactNode;
  profile: { full_name: string | null; role: string | null } | null;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const name = profile?.full_name || "Admin";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const UserMenu = (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16785F] text-xs font-bold text-white">
          {initials(name)}
        </span>
        <div className="hidden min-w-0 leading-tight sm:block">
          <p className="truncate text-sm font-semibold text-slate-800">{name}</p>
          <p className="truncate text-xs capitalize text-slate-500">{profile?.role || "admin"}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        title="Deconectare"
        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={16} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Sidebar (desktop) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <Link href="/" className="relative h-9 w-36">
            <Image src="/logo.png" alt="IMPEDEX" fill sizes="144px" className="object-contain object-left" />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#16785F]/10 text-[#16785F]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/"
            target="_blank"
            className="mt-1 flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ExternalLink size={18} />
            Vezi site-ul
          </Link>
        </nav>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/" className="relative h-8 w-28">
          <Image src="/logo.png" alt="IMPEDEX" fill sizes="112px" className="object-contain object-left" />
        </Link>
        {UserMenu}
      </header>

      <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-2 py-2 lg:hidden">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                active ? "bg-[#16785F]/10 text-[#16785F]" : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Content ── */}
      <div className="lg:pl-64">
        {/* Desktop top header with user on the right */}
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-end border-b border-slate-200 bg-white/90 px-6 backdrop-blur lg:flex lg:px-10">
          {UserMenu}
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
