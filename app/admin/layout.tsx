"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/requests", label: "Repair Tickets" },
    { href: "/admin/products", label: "Products" },
  ];

  return (
    <main className="min-h-screen bg-[#f3f6f9] text-[#0f172a]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f6_100%)] shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="IMPEDEX"
              width={865}
              height={349}
              className="h-16 w-auto object-contain md:h-20"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-3 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#22c55e] text-white shadow-[0_6px_14px_rgba(34,197,94,0.25)]"
                      : "border border-black/10 bg-white text-[#0f172a] hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0f172a] transition hover:bg-gray-100"
            >
              View Website
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}