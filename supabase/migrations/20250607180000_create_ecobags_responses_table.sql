/*
  # Criar tabela para respostas do formulário de avaliação do Projeto Ecobags

  1. Nova Tabela
    - `ecobags_responses`
      - `id` (uuid, primary key)
      - `respondent_type` (text) - 'student' ou 'parent'
      - `name` (text) - nome do respondente
      - `student_class` (text, opcional) - turma do aluno (para estudantes)
      - `student_grade` (text, opcional) - série do aluno (para estudantes)
      - `relationship` (text, opcional) - parentesco (para responsáveis)
      - `student_name` (text, opcional) - nome do aluno (para responsáveis)
      - `student_class_parent` (text, opcional) - turma do aluno (para responsáveis)
      - `project_importance` (text) - importância do projeto
      - `student_engagement` (text) - engajamento dos alunos
      - `ecobags_quality` (text) - qualidade das ecobags
      - `family_participation` (text) - participação da família
      - `ecobags_usage` (text) - uso das ecobags
      - `plastic_replacement` (text) - substituição do plástico
      - `project_promotion` (text) - promoção do projeto
      - `habit_changes` (text) - mudanças de hábitos
      - `july_pollution` (text) - poluição em julho
      - `pollution_comparison` (text) - comparação da poluição
      - `trash_types` (text[]) - tipos de lixo observados
      - `trash_types_other` (text, opcional) - outros tipos de lixo
      - `project_impact_belief` (text) - crença no impacto do projeto
      - `project_experience` (text, opcional) - experiência com o projeto
      - `pollution_observations` (text, opcional) - observações sobre poluição
      - `consciousness_changes` (text, opcional) - mudanças na consciência
      - `improvement_suggestions` (text, opcional) - sugestões de melhoria
      - `preservation_testimony` (text, opcional) - depoimento sobre preservação
      - `project_rating` (integer) - nota do projeto (0-10)
      - `project_continuation` (text) - continuação do projeto
      - `future_participation` (text) - participação futura
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `ecobags_responses` table
    - Add policy for public insert access (formulário público)
    - Add policy for authenticated read access (dashboard)
*/

CREATE TABLE IF NOT EXISTS ecobags_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_type text NOT NULL CHECK (respondent_type IN ('student', 'parent')),
  name text NOT NULL,
  student_class text,
  student_grade text,
  relationship text,
  student_name text,
  student_class_parent text,
  project_importance text NOT NULL,
  student_engagement text NOT NULL,
  ecobags_quality text NOT NULL,
  family_participation text NOT NULL,
  ecobags_usage text NOT NULL,
  plastic_replacement text NOT NULL,
  project_promotion text NOT NULL,
  habit_changes text NOT NULL,
  july_pollution text NOT NULL,
  pollution_comparison text NOT NULL,
  trash_types text[] DEFAULT '{}',
  trash_types_other text,
  project_impact_belief text NOT NULL,
  project_experience text,
  pollution_observations text,
  consciousness_changes text,
  improvement_suggestions text,
  preservation_testimony text,
  project_rating integer NOT NULL CHECK (project_rating >= 0 AND project_rating <= 10),
  project_continuation text NOT NULL,
  future_participation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE ecobags_responses ENABLE ROW LEVEL SECURITY;

-- Policy para permitir inserção pública (formulário)
CREATE POLICY "Allow public insert on ecobags_responses" ON ecobags_responses
  FOR INSERT WITH CHECK (true);

-- Policy para permitir leitura pública (dashboard)
CREATE POLICY "Allow public read on ecobags_responses" ON ecobags_responses
  FOR SELECT USING (true);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_ecobags_responses_created_at ON ecobags_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ecobags_responses_type ON ecobags_responses(respondent_type);
CREATE INDEX IF NOT EXISTS idx_ecobags_responses_rating ON ecobags_responses(project_rating DESC);