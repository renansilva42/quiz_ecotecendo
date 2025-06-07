import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users, RotateCcw, Home, Instagram, Crown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { RankingEntry } from '../types';

interface RankingProps {
  onPlayAgain: () => void;
  onBackToWelcome: () => void;
}

export const Ranking: React.FC<RankingProps> = ({ onPlayAgain, onBackToWelcome }) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('score', { ascending: false })
        .order('total_time', { ascending: true })
        .limit(50);

      if (error) {
        throw error;
      }

      setRankings(data || []);
    } catch (err) {
      console.error('Erro ao buscar ranking:', err);
      setError('Erro ao carregar o ranking. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{position}</div>;
    }
  };

  const getRankColor = (position: number) => {
    if (position >= 1 && position <= 5) {
      return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300';
    }
    return 'bg-white border-gray-200';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ranking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRankings}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Ranking</h1>
          <h2 className="text-2xl text-gray-700 mb-4">Quiz Ecotecendo Mosqueiro</h2>
          <p className="text-gray-600">Os 5 melhores colocados ganham ecobags exclusivas!</p>
        </div>

        {/* Prize Alert */}
          {rankings.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <Trophy className="w-6 h-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-bold text-yellow-800">🎁 Ecobags Exclusivas!</h3>
                <p className="text-yellow-700 text-sm">
                  Os 5 primeiros colocados receberão ecobags exclusivas do projeto Ecotecendo Mosqueiro.
                  Entraremos em contato pelo Instagram!
                </p>
              </div>
            </div>
          </div>
        )}


        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Siga nosso Instagram!</h3>
            <p className="text-gray-600 mb-4">
              Acompanhe as novidades do projeto e veja quando os ganhadores serão anunciados.
            </p>
            <a 
              href="https://instagram.com/inglesdesouza.escola" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @inglesdesouza.escola
            </a>
          </div>
        </div>

        {/* Ranking List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-center">
              <Users className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">Classificação Geral</h3>
            </div>
          </div>

          <div className="p-4">
            {rankings.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum participante ainda.</p>
                <p className="text-gray-400 text-sm">Seja o primeiro a jogar!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rankings.map((entry, index) => {
                  const position = index + 1;
                  const isWinner = position <= 5;
                  
                  return (
                    <div
                      key={entry.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${getRankColor(position)} ${
                        isWinner ? 'shadow-md' : 'hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                            {getRankIcon(position)}
                          </div>
                          
                          <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-800">{entry.user_name}</h4>
                          </div>
                  <p className={`text-sm ${position >= 1 && position <= 5 ? 'text-yellow-600' : 'text-gray-600'}`}>
                    {position}º • @{entry.user_instagram}
                  </p>
                        </div>
                      </div>


                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">
                            {entry.score.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.correct_answers}/20 • {formatTime(entry.total_time)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Jogar Novamente
          </button>
          
          <button
            onClick={onBackToWelcome}
            className="flex-1 bg-white text-gray-700 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
          >
            <Home className="w-6 h-6 mr-2" />
            Início
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Quiz Ecotecendo Mosqueiro • Projeto de Sustentabilidade<br />
            Construindo juntos um futuro mais verde! 🌱
          </p>
        </div>
      </div>
    </div>
  );
};
