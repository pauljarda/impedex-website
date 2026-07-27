import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // Defence in depth: proxy.ts already guards /admin, but the pages below
  // query with the service-role key (which bypasses RLS), so the role is
  // re-checked here rather than relying on the proxy matcher alone.
  if (profile?.role !== "admin") {
    redirect("/login");
  }

  return (
    <AdminShell profile={profile} email={user?.email ?? ""}>
      {children}
    </AdminShell>
  );
}
