-- Add admin features to existing water_quiz_results table
-- This migration works with the existing table structure

-- Add missing columns to existing water_quiz_results table if they don't exist
-- (The table already exists with id SERIAL, so we'll work with the existing structure)

-- Add water_saved column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'water_quiz_results' 
                   AND column_name = 'water_saved') THEN
        ALTER TABLE water_quiz_results ADD COLUMN water_saved INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add filter_knowledge column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'water_quiz_results' 
                   AND column_name = 'filter_knowledge') THEN
        ALTER TABLE water_quiz_results ADD COLUMN filter_knowledge INTEGER DEFAULT 0;
    END IF;
END $$;

-- Update existing records to have default values for new columns
UPDATE water_quiz_results 
SET water_saved = COALESCE(water_saved, 0),
    filter_knowledge = COALESCE(filter_knowledge, 0)
WHERE water_saved IS NULL OR filter_knowledge IS NULL;

-- Create water_quiz_settings table for admin controls
CREATE TABLE IF NOT EXISTS water_quiz_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert default settings (only if no settings exist)
INSERT INTO water_quiz_settings (quiz_enabled) 
SELECT true 
WHERE NOT EXISTS (SELECT 1 FROM water_quiz_settings);

-- Enable Row Level Security on both tables
ALTER TABLE water_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_quiz_settings ENABLE ROW LEVEL SECURITY;

-- Create additional indexes for performance (only if they don't exist)
-- Note: Some indexes may already exist from the original table creation
CREATE INDEX IF NOT EXISTS idx_water_quiz_results_ranking ON water_quiz_results(score DESC, total_time ASC);
CREATE INDEX IF NOT EXISTS idx_water_quiz_results_water_saved ON water_quiz_results(water_saved DESC);

-- Add RLS policies for water_quiz_results (drop existing policies first)

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public select on water_quiz_results" ON water_quiz_results;
DROP POLICY IF EXISTS "Allow authenticated insert on water_quiz_results" ON water_quiz_results;
DROP POLICY IF EXISTS "Allow authenticated update on own water_quiz_results" ON water_quiz_results;
DROP POLICY IF EXISTS "Allow admin delete on water_quiz_results" ON water_quiz_results;
DROP POLICY IF EXISTS "Allow insert for water quiz results" ON water_quiz_results;
DROP POLICY IF EXISTS "Allow read for water quiz results" ON water_quiz_results;

-- Allow public SELECT (read) access
CREATE POLICY "Allow public select on water_quiz_results" ON water_quiz_results
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to INSERT
CREATE POLICY "Allow authenticated insert on water_quiz_results" ON water_quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to UPDATE their own records (based on user_email)
CREATE POLICY "Allow authenticated update on own water_quiz_results" ON water_quiz_results
  FOR UPDATE
  TO authenticated
  USING (user_email = auth.email());

-- Allow admin to delete all results
CREATE POLICY "Allow admin delete on water_quiz_results" ON water_quiz_results
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'admin@ecotecendo.com.br');

-- Add RLS policies for water_quiz_settings

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public select on water_quiz_settings" ON water_quiz_settings;
DROP POLICY IF EXISTS "Allow admin update on water_quiz_settings" ON water_quiz_settings;

-- Allow public SELECT (read) access to settings
CREATE POLICY "Allow public select on water_quiz_settings" ON water_quiz_settings
  FOR SELECT
  TO public
  USING (true);

-- Only allow admin users to update settings (we'll check for admin email in the app)
CREATE POLICY "Allow admin update on water_quiz_settings" ON water_quiz_settings
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'admin@ecotecendo.com.br');
