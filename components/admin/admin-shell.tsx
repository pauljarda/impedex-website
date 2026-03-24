"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/requests", label: "Requests" },
    { href: "/admin/products", label: "Products" },
  ];

  return (
    <div className="min-h-screen bg-[#e5eaee]">
      {/* HEADER */}
      <header className="w-full bg-gradient-to-r from-[#ececec] to-[#d7d7d7] border-b border-[#c5ccd3]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="IMPEDEX" className="h-8" />
            <span className="text-[#041b4a] font-semibold tracking-wide">
              Admin
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-[#0b3d2e]"
                      : "text-[#5b6775] hover:text-[#041b4a]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}