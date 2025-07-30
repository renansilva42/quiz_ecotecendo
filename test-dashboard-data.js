// Script para inserir dados de teste no dashboard
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyzwaebcakmwymzrjpvc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5endhZWJjYWttd3ltenJqcHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTI3NTQsImV4cCI6MjA2NDg4ODc1NH0.TskQrdyne454vtleFKuahOEF2TEIjNRbPPi1Sx9XS7U';

const supabase = createClient(supabaseUrl, supabaseKey);

const testData = [
  {
    respondent_type: 'student',
    name: 'João Silva',
    student_level: 'Ensino Fundamental Anos Finais',
    student_class: '8º ano Manhã',
    project_importance: 'very_important',
    student_engagement: 'very_much',
    ecobags_quality: 'excellent',
    family_participation: 'very_satisfactory',
    ecobags_usage: 'always',
    plastic_replacement: 'completely',
    project_promotion: 'significantly',
    habit_changes: 'very_much',
    july_pollution: 'very_polluted',
    pollution_comparison: 'much_higher',
    trash_types: ['plastic_bags', 'pet_bottles', 'straws_cups'],
    project_impact_belief: 'very_much',
    project_experience: 'Foi uma experiência incrível aprender sobre sustentabilidade.',
    pollution_observations: 'Notei muito lixo plástico nas praias durante julho.',
    consciousness_changes: 'Agora penso mais antes de usar plástico.',
    improvement_suggestions: 'Poderia ter mais oficinas práticas.',
    preservation_testimony: 'É importante cuidar do meio ambiente para as futuras gerações.',
    project_rating: 9,
    project_continuation: 'yes_definitely',
    future_participation: 'very_interested'
  },
  {
    respondent_type: 'parent',
    name: 'Maria Santos',
    relationship: 'mother',
    student_name: 'Ana Santos',
    student_level_parent: 'Ensino Fundamental Anos Iniciais',
    student_class_parent: '5º Ano',
    project_importance: 'very_important',
    student_engagement: 'moderately',
    ecobags_quality: 'good',
    family_participation: 'satisfactory',
    ecobags_usage: 'frequently',
    plastic_replacement: 'mostly',
    project_promotion: 'moderately',
    habit_changes: 'moderately',
    july_pollution: 'polluted',
    pollution_comparison: 'higher',
    trash_types: ['plastic_bags', 'food_waste'],
    project_impact_belief: 'moderately',
    project_experience: 'Minha filha ficou muito empolgada com o projeto.',
    pollution_observations: 'As praias ficam mais sujas durante as férias.',
    consciousness_changes: 'Toda a família está mais consciente sobre o lixo.',
    improvement_suggestions: 'Mais envolvimento dos pais seria interessante.',
    preservation_testimony: 'Mosqueiro precisa ser preservado para o turismo.',
    project_rating: 8,
    project_continuation: 'yes_improvements',
    future_participation: 'moderate_interest'
  },
  {
    respondent_type: 'student',
    name: 'Pedro Costa',
    student_level: 'Ensino Fundamental Anos Finais',
    student_class: '7º ano Tarde',
    project_importance: 'important',
    student_engagement: 'very_much',
    ecobags_quality: 'good',
    family_participation: 'satisfactory',
    ecobags_usage: 'sometimes',
    plastic_replacement: 'mostly',
    project_promotion: 'moderately',
    habit_changes: 'moderately',
    july_pollution: 'very_polluted',
    pollution_comparison: 'much_higher',
    trash_types: ['plastic_bags', 'pet_bottles', 'cigarettes'],
    project_impact_belief: 'very_much',
    project_experience: 'Aprendi muito sobre reciclagem e reutilização.',
    pollution_observations: 'Vi muitas garrafas plásticas na praia.',
    consciousness_changes: 'Agora separo o lixo em casa.',
    improvement_suggestions: 'Mais atividades ao ar livre.',
    preservation_testimony: 'Quero que meus filhos vejam Mosqueiro limpo.',
    project_rating: 7,
    project_continuation: 'yes_definitely',
    future_participation: 'very_interested'
  },
  {
    respondent_type: 'parent',
    name: 'Carlos Oliveira',
    relationship: 'father',
    student_name: 'Lucas Oliveira',
    student_level_parent: 'Ensino Fundamental Anos Finais',
    student_class_parent: '6º ano Manhã',
    project_importance: 'very_important',
    student_engagement: 'very_much',
    ecobags_quality: 'excellent',
    family_participation: 'very_satisfactory',
    ecobags_usage: 'always',
    plastic_replacement: 'completely',
    project_promotion: 'significantly',
    habit_changes: 'very_much',
    july_pollution: 'polluted',
    pollution_comparison: 'higher',
    trash_types: ['plastic_bags', 'straws_cups', 'food_waste'],
    project_impact_belief: 'very_much',
    project_experience: 'Excelente iniciativa da escola.',
    pollution_observations: 'O lixo aumenta muito durante o verão.',
    consciousness_changes: 'Toda família mudou hábitos de consumo.',
    improvement_suggestions: 'Expandir para outras escolas.',
    preservation_testimony: 'Mosqueiro é patrimônio que deve ser preservado.',
    project_rating: 10,
    project_continuation: 'yes_definitely',
    future_participation: 'very_interested'
  },
  {
    respondent_type: 'student',
    name: 'Beatriz Lima',
    student_level: 'Ensino Fundamental Anos Iniciais',
    student_class: '4º Ano',
    project_importance: 'important',
    student_engagement: 'moderately',
    ecobags_quality: 'regular',
    family_participation: 'little_satisfactory',
    ecobags_usage: 'sometimes',
    plastic_replacement: 'mostly',
    project_promotion: 'little',
    habit_changes: 'little',
    july_pollution: 'little_polluted',
    pollution_comparison: 'similar',
    trash_types: ['food_waste'],
    project_impact_belief: 'moderately',
    project_experience: 'Foi legal fazer as ecobags.',
    pollution_observations: 'Às vezes vejo lixo na praia.',
    consciousness_changes: 'Aprendi a não jogar lixo no chão.',
    improvement_suggestions: 'Mais brincadeiras educativas.',
    preservation_testimony: 'Gosto da praia limpa.',
    project_rating: 6,
    project_continuation: 'maybe',
    future_participation: 'little_interest'
  }
];

async function insertTestData() {
  console.log('Inserindo dados de teste...');
  
  try {
    const { data, error } = await supabase
      .from('ecobags_responses')
      .insert(testData);
    
    if (error) {
      console.error('Erro ao inserir dados:', error);
    } else {
      console.log('Dados inseridos com sucesso!');
      console.log('Total de registros inseridos:', testData.length);
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
  }
}

// Verificar se há dados existentes
async function checkExistingData() {
  try {
    const { data, error } = await supabase
      .from('ecobags_responses')
      .select('*');
    
    if (error) {
      console.error('Erro ao verificar dados existentes:', error);
      return 0;
    }
    
    console.log('Dados existentes na tabela:', data?.length || 0);
    return data?.length || 0;
  } catch (error) {
    console.error('Erro inesperado ao verificar dados:', error);
    return 0;
  }
}

async function main() {
  const existingCount = await checkExistingData();
  
  if (existingCount === 0) {
    await insertTestData();
  } else {
    console.log(`Já existem ${existingCount} registros na tabela.`);
    console.log('Para inserir dados de teste mesmo assim, modifique o script.');
  }
}

main();