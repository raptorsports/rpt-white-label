import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const payload = {
      leagueId: String(formData.get("leagueId") ?? ""),
      domain: String(formData.get("domain") ?? ""),
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      createdAt: new Date().toISOString(),
    };

    // MVP: just log
    console.log("[CONTACT_FORM]", payload);

    // TODO (next step):
    // - Save to Firestore: leagues/{leagueId}/contactMessages
    // - Send email via Resend/SendGrid
    // - Add spam protection (turnstile / recaptcha)
    return NextResponse.redirect(new URL(`/domains/${encodeURIComponent(payload.domain)}/contact?sent=1`, req.url));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
