import React, { useState } from 'react';
import { User2, Mail, Instagram, Key, Droplets } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface WaterQuizRegistrationProps {
  onUserRegistered: (user: User) => void;
  onSwitchToLogin: () => void;
}

export const WaterQuizRegistration: React.FC<WaterQuizRegistrationProps> = ({ onUserRegistered, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          name: name.trim(),
          instagram: instagram.trim(),
        },
      },
    });

    if (error) {
      alert(`Erro ao criar conta: ${error.message}`);
      setIsLoading(false);
      return;
    }

    if (data.user) {
      const user: User = {
        name: name.trim(),
        email: email.trim(),
        instagram: instagram.trim(),
      };
      onUserRegistered(user);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-cyan-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-300 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-indigo-300 rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-32 right-32 w-5 h-5 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
          {/* Header com tema aquático animado */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-spin transition-all duration-500">
                <Droplets className="w-10 h-10 text-white animate-bounce" />
              </div>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3 animate-pulse">
              🎉 Cadastro - Quiz das Águas 🎉
            </h1>
            <p className="text-gray-700 text-xl font-semibold">
              🌟 Crie sua conta e participe do quiz! 🌟
            </p>
            
            {/* Link para login */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
                >
                  Faça login aqui
                </button>
              </p>
            </div>
          </div>

          {/* Formulário de Registro */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="transform hover:scale-105 transition-all duration-300">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                👤 Nome Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User2 className="h-5 w-5 text-cyan-500 animate-pulse" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 hover:border-cyan-300 text-lg"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div className="transform hover:scale-105 transition-all duration-300">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                📧 Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-cyan-500 animate-pulse" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 hover:border-cyan-300 text-lg"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="transform hover:scale-105 transition-all duration-300">
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                📱 Instagram
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Instagram className="h-5 w-5 text-cyan-500 animate-pulse" />
                </div>
                <input
                  id="instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 hover:border-cyan-300 text-lg"
                  placeholder="@seuusuario"
                />
              </div>
            </div>

            <div className="transform hover:scale-105 transition-all duration-300">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                🔐 Senha *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-cyan-500 animate-pulse" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 hover:border-cyan-300 text-lg"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
            </div>

            <div className="transform hover:scale-105 transition-all duration-300">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                🔑 Confirmar Senha *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-cyan-500 animate-pulse" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 hover:border-cyan-300 text-lg"
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-6 px-8 rounded-3xl font-black text-xl hover:from-cyan-700 hover:to-blue-700 transform hover:scale-115 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 border-4 border-cyan-400 hover:border-cyan-500 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Criando conta...
                </>
              ) : (
                <>
                  🎉 BORA COMEÇAR! 🚀
                </>
              )}
            </button>
          </form>

          {/* Informações sobre o quiz */}
          <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl border-3 border-cyan-200 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-black text-cyan-800 mb-4 flex items-center justify-center whitespace-nowrap">
              💧 Sobre o Quiz das Águas 💧
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-cyan-700">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl flex-shrink-0">🎯</span>
                <p className="font-semibold leading-relaxed">
                  <span className="font-black">20 perguntas divertidas</span> sobre água!
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl flex-shrink-0">🌱</span>
                <p className="font-semibold leading-relaxed">
                  Aprenda sobre <span className="font-black">conservação</span> e <span className="font-black">sustentabilidade</span>!
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl flex-shrink-0">💡</span>
                <p className="font-semibold leading-relaxed">
                  Descubra quanta <span className="font-black">água você pode economizar</span>!
                </p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl flex-shrink-0">🏆</span>
                <p className="font-semibold leading-relaxed">
                  Compete com seus amigos no <span className="font-black">ranking</span>!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
