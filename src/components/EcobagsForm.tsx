import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, Leaf, Users, MessageSquare, Star, Send } from 'lucide-react';

interface FormData {
  // Identificação
  respondent_type: 'student' | 'parent' | '';
  name: string;
  
  // Dados do aluno
  student_level: string;
  student_class: string;
  
  // Dados do responsável
  relationship: string;
  relationship_other: string;
  student_name: string;
  student_level_parent: string;
  student_class_parent: string;
  
  // Avaliação do projeto
  project_importance: string;
  student_engagement: string;
  ecobags_quality: string;
  family_participation: string;
  ecobags_usage: string;
  plastic_replacement: string;
  project_promotion: string;
  habit_changes: string;
  
  // Percepção sobre poluição
  july_pollution: string;
  pollution_comparison: string;
  trash_types: string[];
  trash_types_other: string;
  project_impact_belief: string;
  
  // Depoimentos
  project_experience: string;
  pollution_observations: string;
  consciousness_changes: string;
  improvement_suggestions: string;
  preservation_testimony: string;
  
  // Avaliação geral
  project_rating: number;
  project_continuation: string;
  future_participation: string;
}

export const EcobagsForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    respondent_type: '',
    name: '',
    student_level: '',
    student_class: '',
    relationship: '',
    relationship_other: '',
    student_name: '',
    student_level_parent: '',
    student_class_parent: '',
    project_importance: '',
    student_engagement: '',
    ecobags_quality: '',
    family_participation: '',
    ecobags_usage: '',
    plastic_replacement: '',
    project_promotion: '',
    habit_changes: '',
    july_pollution: '',
    pollution_comparison: '',
    trash_types: [],
    trash_types_other: '',
    project_impact_belief: '',
    project_experience: '',
    pollution_observations: '',
    consciousness_changes: '',
    improvement_suggestions: '',
    preservation_testimony: '',
    project_rating: 0,
    project_continuation: '',
    future_participation: ''
  });

  const totalSteps = 5;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset class when level changes
      if (field === 'student_level') {
        newData.student_class = '';
      }
      if (field === 'student_level_parent') {
        newData.student_class_parent = '';
      }
      
      return newData;
    });
  };

  const getClassOptions = (level: string) => {
    if (level === 'Ensino Fundamental Anos Iniciais') {
      return [
        { value: '3º Ano', label: '3º Ano' },
        { value: '4º Ano', label: '4º Ano' },
        { value: '5º Ano', label: '5º Ano' }
      ];
    } else if (level === 'Ensino Fundamental Anos Finais') {
      return [
        { value: '6º ano Manhã', label: '6º ano Manhã' },
        { value: '6º ano Tarde', label: '6º ano Tarde' },
        { value: '7º ano Manhã', label: '7º ano Manhã' },
        { value: '7º ano Tarde', label: '7º ano Tarde' },
        { value: '8º ano Manhã', label: '8º ano Manhã' },
        { value: '8º ano Tarde', label: '8º ano Tarde' },
        { value: '901', label: '901' },
        { value: '902', label: '902' }
      ];
    }
    return [];
  };

  const handleTrashTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      trash_types: checked 
        ? [...prev.trash_types, type]
        : prev.trash_types.filter(t => t !== type)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('ecobags_responses')
        .insert([{
          respondent_type: formData.respondent_type,
          name: formData.name,
          student_level: formData.respondent_type === 'student' ? formData.student_level : null,
          student_class: formData.respondent_type === 'student' ? formData.student_class : null,
          relationship: formData.respondent_type === 'parent' ? formData.relationship : null,
          relationship_other: formData.respondent_type === 'parent' && formData.relationship === 'other' ? formData.relationship_other : null,
          student_name: formData.respondent_type === 'parent' ? formData.student_name : null,
          student_level_parent: formData.respondent_type === 'parent' ? formData.student_level_parent : null,
          student_class_parent: formData.respondent_type === 'parent' ? formData.student_class_parent : null,
          project_importance: formData.project_importance,
          student_engagement: formData.student_engagement,
          ecobags_quality: formData.ecobags_quality,
          family_participation: formData.family_participation,
          ecobags_usage: formData.ecobags_usage,
          plastic_replacement: formData.plastic_replacement,
          project_promotion: formData.project_promotion,
          habit_changes: formData.habit_changes,
          july_pollution: formData.july_pollution,
          pollution_comparison: formData.pollution_comparison,
          trash_types: formData.trash_types,
          trash_types_other: formData.trash_types_other,
          project_impact_belief: formData.project_impact_belief,
          project_experience: formData.project_experience,
          pollution_observations: formData.pollution_observations,
          consciousness_changes: formData.consciousness_changes,
          improvement_suggestions: formData.improvement_suggestions,
          preservation_testimony: formData.preservation_testimony,
          project_rating: formData.project_rating,
          project_continuation: formData.project_continuation,
          future_participation: formData.future_participation
        }]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.respondent_type && formData.name;
      case 2:
        if (formData.respondent_type === 'student') {
          return formData.student_level && formData.student_class;
        } else {
          return formData.relationship && formData.student_name && formData.student_level_parent && formData.student_class_parent;
        }
      case 3:
        return formData.project_importance && formData.student_engagement && 
               formData.ecobags_quality && formData.family_participation;
      case 4:
        return formData.july_pollution && formData.pollution_comparison && 
               formData.project_impact_belief;
      case 5:
        return formData.project_rating > 0 && formData.project_continuation && 
               formData.future_participation;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Obrigado pela sua participação!
          </h2>
          <p className="text-gray-600 mb-6">
            Sua avaliação foi enviada com sucesso e é muito importante para o aprimoramento 
            do Projeto Ecobags da E.E.E.F. Ingles de Souza.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enviar Nova Resposta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Formulário de Avaliação
            </h1>
            <h2 className="text-xl text-green-600 font-semibold mb-2">
              Projeto Ecobags - E.E.E.F. Ingles de Souza
            </h2>
            <p className="text-gray-600">
              Educação Ambiental em Mosqueiro
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progresso</span>
              <span className="text-sm text-gray-600">{currentStep} de {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Step 1: Identificação */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Identificação do Respondente</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Você é: *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="respondent_type"
                      value="student"
                      checked={formData.respondent_type === 'student'}
                      onChange={(e) => handleInputChange('respondent_type', e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    Aluno(a) da escola
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="respondent_type"
                      value="parent"
                      checked={formData.respondent_type === 'parent'}
                      onChange={(e) => handleInputChange('respondent_type', e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    Pai/Mãe/Responsável
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo: *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Digite seu nome completo"
                />
              </div>
            </div>
          )}

          {/* Step 2: Dados específicos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {formData.respondent_type === 'student' ? 'Dados do Aluno' : 'Dados do Responsável'}
                </h3>
              </div>

              {formData.respondent_type === 'student' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível: *
                    </label>
                    <select
                      value={formData.student_level}
                      onChange={(e) => handleInputChange('student_level', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Selecione o nível</option>
                      <option value="Ensino Fundamental Anos Iniciais">Ensino Fundamental Anos Iniciais</option>
                      <option value="Ensino Fundamental Anos Finais">Ensino Fundamental Anos Finais</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Turma do(a) aluno(a): *
                    </label>
                    <select
                      value={formData.student_class}
                      onChange={(e) => handleInputChange('student_class', e.target.value)}
                      disabled={!formData.student_level}
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        !formData.student_level ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">
                        {formData.student_level ? 'Selecione a turma' : 'Primeiro selecione o nível'}
                      </option>
                      {getClassOptions(formData.student_level).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Grau de parentesco com o(a) aluno(a): *
                    </label>
                    <div className="space-y-2">
                      {['father', 'mother', 'grandfather', 'uncle', 'legal_guardian', 'other'].map((rel) => (
                        <label key={rel} className="flex items-center">
                          <input
                            type="radio"
                            name="relationship"
                            value={rel}
                            checked={formData.relationship === rel}
                            onChange={(e) => handleInputChange('relationship', e.target.value)}
                            className="mr-3 text-green-600"
                          />
                          {rel === 'father' && 'Pai'}
                          {rel === 'mother' && 'Mãe'}
                          {rel === 'grandfather' && 'Avô/Avó'}
                          {rel === 'uncle' && 'Tio/Tia'}
                          {rel === 'legal_guardian' && 'Responsável legal'}
                          {rel === 'other' && 'Outro'}
                        </label>
                      ))}
                    </div>
                    {formData.relationship === 'other' && (
                      <input
                        type="text"
                        value={formData.relationship_other}
                        onChange={(e) => handleInputChange('relationship_other', e.target.value)}
                        className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Especifique o parentesco"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do(a) aluno(a): *
                    </label>
                    <input
                      type="text"
                      value={formData.student_name}
                      onChange={(e) => handleInputChange('student_name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Nome completo do aluno"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível: *
                    </label>
                    <select
                      value={formData.student_level_parent}
                      onChange={(e) => handleInputChange('student_level_parent', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Selecione o nível</option>
                      <option value="Ensino Fundamental Anos Iniciais">Ensino Fundamental Anos Iniciais</option>
                      <option value="Ensino Fundamental Anos Finais">Ensino Fundamental Anos Finais</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Turma do(a) aluno(a): *
                    </label>
                    <select
                      value={formData.student_class_parent}
                      onChange={(e) => handleInputChange('student_class_parent', e.target.value)}
                      disabled={!formData.student_level_parent}
                      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        !formData.student_level_parent ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">
                        {formData.student_level_parent ? 'Selecione a turma' : 'Primeiro selecione o nível'}
                      </option>
                      {getClassOptions(formData.student_level_parent).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Avaliação do Projeto */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Leaf className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Avaliação do Projeto Ecobags</h3>
              </div>

              {[
                {
                  field: 'project_importance',
                  question: 'Como você avalia a importância do Projeto Ecobags para a conscientização ambiental?',
                  options: [
                    { value: 'very_important', label: 'Muito importante' },
                    { value: 'important', label: 'Importante' },
                    { value: 'little_important', label: 'Pouco importante' },
                    { value: 'not_important', label: 'Sem importância' }
                  ]
                },
                {
                  field: 'student_engagement',
                  question: 'O projeto conseguiu despertar interesse e engajamento dos alunos?',
                  options: [
                    { value: 'very_much', label: 'Sim, muito' },
                    { value: 'moderately', label: 'Sim, moderadamente' },
                    { value: 'little', label: 'Pouco' },
                    { value: 'no', label: 'Não' }
                  ]
                },
                {
                  field: 'ecobags_quality',
                  question: 'Como você avalia a qualidade das ecobags produzidas pelos alunos?',
                  options: [
                    { value: 'excellent', label: 'Excelente' },
                    { value: 'good', label: 'Boa' },
                    { value: 'regular', label: 'Regular' },
                    { value: 'needs_improvement', label: 'Precisa melhorar' }
                  ]
                },
                {
                  field: 'family_participation',
                  question: 'A participação da família no projeto foi:',
                  options: [
                    { value: 'very_satisfactory', label: 'Muito satisfatória' },
                    { value: 'satisfactory', label: 'Satisfatória' },
                    { value: 'little_satisfactory', label: 'Pouco satisfatória' },
                    { value: 'unsatisfactory', label: 'Insatisfatória' }
                  ]
                }
              ].map((item, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {item.question} *
                  </label>
                  <div className="space-y-2">
                    {item.options.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name={item.field}
                          value={option.value}
                          checked={formData[item.field as keyof FormData] === option.value}
                          onChange={(e) => handleInputChange(item.field as keyof FormData, e.target.value)}
                          className="mr-3 text-green-600"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Percepção sobre Poluição */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Percepção sobre Poluição em Mosqueiro</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Durante o mês de julho de 2024, como você percebeu a situação da poluição nas praias de Mosqueiro? *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'very_polluted', label: 'Muito poluída' },
                    { value: 'polluted', label: 'Poluída' },
                    { value: 'little_polluted', label: 'Pouco poluída' },
                    { value: 'clean', label: 'Limpa' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="july_pollution"
                        value={option.value}
                        checked={formData.july_pollution === option.value}
                        onChange={(e) => handleInputChange('july_pollution', e.target.value)}
                        className="mr-3 text-green-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Comparando julho com outros períodos do ano, a poluição nas praias durante as férias é: *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'much_higher', label: 'Muito maior' },
                    { value: 'higher', label: 'Maior' },
                    { value: 'similar', label: 'Similar' },
                    { value: 'lower', label: 'Menor' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="pollution_comparison"
                        value={option.value}
                        checked={formData.pollution_comparison === option.value}
                        onChange={(e) => handleInputChange('pollution_comparison', e.target.value)}
                        className="mr-3 text-green-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Que tipos de lixo você mais observa nas praias de Mosqueiro? (Pode marcar mais de uma opção)
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'plastic_bags', label: 'Sacolas plásticas' },
                    { value: 'pet_bottles', label: 'Garrafas PET' },
                    { value: 'straws_cups', label: 'Canudos e copos plásticos' },
                    { value: 'food_waste', label: 'Restos de comida' },
                    { value: 'cigarettes', label: 'Cigarros' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.trash_types.includes(option.value)}
                        onChange={(e) => handleTrashTypeChange(option.value, e.target.checked)}
                        className="mr-3 text-green-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.trash_types_other}
                  onChange={(e) => handleInputChange('trash_types_other', e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Outros tipos de lixo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Você acredita que projetos como o das Ecobags podem ajudar a reduzir a poluição em Mosqueiro? *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'very_much', label: 'Sim, muito' },
                    { value: 'moderately', label: 'Sim, moderadamente' },
                    { value: 'little', label: 'Pouco' },
                    { value: 'no', label: 'Não' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="project_impact_belief"
                        value={option.value}
                        checked={formData.project_impact_belief === option.value}
                        onChange={(e) => handleInputChange('project_impact_belief', e.target.value)}
                        className="mr-3 text-green-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Depoimentos */}
              <div className="space-y-4 pt-6 border-t">
                <h4 className="text-lg font-semibold text-gray-800">Depoimentos e Reflexões</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conte-nos sobre sua experiência com o Projeto Ecobags. O que mais chamou sua atenção?
                  </label>
                  <textarea
                    value={formData.project_experience}
                    onChange={(e) => handleInputChange('project_experience', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Compartilhe sua experiência..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descreva suas observações sobre a poluição nas praias de Mosqueiro durante julho e outros períodos. Como isso afeta você e sua família?
                  </label>
                  <textarea
                    value={formData.pollution_observations}
                    onChange={(e) => handleInputChange('pollution_observations', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Suas observações sobre a poluição..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Avaliação Geral */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Avaliação Geral</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  De 0 a 10, que nota você daria para o Projeto Ecobags? *
                </label>
                <div className="flex space-x-2">
                  {[...Array(11)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleInputChange('project_rating', i)}
                      className={`w-10 h-10 rounded-lg border-2 font-semibold transition-colors ${
                        formData.project_rating === i
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Você recomendaria que o projeto continuasse nos próximos anos? *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'yes_definitely', label: 'Sim, definitivamente' },
                    { value: 'yes_improvements', label: 'Sim, com algumas melhorias' },
                    { value: 'maybe', label: 'Talvez' },
                    { value: 'no', label: 'Não' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="project_continuation"
                        value={option.value}
                        checked={formData.project_continuation === option.value}
                        onChange={(e) => handleInputChange('project_continuation', e.target.value)}
                        className="mr-3 text-green-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gostaria de participar de outros projetos ambientais da escola? *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'very_interested', label: 'Sim, muito interesse' },
                    { value: 'moderate_interest', label: 'Sim, interesse moderado' },
                    { value: 'little_interest', label: 'Pouco interesse' },
                    { value: 'no_interest', label: 'Não tenho interesse' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="future_participation"
                        value={option.value}
                        checked={formData.future_participation === option.value}
                        onChange={(e) => handleInputChange('future_participation', e.target.value)}
                        className="mr-3 text-green-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Depoimentos finais */}
              <div className="space-y-4 pt-6 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Que mudanças você percebeu em sua consciência ambiental após participar ou acompanhar o Projeto Ecobags?
                  </label>
                  <textarea
                    value={formData.consciousness_changes}
                    onChange={(e) => handleInputChange('consciousness_changes', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Mudanças na consciência ambiental..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Você tem alguma sugestão para melhorar o projeto ou expandir as ações de educação ambiental na escola?
                  </label>
                  <textarea
                    value={formData.improvement_suggestions}
                    onChange={(e) => handleInputChange('improvement_suggestions', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Suas sugestões..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deixe aqui seu depoimento sobre a importância da preservação ambiental em Mosqueiro:
                  </label>
                  <textarea
                    value={formData.preservation_testimony}
                    onChange={(e) => handleInputChange('preservation_testimony', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Seu depoimento sobre preservação ambiental..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Anterior
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  canProceed() && !isSubmitting
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Avaliação
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>
            Agradecemos sua participação na avaliação do Projeto Ecobags da E.E.E.F. Ingles de Souza.
          </p>
          <p>
            Suas respostas são fundamentais para o aprimoramento de nossas ações de educação ambiental em Mosqueiro.
          </p>
        </div>
      </div>
    </div>
  );
};