import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Trash2, 
  Lock, 
  Unlock, 
  RefreshCw, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WaterQuizResult {
  id: string;
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

interface WaterQuizSettings {
  id: string;
  quiz_enabled: boolean;
  updated_at: string;
}

interface WaterQuizAdminProps {
  onBack: () => void;
}

export const WaterQuizAdmin: React.FC<WaterQuizAdminProps> = ({ onBack }) => {
  const [results, setResults] = useState<WaterQuizResult[]>([]);
  const [settings, setSettings] = useState<WaterQuizSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch results and settings in parallel
      const [resultsResponse, settingsResponse] = await Promise.all([
        supabase
          .from('water_quiz_results')
          .select('*')
          .order('score', { ascending: false })
          .limit(100),
        supabase
          .from('water_quiz_settings')
          .select('*')
          .single()
      ]);

      if (resultsResponse.error) {
        console.error('Error fetching results:', resultsResponse.error);
        setError('Erro ao carregar resultados');
        return;
      }

      if (settingsResponse.error) {
        console.error('Error fetching settings:', settingsResponse.error);
        setError('Erro ao carregar configurações');
        return;
      }

      setResults(resultsResponse.data || []);
      setSettings(settingsResponse.data);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erro inesperado ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllResults = async () => {
    if (!window.confirm('Tem certeza que deseja excluir TODOS os resultados do ranking? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setSuccess(null);

      console.log('🗑️ Iniciando exclusão de todos os resultados...');

      // Primeiro, buscar todos os IDs
      const { data: allResults, error: fetchError } = await supabase
        .from('water_quiz_results')
        .select('id');

      if (fetchError) {
        console.error('❌ Erro ao buscar resultados:', fetchError);
        setError(`Erro ao buscar resultados: ${fetchError.message}`);
        return;
      }

      if (!allResults || allResults.length === 0) {
        console.log('ℹ️ Nenhum resultado para excluir');
        setSuccess('Não há resultados para excluir');
        setTimeout(() => setSuccess(null), 3000);
        return;
      }

      console.log(`📊 Encontrados ${allResults.length} resultados para excluir`);

      // Deletar todos os resultados um por um para garantir que o RLS funcione
      let deletedCount = 0;
      let failedCount = 0;

      for (const result of allResults) {
        const { error: deleteError } = await supabase
          .from('water_quiz_results')
          .delete()
          .eq('id', result.id);

        if (deleteError) {
          console.error(`❌ Erro ao deletar resultado ${result.id}:`, deleteError);
          failedCount++;
        } else {
          deletedCount++;
        }
      }

      console.log(`✅ Excluídos: ${deletedCount}, Falhas: ${failedCount}`);

      if (deletedCount > 0) {
        setResults([]);
        setSuccess(`${deletedCount} resultado(s) excluído(s) com sucesso!`);
        setTimeout(() => setSuccess(null), 3000);
        // Recarregar dados
        await fetchData();
      }

      if (failedCount > 0) {
        setError(`${failedCount} resultado(s) não puderam ser excluídos devido a permissões.`);
      }
    } catch (err) {
      console.error('❌ Erro inesperado:', err);
      setError(`Erro inesperado ao excluir resultados: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleQuiz = async () => {
    if (!settings) return;

    try {
      setIsToggling(true);
      setError(null);

      const { error } = await supabase
        .from('water_quiz_settings')
        .update({ 
          quiz_enabled: !settings.quiz_enabled,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);

      if (error) {
        console.error('Error updating settings:', error);
        setError('Erro ao atualizar configurações');
        return;
      }

      setSettings(prev => prev ? { ...prev, quiz_enabled: !prev.quiz_enabled } : null);
      setSuccess(`Quiz ${!settings.quiz_enabled ? 'desbloqueado' : 'bloqueado'} com sucesso!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erro inesperado ao atualizar configurações');
    } finally {
      setIsToggling(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Painel Administrativo
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Gerenciamento do Quiz das Águas
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {success}
          </div>
        )}

        {/* Admin Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Quiz Status */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Status do Quiz</h3>
              {settings?.quiz_enabled ? (
                <Unlock className="w-6 h-6 text-green-500" />
              ) : (
                <Lock className="w-6 h-6 text-red-500" />
              )}
            </div>
            <p className={`text-sm font-medium mb-4 ${settings?.quiz_enabled ? 'text-green-600' : 'text-red-600'}`}>
              {settings?.quiz_enabled ? 'Quiz Ativo' : 'Quiz Bloqueado'}
            </p>
            <button
              onClick={handleToggleQuiz}
              disabled={isToggling}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                settings?.quiz_enabled
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isToggling ? (
                <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                settings?.quiz_enabled ? 'Bloquear Quiz' : 'Desbloquear Quiz'
              )}
            </button>
          </div>

          {/* Total Participants */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Participantes</h3>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">{results.length}</p>
            <p className="text-sm text-gray-600">Total de jogadores</p>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Pontuação Média</h3>
              <BarChart3 className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">
              {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0}%
            </p>
            <p className="text-sm text-gray-600">Média geral</p>
          </div>

          {/* Water Saved */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Água Economizada</h3>
              <div className="w-6 h-6 text-cyan-500">💧</div>
            </div>
            <p className="text-3xl font-bold text-cyan-600 mb-2">
              {results.reduce((sum, r) => sum + r.water_saved, 0)}L
            </p>
            <p className="text-sm text-gray-600">Total economizado</p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border-2 border-red-200">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-xl font-semibold text-red-600">Zona de Perigo</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Esta ação irá excluir permanentemente todos os resultados do ranking. Esta ação não pode ser desfeita.
          </p>
          <button
            onClick={handleDeleteAllResults}
            disabled={isDeleting || results.length === 0}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isDeleting ? 'Excluindo...' : 'Excluir Todos os Resultados'}
          </button>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              📊 Resultados Detalhados
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instagram
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pontuação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acertos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tempo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Água Economizada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.user_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      @{result.user_instagram.replace('@', '')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {result.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result.correct_answers}/20
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(result.total_time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                        {result.water_saved}L
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(result.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {results.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 text-gray-300 mx-auto mb-4">📊</div>
              <p className="text-gray-500 text-lg">Nenhum resultado encontrado</p>
              <p className="text-gray-400">Os resultados aparecerão aqui quando os usuários jogarem</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onBack}
            className="bg-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
          >
            ← Voltar ao Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
