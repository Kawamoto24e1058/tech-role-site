-- Supabase schema for tech-role-site (Postgres)

-- Enable pgcrypto extension for gen_random_uuid
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- results table
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL,
  name text NOT NULL,
  scores jsonb,
  result jsonb,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- answers table (optional detailed storage)
CREATE TABLE IF NOT EXISTS answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id uuid REFERENCES results(id) ON DELETE CASCADE,
  question_id integer NOT NULL,
  choice_index integer,
  choice_text text,
  scores jsonb,
  created_at timestamptz DEFAULT now()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_results_student_id ON results(student_id);
CREATE INDEX IF NOT EXISTS idx_results_created_at ON results(created_at DESC);

-- NOTE: In production, enable Row Level Security (RLS) and use policies to restrict admin actions.
-- Example (Supabase):
-- ALTER TABLE results ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "admins_only" ON results FOR SELECT USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'email' = 'tech@andrew.ac.jp');
