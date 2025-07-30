/*
  # Add Ecogamification fields to ecobags_responses table

  1. Changes to ecobags_responses table:
    - Add `ecogamification_opinion` (text) - opinião sobre a abordagem tecnológica do projeto ecogamificação
    - Add `technology_reception` (text) - avaliação da recepção de projetos que combinam tecnologia com sustentabilidade

  2. These fields will capture feedback about the Ecogamification project that uses QR codes
     for environmental education through a "Sustainable Treasure Hunt" approach.
*/

-- Add new ecogamification fields
ALTER TABLE ecobags_responses 
ADD COLUMN IF NOT EXISTS ecogamification_opinion text,
ADD COLUMN IF NOT EXISTS technology_reception text;

-- Add comments to document the new fields
COMMENT ON COLUMN ecobags_responses.ecogamification_opinion IS 'Opinião sobre a abordagem tecnológica do projeto Ecogamificação com QR codes';
COMMENT ON COLUMN ecobags_responses.technology_reception IS 'Avaliação da recepção de projetos que combinam tecnologia com sustentabilidade no ambiente escolar';