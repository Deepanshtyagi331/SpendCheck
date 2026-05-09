"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AITool, AuditInput } from "@/types";

const formSchema = z.object({
  teamSize: z.coerce.number().min(1, "Team size must be at least 1"),
  primaryUseCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
  tools: z.array(
    z.object({
      tool: z.string().min(1, "Select a tool"),
      plan: z.string().min(1, "Select a plan"),
      monthlySpend: z.coerce.number().min(0, "Spend cannot be negative"),
      seats: z.coerce.number().min(1, "Must have at least 1 seat"),
    })
  ).min(1, "Add at least one tool to audit"),
});

type FormValues = z.infer<typeof formSchema>;

const TOOLS: AITool[] = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic API",
  "OpenAI API",
  "Gemini",
  "Windsurf",
];

const PLANS: Record<string, string[]> = {
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Free", "Pro", "Business", "Enterprise"],
  Claude: ["Free", "Pro", "Team", "Enterprise", "API Direct"],
  ChatGPT: ["Free", "Plus", "Team", "Enterprise", "API Direct"],
  "Anthropic API": ["Usage based"],
  "OpenAI API": ["Usage based"],
  Gemini: ["Free", "Advanced", "API"],
  Windsurf: ["Free", "Pro", "Teams", "Enterprise"],
};

export function AuditForm({ onAudit }: { onAudit: (data: AuditInput) => void }) {
  const [mounted, setMounted] = useState(false);

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      teamSize: 1,
      primaryUseCase: "coding",
      tools: [{ tool: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tools",
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("audit_form_state");
    if (saved) {
      try {
        form.reset(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load form state", e);
      }
    }
    setMounted(true);
  }, [form]);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      const subscription = form.watch((value) => {
        localStorage.setItem("audit_form_state", JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
    }
  }, [form, mounted]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAudit(values as AuditInput);
  }

  if (!mounted) return null;

  return (
    <Card className="glass border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Calculator className="text-primary w-6 h-6" />
          AI Spend Audit
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in your current AI tool stack to discover savings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Team Size</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-secondary/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primaryUseCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Use Case</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder="Select usage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="coding">Software Engineering</SelectItem>
                        <SelectItem value="writing">Content & Writing</SelectItem>
                        <SelectItem value="data">Data Analysis</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="mixed">Mixed Usage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tools & Subscriptions</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ tool: "", plan: "", monthlySpend: 0, seats: 1 })}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Tool
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-lg border bg-secondary/20 relative group transition-all hover:bg-secondary/30"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name={`tools.${index}.tool`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tool</FormLabel>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
                              const plans = PLANS[val as keyof typeof PLANS];
                              if (plans && plans.length > 0) {
                                form.setValue(`tools.${index}.plan`, plans[0]);
                              }
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tool" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TOOLS.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tools.${index}.plan`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select plan" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {(() => {
                                const tool = form.watch(`tools.${index}.tool`);
                                const plans = PLANS[tool as keyof typeof PLANS];
                                return plans?.map((p) => (
                                  <SelectItem key={p} value={p}>
                                    {p}
                                  </SelectItem>
                                ));
                              })()}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tools.${index}.monthlySpend`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Spend ($)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tools.${index}.seats`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seats</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              {form.formState.errors.tools?.message && (
                <p className="text-sm text-destructive font-medium">
                  {form.formState.errors.tools.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
              Generate Audit Report
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
