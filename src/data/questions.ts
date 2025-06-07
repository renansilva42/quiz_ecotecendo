import { Question } from '../types';

export const questions: Question[] = [
  // Easy questions (1-7)
  {
    id: 1,
    question: "Qual é a principal fonte de energia renovável utilizando a força do vento?",
    options: ["Energia solar", "Energia eólica", "Energia nuclear", "Energia hidrelétrica"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "A energia eólica utiliza a força dos ventos para gerar eletricidade de forma limpa e renovável."
  },
  {
    id: 2,
    question: "O que significa a sigla 'ODS' no contexto ambiental?",
    options: ["Organização de Desenvolvimento Social", "Objetivos de Desenvolvimento Sustentável", "Ordem de Defesa Social", "Órgão de Desenvolvimento Sanitário"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Os ODS são 17 objetivos estabelecidos pela ONU para promover o desenvolvimento sustentável até 2030."
  },
  {
    id: 3,
    question: "Qual material demora aproximadamente 450 anos para se degradar na natureza?",
    options: ["Papel", "Vidro", "Plástico", "Alumínio"],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "O plástico pode levar entre 100 a 450 anos para se degradar completamente no meio ambiente."
  },
  {
    id: 4,
    question: "Qual é o processo de transformação de resíduos em novos produtos?",
    options: ["Reutilização", "Reciclagem", "Redução", "Renovação"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "A reciclagem é o processo de transformar materiais usados em novos produtos, reduzindo o desperdício."
  },
  {
    id: 5,
    question: "Qual cor de lixeira é destinada ao vidro na coleta seletiva?",
    options: ["Azul", "Vermelho", "Verde", "Amarelo"],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Na coleta seletiva, a lixeira verde é destinada especificamente para o descarte de vidros."
  },
  {
    id: 6,
    question: "O que é compostagem?",
    options: ["Queima de lixo", "Decomposição de matéria orgânica", "Fabricação de plástico", "Purificação da água"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "A compostagem é o processo natural de decomposição de matéria orgânica que gera adubo."
  },
  {
    id: 7,
    question: "Qual é a importância das árvores para o meio ambiente?",
    options: ["Apenas produzem sombra", "Produzem oxigênio e absorvem CO2", "Servem apenas para madeira", "Não têm importância"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "As árvores são fundamentais pois produzem oxigênio, absorvem CO2 e ajudam a purificar o ar."
  },

  // Medium questions (8-14)
  {
    id: 8,
    question: "Qual é o principal gás responsável pelo efeito estufa?",
    options: ["Oxigênio", "Nitrogênio", "Dióxido de carbono", "Hidrogênio"],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "O CO2 é o principal gás do efeito estufa, representando cerca de 76% das emissões globais."
  },
  {
    id: 9,
    question: "O que são microplásticos?",
    options: ["Plásticos biodegradáveis", "Fragmentos de plástico menores que 5mm", "Plásticos recicláveis", "Embalagens pequenas"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Microplásticos são fragmentos de plástico menores que 5mm que contaminam oceanos e alimentos."
  },
  {
    id: 10,
    question: "Qual bioma brasileiro possui a maior biodiversidade do planeta?",
    options: ["Cerrado", "Caatinga", "Amazônia", "Mata Atlântica"],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "A Amazônia é considerada o bioma com maior biodiversidade do mundo, abrigando milhões de espécies."
  },
  {
    id: 11,
    question: "O que é pegada ecológica?",
    options: ["Marca deixada na natureza", "Medida do impacto ambiental", "Tipo de calçado sustentável", "Trilha ecológica"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "A pegada ecológica mede o impacto das atividades humanas sobre os recursos naturais do planeta."
  },
  {
    id: 12,
    question: "Qual é o principal objetivo da economia circular?",
    options: ["Aumentar o consumo", "Eliminar desperdícios", "Produzir mais plástico", "Reduzir empregos"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "A economia circular visa eliminar desperdícios mantendo produtos e materiais em uso pelo maior tempo possível."
  },
  {
    id: 13,
    question: "O que são espécies endêmicas?",
    options: ["Espécies extintas", "Espécies invasoras", "Espécies nativas de uma região específica", "Espécies domesticadas"],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Espécies endêmicas são aquelas que ocorrem naturalmente apenas em uma determinada região geográfica."
  },
  {
    id: 14,
    question: "Qual é a principal causa do desmatamento na Amazônia?",
    options: ["Incêndios naturais", "Pecuária e agricultura", "Urbanização", "Mineração"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "A pecuária e agricultura são responsáveis por cerca de 80% do desmatamento na Amazônia."
  },

  // Hard questions (15-20)
  {
    id: 15,
    question: "Qual é o protocolo internacional mais importante para o combate às mudanças climáticas?",
    options: ["Protocolo de Kyoto", "Acordo de Paris", "Convenção de Viena", "Tratado de Montreal"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "O Acordo de Paris (2015) é o principal acordo global para limitar o aquecimento a 1,5°C."
  },
  {
    id: 16,
    question: "O que é eutrofização?",
    options: ["Purificação da água", "Excesso de nutrientes na água", "Escassez hídrica", "Poluição do ar"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Eutrofização é o enriquecimento excessivo de nutrientes na água, causando proliferação de algas."
  },
  {
    id: 17,
    question: "Qual é o conceito de 'Antropoceno'?",
    options: ["Era dos dinossauros", "Era geológica atual dominada pelos humanos", "Período glacial", "Era dos mamíferos"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Antropoceno é a proposta de nova época geológica caracterizada pelo impacto humano no planeta."
  },
  {
    id: 18,
    question: "O que são serviços ecossistêmicos?",
    options: ["Empresas de limpeza", "Benefícios que os ecossistemas fornecem", "Turismo ecológico", "ONGs ambientais"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Serviços ecossistêmicos são os benefícios que os ecossistemas fornecem, como purificação do ar e água."
  },
  {
    id: 19,
    question: "Qual é o principal objetivo da COP (Conferência das Partes)?",
    options: ["Comércio internacional", "Mudanças climáticas", "Desenvolvimento tecnológico", "Políticas econômicas"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "A COP é a conferência da ONU sobre mudanças climáticas, onde países negociam ações climáticas globais."
  },
  {
    id: 20,
    question: "O que é bioeconomia?",
    options: ["Economia baseada em recursos biológicos", "Comércio de animais", "Agricultura tradicional", "Pesca comercial"],
    correctAnswer: 0,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Bioeconomia é um modelo econômico baseado no uso sustentável de recursos biológicos renováveis."
  },

  // Additional questions to ensure variety
  {
    id: 21,
    question: "Qual é o conceito dos 3 R's da sustentabilidade?",
    options: ["Reciclar, Reutilizar, Reduzir", "Reduzir, Reutilizar, Reciclar", "Renovar, Reciclar, Reutilizar", "Reduzir, Renovar, Reciclar"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "Os 3 R's são: Reduzir o consumo, Reutilizar produtos e Reciclar materiais, nesta ordem de prioridade."
  },
  {
    id: 22,
    question: "Qual é a importância dos manguezais para o ecossistema costeiro?",
    options: ["Apenas produzem pescado", "Protegem a costa e são berçário marinho", "Servem para turismo", "Não têm importância"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "Os manguezais protegem a costa da erosão e servem como berçário para muitas espécies marinhas."
  },
  {
    id: 23,
    question: "O que são corredores ecológicos?",
    options: ["Trilhas para turismo", "Conexões entre áreas protegidas", "Rodovias ambientais", "Parques urbanos"],
    correctAnswer: 1,
    difficulty: 'hard',
    timeLimit: 20,
    explanation: "Corredores ecológicos conectam áreas protegidas, permitindo o fluxo de espécies entre habitats."
  },
  {
    id: 24,
    question: "Qual é o principal poluente dos oceanos atualmente?",
    options: ["Petróleo", "Plástico", "Esgoto", "Agrotóxicos"],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 25,
    explanation: "O plástico é atualmente o principal poluente dos oceanos, formando verdadeiras ilhas de lixo."
  },
  {
    id: 25,
    question: "O que é aquecimento global?",
    options: ["Aumento natural da temperatura", "Aumento da temperatura devido a atividades humanas", "Fenômeno sazonal", "Variação climática local"],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 30,
    explanation: "O aquecimento global é o aumento da temperatura média da Terra devido principalmente às atividades humanas."
  }
];

export const getRandomQuestions = (): Question[] => {
  // Select 10 easy, 5 medium, 5 hard questions in order
  const easyQuestions = questions.filter(q => q.difficulty === 'easy').slice(0, 10);
  const mediumQuestions = questions.filter(q => q.difficulty === 'medium').slice(0, 5);
  const hardQuestions = questions.filter(q => q.difficulty === 'hard').slice(0, 5);
  return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
};
