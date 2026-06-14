import { ReactNode } from "react";
import { getSupabaseServer } from "@/lib/supabase-server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { full_name: string | null; role: string | null } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <AdminShell profile={profile} email={user?.email ?? ""}>
      {children}
    </AdminShell>
  );
}
