import React from 'react';
import { Clock, Trophy, Users } from 'lucide-react';
import logo from '../assets/logo.png';

interface WelcomeScreenProps {
  onStart: () => void;
  onViewRanking: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onViewRanking }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-32 h-32 object-contain"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Quiz Ecotecendo
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
            Projeto Mosqueiro
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Teste seus conhecimentos sobre meio ambiente e sustentabilidade! 
            Responda 20 perguntas em tempo limitado e concorra a prêmios incríveis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">20 Perguntas</h3>
            <p className="text-gray-600 text-sm">
              Cada pergunta tem tempo limitado. Seja rápido e preciso para pontuar mais!
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Prêmios</h3>
            <p className="text-gray-600 text-sm">
              Os 5 melhores colocados ganham ecobags exclusivas do projeto!
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Ranking</h3>
            <p className="text-gray-600 text-sm">
              Acompanhe sua posição no ranking e siga nosso Instagram!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Começar Quiz
          </button>
          
          <button
            onClick={onViewRanking}
            className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Ver Ranking
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 mb-2">Siga nosso Instagram:</p>
          <a 
            href="https://instagram.com/inglesdesouza.escola" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
          >
            @inglesdesouza.escola
          </a>
        </div>
      </div>
    </div>
  );
 };
