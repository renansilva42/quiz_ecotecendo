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
import { WaterQuizApp } from './components/WaterQuizApp';

export const App: React.FC = () => {
  console.log('App component is rendering!');
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  
  
  const [view, setView] = useState<'login' | 'registration' | 'welcome' | 'quiz' | 'ranking' | 'resultados' | 'ecobags' | 'dashboard' | 'dashboard-test' | 'water-quiz'>(() => {
    // Check if we're in water-quiz mode
    console.log('App.tsx - Initializing...');
    console.log('Checking WATER_QUIZ_MODE:', (window as any).WATER_QUIZ_MODE);
    console.log('Current URL:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    console.log('Current search:', window.location.search);
    console.log('Current hash:', window.location.hash);
    
    // Force water-quiz mode for testing - ALWAYS return water-quiz if WATER_QUIZ_MODE is set
    if ((window as any).WATER_QUIZ_MODE) {
      console.log('WATER_QUIZ_MODE detected! Setting view to water-quiz');
      return 'water-quiz';
    }
    
    // Check URL for water-quiz with multiple methods
    const pathname = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    const href = window.location.href;
    
    if (pathname.includes('water-quiz') || 
        search.includes('water-quiz') ||
        hash.includes('water-quiz') ||
        href.includes('water-quiz')) {
      console.log('URL contains water-quiz! Setting view to water-quiz');
      return 'water-quiz';
    }
    
    console.log('No water-quiz mode detected, defaulting to login');
    return 'login';
  });

  // Check if we're on the results page or ecobags form
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    const href = window.location.href;
    console.log('App.tsx useEffect - Current path:', path, 'hash:', hash, 'search:', search);
    console.log('App.tsx useEffect - WATER_QUIZ_MODE:', (window as any).WATER_QUIZ_MODE);
    
    // Check for water-quiz first with multiple detection methods
    if ((window as any).WATER_QUIZ_MODE ||
        path === '/water-quiz' || 
        path === '/water-quiz.html' || 
        path.includes('water-quiz') || 
        hash === '#water-quiz' ||
        hash.includes('water-quiz') ||
        search.includes('water-quiz') ||
        href.includes('water-quiz')) {
      console.log('App.tsx useEffect - Setting view to water-quiz');
      setView('water-quiz');
      return;
    }
    
    if (path === '/resultados-gincana' || path === '/resultados-gincana.html' || path.includes('resultados')) {
      console.log('Setting view to resultados');
      setView('resultados');
      return;
    }
    if (path === '/ecobags' || path === '/ecobags.html' || path.includes('ecobags')) {
      console.log('Setting view to ecobags');
      setView('ecobags');
      return;
    }
    if (path === '/dashboard-test' || path === '/dashboard-test.html' || path.includes('dashboard-test')) {
      console.log('Setting view to dashboard-test');
      setView('dashboard-test');
      return;
    }
    if (path === '/dashboard' || path === '/dashboard.html' || path.includes('dashboard')) {
      console.log('Setting view to dashboard');
      setView('dashboard');
      return;
    }
    console.log('No specific route found, using default login');
  }, []);

  useEffect(() => {
    // Don't check auth if we're on results page, ecobags form, or dashboard
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    const href = window.location.href;
    
    // Check for water-quiz first with multiple detection methods
    if ((window as any).WATER_QUIZ_MODE ||
        path === '/water-quiz' || 
        path === '/water-quiz.html' || 
        path.includes('water-quiz') || 
        hash.includes('water-quiz') ||
        search.includes('water-quiz') ||
        href.includes('water-quiz')) {
      return;
    }
    
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

  if (view === 'water-quiz') {
    console.log('App.tsx - Rendering WaterQuizApp component!');
    console.log('App.tsx - Current URL:', window.location.href);
    console.log('App.tsx - WATER_QUIZ_MODE:', (window as any).WATER_QUIZ_MODE);
    console.log('App.tsx - About to render WaterQuizApp...');
    return <WaterQuizApp />;
  }

  console.log('App.tsx - Current view:', view);
  console.log('App.tsx - Returning null or other component');
  return null;
};

export default App;
