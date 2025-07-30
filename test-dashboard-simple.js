// Script simples para testar dados do dashboard
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qyzwaebcakmwymzrjpvc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5endhZWJjYWttd3ltenJqcHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTI3NTQsImV4cCI6MjA2NDg4ODc1NH0.TskQrdyne454vtleFKuahOEF2TEIjNRbPPi1Sx9XS7U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testData() {
  console.log('Testando dados do dashboard...');
  
  try {
    const { data, error } = await supabase
      .from('ecobags_responses')
      .select('*');

    if (error) {
      console.error('Erro:', error);
      return;
    }

    console.log(`Total de respostas: ${data?.length || 0}`);
    
    if (data && data.length > 0) {
      console.log('Primeira resposta:', JSON.stringify(data[0], null, 2));
      
      // Testar contagem de importância
      const importance = {};
      data.forEach(r => {
        if (r.project_importance) {
          importance[r.project_importance] = (importance[r.project_importance] || 0) + 1;
        }
      });
      console.log('Importância do projeto:', importance);
      
      // Testar notas
      const ratings = data.map(r => r.project_rating).filter(r => r !== null);
      console.log('Notas encontradas:', ratings);
      
      console.log('✅ Dados estão sendo recuperados corretamente!');
    } else {
      console.log('❌ Nenhum dado encontrado');
    }
    
  } catch (error) {
    console.error('Erro inesperado:', error);
  }
}

testData();