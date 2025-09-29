import React, { useState, useEffect } from 'react';
import { Trophy, Droplets, Clock, Users, RotateCcw, Home, Award, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WaterQuizResult {
  user_name: string;
  user_email: string;
  user_instagram: string;
  score: number;
  correct_answers: number;
  total_time: number;
  water_saved: number;
  filter_knowledge: number;
  created_at: string;
}

interface WaterQuizRankingProps {
  onPlayAgain: () => void;
  onBackToWelcome: () => void;
}

export const WaterQuizRanking: React.FC<WaterQuizRankingProps> = ({ onPlayAgain, onBackToWelcome }) => {
  const [results, setResults] = useState<WaterQuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('water_quiz_results')
        .select('*')
        .order('score', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching results:', error);
        setError('Erro ao carregar ranking');
        return;
      }

      setResults(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erro inesperado ao carregar ranking');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold text-lg">
          {index + 1}
        </span>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 1:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 2:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando ranking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchResults}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-cyan-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Ranking - Quiz das Águas
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Os maiores conhecedores sobre conservação de água e sustentabilidade
          </p>

          {/* Estatísticas gerais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-cyan-600 mr-2" />
                <span className="text-2xl font-bold text-gray-800">{results.length}</span>
              </div>
              <p className="text-sm text-gray-600">Participantes</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-800">
                  {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.water_saved, 0) / results.length) : 0}
                </span>
              </div>
              <p className="text-sm text-gray-600">L água economizada (média)</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-gray-800">
                  {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.total_time, 0) / results.length) : 0}s
                </span>
              </div>
              <p className="text-sm text-gray-600">Tempo médio</p>
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              🏆 Top Conhecedores de Água
            </h2>
          </div>
          
          <div className="p-6">
            {results.length === 0 ? (
              <div className="text-center py-12">
                <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum resultado ainda</p>
                <p className="text-gray-400">Seja o primeiro a participar do quiz!</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {results.map((result, index) => (
                  <div
                    key={`${result.user_email}-${result.created_at}`}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${getRankColor(index)}`}
                  >
                    <div className="w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="flex-shrink-0">
                            {getRankIcon(index)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                {result.user_name}
                              </h3>
                              {index < 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800">
                                  #{index + 1}
                                </span>
                              )}
                            </div>
                            
                            {result.user_instagram && (
                              <p className="text-xs sm:text-sm text-gray-600 truncate">
                                @{result.user_instagram.replace('@', '')}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Informações do usuário - Layout responsivo */}
                        <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-6 gap-2 sm:gap-6 text-sm">
                          <div className="text-center bg-yellow-50 rounded-lg p-1.5 sm:bg-transparent sm:p-0">
                            <div className="flex items-center justify-center text-cyan-600 font-bold text-sm sm:text-lg">
                              <Droplets className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {result.water_saved}L
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm">Água economizada</p>
                          </div>
                          
                          <div className="text-center bg-yellow-50 rounded-lg p-1.5 sm:bg-transparent sm:p-0">
                            <div className="text-blue-600 font-bold text-sm sm:text-lg">
                              {result.score}%
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm">Pontuação</p>
                          </div>
                          
                          <div className="text-center bg-yellow-50 rounded-lg p-1.5 sm:bg-transparent sm:p-0">
                            <div className="text-purple-600 font-bold text-sm sm:text-lg">
                              {result.correct_answers}/20
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm">Acertos</p>
                          </div>
                          
                          <div className="text-center bg-yellow-50 rounded-lg p-1.5 sm:bg-transparent sm:p-0">
                            <div className="text-gray-600 font-bold text-sm sm:text-lg">
                              {formatTime(result.total_time)}
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm">Tempo</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Barra de progresso da pontuação */}
                      <div className="mt-3 w-full">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(result.score, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </button>
          
          <button
            onClick={onBackToWelcome}
            className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-200 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </button>
        </div>

        {/* Informações sobre o ranking */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            💧 Como funciona o ranking?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Critérios de pontuação:</h4>
              <ul className="space-y-1">
                <li>• <strong>Pontuação:</strong> Baseada em acertos e tempo</li>
                <li>• <strong>Água economizada:</strong> Calculada pelo conhecimento</li>
                <li>• <strong>Filtros:</strong> Conhecimento sobre filtros artesanais</li>
                <li>• <strong>Tempo:</strong> Velocidade nas respostas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Recompensas:</h4>
              <ul className="space-y-1">
                <li>• <strong>🥇 1º lugar:</strong> Maior conhecimento sobre água</li>
                <li>• <strong>🥈 2º lugar:</strong> Excelente consciência ambiental</li>
                <li>• <strong>🥉 3º lugar:</strong> Bom conhecimento sustentável</li>
                <li>• <strong>🏆 Todos:</strong> Contribuem para um futuro melhor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
