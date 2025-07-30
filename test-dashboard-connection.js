// Script para testar a conexão e dados do dashboard
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyzwaebcakmwymzrjpvc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5endhZWJjYWttd3ltenJqcHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTI3NTQsImV4cCI6MjA2NDg4ODc1NH0.TskQrdyne454vtleFKuahOEF2TEIjNRbPPi1Sx9XS7U';

const supabase = createClient(supabaseUrl, supabaseKey);

const LABEL_MAPPINGS = {
  very_important: 'Muito importante',
  important: 'Importante',
  little_important: 'Pouco importante',
  not_important: 'Sem importância',
  very_much: 'Sim, muito',
  moderately: 'Sim, moderadamente',
  little: 'Pouco',
  no: 'Não',
  excellent: 'Excelente',
  good: 'Boa',
  regular: 'Regular',
  needs_improvement: 'Precisa melhorar'
};

async function testDashboardData() {
  console.log('🔍 Testando conexão e dados do dashboard...\n');
  
  try {
    // 1. Testar conexão básica
    console.log('1. Testando conexão com Supabase...');
    const { data, error } = await supabase
      .from('ecobags_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Erro na conexão:', error);
      return;
    }

    console.log('✅ Conexão bem-sucedida!');
    console.log(`📊 Total de respostas encontradas: ${data?.length || 0}\n`);

    if (!data || data.length === 0) {
      console.log('⚠️  Nenhuma resposta encontrada na tabela.');
      return;
    }

    // 2. Testar dados de importância do projeto
    console.log('2. Analisando dados de importância do projeto...');
    const importanceCounts = {};
    data.forEach(response => {
      const value = response.project_importance;
      if (value) {
        importanceCounts[value] = (importanceCounts[value] || 0) + 1;
      }
    });

    console.log('Distribuição de importância:');
    Object.entries(importanceCounts).forEach(([key, count]) => {
      const label = LABEL_MAPPINGS[key] || key;
      console.log(`  - ${label}: ${count} respostas`);
    });
    console.log('');

    // 3. Testar dados de avaliação
    console.log('3. Analisando notas do projeto...');
    const ratings = {};
    data.forEach(response => {
      const rating = response.project_rating;
      if (rating) {
        ratings[rating] = (ratings[rating] || 0) + 1;
      }
    });

    console.log('Distribuição de notas:');
    Object.entries(ratings)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .forEach(([rating, count]) => {
        console.log(`  - Nota ${rating}: ${count} respostas`);
      });

    const averageRating = data.reduce((sum, response) => sum + (response.project_rating || 0), 0) / data.length;
    console.log(`📈 Nota média: ${averageRating.toFixed(1)}\n`);

    // 4. Testar dados de tipos de lixo
    console.log('4. Analisando tipos de lixo observados...');
    const trashCounts = {};
    data.forEach(response => {
      if (response.trash_types && Array.isArray(response.trash_types)) {
        response.trash_types.forEach(type => {
          trashCounts[type] = (trashCounts[type] || 0) + 1;
        });
      }
    });

    const trashLabels = {
      plastic_bags: 'Sacolas plásticas',
      pet_bottles: 'Garrafas PET',
      straws_cups: 'Canudos e copos',
      food_waste: 'Restos de comida',
      cigarettes: 'Cigarros'
    };

    console.log('Tipos de lixo mais observados:');
    Object.entries(trashCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        const label = trashLabels[type] || type;
        console.log(`  - ${label}: ${count} menções`);
      });
    console.log('');

    // 5. Testar filtros
    console.log('5. Testando filtros...');
    const students = data.filter(r => r.respondent_type === 'student');
    const parents = data.filter(r => r.respondent_type === 'parent');
    
    console.log(`👨‍🎓 Respostas de alunos: ${students.length}`);
    console.log(`👨‍👩‍👧‍👦 Respostas de responsáveis: ${parents.length}`);

    // Classes únicas
    const classes = new Set();
    data.forEach(response => {
      const studentClass = response.student_class || response.student_class_parent;
      if (studentClass && studentClass.trim()) {
        classes.add(studentClass.trim());
      }
    });
    
    console.log(`🏫 Turmas encontradas: ${Array.from(classes).sort().join(', ')}\n`);

    // 6. Verificar campos obrigatórios
    console.log('6. Verificando integridade dos dados...');
    const requiredFields = [
      'project_importance', 'student_engagement', 'ecobags_quality',
      'family_participation', 'ecobags_usage', 'plastic_replacement',
      'project_promotion', 'habit_changes', 'july_pollution',
      'pollution_comparison', 'project_impact_belief', 'project_rating',
      'project_continuation', 'future_participation'
    ];

    let hasErrors = false;
    data.forEach((response, index) => {
      requiredFields.forEach(field => {
        if (!response[field] && response[field] !== 0) {
          console.log(`⚠️  Resposta ${index + 1}: Campo '${field}' está vazio`);
          hasErrors = true;
        }
      });
    });

    if (!hasErrors) {
      console.log('✅ Todos os campos obrigatórios estão preenchidos!');
    }

    console.log('\n🎉 Teste concluído! O dashboard deve estar funcionando corretamente.');
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error);
  }
}

testDashboardData();