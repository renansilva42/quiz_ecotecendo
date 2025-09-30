// Script para criar usuário admin no Supabase
// Execute este script no console do navegador na página do quiz

const createAdminUser = async () => {
  try {
    // Importar o cliente Supabase
    const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js@2');
    
    // Configurações do Supabase (substitua pelas suas)
    const supabaseUrl = 'SUA_SUPABASE_URL_AQUI';
    const supabaseKey = 'SUA_SUPABASE_ANON_KEY_AQUI';
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Criar usuário admin
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@ecotecendo.com.br',
      password: 'admin123456',
      options: {
        data: {
          name: 'Administrador',
          instagram: 'admin_ecotecendo'
        }
      }
    });
    
    if (error) {
      console.error('Erro ao criar usuário admin:', error);
    } else {
      console.log('Usuário admin criado com sucesso:', data);
      console.log('Email: admin@ecotecendo.com.br');
      console.log('Senha: admin123456');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
};

// Executar a função
createAdminUser();
