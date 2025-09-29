-- Criação da tabela para armazenar resultados do quiz de água
CREATE TABLE water_quiz_results (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT UNIQUE NOT NULL,
  user_instagram TEXT NOT NULL,
  score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_time INTEGER NOT NULL,
  water_saved INTEGER DEFAULT 0,
  filter_knowledge INTEGER DEFAULT 0,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_water_quiz_results_score ON water_quiz_results(score DESC);
CREATE INDEX idx_water_quiz_results_created_at ON water_quiz_results(created_at DESC);
CREATE INDEX idx_water_quiz_results_water_saved ON water_quiz_results(water_saved DESC);

-- RLS (Row Level Security) - opcional, descomente se necessário
-- ALTER TABLE water_quiz_results ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de dados (descomente se usar RLS)
-- CREATE POLICY "Allow insert for water quiz results" ON water_quiz_results
--   FOR INSERT WITH CHECK (true);

-- Política para permitir leitura de dados (descomente se usar RLS)
-- CREATE POLICY "Allow read for water quiz results" ON water_quiz_results
--   FOR SELECT USING (true);

-- Comentários na tabela
COMMENT ON TABLE water_quiz_results IS 'Armazena resultados do quiz sobre consumo consciente de água';
COMMENT ON COLUMN water_quiz_results.water_saved IS 'Litros de água economizados baseado no conhecimento demonstrado';
COMMENT ON COLUMN water_quiz_results.filter_knowledge IS 'Número de perguntas sobre filtros artesanais acertadas (0-5)';
COMMENT ON COLUMN water_quiz_results.answers IS 'Array JSON com todas as respostas do usuário';
