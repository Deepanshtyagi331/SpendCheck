"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mail, CheckCircle2 } from "lucide-react";

const leadSchema = z.object({
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  role: z.string().optional(),
  honeypot: z.string().max(0).optional(), // Honeypot field
});

export function LeadForm({ 
  auditId, 
  isOpen, 
  onClose 
}: { 
  auditId: string; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      email: "",
      company: "",
      role: "",
      honeypot: "",
    },
  });

  async function onSubmit(values: z.infer<typeof leadSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, auditId }),
      });

      if (!res.ok) throw new Error("Failed to save lead");

      setSuccess(true);
      toast.success("Report saved! Check your email.");
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Mail className="text-primary" />
            Save Your Report
          </DialogTitle>
          <DialogDescription>
            Enter your email to receive the full audit PDF and a unique shareable link.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in zoom-in-50 duration-500">
            <CheckCircle2 className="w-16 h-16 text-green-400" />
            <p className="text-lg font-semibold">Report Sent!</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="honeypot"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} tabIndex={-1} autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@company.com" {...field} className="bg-secondary/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc" {...field} className="bg-secondary/50" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role</FormLabel>
                      <FormControl>
                        <Input placeholder="CTO" {...field} className="bg-secondary/50" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 text-lg font-bold">
                {loading ? "Saving..." : "Get My Report"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
