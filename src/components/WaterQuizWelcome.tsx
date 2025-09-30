import React from 'react';
import { Droplets, Clock, Trophy, Users, Play, Star, Zap, Shield, Lock, LogOut } from 'lucide-react';

interface WaterQuizWelcomeProps {
  onStart: () => void | Promise<void>;
  onViewRanking: () => void;
  onAdminAccess?: () => void;
  onLogout: () => void;
  userName?: string;
  quizEnabled?: boolean;
  isAdmin?: boolean;
}

export const WaterQuizWelcome: React.FC<WaterQuizWelcomeProps> = ({ onStart, onViewRanking, onAdminAccess, onLogout, userName, quizEnabled = true, isAdmin = false }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Botão Sair no canto superior direito */}
      <button
        onClick={onLogout}
        className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 shadow-lg flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Sair
      </button>
      
      {/* Elementos decorativos animados */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-20 right-20 w-8 h-8 bg-blue-300 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-6 h-6 bg-indigo-300 rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-32 right-32 w-10 h-10 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute top-1/3 right-10 w-6 h-6 bg-cyan-300 rounded-full animate-bounce opacity-40"></div>
      
      <div className="max-w-6xl w-full relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse hover:animate-spin transition-all duration-1000">
              <Droplets className="w-16 h-16 sm:w-20 sm:h-20 text-white animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-pulse">
            💧 Quiz das Águas 💧
          </h1>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl text-gray-800 mb-6 sm:mb-8 font-semibold">
            🌊 Bora virar um expert em água? 🌊
          </h2>
          
          {userName && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-3xl border-3 border-cyan-300 transform hover:scale-105 transition-all duration-300 shadow-xl">
              <p className="text-2xl sm:text-3xl text-gray-800 font-bold">
                Olá, <span className="font-black text-cyan-600 animate-pulse">{userName}</span>! 👋
              </p>
              <p className="text-lg sm:text-xl text-gray-700 mt-2 sm:mt-3 font-medium">
                Pronto para mostrar o que você sabe? 🚀
              </p>
            </div>
          )}

          {/* Quiz Status */}
          <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-3xl border-3 transform hover:scale-105 transition-all duration-300 shadow-xl ${
            quizEnabled 
              ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-300' 
              : isAdmin
              ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300'
              : 'bg-gradient-to-r from-red-100 to-red-200 border-red-300'
          }`}>
            <div className="flex flex-col items-center justify-center gap-2">
              {quizEnabled ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <p className="text-lg sm:text-xl text-green-800 font-bold">
                      Quiz Ativo - Pronto para jogar!
                    </p>
                  </div>
                </>
              ) : isAdmin ? (
                <>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-orange-600" />
                    <p className="text-lg sm:text-xl text-orange-800 font-bold">
                      Quiz Bloqueado (Acesso Admin Permitido)
                    </p>
                  </div>
                  <p className="text-sm text-orange-700 text-center">
                    Você pode jogar mesmo com o quiz bloqueado
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-red-600" />
                    <p className="text-lg sm:text-xl text-red-800 font-bold">
                      Quiz Temporariamente Bloqueado
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Barra de progresso visual */}
          <div className="mb-6 sm:mb-8 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border-3 border-cyan-200">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
              <span className="text-lg sm:text-2xl font-bold text-gray-800">Você está pronto para começar! 🎮</span>
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 sm:h-4 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
            <p className="text-base sm:text-lg text-gray-700 font-medium">
              Mostre o que você sabe sobre conservação de água! 🎯
            </p>
          </div>
        </div>

        {/* Cards informativos melhorados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Card principal - 20 Perguntas */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-rotate-2 relative overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-3xl sm:text-4xl animate-bounce">🏆</div>
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h3 className="font-black text-white mb-3 sm:mb-4 text-2xl sm:text-3xl text-center">
              ⏰ 20 Perguntas Divertidas
            </h3>
            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-base sm:text-lg font-semibold">Questões sobre conservação de água</p>
              <p className="text-base sm:text-lg font-semibold">⏱️ Tempo limitado por pergunta!</p>
            </div>
          </div>

          {/* Card secundário - Água Economizada */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 border-3 border-cyan-200">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center animate-bounce">
                <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-xl sm:text-2xl text-center">
              💧 Descubra quanto você pode economizar
            </h3>
            <p className="text-gray-700 text-base sm:text-lg text-center font-medium">
              ✅ Baseado nas suas respostas
            </p>
          </div>

          {/* Card terciário - Ranking */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 border-3 border-purple-200">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center animate-pulse">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-xl sm:text-2xl text-center">
              🏆 Ranking dos Campeões
            </h3>
            <p className="text-gray-700 text-base sm:text-lg text-center font-medium">
              🥇 Veja quem mais se preocupa com a água!
            </p>
          </div>
        </div>

        {/* CTAs melhorados */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-8 sm:mb-12">
          <button
            onClick={onStart}
            disabled={!quizEnabled && !isAdmin}
            className={`px-12 sm:px-16 py-6 sm:py-8 rounded-3xl font-black text-xl sm:text-2xl transform hover:scale-115 transition-all duration-300 shadow-3xl flex items-center gap-3 sm:gap-4 border-4 w-full sm:w-auto ${
              quizEnabled
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 animate-pulse hover:animate-none border-cyan-400 hover:border-cyan-500'
                : isAdmin
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-orange-400 hover:border-orange-500'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-300'
            }`}
          >
            {quizEnabled ? (
              <>
                <Play className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                🚀 BORA COMEÇAR! 💧
              </>
            ) : isAdmin ? (
              <>
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                🛡️ JOGAR (ADMIN) 💧
              </>
            ) : (
              <>
                <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
                🔒 QUIZ BLOQUEADO
              </>
            )}
          </button>
          
          <button
            onClick={onViewRanking}
            className="bg-white text-gray-800 px-8 sm:px-12 py-4 sm:py-6 rounded-3xl font-bold text-lg sm:text-xl border-4 border-cyan-300 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 flex items-center gap-2 sm:gap-3 transform hover:scale-110 shadow-xl w-full sm:w-auto"
          >
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            🏆 Ver Ranking 🥇
          </button>

          {/* Admin Button */}
          {onAdminAccess && (
            <button
              onClick={onAdminAccess}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-3xl font-bold text-lg sm:text-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 sm:gap-3 transform hover:scale-110 shadow-xl w-full sm:w-auto"
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              🛡️ Admin
            </button>
          )}
        </div>

        {/* Informações sobre o quiz - Cards interativos */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-6 sm:p-10 shadow-2xl border-3 border-cyan-200 transform hover:scale-105 transition-all duration-300">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-800 mb-6 sm:mb-8 text-center flex items-center justify-center gap-2 sm:gap-4">
            💧 Como Jogar? 💧
          </h3>
          
          {/* Cards de dificuldade */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-green-100 rounded-2xl p-4 sm:p-6 border-3 border-green-300 transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🟢</div>
                <h4 className="font-black text-green-800 text-lg sm:text-xl mb-1 sm:mb-2">FÁCIL</h4>
                <p className="text-green-700 font-bold text-base sm:text-lg">10 perguntas</p>
                <p className="text-green-600 font-semibold text-sm sm:text-base">30s cada</p>
              </div>
            </div>
            
            <div className="bg-yellow-100 rounded-2xl p-4 sm:p-6 border-3 border-yellow-300 transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🟡</div>
                <h4 className="font-black text-yellow-800 text-lg sm:text-xl mb-1 sm:mb-2">MÉDIO</h4>
                <p className="text-yellow-700 font-bold text-base sm:text-lg">5 perguntas</p>
                <p className="text-yellow-600 font-semibold text-sm sm:text-base">25s cada</p>
              </div>
            </div>
            
            <div className="bg-red-100 rounded-2xl p-4 sm:p-6 border-3 border-red-300 transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔴</div>
                <h4 className="font-black text-red-800 text-lg sm:text-xl mb-1 sm:mb-2">DIFÍCIL</h4>
                <p className="text-red-700 font-bold text-base sm:text-lg">5 perguntas</p>
                <p className="text-red-600 font-semibold text-sm sm:text-base">20s cada</p>
              </div>
            </div>
          </div>
          
          {/* Temas em formato visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="transform hover:scale-105 transition-all duration-300">
              <h4 className="font-black text-gray-800 mb-4 sm:mb-6 text-xl sm:text-2xl flex items-center justify-center gap-2 sm:gap-3">
                📚 O que você vai aprender:
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-pulse">💧</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Conservação de água no dia a dia</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-pulse">🔧</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Filtros artesanais e sustentáveis</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-pulse">🌍</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Pegada hídrica dos produtos</span>
                </div>
              </div>
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300">
              <h4 className="font-black text-gray-800 mb-4 sm:mb-6 text-xl sm:text-2xl flex items-center justify-center gap-2 sm:gap-3">
                🎯 O que você ganha:
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-bounce">💧</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Descobre quanto pode economizar</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-bounce">🏆</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Competir no ranking</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-bounce">🌱</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Ajudar o planeta</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-3xl border-3 border-cyan-300 shadow-xl">
          <p className="text-gray-700 mb-3 sm:mb-4 text-lg sm:text-xl font-semibold">
            🌟 Desenvolvido para promover a conscientização sobre o uso da água 🌟
          </p>
          <p className="text-cyan-700 font-black text-xl sm:text-2xl animate-pulse">
            🌍 Cada gota conta para um futuro sustentável! 🌍
          </p>
          <div className="flex justify-center items-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-2xl sm:text-3xl">
            <span className="animate-bounce">💧</span>
            <span className="animate-pulse">🌱</span>
            <span className="animate-bounce">🌍</span>
            <span className="animate-pulse">💚</span>
          </div>
        </div>
      </div>
    </div>
  );
};
