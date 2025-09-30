# 🔧 Instruções para Corrigir Login do Administrador

## Problema
O administrador não consegue fazer login em `/water-quiz.html` com o erro:
```
Erro ao entrar: Invalid login credentials
```

## Causa
O usuário administrador não foi criado corretamente no sistema de autenticação do Supabase, ou as credenciais estão incorretas.

## ✅ Solução (Passo a Passo)

### Passo 1: Acessar o Supabase
1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá para **SQL Editor** no menu lateral esquerdo

### Passo 2: Executar o Script de Configuração
1. Clique em **New Query** (Nova consulta)
2. Abra o arquivo `setup-admin-user.sql` (criado na raiz do projeto)
3. Copie TODO o conteúdo do arquivo
4. Cole no editor SQL do Supabase
5. Clique em **RUN** (Executar)

### Passo 3: Verificar Resultado
Após executar o script, você deve ver uma mensagem confirmando:
- ✅ USUÁRIO ADMIN CRIADO COM SUCESSO!
- Email: admin@ecotecendo.com.br
- Email confirmado e verificado
- Identidade criada

### Passo 4: Testar Login
1. Acesse: `http://localhost:5173/water-quiz.html` (ou sua URL de produção)
2. Clique em **"Não tem uma conta? Cadastre-se aqui"** para ir para a tela de login
3. Use as credenciais:
   - **Email**: `admin@ecotecendo.com.br`
   - **Senha**: `admin123456`
4. Clique em **"BORA COMEÇAR!"**

### Passo 5: Acessar Painel Admin
Após o login bem-sucedido:
1. Você verá a tela de boas-vindas
2. Clique no botão **"🛡️ Admin"** (visível apenas para administradores)
3. Você será direcionado ao painel administrativo

## 🔍 Verificação Manual (Opcional)

Se ainda tiver problemas, você pode verificar manualmente no Supabase:

1. Vá para **Authentication > Users** no painel do Supabase
2. Procure pelo email `admin@ecotecendo.com.br`
3. Verifique se:
   - ✅ Email está confirmado (email_confirmed_at tem data)
   - ✅ Usuário está ativo (não deletado)
   - ✅ Metadata contém: `{"name": "Administrador", "instagram": "admin_ecotecendo"}`

## 🚨 Problemas Comuns

### Erro: "Invalid login credentials"
**Causa**: Usuário não existe ou senha incorreta
**Solução**: Execute o script `setup-admin-user.sql` novamente

### Erro: "Email not confirmed"
**Causa**: Email do usuário não foi confirmado
**Solução**: O script já confirma o email automaticamente. Execute novamente.

### Botão Admin não aparece
**Causa**: O sistema não reconhece o usuário como admin
**Solução**: Verifique se o email é exatamente `admin@ecotecendo.com.br` (case-sensitive)

## 📝 Credenciais do Administrador

```
Email: admin@ecotecendo.com.br
Senha: admin123456
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: Após configurar em produção:
1. Altere a senha padrão `admin123456` para uma senha forte
2. Use a função de recuperação de senha do Supabase
3. Considere ativar autenticação de dois fatores (2FA)

## 📞 Suporte

Se o problema persistir após seguir todos os passos:
1. Verifique se as variáveis de ambiente estão configuradas corretamente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Verifique se a migração `20250109000001_add_admin_features_to_existing_water_quiz.sql` foi executada
3. Verifique os logs do console do navegador (F12) para mais detalhes do erro
