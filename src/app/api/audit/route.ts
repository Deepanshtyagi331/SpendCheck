import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toolData, recommendations, totalMonthlySavings, totalAnnualSavings, summary } = body;

    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          tool_data: toolData,
          recommendations,
          total_monthly_savings: totalMonthlySavings,
          total_annual_savings: totalAnnualSavings,
          summary,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error("Audit Creation Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
