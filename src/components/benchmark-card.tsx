"use client";

import { useEffect, useState } from "react";
import { BenchmarkStats } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Users, Zap } from "lucide-react";

export function BenchmarkCard({ userSavings }: { userSavings: number }) {
  const [stats, setStats] = useState<BenchmarkStats | null>(null);

  useEffect(() => {
    fetch("/api/audit/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return null;

  const isAboveAverage = userSavings > stats.avgMonthlySavings;
  const percentageDiff = stats.avgMonthlySavings > 0 
    ? Math.abs(((userSavings - stats.avgMonthlySavings) / stats.avgMonthlySavings) * 100)
    : 0;

  return (
    <Card className="border-primary/20 bg-secondary/10 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6 text-primary">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-bold uppercase tracking-wider text-xs">Community Benchmark</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Comparison */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Efficiency Rating</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {isAboveAverage ? "Top 15%" : "Average"}
              </span>
              <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" /> 
                {isAboveAverage ? `+${Math.round(percentageDiff)}% above avg` : "On par"}
              </span>
            </div>
            <Progress value={isAboveAverage ? 85 : 50} className="h-2" />
          </div>

          {/* Average Savings */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg. Savings Found</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${stats.avgMonthlySavings}</span>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic">Based on {stats.totalAudits} audits</p>
          </div>

          {/* Social Proof */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Market context</p>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {stats.totalAudits > 1000 ? "1k+" : stats.totalAudits} teams audited
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Avg. AI spend is ${stats.marketAveragePerSeat}/user in your sector.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
