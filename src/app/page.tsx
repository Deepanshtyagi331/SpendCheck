"use client";

import { useState } from "react";
import { AuditForm } from "@/components/audit-form";
import { AuditResults } from "@/components/audit-results";
import { AuditInput, AuditResult } from "@/types";
import { runAudit } from "@/lib/audit-engine";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (input: AuditInput) => {
    setLoading(true);
    
    // Run local engine first
    const auditResult = runAudit(input);
    
    try {
      const response = await fetch("/api/audit/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamSize: input.teamSize,
          useCase: input.primaryUseCase,
          recommendations: auditResult.recommendations,
          savings: auditResult.totalMonthlySavings,
        }),
      });
      
      const { summary } = await response.json();
      auditResult.personalizedSummary = summary;
      
      // Save to Supabase
      const saveResponse = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolData: input.tools,
          recommendations: auditResult.recommendations,
          totalMonthlySavings: auditResult.totalMonthlySavings,
          totalAnnualSavings: auditResult.totalAnnualSavings,
          summary: auditResult.personalizedSummary,
        }),
      });
      
      const { id } = await saveResponse.json();
      auditResult.id = id;
    } catch (error) {
      console.error("Failed to process audit backend", error);
    }

    setResult(auditResult);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-32">
        {/* Landing Hero */}
        {!result && (
          <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Powered by Credex
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Stop Overpaying for <br />
              <span className="gradient-text">Your AI Tool Stack</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a free 60-second audit of your AI subscriptions. Discover how to save
              up to 40% on Cursor, Copilot, ChatGPT, and API costs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" /> No Login Required
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" /> Instant Audit
              </div>
            </div>
          </div>
        )}

        {/* Form or Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-medium animate-pulse">Running Financial Audit Engine...</p>
          </div>
        ) : result ? (
          <AuditResults result={result} />
        ) : (
          <AuditForm onAudit={handleAudit} />
        )}

        {/* Social Proof */}
        {!result && (
          <div className="mt-20 pt-20 border-t border-border/50 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Trusted by finance leads at fast-growing startups
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale contrast-125">
              <span className="text-2xl font-black">ACME CORP</span>
              <span className="text-2xl font-black">GLOBEX</span>
              <span className="text-2xl font-black">SOYLENT</span>
              <span className="text-2xl font-black">INITECH</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
