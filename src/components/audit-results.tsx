"use client";

import { useState } from "react";
import { AuditResult } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, TrendingDown, Calendar, Sparkles, PhoneCall, Share2 } from "lucide-react";
import { toast } from "sonner";
import { LeadForm } from "./lead-form";
import { BenchmarkCard } from "./benchmark-card";

export function AuditResults({ result }: { result: AuditResult }) {
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const isHighSavings = result.totalMonthlySavings > 500;
  const isOptimal = result.totalMonthlySavings === 0;

  const handleShare = async () => {
    const url = `${window.location.origin}/audit/${result.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Spend Audit Results",
          text: `I just found $${result.totalMonthlySavings}/mo in potential savings!`,
          url: url,
        });
      } catch (e) {
        console.error("Share failed", e);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <Card className="bg-primary/10 border-primary/20 border-2 overflow-hidden relative">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
        <CardHeader className="text-center">
          <CardTitle className="text-4xl md:text-5xl font-black gradient-text">
            ${result.totalMonthlySavings.toLocaleString()} /mo
          </CardTitle>
          <CardDescription className="text-xl font-medium text-foreground/80">
            Total Potential Monthly Savings
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              ${result.totalAnnualSavings.toLocaleString()} /year
            </Badge>
            {isOptimal && (
              <Badge variant="outline" className="px-4 py-2 text-lg text-green-400 border-green-400/50">
                You&apos;re spending well!
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Mode Comparison */}
      <BenchmarkCard userSavings={result.totalMonthlySavings} />

      {/* Recommendations Breakdown */}
      {!isOptimal && (
        <Card className="glass border-none overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingDown className="text-primary" />
              Per-Tool Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0 sm:p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Tool</TableHead>
                  <TableHead className="min-w-[100px]">Spend</TableHead>
                  <TableHead className="min-w-[200px]">Action</TableHead>
                  <TableHead className="text-right min-w-[100px]">Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.recommendations.map((rec, i) => (
                  <TableRow key={i} className="group transition-colors">
                    <TableCell className="font-semibold">{rec.tool}</TableCell>
                    <TableCell className="text-muted-foreground">${rec.currentSpend}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-primary flex items-center gap-1">
                          {rec.recommendedAction} <ArrowRight className="w-3 h-3" />
                        </span>
                        <span className="text-xs text-muted-foreground italic">{rec.reason}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-400">
                      +${rec.monthlySavings}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* AI Summary */}
      {result.personalizedSummary && (
        <Card className="border-none bg-gradient-to-br from-secondary/50 to-background/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Audit Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {result.personalizedSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* CTAs */}
      <div className="flex flex-col md:flex-row gap-4">
        {isHighSavings ? (
          <Button className="flex-1 h-14 text-lg font-bold gap-2 animate-pulse shadow-xl shadow-primary/20">
            <PhoneCall className="w-5 h-5" />
            Book Credex Consultation
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="flex-1 h-14 text-lg font-bold gap-2"
            onClick={() => setIsLeadOpen(true)}
          >
            Save My Report
          </Button>
        )}
        <Button variant="secondary" onClick={handleShare} className="h-14 px-8 gap-2">
          <Share2 className="w-5 h-5" />
          Share Results
        </Button>
      </div>

      <LeadForm 
        auditId={result.id} 
        isOpen={isLeadOpen} 
        onClose={() => setIsLeadOpen(false)} 
      />
    </div>
  );
}
