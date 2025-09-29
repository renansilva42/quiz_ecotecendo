import React, { useState, useEffect } from 'react';
import { WaterQuizRegistration } from './WaterQuizRegistration';
import { QuizGame } from './QuizGame';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { WaterQuizLogin } from './WaterQuizLogin';
import { WaterQuizRanking } from './WaterQuizRanking';
import { WaterQuizWelcome } from './WaterQuizWelcome';
import { getRandomWaterQuestions } from '../data/water-quiz-questions';
export const WaterQuizApp: React.FC = () => {
  console.log('WaterQuizApp component loaded!');
  console.log('WaterQuizApp - Current URL:', window.location.href);
  console.log('WaterQuizApp - WATER_QUIZ_MODE:', (window as any).WATER_QUIZ_MODE);
  
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(true);
  const [view, setView] = useState<'login' | 'registration' | 'welcome' | 'quiz' | 'ranking'>('registration');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user) {
        const u = data.session.user;
        setUser({
          name: u.user_metadata?.name || '',
          email: u.email || '',
          instagram: u.user_metadata?.instagram || '',
        });
        setView('welcome');
      } else {
        setView('registration');
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        const u = session.user;
        setUser({
          name: u.user_metadata?.name || '',
          email: u.email || '',
          instagram: u.user_metadata?.instagram || '',
        });
        setView('welcome');
      } else {
        setUser(null);
        setView('registration');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleUserRegistered = (user: User) => {
    setUser(user);
    setView('welcome');
  };

  const handleLoginSuccess = (user: User) => {
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
    setView('quiz');
  };

  const handleBackToWelcome = () => {
    setView('welcome');
  };

  if (view === 'login' || view === 'registration') {
    return showRegistration ? (
      <WaterQuizRegistration onUserRegistered={handleUserRegistered} onSwitchToLogin={() => setShowRegistration(false)} />
    ) : (
      <WaterQuizLogin onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowRegistration(true)} />
    );
  }

  if (view === 'welcome' && user) {
    return (
      <WaterQuizWelcome
        onStart={() => setView('quiz')}
        onViewRanking={() => setView('ranking')}
        userName={user.name}
      />
    );
  }

  if (view === 'quiz' && user) {
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
      <WaterQuizRanking onPlayAgain={handlePlayAgain} onBackToWelcome={handleBackToWelcome} />
    );
  }

  return null;
};
