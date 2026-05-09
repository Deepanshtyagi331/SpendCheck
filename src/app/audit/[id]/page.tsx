import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { AuditResults } from "@/components/audit-results";
import { AuditResult } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: audit } = await supabase
    .from("audits")
    .select("total_monthly_savings")
    .eq("id", params.id)
    .single();

  if (!audit) return {};

  const savings = audit.total_monthly_savings;

  return {
    title: `AI Spend Audit: $${savings.toLocaleString()}/mo found!`,
    description: `See how this company optimized their AI stack and discovered $${(savings * 12).toLocaleString()} in annual savings.`,
    openGraph: {
      title: "AI Spend Audit Results",
      description: `Potential savings: $${savings}/mo. Run your own free audit now.`,
      images: [
        {
          url: `/api/og?savings=${savings}&annual=${savings * 12}`,
          width: 1200,
          height: 630,
          alt: "AI Spend Audit Result",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Spend Audit Results",
      description: `Potential savings: $${savings}/mo. Run your own free audit now.`,
      images: [`/api/og?savings=${savings}&annual=${savings * 12}`],
    },
  };
}

export default async function AuditPage({ params }: { params: { id: string } }) {
  const { data: audit } = await supabase
    .from("audits")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!audit) notFound();

  const result: AuditResult = {
    id: audit.id,
    recommendations: audit.recommendations,
    totalMonthlySavings: audit.total_monthly_savings,
    totalAnnualSavings: audit.total_annual_savings,
    personalizedSummary: audit.summary,
    createdAt: audit.created_at,
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-2">Public Audit Report</h1>
          <p className="text-muted-foreground">Shared for transparency and savings.</p>
        </div>
        <AuditResults result={result} />
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-4">Want to run your own audit?</p>
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg">
            Audit My AI Stack
          </Link>
        </div>
      </div>
    </div>
  );
}
