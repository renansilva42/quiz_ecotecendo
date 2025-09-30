# Configuração do Sistema de Administração - Quiz das Águas

## Visão Geral

Este sistema permite que um usuário administrador gerencie o quiz das águas, incluindo:
- Visualizar o ranking de participantes
- Zerar todos os resultados do ranking
- Bloquear/desbloquear o quiz para novos jogadores

## Configuração Inicial

### 1. Executar Migrações do Banco de Dados

Execute a migração SQL no Supabase:

```sql
-- Execute o arquivo: supabase/migrations/20250109000000_create_water_quiz_tables.sql
```

### 2. Criar Usuário Administrador

#### Opção A: Via Interface do Supabase
1. Acesse o painel do Supabase
2. Vá para Authentication > Users
3. Clique em "Add user"
4. Preencha:
   - Email: `admin@ecotecendo.com.br`
   - Senha: `admin123456`
   - Metadata: 
     ```json
     {
       "name": "Administrador",
       "instagram": "admin_ecotecendo"
     }
     ```

#### Opção B: Via Script (Console do Navegador)
1. Abra o console do navegador na página do quiz
2. Execute o script `create-admin-user.js` (após substituir as credenciais do Supabase)

### 3. Configurar Políticas RLS

As políticas RLS já estão configuradas na migração para:
- Permitir que o admin (`admin@ecotecendo.com.br`) gerencie configurações
- Permitir que o admin exclua todos os resultados
- Permitir acesso público de leitura aos dados

## Funcionalidades do Admin

### Acesso ao Painel
- Faça login com o email `admin@ecotecendo.com.br`
- Na tela de boas-vindas, aparecerá um botão "🛡️ Admin"
- Clique para acessar o painel administrativo

### Funcionalidades Disponíveis

#### 1. Visualizar Ranking
- Lista completa de todos os participantes
- Estatísticas gerais (total de participantes, pontuação média, água economizada)
- Tabela detalhada com informações de cada jogador

#### 2. Gerenciar Status do Quiz
- **Bloquear Quiz**: Impede que novos jogadores iniciem o quiz
- **Desbloquear Quiz**: Permite que novos jogadores joguem
- Status é mostrado em tempo real na interface

#### 3. Zerar Resultados
- **Zona de Perigo**: Botão para excluir todos os resultados
- Confirmação obrigatória antes da exclusão
- Ação irreversível - todos os dados são perdidos permanentemente

## Estrutura do Banco de Dados

### Tabela: `water_quiz_results`
```sql
- id: UUID (chave primária)
- user_name: TEXT (nome do usuário)
- user_email: TEXT (email do usuário)
- user_instagram: TEXT (instagram do usuário)
- score: INTEGER (pontuação final)
- correct_answers: INTEGER (número de acertos)
- total_time: INTEGER (tempo total em segundos)
- water_saved: INTEGER (litros de água economizados)
- filter_knowledge: INTEGER (conhecimento sobre filtros)
- answers: JSONB (respostas detalhadas)
- created_at: TIMESTAMPTZ (data de criação)
```

### Tabela: `water_quiz_settings`
```sql
- id: UUID (chave primária)
- quiz_enabled: BOOLEAN (status do quiz)
- created_at: TIMESTAMPTZ (data de criação)
- updated_at: TIMESTAMPTZ (data de atualização)
```

## Segurança

### Controle de Acesso
- Apenas usuários com email `admin@ecotecendo.com.br` podem acessar o painel
- Políticas RLS garantem que apenas o admin pode modificar configurações
- Verificação de admin é feita tanto no frontend quanto no backend

### Validações
- Confirmação obrigatória para ações destrutivas
- Feedback visual para todas as operações
- Tratamento de erros com mensagens claras

## Troubleshooting

### Problemas Comuns

1. **Botão Admin não aparece**
   - Verifique se o usuário está logado com `admin@ecotecendo.com.br`
   - Confirme se a migração foi executada corretamente

2. **Erro ao acessar painel admin**
   - Verifique as políticas RLS no Supabase
   - Confirme se o usuário tem as permissões corretas

3. **Quiz não bloqueia/desbloqueia**
   - Verifique se a tabela `water_quiz_settings` existe
   - Confirme se há um registro na tabela de configurações

### Logs e Debug
- Use o console do navegador para verificar erros
- Verifique os logs do Supabase para problemas de RLS
- Confirme se as variáveis de ambiente estão configuradas

## Manutenção

### Backup dos Dados
- Faça backup regular da tabela `water_quiz_results`
- Exporte os dados antes de zerar o ranking

### Monitoramento
- Acompanhe o número de participantes
- Monitore a pontuação média dos jogadores
- Verifique se o quiz está funcionando corretamente

## Contato

Para suporte técnico ou dúvidas sobre o sistema de administração, entre em contato com a equipe de desenvolvimento.
