-- ==========================================
-- Supabase Schema for Election Dashboard
-- ==========================================

-- 1. Table: election_settings
CREATE TABLE IF NOT EXISTS public.election_settings (
  id integer PRIMARY KEY DEFAULT 1,
  school_name text NOT NULL DEFAULT 'โรงเรียนนางรอง',
  school_subtitle text NOT NULL DEFAULT 'คณะกรรมการสภานักเรียน',
  school_year text NOT NULL DEFAULT '2569',
  school_logo_url text DEFAULT '',
  total_voters integer NOT NULL DEFAULT 3300,
  booths_total integer NOT NULL DEFAULT 4,
  booths_counted integer NOT NULL DEFAULT 0,
  is_live boolean NOT NULL DEFAULT true
);

-- Ensure only one row exists
INSERT INTO public.election_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 2. Table: parties
CREATE TABLE IF NOT EXISTS public.parties (
  id integer PRIMARY KEY,
  number integer NOT NULL,
  name text NOT NULL,
  slogan text,
  logo_url text,
  instagram_url text,
  president_name text,
  president_photo_url text,
  votes integer NOT NULL DEFAULT 0,
  color_theme text DEFAULT 'gold',
  color_hex text DEFAULT '#d4a017'
);

-- Insert Demo Data
INSERT INTO public.parties (id, number, name, slogan, logo_url, instagram_url, president_name, votes, color_theme, color_hex) VALUES
(1, 1, 'NR1 GENESIS', 'Your voice is the Genesis of our progress.', '', 'https://www.instagram.com/nr1genesis/', 'ประธานเบอร์ 1', 2164, 'gold', '#d4a017'),
(2, 2, 'CIVILIZE', 'student council candidate · civilize', '', 'https://www.instagram.com/civilize_nr/', 'ประธานเบอร์ 2', 1254, 'red', '#c0392b')
ON CONFLICT (id) DO NOTHING;

-- 3. Table: special_votes
CREATE TABLE IF NOT EXISTS public.special_votes (
  id text PRIMARY KEY,
  label text NOT NULL,
  votes integer NOT NULL DEFAULT 0,
  color text DEFAULT '#ffffff'
);

INSERT INTO public.special_votes (id, label, votes, color) VALUES
('spoiled', 'บัตรเสีย', 266, '#b45309'),
('abstain', 'งดออกเสียง', 246, '#57534e')
ON CONFLICT (id) DO NOTHING;

-- 4. Table: booths
CREATE TABLE IF NOT EXISTS public.booths (
  id integer PRIMARY KEY,
  winner text
);

INSERT INTO public.booths (id, winner) VALUES
(1, NULL), (2, NULL), (3, NULL), (4, NULL)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- Realtime
-- ==========================================
alter publication supabase_realtime add table public.election_settings;
alter publication supabase_realtime add table public.parties;
alter publication supabase_realtime add table public.special_votes;
alter publication supabase_realtime add table public.booths;

-- ==========================================
-- Storage setup instructions (Run this or set it up manually in Supabase Dashboard):
-- 1. Create a Bucket named 'election_assets'
-- 2. Set 'Public bucket' = true
-- ==========================================
