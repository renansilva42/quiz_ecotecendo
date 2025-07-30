-- Corrigir políticas RLS para a tabela ecobags_responses
-- Execute este SQL no painel do Supabase: https://supabase.com/dashboard/project/qyzwaebcakmwymzrjpvc/sql

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Allow public insert on ecobags_responses" ON ecobags_responses;
DROP POLICY IF EXISTS "Allow authenticated read on ecobags_responses" ON ecobags_responses;
DROP POLICY IF EXISTS "Allow public read on ecobags_responses" ON ecobags_responses;

-- Criar política para permitir inserção pública (formulário)
CREATE POLICY "Allow public insert on ecobags_responses" ON ecobags_responses
  FOR INSERT WITH CHECK (true);

-- Criar política para permitir leitura pública (dashboard)
CREATE POLICY "Allow public read on ecobags_responses" ON ecobags_responses
  FOR SELECT USING (true);

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'ecobags_responses';