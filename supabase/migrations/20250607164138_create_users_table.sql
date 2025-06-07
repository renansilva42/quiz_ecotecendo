-- Create a users table to store additional user info linked to Supabase auth users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE NOT NULL, -- references auth.users.id
  name text NOT NULL,
  instagram text,
  created_at timestamp with time zone DEFAULT now()
);

-- Add foreign key constraint to auth.users table
ALTER TABLE users
  ADD CONSTRAINT fk_auth_user
  FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON DELETE CASCADE;
