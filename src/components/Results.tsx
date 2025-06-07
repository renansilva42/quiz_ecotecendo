import React from 'react';
import { Trophy, Clock, Target, Users, Instagram, RotateCcw } from 'lucide-react';
import { GameResult } from '../types';

interface ResultsProps {
  result: GameResult;
  onViewRanking: () => void;
  onPlayAgain: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onViewRanking, onPlayAgain }) => {
  const accuracy = Math.round((result.correctAnswers / 20) * 100);
  const averageTime = Math.round(result.totalTime / 20);

  const getPerformanceLevel = () => {
    if (result.score >= 3000) return { level: 'Excelente!', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (result.score >= 2000) return { level: 'Muito Bom!', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (result.score >= 1000) return { level: 'Bom!', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Continue Tentando!', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Parabéns, {result.userName}!</h1>
          <p className="text-gray-600">Você completou o Quiz Ecotecendo Mosqueiro!</p>
        </div>

        {/* Performance Badge */}
        <div className="text-center mb-8">
          <div className={`inline-block px-6 py-3 rounded-full ${performance.bgColor} ${performance.color} text-xl font-bold`}>
            {performance.level}
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-800 mb-2">{result.score.toLocaleString()}</div>
            <div className="text-gray-600">Pontos Totais</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <Target className="w-6 h-6 text-green-600 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{result.correctAnswers}/20</div>
              <div className="text-sm text-gray-600">Acertos</div>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-lg mb-2">
                <Target className="w-6 h-6 text-blue-600 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{accuracy}%</div>
              <div className="text-sm text-gray-600">Precisão</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-lg mb-2">
                <Clock className="w-6 h-6 text-purple-600 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{Math.floor(result.totalTime / 60)}:{(result.totalTime % 60).toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-600">Tempo Total</div>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 p-3 rounded-lg mb-2">
                <Clock className="w-6 h-6 text-orange-600 mx-auto" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{averageTime}s</div>
              <div className="text-sm text-gray-600">Média/Pergunta</div>
            </div>
          </div>
        </div>

        {/* Prize Info */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="font-bold text-yellow-800">🎁 Prêmios Disponíveis!</h3>
              <p className="text-yellow-700 text-sm">Os 5 melhores colocados ganham ecobags exclusivas do projeto Ecotecendo Mosqueiro!</p>
            </div>
          </div>
        </div>

        {/* Social Media Reminder */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Siga nosso Instagram!</h3>
            <p className="text-gray-600 mb-4">Acompanhe as novidades do projeto e veja quando os ganhadores serão anunciados.</p>
            <a 
              href="https://instagram.com/inglesdesouza.escola" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @inglesdesouza.escola
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onViewRanking}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <Users className="w-6 h-6 mr-2" />
            Ver Ranking
          </button>
          
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-white text-gray-700 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Jogar Novamente
          </button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Obrigado por participar do Quiz Ecotecendo Mosqueiro!<br />
            Juntos, construímos um futuro mais sustentável. 🌱
          </p>
        </div>
      </div>
    </div>
  );
};