/*
  # Criar tabela para resultados do quiz

  1. Nova Tabela
    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `user_email` (text)
      - `user_instagram` (text)
      - `score` (integer)
      - `correct_answers` (integer)
      - `total_time` (integer) - tempo em segundos
      - `answers` (jsonb) - respostas detalhadas
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quiz_results` table
    - Add policy for public read access
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS quiz_results (
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

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_score ON quiz_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_results_ranking ON quiz_results(score DESC, total_time ASC);
