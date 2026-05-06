# SQL SCHEMA

Run this in your Supabase SQL Editor to set up the database for SpendCheck.

```sql
-- Table for storing audits
create table public.audits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  tool_data jsonb not null,
  recommendations jsonb not null,
  total_monthly_savings numeric not null,
  total_annual_savings numeric not null,
  summary text,
  email text,
  company_name text,
  role text,
  is_public boolean default false
);

-- Index for unique URLs
create index idx_audits_id on public.audits (id);

-- Enable Row Level Security (RLS)
alter table public.audits enable row level security;

-- Policy: Allow anonymous insertions (for audit creation)
create policy "Allow anonymous insertions"
on public.audits for insert
with check (true);

-- Policy: Allow public read of non-sensitive fields
create policy "Allow public read of audits"
on public.audits for select
using (true);
```
