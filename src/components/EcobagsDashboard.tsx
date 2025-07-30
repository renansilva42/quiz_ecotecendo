import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Users, Star, TrendingUp, MessageSquare, Filter } from 'lucide-react';

interface EcobagsResponse {
  id: string;
  respondent_type: string;
  name: string;
  student_class?: string;
  student_grade?: string;
  relationship?: string;
  student_name?: string;
  student_class_parent?: string;
  project_importance: string;
  student_engagement: string;
  ecobags_quality: string;
  family_participation: string;
  ecobags_usage: string;
  plastic_replacement: string;
  project_promotion: string;
  habit_changes: string;
  july_pollution: string;
  pollution_comparison: string;
  trash_types: string[];
  trash_types_other?: string;
  project_impact_belief: string;
  project_experience?: string;
  pollution_observations?: string;
  consciousness_changes?: string;
  improvement_suggestions?: string;
  preservation_testimony?: string;
  project_rating: number;
  project_continuation: string;
  future_participation: string;
  created_at: string;
}

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'];

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
  needs_improvement: 'Precisa melhorar',
  very_satisfactory: 'Muito satisfatória',
  satisfactory: 'Satisfatória',
  little_satisfactory: 'Pouco satisfatória',
  unsatisfactory: 'Insatisfatória',
  always: 'Sempre',
  frequently: 'Frequentemente',
  sometimes: 'Às vezes',
  never: 'Nunca',
  completely: 'Completamente',
  mostly: 'Na maioria das vezes',
  not_replaced: 'Não substituíram',
  significantly: 'Sim, significativamente',
  not_contributed: 'Não contribuiu',
  very_polluted: 'Muito polu��da',
  polluted: 'Poluída',
  little_polluted: 'Pouco poluída',
  clean: 'Limpa',
  much_higher: 'Muito maior',
  higher: 'Maior',
  similar: 'Similar',
  lower: 'Menor',
  yes_definitely: 'Sim, definitivamente',
  yes_improvements: 'Sim, com melhorias',
  maybe: 'Talvez',
  very_interested: 'Muito interesse',
  moderate_interest: 'Interesse moderado',
  little_interest: 'Pouco interesse',
  no_interest: 'Sem interesse'
};

export const EcobagsDashboard: React.FC = () => {
  const [responses, setResponses] = useState<EcobagsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'student' | 'parent'>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [selectedResponse, setSelectedResponse] = useState<EcobagsResponse | null>(null);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('ecobags_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Erro ao buscar respostas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique classes from responses
  const getAvailableClasses = () => {
    const classes = new Set<string>();
    responses.forEach(response => {
      const studentClass = response.student_class || response.student_class_parent;
      if (studentClass && studentClass.trim()) {
        classes.add(studentClass.trim());
      }
    });
    return Array.from(classes).sort();
  };

  const filteredResponses = responses.filter(response => {
    // Filter by respondent type
    const typeMatch = filter === 'all' || response.respondent_type === filter;
    
    // Filter by class
    const responseClass = response.student_class || response.student_class_parent;
    const classMatch = classFilter === 'all' || responseClass === classFilter;
    
    return typeMatch && classMatch;
  });

  const getChartData = (field: keyof EcobagsResponse) => {
    const counts: { [key: string]: number } = {};
    filteredResponses.forEach(response => {
      const value = response[field] as string;
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([key, value]) => ({
      name: LABEL_MAPPINGS[key as keyof typeof LABEL_MAPPINGS] || key,
      value,
      key
    }));
  };

  const getRatingData = () => {
    const ratings: { [key: number]: number } = {};
    filteredResponses.forEach(response => {
      const rating = response.project_rating;
      if (rating) {
        ratings[rating] = (ratings[rating] || 0) + 1;
      }
    });

    return Object.entries(ratings)
      .map(([rating, count]) => ({
        rating: `${rating}`,
        count
      }))
      .sort((a, b) => parseInt(a.rating) - parseInt(b.rating));
  };

  const getTrashTypesData = () => {
    const trashCounts: { [key: string]: number } = {};
    filteredResponses.forEach(response => {
      if (response.trash_types) {
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

    return Object.entries(trashCounts).map(([type, count]) => ({
      name: trashLabels[type as keyof typeof trashLabels] || type,
      value: count
    }));
  };

  const exportToCSV = () => {
    const headers = [
      'Data', 'Tipo', 'Nome', 'Turma', 'Importância do Projeto', 'Engajamento dos Alunos',
      'Qualidade das Ecobags', 'Participação da Família', 'Uso das Ecobags', 'Substituição do Plástico',
      'Promoção do Projeto', 'Mudanças de Hábitos', 'Poluição em Julho', 'Comparação da Poluição',
      'Crença no Impacto', 'Nota do Projeto', 'Continuação do Projeto', 'Participação Futura',
      'Experiência', 'Observações sobre Poluição', 'Mudanças na Consciência', 'Sugestões', 'Depoimento'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredResponses.map(response => [
        new Date(response.created_at).toLocaleDateString('pt-BR'),
        response.respondent_type === 'student' ? 'Aluno' : 'Responsável',
        `"${response.name}"`,
        `"${response.student_class || response.student_class_parent || ''}"`,
        LABEL_MAPPINGS[response.project_importance as keyof typeof LABEL_MAPPINGS] || response.project_importance,
        LABEL_MAPPINGS[response.student_engagement as keyof typeof LABEL_MAPPINGS] || response.student_engagement,
        LABEL_MAPPINGS[response.ecobags_quality as keyof typeof LABEL_MAPPINGS] || response.ecobags_quality,
        LABEL_MAPPINGS[response.family_participation as keyof typeof LABEL_MAPPINGS] || response.family_participation,
        LABEL_MAPPINGS[response.ecobags_usage as keyof typeof LABEL_MAPPINGS] || response.ecobags_usage,
        LABEL_MAPPINGS[response.plastic_replacement as keyof typeof LABEL_MAPPINGS] || response.plastic_replacement,
        LABEL_MAPPINGS[response.project_promotion as keyof typeof LABEL_MAPPINGS] || response.project_promotion,
        LABEL_MAPPINGS[response.habit_changes as keyof typeof LABEL_MAPPINGS] || response.habit_changes,
        LABEL_MAPPINGS[response.july_pollution as keyof typeof LABEL_MAPPINGS] || response.july_pollution,
        LABEL_MAPPINGS[response.pollution_comparison as keyof typeof LABEL_MAPPINGS] || response.pollution_comparison,
        LABEL_MAPPINGS[response.project_impact_belief as keyof typeof LABEL_MAPPINGS] || response.project_impact_belief,
        response.project_rating,
        LABEL_MAPPINGS[response.project_continuation as keyof typeof LABEL_MAPPINGS] || response.project_continuation,
        LABEL_MAPPINGS[response.future_participation as keyof typeof LABEL_MAPPINGS] || response.future_participation,
        `"${response.project_experience || ''}"`,
        `"${response.pollution_observations || ''}"`,
        `"${response.consciousness_changes || ''}"`,
        `"${response.improvement_suggestions || ''}"`,
        `"${response.preservation_testimony || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `respostas_ecobags_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const averageRating = filteredResponses.reduce((sum, response) => sum + (response.project_rating || 0), 0) / filteredResponses.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard - Projeto Ecobags
              </h1>
              <p className="text-gray-600">
                E.E.E.F. Inglês de Souza - Análise das Avaliações
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'student' | 'parent')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">Todos os respondentes</option>
                  <option value="student">Apenas alunos</option>
                  <option value="parent">Apenas responsáveis</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">Todas as turmas</option>
                  {getAvailableClasses().map(className => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total de Respostas</p>
                <p className="text-2xl font-bold text-gray-800">{filteredResponses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Nota Média</p>
                <p className="text-2xl font-bold text-gray-800">
                  {averageRating ? averageRating.toFixed(1) : '0'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Alunos</p>
                <p className="text-2xl font-bold text-gray-800">
                  {responses.filter(r => r.respondent_type === 'student').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Responsáveis</p>
                <p className="text-2xl font-bold text-gray-800">
                  {responses.filter(r => r.respondent_type === 'parent').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Project Importance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Importância do Projeto
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getChartData('project_importance')}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getChartData('project_importance').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Project Rating */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Distribuição das Notas
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getRatingData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student Engagement */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Engajamento dos Alunos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData('student_engagement')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trash Types */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tipos de Lixo Observados
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getTrashTypesData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Responses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Respostas Recentes
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Data</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tipo</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Turma</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nota</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.slice(0, 10).map((response) => (
                  <tr key={response.id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(response.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        response.respondent_type === 'student' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {response.respondent_type === 'student' ? 'Aluno' : 'Responsável'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">{response.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {response.student_class || response.student_class_parent || '-'}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {response.project_rating}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => setSelectedResponse(response)}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Response Detail Modal */}
        {selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Detalhes da Resposta - {selectedResponse.name}
                  </h3>
                  <button
                    onClick={() => setSelectedResponse(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3">Informações Básicas</h4>
                    <div className="space-y-2">
                      <p><strong>Tipo:</strong> {selectedResponse.respondent_type === 'student' ? 'Aluno' : 'Responsável'}</p>
                      <p><strong>Nome:</strong> {selectedResponse.name}</p>
                      <p><strong>Data:</strong> {new Date(selectedResponse.created_at).toLocaleDateString('pt-BR')}</p>
                      {selectedResponse.student_class && (
                        <p><strong>Turma:</strong> {selectedResponse.student_class}</p>
                      )}
                      {selectedResponse.student_class_parent && (
                        <p><strong>Turma do Aluno:</strong> {selectedResponse.student_class_parent}</p>
                      )}
                      {selectedResponse.relationship && (
                        <p><strong>Parentesco:</strong> {selectedResponse.relationship}</p>
                      )}
                      {selectedResponse.student_name && (
                        <p><strong>Nome do Aluno:</strong> {selectedResponse.student_name}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3">Avaliação Geral</h4>
                    <div className="space-y-2">
                      <p><strong>Nota do Projeto:</strong> <span className="text-lg font-bold text-blue-600">{selectedResponse.project_rating}/10</span></p>
                      <p><strong>Continuação do Projeto:</strong> {LABEL_MAPPINGS[selectedResponse.project_continuation as keyof typeof LABEL_MAPPINGS] || selectedResponse.project_continuation}</p>
                      <p><strong>Participação Futura:</strong> {LABEL_MAPPINGS[selectedResponse.future_participation as keyof typeof LABEL_MAPPINGS] || selectedResponse.future_participation}</p>
                    </div>
                  </div>
                </div>

                {/* Avaliação do Projeto */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">Avaliação do Projeto Ecobags</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Importância do Projeto:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.project_importance as keyof typeof LABEL_MAPPINGS] || selectedResponse.project_importance}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Engajamento dos Alunos:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.student_engagement as keyof typeof LABEL_MAPPINGS] || selectedResponse.student_engagement}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Qualidade das Ecobags:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.ecobags_quality as keyof typeof LABEL_MAPPINGS] || selectedResponse.ecobags_quality}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Participação da Família:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.family_participation as keyof typeof LABEL_MAPPINGS] || selectedResponse.family_participation}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Uso das Ecobags:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.ecobags_usage as keyof typeof LABEL_MAPPINGS] || selectedResponse.ecobags_usage}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Substituição do Plástico:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.plastic_replacement as keyof typeof LABEL_MAPPINGS] || selectedResponse.plastic_replacement}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Promoção do Projeto:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.project_promotion as keyof typeof LABEL_MAPPINGS] || selectedResponse.project_promotion}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p><strong>Mudanças de Hábitos:</strong></p>
                      <p className="text-green-700">{LABEL_MAPPINGS[selectedResponse.habit_changes as keyof typeof LABEL_MAPPINGS] || selectedResponse.habit_changes}</p>
                    </div>
                  </div>
                </div>

                {/* Percepção sobre Poluição */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">Percepção sobre Poluição em Mosqueiro</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-3 rounded">
                      <p><strong>Poluição em Julho 2024:</strong></p>
                      <p className="text-red-700">{LABEL_MAPPINGS[selectedResponse.july_pollution as keyof typeof LABEL_MAPPINGS] || selectedResponse.july_pollution}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p><strong>Comparação com Outros Períodos:</strong></p>
                      <p className="text-red-700">{LABEL_MAPPINGS[selectedResponse.pollution_comparison as keyof typeof LABEL_MAPPINGS] || selectedResponse.pollution_comparison}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p><strong>Crença no Impacto do Projeto:</strong></p>
                      <p className="text-red-700">{LABEL_MAPPINGS[selectedResponse.project_impact_belief as keyof typeof LABEL_MAPPINGS] || selectedResponse.project_impact_belief}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p><strong>Tipos de Lixo Observados:</strong></p>
                      <div className="text-red-700">
                        {selectedResponse.trash_types && selectedResponse.trash_types.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {selectedResponse.trash_types.map((type, index) => (
                              <li key={index}>
                                {type === 'plastic_bags' && 'Sacolas plásticas'}
                                {type === 'pet_bottles' && 'Garrafas PET'}
                                {type === 'straws_cups' && 'Canudos e copos'}
                                {type === 'food_waste' && 'Restos de comida'}
                                {type === 'cigarettes' && 'Cigarros'}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>Nenhum tipo específico mencionado</p>
                        )}
                        {selectedResponse.trash_types_other && (
                          <p className="mt-1"><strong>Outros:</strong> {selectedResponse.trash_types_other}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Depoimentos e Reflexões */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">Depoimentos e Reflexões</h4>
                  
                  {selectedResponse.project_experience && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-700 mb-2">Experiência com o Projeto</h5>
                      <p className="text-gray-700">{selectedResponse.project_experience}</p>
                    </div>
                  )}
                  
                  {selectedResponse.pollution_observations && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-700 mb-2">Observações sobre Poluição</h5>
                      <p className="text-gray-700">{selectedResponse.pollution_observations}</p>
                    </div>
                  )}
                  
                  {selectedResponse.consciousness_changes && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-700 mb-2">Mudanças na Consciência Ambiental</h5>
                      <p className="text-gray-700">{selectedResponse.consciousness_changes}</p>
                    </div>
                  )}
                  
                  {selectedResponse.improvement_suggestions && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-700 mb-2">Sugestões de Melhoria</h5>
                      <p className="text-gray-700">{selectedResponse.improvement_suggestions}</p>
                    </div>
                  )}
                  
                  {selectedResponse.preservation_testimony && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-700 mb-2">Depoimento sobre Preservação Ambiental</h5>
                      <p className="text-gray-700">{selectedResponse.preservation_testimony}</p>
                    </div>
                  )}
                </div>

                {/* Botão de Fechar */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setSelectedResponse(null)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};