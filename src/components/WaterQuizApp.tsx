import React, { useState, useEffect, useRef } from 'react';
import { WaterQuizRegistration } from './WaterQuizRegistration';
import { QuizGame } from './QuizGame';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { WaterQuizLogin } from './WaterQuizLogin';
import { WaterQuizRanking } from './WaterQuizRanking';
import { WaterQuizWelcome } from './WaterQuizWelcome';
import { WaterQuizAdmin } from './WaterQuizAdmin';
import { getRandomWaterQuestions } from '../data/water-quiz-questions';
export const WaterQuizApp: React.FC = () => {
  console.log('WaterQuizApp component loaded!');
  console.log('WaterQuizApp - Current URL:', window.location.href);
  console.log('WaterQuizApp - WATER_QUIZ_MODE:', (window as any).WATER_QUIZ_MODE);
  
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(true);
  const [view, setView] = useState<'login' | 'registration' | 'welcome' | 'quiz' | 'ranking' | 'admin'>('registration');
  const [quizEnabled, setQuizEnabled] = useState(true);
  
  // Use refs to track current state in realtime listener
  const viewRef = useRef(view);
  const userRef = useRef(user);
  
  // Update refs when state changes
  useEffect(() => {
    viewRef.current = view;
  }, [view]);
  
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    const initializeApp = async () => {
      // Check authentication
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session && sessionData.session.user) {
        const u = sessionData.session.user;
        const isAdmin = u.email === 'admin@ecotecendo.com.br';
        setUser({
          name: u.user_metadata?.name || '',
          email: u.email || '',
          instagram: u.user_metadata?.instagram || '',
          isAdmin,
        });
        setView('welcome');
      } else {
        setView('registration');
      }

      // Load quiz settings
      const { data: settingsData } = await supabase
        .from('water_quiz_settings')
        .select('quiz_enabled')
        .single();
      
      if (settingsData) {
        setQuizEnabled(settingsData.quiz_enabled);
      }
    };

    initializeApp();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🟡 onAuthStateChange triggered:', event);
      if (session && session.user) {
        const u = session.user;
        const isAdmin = u.email === 'admin@ecotecendo.com.br';
        console.log('🟡 onAuthStateChange - email:', u.email);
        console.log('🟡 onAuthStateChange - isAdmin:', isAdmin);
        setUser({
          name: u.user_metadata?.name || '',
          email: u.email || '',
          instagram: u.user_metadata?.instagram || '',
          isAdmin,
        });
        setView('welcome');
      } else {
        setUser(null);
        setView('registration');
      }
    });

    // Real-time listener for quiz settings changes
    const settingsChannel = supabase
      .channel('quiz_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'water_quiz_settings'
        },
        (payload) => {
          console.log('Quiz settings changed:', payload);
          if (payload.new && 'quiz_enabled' in payload.new) {
            const newEnabled = (payload.new as any).quiz_enabled;
            setQuizEnabled(newEnabled);
            
            // If quiz was blocked and user is currently playing
            if (!newEnabled && viewRef.current === 'quiz') {
              const currentUser = userRef.current;
              
              // Check if user is not admin
              if (currentUser && !currentUser.isAdmin) {
                alert('⚠️ O quiz foi bloqueado pelo administrador.');
                setView('welcome');
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      authListener?.subscription.unsubscribe();
      settingsChannel.unsubscribe();
    };
  }, []); // Empty dependencies - only run once!

  const handleUserRegistered = (user: User) => {
    setUser(user);
    setView('welcome');
  };

  const handleLoginSuccess = (user: User) => {
    console.log('🔵 handleLoginSuccess called with user:', user);
    console.log('🔵 isAdmin value:', user.isAdmin);
    setUser(user);
    setView('welcome');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('login');
  };

  const handleGameComplete = async (result: any) => {
    console.log('handleGameComplete called with result:', result);
    try {
      const { data, error } = await supabase
        .from('water_quiz_results')
        .upsert(
          {
            user_name: result.userName,
            user_email: result.userEmail,
            user_instagram: result.userInstagram,
            score: result.score,
            correct_answers: result.correctAnswers,
            total_time: result.totalTime,
            water_saved: Math.floor(result.score * 2.5), // Calculate water saved based on score
            filter_knowledge: result.answers.filter((a: any) => a.questionId >= 20 && a.isCorrect).length, // Questions about filters
            answers: result.answers,
          },
          { onConflict: 'user_email' }
        );
      if (error) {
        console.error('Error saving water quiz result:', error);
      } else {
        console.log('Water quiz result saved successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error saving water quiz result:', error);
    }
    setView('ranking');
  };

  const handlePlayAgain = () => {
    console.log('🔄 handlePlayAgain called');
    setView('quiz');
  };

  const handleBackToWelcome = () => {
    console.log('🏠 handleBackToWelcome called');
    setView('welcome');
  };

  const handleAdminAccess = () => {
    console.log('🛡️ handleAdminAccess called');
    setView('admin');
  };

  const handleBackFromAdmin = () => {
    console.log('⬅️ handleBackFromAdmin called');
    setView('welcome');
  };

  const handleStartQuiz = async () => {
    console.log('🎮 handleStartQuiz called');
    console.log('👤 User:', user);
    console.log('🛡️ Is Admin:', user?.isAdmin);
    console.log('✅ Quiz Enabled:', quizEnabled);

    // Allow admin to start quiz even if blocked
    if (user?.isAdmin) {
      console.log('✅ Admin detected - starting quiz');
      setView('quiz');
      return;
    }

    // Double-check quiz status before starting for regular users
    console.log('🔍 Checking quiz settings...');
    const { data: settingsData } = await supabase
      .from('water_quiz_settings')
      .select('quiz_enabled')
      .single();
    
    console.log('📊 Settings data:', settingsData);
    
    if (settingsData && !settingsData.quiz_enabled) {
      console.log('❌ Quiz is blocked');
      alert('⚠️ O quiz está bloqueado no momento. Tente novamente mais tarde.');
      return;
    }
    
    console.log('✅ Starting quiz');
    setView('quiz');
  };

  if (view === 'login' || view === 'registration') {
    return showRegistration ? (
      <WaterQuizRegistration onUserRegistered={handleUserRegistered} onSwitchToLogin={() => setShowRegistration(false)} />
    ) : (
      <WaterQuizLogin onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowRegistration(true)} />
    );
  }

  if (view === 'welcome' && user) {
    console.log('🟢 Rendering WaterQuizWelcome with user:', user);
    console.log('🟢 user.isAdmin:', user.isAdmin);
    console.log('🟢 onAdminAccess will be:', user.isAdmin ? 'defined (function)' : 'undefined');
    return (
      <WaterQuizWelcome
        onStart={handleStartQuiz}
        onViewRanking={() => setView('ranking')}
        onAdminAccess={user.isAdmin ? handleAdminAccess : undefined}
        onLogout={handleLogout}
        userName={user.name}
        quizEnabled={quizEnabled}
        isAdmin={user.isAdmin}
      />
    );
  }

  if (view === 'quiz' && user) {
    // Allow admin to play even if quiz is blocked
    if (!quizEnabled && !user.isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-50 to-blue-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Temporariamente Bloqueado</h2>
            <p className="text-gray-600 mb-6">O quiz está temporariamente indisponível. Tente novamente mais tarde.</p>
            <button
              onClick={handleBackToWelcome}
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 sm:static sm:mb-4"
        >
          Sair
        </button>
        <QuizGame user={user} onComplete={handleGameComplete} questions={getRandomWaterQuestions()} />
      </div>
    );
  }

  if (view === 'ranking') {
    return (
      <WaterQuizRanking 
        onPlayAgain={handlePlayAgain} 
        onBackToWelcome={handleBackToWelcome}
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'admin' && user?.isAdmin) {
    return (
      <WaterQuizAdmin onBack={handleBackFromAdmin} />
    );
  }

  return null;
};
