/*
  # Update ecobags_responses table to support level-based class selection

  1. Changes to ecobags_responses table:
    - Add `student_level` (text, optional) - nível do aluno (para estudantes)
    - Add `student_level_parent` (text, optional) - nível do aluno (para responsáveis)
    - Add `relationship_other` (text, optional) - especificação do parentesco quando 'other'
    - Remove `student_grade` (deprecated field, replaced by level system)

  2. Data Migration:
    - The student_grade field is no longer used in the new level-based system
    - Existing data will remain intact, new submissions will use the level fields

  3. Indexes:
    - Add index on student_level for better performance
    - Add index on student_level_parent for better performance
*/

-- Add new level fields
ALTER TABLE ecobags_responses 
ADD COLUMN IF NOT EXISTS student_level text,
ADD COLUMN IF NOT EXISTS student_level_parent text,
ADD COLUMN IF NOT EXISTS relationship_other text;

-- Remove the deprecated student_grade field (optional - can be kept for historical data)
-- ALTER TABLE ecobags_responses DROP COLUMN IF EXISTS student_grade;

-- Add indexes for better performance on the new level fields
CREATE INDEX IF NOT EXISTS idx_ecobags_responses_student_level ON ecobags_responses(student_level);
CREATE INDEX IF NOT EXISTS idx_ecobags_responses_student_level_parent ON ecobags_responses(student_level_parent);

-- Add comments to document the new fields
COMMENT ON COLUMN ecobags_responses.student_level IS 'Nível educacional do aluno (para estudantes): Ensino Fundamental Anos Iniciais ou Anos Finais';
COMMENT ON COLUMN ecobags_responses.student_level_parent IS 'Nível educacional do aluno (para responsáveis): Ensino Fundamental Anos Iniciais ou Anos Finais';
COMMENT ON COLUMN ecobags_responses.relationship_other IS 'Especificação do parentesco quando relationship = other';