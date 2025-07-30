# Formulário de Avaliação - Projeto Ecobags

## E.E.E.F. Inglês de Souza - Educação Ambiental em Mosqueiro

Este projeto inclui um formulário completo de avaliação do Projeto Ecobags, desenvolvido para coletar feedback de alunos, pais e responsáveis sobre as ações de educação ambiental realizadas pela escola.

## 🌱 Sobre o Projeto Ecobags

O Projeto Ecobags é um subprojeto dentro do programa anual de Educação Ambiental da E.E.E.F. Inglês de Souza. O projeto propiciou a produção artesanal de ecobags pelos próprios alunos, utilizando algodão cru novo ou reaproveitando tecidos de roupas antigas, visando diminuir o impacto ambiental causado pelo uso de sacolas plásticas.

### Contexto
- **Local**: Distrito de Mosqueiro, Belém do Pará
- **Período crítico**: Julho (férias escolares)
- **Impacto**: Redução da poluição nas praias durante alta temporada turística

## 📋 Funcionalidades do Formulário

### 1. Identificação Inteligente
- Diferenciação automática entre alunos e responsáveis
- Campos específicos para cada tipo de respondente
- Validação de dados obrigatórios

### 2. Avaliação Multidimensional
- **Importância do projeto** para conscientização ambiental
- **Engajamento dos alunos** nas atividades
- **Qualidade das ecobags** produzidas
- **Participação familiar** no projeto
- **Uso efetivo** das ecobags no dia a dia
- **Substituição** de sacolas plásticas
- **Divulgação** do projeto (exposições e feiras)
- **Mudanças de hábitos** ambientais

### 3. Percepção Ambiental
- Avaliação da poluição nas praias de Mosqueiro
- Comparação entre diferentes períodos do ano
- Identificação dos tipos de lixo mais comuns
- Crença no impacto dos projetos ambientais

### 4. Depoimentos e Reflexões
- Experiências pessoais com o projeto
- Observações sobre poluição local
- Mudanças na consciência ambiental
- Sugestões de melhoria
- Depoimentos sobre preservação ambiental

### 5. Avaliação Geral
- Sistema de notas de 0 a 10
- Recomendação para continuidade
- Interesse em participar de futuros projetos

## 🔗 Links de Acesso

### Formulário Público
- **URL**: `https://seu-dominio.com/ecobags.html`
- **Acesso**: Público (qualquer pessoa pode responder)
- **Funcionalidade**: Coleta de respostas dos participantes

### Dashboard Administrativo
- **URL**: `https://seu-dominio.com/dashboard.html`
- **Acesso**: Para gestores da escola
- **Funcionalidades**:
  - Visualização de estatísticas em tempo real
  - Gráficos interativos
  - Exportação de dados em CSV
  - Filtros por tipo de respondente
  - Análise de depoimentos

## 📊 Recursos do Dashboard

### Estatísticas Principais
- Total de respostas coletadas
- Nota média do projeto
- Distribuição entre alunos e responsáveis
- Tendências temporais

### Visualizações
- **Gráficos de pizza**: Importância do projeto, engajamento
- **Gráficos de barras**: Distribuição de notas, tipos de lixo
- **Tabelas**: Respostas recentes com detalhes
- **Modais**: Visualização completa de respostas individuais

### Funcionalidades Administrativas
- **Filtros**: Por tipo de respondente (aluno/responsável)
- **Exportação**: Dados completos em formato CSV
- **Busca**: Por nome, data ou conteúdo
- **Análise**: Depoimentos e sugestões categorizados

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **Recharts** para gráficos e visualizações

### Backend
- **Supabase** para banco de dados
- **PostgreSQL** com Row Level Security (RLS)
- **Políticas de segurança** configuradas

### Infraestrutura
- **Vite** para build e desenvolvimento
- **Vercel** para deploy (recomendado)
- **Responsivo** para todos os dispositivos

## 🗄️ Estrutura do Banco de Dados

### Tabela: `ecobags_responses`

```sql
-- Identificação
respondent_type: 'student' | 'parent'
name: VARCHAR(255)
student_class: VARCHAR(50)
student_grade: VARCHAR(50)
relationship: VARCHAR(50)
student_name: VARCHAR(255)

-- Avaliações (escala padronizada)
project_importance: VARCHAR(30)
student_engagement: VARCHAR(30)
ecobags_quality: VARCHAR(30)
family_participation: VARCHAR(30)
ecobags_usage: VARCHAR(30)
plastic_replacement: VARCHAR(30)
project_promotion: VARCHAR(30)
habit_changes: VARCHAR(30)

-- Percepção ambiental
july_pollution: VARCHAR(30)
pollution_comparison: VARCHAR(30)
trash_types: TEXT[]
project_impact_belief: VARCHAR(30)

-- Depoimentos
project_experience: TEXT
pollution_observations: TEXT
consciousness_changes: TEXT
improvement_suggestions: TEXT
preservation_testimony: TEXT

-- Avaliação final
project_rating: INTEGER (0-10)
project_continuation: VARCHAR(30)
future_participation: VARCHAR(30)

-- Metadados
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

## 🔒 Segurança e Privacidade

### Políticas de Acesso
- **Inserção pública**: Qualquer pessoa pode responder o formulário
- **Leitura autenticada**: Apenas usuários autenticados podem ver o dashboard
- **Row Level Security**: Ativado para proteção dos dados

### Validações
- Campos obrigatórios marcados com asterisco (*)
- Validação de tipos de dados
- Sanitização de entradas de texto
- Prevenção de spam e duplicatas

## 📱 Experiência do Usuário

### Design Responsivo
- **Mobile-first**: Otimizado para smartphones
- **Progressive disclosure**: Formulário dividido em etapas
- **Feedback visual**: Barra de progresso e validações
- **Acessibilidade**: Contraste adequado e navegação por teclado

### Fluxo de Navegação
1. **Identificação**: Tipo de respondente e dados básicos
2. **Dados específicos**: Informações de aluno ou responsável
3. **Avaliação do projeto**: Questões sobre efetividade
4. **Percepção ambiental**: Observações sobre poluição
5. **Depoimentos**: Reflexões e sugestões
6. **Confirmação**: Sucesso no envio

## 📈 Análise de Dados

### Métricas Principais
- **Taxa de participação** por segmento
- **Satisfação geral** (nota média)
- **Efetividade percebida** do projeto
- **Mudanças comportamentais** relatadas
- **Sugestões de melhoria** categorizadas

### Relatórios Disponíveis
- **Resumo executivo**: Principais indicadores
- **Análise temporal**: Evolução das respostas
- **Segmentação**: Diferenças entre alunos e responsáveis
- **Depoimentos**: Análise qualitativa dos textos

## 🚀 Como Usar

### Para Respondentes
1. Acesse o link do formulário
2. Identifique-se como aluno ou responsável
3. Preencha os dados solicitados
4. Responda às questões de avaliação
5. Compartilhe suas observações e sugestões
6. Envie o formulário

### Para Gestores
1. Acesse o dashboard administrativo
2. Visualize as estatísticas em tempo real
3. Use filtros para análises específicas
4. Exporte dados para análises externas
5. Leia depoimentos detalhados
6. Gere relatórios para a direção

## 📞 Suporte

Para dúvidas sobre o formulário ou dashboard:
- **Escola**: E.E.E.F. Inglês de Souza
- **Projeto**: Educação Ambiental em Mosqueiro
- **Responsável**: Coordenação Pedagógica

## 🌍 Impacto Esperado

Este formulário permitirá à escola:
- **Avaliar** a efetividade do Projeto Ecobags
- **Identificar** pontos de melhoria
- **Documentar** o impacto ambiental
- **Engajar** a comunidade escolar
- **Planejar** futuras ações ambientais
- **Demonstrar** resultados para stakeholders

---

*Desenvolvido para promover a educação ambiental e a sustentabilidade em Mosqueiro, Belém do Pará.*