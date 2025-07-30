import React, { useState, useEffect } from 'react';
import { UserRegistration } from './components/UserRegistration';
import { QuizGame } from './components/QuizGame';
import { supabase } from './lib/supabase';
import { User } from './types';
import { Login } from './components/Login';
import { Ranking } from './components/Ranking';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultadosGincana } from './components/ResultadosGincana';
import { EcobagsForm } from './components/EcobagsForm';
import { EcobagsDashboard } from './components/EcobagsDashboard';
import { DashboardTest } from './components/DashboardTest';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [view, setView] = useState<'login' | 'registration' | 'welcome' | 'quiz' | 'ranking' | 'resultados' | 'ecobags' | 'dashboard' | 'dashboard-test'>('login');

  // Check if we're on the results page or ecobags form
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/resultados-gincana' || path === '/resultados-gincana.html' || path.includes('resultados')) {
      setView('resultados');
      return;
    }
    if (path === '/ecobags' || path === '/ecobags.html' || path.includes('ecobags')) {
      setView('ecobags');
      return;
    }
    if (path === '/dashboard-test' || path === '/dashboard-test.html' || path.includes('dashboard-test')) {
      setView('dashboard-test');
      return;
    }
    if (path === '/dashboard' || path === '/dashboard.html' || path.includes('dashboard')) {
      setView('dashboard');
      return;
    }
  }, []);

  useEffect(() => {
    // Don't check auth if we're on results page, ecobags form, or dashboard
    const path = window.location.pathname;
    if (path === '/resultados-gincana' || path === '/resultados-gincana.html' || path.includes('resultados')) {
      return;
    }
    if (path === '/ecobags' || path === '/ecobags.html' || path.includes('ecobags')) {
      return;
    }
    if (path === '/dashboard' || path === '/dashboard.html' || path.includes('dashboard')) {
      return;
    }

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
        setView('login');
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
        setView('login');
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
        .from('quiz_results')
        .upsert(
          {
            user_name: result.userName,
            user_email: result.userEmail,
            user_instagram: result.userInstagram,
            score: result.score,
            correct_answers: result.correctAnswers,
            total_time: result.totalTime,
            answers: result.answers,
            // Remove created_at to let DB handle default timestamp
          },
          { onConflict: 'user_email' }
        );
      if (error) {
        console.error('Error saving quiz result:', error);
      } else {
        console.log('Quiz result saved successfully:', data);
      }
    } catch (error) {
      console.error('Unexpected error saving quiz result:', error);
    }
    setView('ranking');
  };

  const handlePlayAgain = () => {
    setView('quiz');
  };

  const handleBackToWelcome = () => {
    setView('welcome');
  };

  if (view === 'login') {
    return showRegistration ? (
      <UserRegistration onUserRegistered={handleUserRegistered} />
    ) : (
      <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setShowRegistration(true)} />
    );
  }

  if (view === 'welcome' && user) {
    return (
      <WelcomeScreen
        onStart={() => setView('quiz')}
        onViewRanking={() => setView('ranking')}
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
        <QuizGame user={user} onComplete={handleGameComplete} />
      </div>
    );
  }

  if (view === 'ranking') {
    return (
      <Ranking onPlayAgain={handlePlayAgain} onBackToWelcome={handleBackToWelcome} />
    );
  }

  if (view === 'resultados') {
    return <ResultadosGincana />;
  }

  if (view === 'ecobags') {
    return <EcobagsForm />;
  }

  if (view === 'dashboard') {
    return <EcobagsDashboard />;
  }

  if (view === 'dashboard-test') {
    return <DashboardTest />;
  }

  return null;
};

export default App;
