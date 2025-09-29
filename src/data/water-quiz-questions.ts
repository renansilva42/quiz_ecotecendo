import { Question } from '../types';

export const waterQuizQuestions: Question[] = [
  // Easy questions (1-10) - Conceitos básicos sobre água
  {
    id: 1,
    question: "Qual é a porcentagem aproximada de água doce disponível no planeta?",
    options: ["3%", "10%", "25%", "50%"],
    correctAnswer: 0,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Apenas 3% da água do planeta é doce, e a maior parte está congelada nos polos ou em aquíferos profundos."
  },
  {
    id: 2,
    question: "Qual é o principal uso doméstico de água?",
    options: ["Cozinhar", "Banho e higiene", "Lavar roupas", "Regar plantas"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "O banho e higiene pessoal representam cerca de 30% do consumo doméstico de água."
  },
  {
    id: 3,
    question: "Quantos litros de água uma pessoa consome em média por dia?",
    options: ["50-100 litros", "150-200 litros", "300-400 litros", "500+ litros"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "O consumo médio brasileiro é de 150-200 litros por pessoa por dia, muito acima do recomendado pela ONU (110 litros)."
  },
  {
    id: 4,
    question: "O que é o ciclo hidrológico?",
    options: ["Distribuição de água nas cidades", "Movimento da água na natureza", "Tratamento de esgoto", "Captação de chuva"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "O ciclo hidrológico é o movimento contínuo da água entre a atmosfera, solo e oceanos através de evaporação, condensação e precipitação."
  },
  {
    id: 5,
    question: "Qual é a principal causa da escassez de água?",
    options: ["Mudanças climáticas", "Crescimento populacional", "Poluição", "Todas as anteriores"],
    correctAnswer: 3,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "A escassez de água é causada por múltiplos fatores: mudanças climáticas, crescimento populacional, poluição e uso inadequado dos recursos."
  },
  {
    id: 6,
    question: "O que significa 'pegada hídrica'?",
    options: ["Quantidade de água que uma pessoa bebe", "Volume de água necessário para produzir bens e serviços", "Área coberta por água", "Profundidade de um poço"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "A pegada hídrica mede o volume total de água doce usado para produzir os bens e serviços consumidos por uma pessoa, comunidade ou empresa."
  },
  {
    id: 7,
    question: "Qual é o tempo médio de um banho que consome 45 litros de água?",
    options: ["5 minutos", "10 minutos", "15 minutos", "20 minutos"],
    correctAnswer: 0,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Um chuveiro comum gasta cerca de 9 litros por minuto, então 5 minutos equivalem a aproximadamente 45 litros."
  },
  {
    id: 8,
    question: "O que é água cinza?",
    options: ["Água poluída", "Água de reuso doméstico", "Água subterrânea", "Água da chuva"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Água cinza é a água de reuso de pias, chuveiros e máquinas de lavar, que pode ser tratada e reutilizada para fins não potáveis."
  },
  {
    id: 9,
    question: "Qual é a principal fonte de água potável no Brasil?",
    options: ["Águas subterrâneas", "Rios e lagos", "Chuva", "Oceanos"],
    correctAnswer: 0,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "As águas subterrâneas (aquíferos) são a principal fonte de água potável no Brasil, representando cerca de 70% do abastecimento."
  },
  {
    id: 10,
    question: "O que acontece quando deixamos a torneira aberta durante a escovação?",
    options: ["Nada", "Economizamos água", "Desperdiçamos 12 litros por minuto", "Melhoramos a qualidade da água"],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Uma torneira aberta desperdiça cerca de 12 litros de água por minuto. Fechar durante a escovação pode economizar até 24 litros por dia."
  },

  // Medium questions (11-15) - Filtros artesanais e conservação
  {
    id: 11,
    question: "Qual é o material mais eficaz para filtros artesanais de água?",
    options: ["Areia fina", "Carvão ativado", "Algodão", "Papel"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "O carvão ativado é altamente eficaz para remover cloro, sabores, odores e alguns contaminantes químicos da água."
  },
  {
    id: 12,
    question: "Como funciona um filtro de barro tradicional?",
    options: ["Por osmose reversa", "Por filtração por pressão", "Por capilaridade e porosidade", "Por destilação"],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "O filtro de barro funciona por capilaridade - a água passa pelos microporos do barro, que retém impurezas e bactérias."
  },
  {
    id: 13,
    question: "Qual é a vantagem dos filtros de areia lentos?",
    options: ["São mais baratos", "Removem bactérias e vírus", "Funcionam mais rápido", "Não precisam de manutenção"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Os filtros de areia lentos criam uma camada biológica que remove efetivamente bactérias, vírus e outros patógenos da água."
  },
  {
    id: 14,
    question: "O que é um sistema de captação de água da chuva?",
    options: ["Bomba de água", "Cisterna para coletar chuva", "Filtro de água", "Tratamento de esgoto"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Sistema de captação de água da chuva utiliza calhas, filtros e cisternas para coletar e armazenar água pluvial para uso doméstico."
  },
  {
    id: 15,
    question: "Qual é a principal vantagem dos filtros de carvão ativado caseiros?",
    options: ["São mais baratos", "Removem metais pesados", "Eliminam cloro e melhoram sabor", "Purificam instantaneamente"],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Filtros de carvão ativado caseiros são eficazes para remover cloro, melhorar o sabor e remover alguns contaminantes químicos da água."
  },

  // Hard questions (16-20) - Tecnologias avançadas e impacto ambiental
  {
    id: 16,
    question: "O que é a 'água virtual' no contexto de sustentabilidade?",
    options: ["Água invisível", "Água usada na produção de bens", "Água de reuso", "Água subterrânea"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Água virtual é a quantidade de água usada na produção de bens e serviços, incluindo toda a cadeia produtiva, mesmo que não esteja fisicamente presente no produto final."
  },
  {
    id: 17,
    question: "Qual é o principal desafio dos filtros artesanais em relação à qualidade da água?",
    options: ["Custo elevado", "Remoção de vírus", "Velocidade de filtração", "Manutenção complexa"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Filtros artesanais têm dificuldade para remover vírus devido ao tamanho extremamente pequeno desses patógenos, sendo necessária combinação com outros métodos."
  },
  {
    id: 18,
    question: "O que é o conceito de 'segurança hídrica'?",
    options: ["Proteção contra enchentes", "Acesso confiável à água de qualidade", "Tratamento de esgoto", "Captação de chuva"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Segurança hídrica é a capacidade de uma população de ter acesso sustentável a quantidades adequadas de água de qualidade aceitável."
  },
  {
    id: 19,
    question: "Qual é o impacto ambiental da dessalinização de água do mar?",
    options: ["Baixo consumo energético", "Alto consumo energético e salmoura", "Zero impacto", "Melhora a qualidade do mar"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "A dessalinização consome muita energia e produz salmoura concentrada que pode impactar ecossistemas marinhos se descartada incorretamente."
  },
  {
    id: 20,
    question: "O que é o 'estresse hídrico' de uma região?",
    options: ["Falta total de água", "Relação entre demanda e disponibilidade de água", "Poluição da água", "Custo da água"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Estresse hídrico ocorre quando a demanda por água excede a disponibilidade durante um período determinado ou quando a má qualidade restringe o uso."
  },

  // Additional questions about water conservation and filters
  {
    id: 21,
    question: "Qual é a principal vantagem de usar filtros de barro em relação aos filtros de plástico?",
    options: ["São mais baratos", "Não liberam microplásticos", "Filtram mais rápido", "Não precisam de limpeza"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Filtros de barro são mais sustentáveis pois não liberam microplásticos na água, ao contrário de alguns filtros de plástico."
  },
  {
    id: 22,
    question: "Quantos litros de água são necessários para produzir 1kg de carne bovina?",
    options: ["500 litros", "1.500 litros", "15.000 litros", "50.000 litros"],
    correctAnswer: 2,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "A produção de 1kg de carne bovina consome aproximadamente 15.000 litros de água, incluindo alimentação do gado e processamento."
  },
  {
    id: 23,
    question: "O que é um 'poço artesiano'?",
    options: ["Poço raso", "Poço que jorra água naturalmente", "Poço com bomba", "Poço de reuso"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Poço artesiano é aquele que atinge um aquífero confinado, fazendo a água jorrar naturalmente devido à pressão do lençol freático."
  },
  {
    id: 24,
    question: "Qual é a principal causa da contaminação de aquíferos no Brasil?",
    options: ["Chuva ácida", "Vazamento de esgoto e agrotóxicos", "Aquecimento global", "Dessalinização"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "A contaminação de aquíferos no Brasil é causada principalmente por vazamento de esgoto e infiltração de agrotóxicos no solo."
  },
  {
    id: 25,
    question: "O que é 'água de reuso'?",
    options: ["Água da chuva", "Água tratada para uso não potável", "Água mineral", "Água destilada"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Água de reuso é água que passou por tratamento e pode ser utilizada para fins não potáveis como irrigação, limpeza e descarga sanitária."
  }
];

export const getRandomWaterQuestions = (): Question[] => {
  // Select up to 10 easy, 5 medium, 5 hard questions in order
  const easyQuestions = waterQuizQuestions.filter(q => q.difficulty === 'easy').slice(0, Math.min(10, waterQuizQuestions.filter(q => q.difficulty === 'easy').length));
  const mediumQuestions = waterQuizQuestions.filter(q => q.difficulty === 'medium').slice(0, Math.min(5, waterQuizQuestions.filter(q => q.difficulty === 'medium').length));
  const hardQuestions = waterQuizQuestions.filter(q => q.difficulty === 'hard').slice(0, Math.min(5, waterQuizQuestions.filter(q => q.difficulty === 'hard').length));
  return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
};
