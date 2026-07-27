import { supabaseAdmin } from "@/lib/supabase-admin";
import { getSupabaseServer } from "@/lib/supabase-server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

// Escape user input before it goes into the HTML email bodies below.
// Without this, anything a visitor types is parsed as markup by the mail
// client — letting an anonymous submission inject links into the admin inbox.
function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

  // If the visitor is logged in, link the request to their account so it
  // shows up in /account. Anonymous submissions keep user_id null.
  let user_id: string | null = null;
  try {
    const supabase = await getSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    user_id = user?.id ?? null;
  } catch {
    user_id = null;
  }

  const { data, error } = await supabaseAdmin.from("repair_requests").insert({
    full_name,
    phone,
    email,
    device_type: device_type || "Nespecificat",
    issue_description,
    status: "New",
    user_id,
  }).select("id").single();

  if (error || !data) {
    console.error("repair-request insert error:", error);
    return Response.json({ error: "Nu am putut salva cererea." }, { status: 500 });
  }

  // Fire-and-forget emails — don't block or fail the request if email errors
  void sendEmails({
    requestId: data.id,
    full_name,
    email,
    phone,
    device_type,
    issue_description
  });

  return Response.json({ ok: true });
}

async function sendEmails(d: {
  requestId: string;
  full_name: string;
  email: string;
  phone: string;
  device_type: string;
  issue_description: string;
}) {
  try {
    // Escaped copies for use inside the HTML below. `d.*` must not be
    // interpolated directly — use these instead.
    const e = {
      requestId: esc(d.requestId),
      firstName: esc(d.full_name.split(" ")[0] || "Client"),
      full_name: esc(d.full_name),
      email: esc(d.email),
      phone: esc(d.phone),
      device_type: esc(d.device_type),
      issue_description: esc(d.issue_description),
    };

    const results = await Promise.allSettled([
      // Confirmation to client
      resend.emails.send({
        from: "IMPEDEX <noreply@impedex.ro>",
        to: d.email,
        subject: "Am primit cererea ta — IMPEDEX",
        html: `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7">
        <tr><td style="background:#07111f;padding:28px 32px">
          <p style="margin:0;color:#16785F;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">IMPEDEX</p>
          <p style="margin:4px 0 0;color:#ffffff;font-size:20px;font-weight:700">Reparații Electronice Profesionale</p>
        </td></tr>
        <tr><td style="padding:32px">
          <p style="margin:0 0 4px;font-size:12px;color:#71717a">Referință cerere</p>
          <p style="margin:0 0 20px;font-size:14px;color:#18181b;font-family:monospace;font-weight:600">${e.requestId}</p>

          <p style="margin:0 0 16px;font-size:16px;color:#18181b">Bună, <strong>${e.firstName}</strong></p>
          <p style="margin:0 0 20px;font-size:15px;color:#3f3f46;line-height:1.6">Am primit cererea ta de diagnosticare și revenim în <strong>1-2 zile lucrătoare</strong> cu un verdict.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;border-radius:8px;margin:20px 0">
            <tr><td style="padding:12px 16px;border-bottom:1px solid #e4e4e7"><span style="font-size:13px;color:#71717a">Echipament</span></td></tr>
            <tr><td style="padding:12px 16px;font-size:14px;color:#18181b;font-weight:600">${e.device_type}</td></tr>
            <tr><td style="padding:12px 16px;border-bottom:1px solid #e4e4e7"><span style="font-size:13px;color:#71717a">Telefon</span></td></tr>
            <tr><td style="padding:12px 16px;font-size:14px;color:#18181b">${e.phone || "—"}</td></tr>
          </table>

          <p style="margin:0 0 8px;font-size:13px;color:#71717a">Descrierea defectului:</p>
          <p style="margin:0 0 24px;font-size:14px;color:#3f3f46;line-height:1.6;border-left:3px solid #16785F;padding-left:12px">${e.issue_description}</p>

          <p style="margin:0;font-size:14px;color:#3f3f46;line-height:1.6">Dacă ai întrebări, răspunde direct la acest email sau scrie-ne la <a href="mailto:contact@impedex.ro" style="color:#16785F">contact@impedex.ro</a>.</p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #f4f4f5;background:#fafafa">
          <p style="margin:0;font-size:12px;color:#a1a1aa">© ${new Date().getFullYear()} IMPEDEX · impedex.ro</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }),

    // Notification to admin
    resend.emails.send({
      from: "IMPEDEX <noreply@impedex.ro>",
      to: "contact@impedex.ro",
      subject: `Cerere nouă: ${d.device_type} — ${d.full_name}`,
      html: `
<!DOCTYPE html>
<html lang="ro">
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7">
        <tr><td style="background:#07111f;padding:24px 32px">
          <p style="margin:0;color:#16785F;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">IMPEDEX ADMIN</p>
          <p style="margin:4px 0 0;color:#ffffff;font-size:18px;font-weight:700">Cerere nouă de diagnosticare</p>
        </td></tr>
        <tr><td style="padding:28px 32px">
          <p style="margin:0 0 16px;font-size:13px;color:#71717a">Referință: <span style="font-family:monospace;font-weight:600;color:#18181b">${e.requestId}</span></p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            <tr style="border-bottom:1px solid #f4f4f5"><td style="padding:10px 0;font-size:13px;color:#71717a;width:140px">Nume</td><td style="padding:10px 0;font-size:14px;color:#18181b;font-weight:600">${e.full_name}</td></tr>
            <tr style="border-bottom:1px solid #f4f4f5"><td style="padding:10px 0;font-size:13px;color:#71717a">Email</td><td style="padding:10px 0;font-size:14px"><a href="mailto:${e.email}" style="color:#16785F">${e.email}</a></td></tr>
            <tr style="border-bottom:1px solid #f4f4f5"><td style="padding:10px 0;font-size:13px;color:#71717a">Telefon</td><td style="padding:10px 0;font-size:14px;color:#18181b">${e.phone || "—"}</td></tr>
            <tr style="border-bottom:1px solid #f4f4f5"><td style="padding:10px 0;font-size:13px;color:#71717a">Echipament</td><td style="padding:10px 0;font-size:14px;color:#18181b;font-weight:600">${e.device_type}</td></tr>
            <tr><td style="padding:10px 0;font-size:13px;color:#71717a;vertical-align:top">Defect</td><td style="padding:10px 0;font-size:14px;color:#3f3f46;line-height:1.6">${e.issue_description}</td></tr>
          </table>
          <a href="https://impedex.ro/admin/requests" style="display:inline-block;margin-top:24px;background:#16785F;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">Deschide în Admin →</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
    ]);

  } catch (err) {
    console.error("repair-request email error:", err);
  }
}
