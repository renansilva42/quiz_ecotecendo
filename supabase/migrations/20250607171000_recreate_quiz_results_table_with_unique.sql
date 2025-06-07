-- Drop the existing quiz_results table if it exists
DROP TABLE IF EXISTS quiz_results;

-- Recreate the quiz_results table with unique constraint on user_email
CREATE TABLE quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_email text NOT NULL UNIQUE,
  user_instagram text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  total_time integer NOT NULL DEFAULT 0,
  answers jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_quiz_results_score ON quiz_results(score DESC);
CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX idx_quiz_results_ranking ON quiz_results(score DESC, total_time ASC);

-- Add RLS policies

-- Allow public SELECT (read) access
CREATE POLICY "Allow public select on quiz_results" ON quiz_results
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to INSERT
CREATE POLICY "Allow authenticated insert on quiz_results" ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to UPDATE their own records (based on user_email)
CREATE POLICY "Allow authenticated update on own quiz_results" ON quiz_results
  FOR UPDATE
  TO authenticated
  USING (user_email = auth.email());
