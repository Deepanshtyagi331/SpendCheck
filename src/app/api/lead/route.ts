import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, company, role, auditId, honeypot } = body;

    // 1. Basic Abuse Protection: Honeypot
    if (honeypot) {
      return NextResponse.json({ message: "Bot detected" }, { status: 400 });
    }

    // 2. Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    // 3. Update Audit in Supabase with Lead Info
    const { error: updateError } = await supabase
      .from("audits")
      .update({ 
        email, 
        company_name: company, 
        role,
        is_public: true 
      })
      .eq("id", auditId);

    if (updateError) throw updateError;

    // 4. Send Confirmation Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "SpendCheck <onboarding@resend.dev>",
        to: email,
        subject: "Your AI Spend Audit Report",
        html: `
          <h1>Your AI Spend Audit is ready</h1>
          <p>Hi ${role || 'there'},</p>
          <p>Thank you for using SpendCheck. You can access your full report here:</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}">View My Report</a></p>
          <p>Best,<br/>The SpendCheck Team</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
