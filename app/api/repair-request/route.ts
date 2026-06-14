import { supabaseAdmin } from "@/lib/supabase-admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const full_name = str(body.full_name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 160);
  const device_type = str(body.device_type, 80);
  const issue_description = str(body.issue_description, 4000);

  // Honeypot: bots fill hidden fields; humans leave them empty.
  if (str(body.company, 200)) {
    return Response.json({ ok: true });
  }

  if (!full_name || !email || !issue_description) {
    return Response.json({ error: "Completează câmpurile obligatorii." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Adresa de email nu este validă." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("repair_requests").insert({
    full_name,
    phone,
    email,
    device_type: device_type || "Nespecificat",
    issue_description,
    status: "New",
  });

  if (error) {
    console.error("repair-request insert error:", error);
    return Response.json({ error: "Nu am putut salva cererea." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
