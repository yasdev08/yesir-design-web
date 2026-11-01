-- Leads submitted through the website forms (quote + contact).
create table if not exists public.leads (
  id             bigint generated always as identity primary key,
  reference      text not null unique,
  created_at     timestamptz not null default now(),
  kind           text not null check (kind in ('quote', 'contact')),
  locale         text not null,
  name           text not null,
  business       text,
  phone          text not null,
  email          text,
  city           text,
  service        text,
  budget         text,
  contact_method text not null check (contact_method in ('whatsapp', 'phone', 'email')),
  description    text not null,
  page           text,
  user_agent     text,
  status         text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Row Level Security: no public access. The website writes with the
-- service-role key from the server only; read leads from the Supabase dashboard.
alter table public.leads enable row level security;
