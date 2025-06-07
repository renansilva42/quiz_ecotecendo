import React, { useState } from 'react';
import { User2, Mail, Instagram, Key } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import logo from '../assets/logo.png';

interface UserRegistrationProps {
  onUserRegistered: (user: User) => void;
}

export const UserRegistration: React.FC<UserRegistrationProps> = ({ onUserRegistered }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !instagram.trim() || !password.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      alert(`Erro ao cadastrar: ${error.message}`);
      setIsLoading(false);
      return;
    }

    // Update user metadata with name and instagram
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        name: name.trim(),
        instagram: instagram.trim().replace('@', ''),
      },
    });

    if (updateError) {
      alert(`Erro ao atualizar dados do usuário: ${updateError.message}`);
      setIsLoading(false);
      return;
    }

    const user: User = {
      name: name.trim(),
      email: email.trim(),
      instagram: instagram.trim().replace('@', ''),
    };

    onUserRegistered(user);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="Logo"
              className="w-36 h-36 object-contain mx-auto mb-4"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Rápido</h2>
            <p className="text-gray-600">Preencha seus dados para começar o quiz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="@seuinstagram"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Sua senha"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Carregando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Seus dados são seguros e utilizados apenas para o ranking do quiz.
            </p>
            <p className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => window.location.href = '/login'}>
              Fazer login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
