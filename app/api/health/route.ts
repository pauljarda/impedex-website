import { supabaseAdmin } from "@/lib/supabase-admin";

// Never cached — a cached health check reports the past, not the present.
export const dynamic = "force-dynamic";
export const revalidate = 0;

/*
 * Health endpoint for external uptime monitoring.
 *
 * The homepage is statically prerendered, so it returns 200 even when the
 * database is unreachable — a monitor pointed at "/" would show green through
 * a total backend outage. This route actually touches Supabase, so a failure
 * here means the site is genuinely unable to serve logins or repair requests.
 *
 * Returns 200 when healthy and 503 when not, which is what uptime services
 * alert on. The body is deliberately free of error details, counts, and
 * versions — it is public, and a health check should not become a
 * reconnaissance endpoint.
 */
export async function GET() {
  let database = "ok";

  try {
    // head: true returns no rows — just proves the round trip works.
    const { error } = await supabaseAdmin
      .from("repair_requests")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("health: database error:", error.message);
      database = "error";
    }
  } catch (err) {
    console.error("health: database unreachable:", err);
    database = "unreachable";
  }

  const healthy = database === "ok";

  return Response.json(
    {
      status: healthy ? "ok" : "degraded",
      checks: { database },
      time: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store, max-age=0" },
    }
  );
}
