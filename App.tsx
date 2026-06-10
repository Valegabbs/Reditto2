import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TutoringInput from './components/TutoringInput';
import Hub, { areas } from './components/Hub';
import Settings from './components/Settings';
import HistoryList from './components/HistoryList';
import WelcomeModal from './components/WelcomeModal';
import OnboardingTour, { TourStep } from './components/OnboardingTour';
import EvolutionChart from './components/EvolutionChart';
import ThemeSuggestions from './components/ThemeSuggestions';
import LoadingPage from './components/LoadingPage';
import ResultsPage from './components/ResultsPage';

// Public SEO and compliance pages for Google AdSense
import LandingPage from './components/LandingPage';
import ComoFunciona from './components/ComoFunciona';
import FAQ from './components/FAQ';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer';

import { Tab, EssaySubmission, HistoryItem, KnowledgeArea, UserProfile, EssayCorrection, TutoringResponse } from './types';
import { correctEssayWithGemini, correctTutoringWithGemini } from './services/geminiService';
import { CheckCircle2, AlertCircle, Menu, ChevronRight } from 'lucide-react';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [blogPostSlug, setBlogPostSlug] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<HistoryItem | null>(null);
  
  const [hubKey, setHubKey] = useState(0);

  // Synchronize state with URL pathname or hash (ideal for Google AdSense crawler indexing)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const current = path !== '/' ? path : hash.replace('#', '');
      
      if (current === '/politica-de-privacidade' || current === 'politica-de-privacidade') {
        setActiveTab(Tab.POLITICA_PRIVACIDADE);
      } else if (current === '/termos-de-uso' || current === 'termos-de-uso') {
        setActiveTab(Tab.TERMOS_USO);
      } else if (current === '/sobre-nos' || current === 'sobre-nos') {
        setActiveTab(Tab.SOBRE_NOS);
      } else if (current === '/contato' || current === 'contato') {
        setActiveTab(Tab.CONTATO);
      } else if (current === '/como-funciona' || current === 'como-funciona') {
        setActiveTab(Tab.COMO_FUNCIONA);
      } else if (current === '/faq' || current === 'faq') {
        setActiveTab(Tab.FAQ);
      } else if (current === '/blog' || current === 'blog') {
        setActiveTab(Tab.BLOG);
      } else if (current.startsWith('/blog/') || current.startsWith('blog/')) {
        const slug = current.replace('/blog/', '').replace('blog/', '');
        setActiveTab(Tab.BLOG_POST);
        setBlogPostSlug(slug);
      } else if (current === '/app' || current === 'app') {
        setActiveTab(Tab.APP);
      } else {
        setActiveTab(Tab.HOME); // Multi-rich public landing page
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (tab: Tab, slug?: string) => {
    let url = '/';
    if (tab === Tab.POLITICA_PRIVACIDADE) url = '/politica-de-privacidade';
    else if (tab === Tab.TERMOS_USO) url = '/termos-de-uso';
    else if (tab === Tab.SOBRE_NOS) url = '/sobre-nos';
    else if (tab === Tab.CONTATO) url = '/contato';
    else if (tab === Tab.COMO_FUNCIONA) url = '/como-funciona';
    else if (tab === Tab.FAQ) url = '/faq';
    else if (tab === Tab.BLOG) url = '/blog';
    else if (tab === Tab.BLOG_POST && slug) url = `/blog/${slug}`;
    else if (tab === Tab.APP) url = '/app';
    else if (tab === Tab.HOME) url = '/';

    window.history.pushState({}, '', url);
    setActiveTab(tab);
    if (slug) setBlogPostSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) return JSON.parse(saved);
    return {
      name: 'Gabriel Silva',
      nickname: 'Gabriel',
      defaultArea: KnowledgeArea.BASIC
    };
  });

  // Tutoring Hub State
  const [selectedArea, setSelectedArea] = useState<KnowledgeArea | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Lifted State for Topic to allow "Themes" tab to set it
  const [currentTopic, setCurrentTopic] = useState('');
  
  // Welcome & Tour State
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTour, setShowTour] = useState(false);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark mode
    }
    return true;
  });

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Dynamic Theme Colors
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Default from profile or selected area
    const activeArea = selectedArea || userProfile.defaultArea;
    
    let primary = '#38BDF8';
    let primaryHover = '#0EA5E9';
    let primaryForeground = '#FFFFFF';

    if (activeArea === KnowledgeArea.BASIC) {
      if (isDarkMode) {
        primary = '#FFFFFF';
        primaryHover = '#E5E5E5';
        primaryForeground = '#1A1A1A';
      } else {
        primary = '#1A1A1A';
        primaryHover = '#333333';
        primaryForeground = '#FFFFFF';
      }
    } else if (activeArea === KnowledgeArea.NATUREZA) {
      primary = '#10B981'; // emerald-500
      primaryHover = '#059669';
    } else if (activeArea === KnowledgeArea.HUMANAS) {
      primary = '#F97316'; // orange-500
      primaryHover = '#EA580C';
    } else if (activeArea === KnowledgeArea.EXATAS) {
      primary = '#A855F7'; // purple-500
      primaryHover = '#9333EA';
    } else if (activeArea === KnowledgeArea.LINGUAGENS) {
      primary = '#F43F5E'; // rose-500
      primaryHover = '#E11D48';
    }

    root.style.setProperty('--brand-primary', primary);
    root.style.setProperty('--brand-primary-hover', primaryHover);
    root.style.setProperty('--brand-primary-foreground', primaryForeground);

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode, selectedArea, userProfile.defaultArea]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // History State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('donome_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('donome_history', JSON.stringify(history));
  }, [history]);

  const handleSubmission = async (submission: EssaySubmission, overrideArea?: KnowledgeArea, overrideSubject?: string) => {
    const area = overrideArea || selectedArea;
    const subject = overrideSubject || selectedSubject;

    if (!area || !subject) {
      setNotification({ type: 'error', message: 'Área ou matéria não selecionada.' });
      return;
    }

    setIsSubmitting(true);
    setNotification(null);

    try {
      let newItem: HistoryItem;

      if (area === KnowledgeArea.REDACAO) {
        const correction = await correctEssayWithGemini(submission);
        const finalScore = typeof correction?.finalScore === 'number' ? correction.finalScore : 0;
        const topic = correction?.topic || submission.topic;

        newItem = {
          id: Date.now().toString(),
          topic: topic,
          date: new Date().toISOString().split('T')[0],
          status: 'Corrigido',
          score: finalScore,
          correction: correction,
          area: area,
          subject: subject,
          originalSubmission: submission
        };
      } else {
        const tutoring = await correctTutoringWithGemini(submission, area, subject);
        
        newItem = {
          id: Date.now().toString(),
          topic: tutoring.topic,
          date: new Date().toISOString().split('T')[0],
          status: 'Corrigido',
          tutoring: tutoring,
          area: area,
          subject: subject,
          originalSubmission: submission
        };
      }
      
      setHistory([newItem, ...history]);
      setSelectedEssay(newItem);
      setActiveTab(Tab.RESULTS);
      setNotification({ type: 'success', message: 'Processado com sucesso!' });
    } catch (error) {
      console.error("Submission error:", error);
      setNotification({ type: 'error', message: 'Erro ao processar com a IA.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectTheme = (theme: string) => {
    setCurrentTopic(theme);
    setSelectedArea(KnowledgeArea.REDACAO);
    setSelectedSubject('Redação');
    navigateTo(Tab.APP);
    setNotification({ type: 'success', message: 'Tema selecionado! Boa escrita.' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectSubject = (area: KnowledgeArea, subject: string) => {
    setSelectedArea(area);
    setSelectedSubject(subject);
  };

  // Tour Steps Configuration
  const tourSteps: TourStep[] = [
    {
      targetId: 'tour-menu-container',
      title: 'Menu de Navegação',
      content: 'Aqui você acessa o início, seu histórico de redações, vê sua evolução gráfica e explora novos temas.',
      position: 'right'
    },
    {
      targetId: 'tour-theme-toggle',
      title: 'Personalize',
      content: 'Prefere trabalhar à noite? Alterne entre o modo claro e escuro a qualquer momento.',
      position: 'right'
    },
    {
      targetId: 'tour-topic-section',
      title: 'Tema da Redação',
      content: 'Digite o tema da sua redação aqui. Sem ideias? Clique na varinha mágica para a IA sugerir um tema atual estilo ENEM!',
      position: 'bottom'
    },
    {
      targetId: 'tour-content-section',
      title: 'Escreva seu texto',
      content: 'Digite sua redação diretamente no app. O campo expande conforme você escreve.',
      position: 'top'
    },
    {
      targetId: 'tour-camera-btn',
      title: 'Foto da Folha',
      content: 'Prefere escrever à mão? Tire uma foto nítida da sua folha de redação e envie por aqui.',
      position: 'left'
    },
    {
      targetId: 'tour-submit-btn',
      title: 'Envie para Correção',
      content: 'Tudo pronto? Clique aqui e nossa IA analisará seu texto com base nas 5 competências do ENEM.',
      position: 'left'
    }
  ];

  const handleStartTour = () => {
    setShowWelcome(false);
    // Ensure we are on app workspace tab for the tour to work correctly
    navigateTo(Tab.APP);
    // Wait a brief moment for render
    setTimeout(() => setShowTour(true), 100);
  };

  const handleHistorySelect = (essay: HistoryItem) => {
    setSelectedEssay(essay);
    navigateTo(Tab.RESULTS);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return (
          <LandingPage 
            onEnterApp={() => navigateTo(Tab.APP)} 
            onNavigate={navigateTo} 
          />
        );

      case Tab.APP:
        if (!selectedSubject) {
          return <Hub key={hubKey} onSelectSubject={handleSelectSubject} onAreaChange={setSelectedArea} />;
        }
        return (
          <TutoringInput 
            onSubmit={handleSubmission} 
            isSubmitting={isSubmitting} 
            topic={currentTopic}
            setTopic={setCurrentTopic}
            area={selectedArea!}
            subject={selectedSubject}
            headerImage={areas.find(a => a.id === selectedArea)?.headerImage}
            onBack={() => {
              setSelectedArea(null);
              setSelectedSubject(null);
            }}
          />
        );
      
      case Tab.HISTORY:
        return (
          <HistoryList 
            history={history} 
            onSelectEssay={handleHistorySelect} 
          />
        );

      case Tab.EVOLUTION:
        return (
          <div className="animate-fadeIn w-full max-w-5xl mx-auto">
             <EvolutionChart history={history} />
          </div>
        );

      case Tab.THEMES:
        return (
          <div className="animate-fadeIn w-full">
            <ThemeSuggestions onSelectTheme={handleSelectTheme} />
          </div>
        );

      case Tab.SETTINGS:
        return (
          <Settings 
            userProfile={userProfile} 
            onUpdateProfile={setUserProfile} 
          />
        );

      case Tab.RESULTS:
        if (!selectedEssay) {
          navigateTo(Tab.APP);
          return null;
        }
        return (
          <ResultsPage 
            essay={selectedEssay} 
            onBack={() => navigateTo(Tab.HISTORY)} 
            onTryLongResponse={handleSubmission}
          />
        );

      case Tab.COMO_FUNCIONA:
        return <ComoFunciona />;

      case Tab.FAQ:
        return <FAQ />;

      case Tab.SOBRE_NOS:
        return <AboutUs />;

      case Tab.CONTATO:
        return <Contact />;

      case Tab.POLITICA_PRIVACIDADE:
        return <PrivacyPolicy />;

      case Tab.TERMOS_USO:
        return <TermsOfUse />;

      case Tab.BLOG:
        return (
          <Blog 
            onNavigate={(slug) => navigateTo(Tab.BLOG_POST, slug)} 
            onBackToBlog={() => navigateTo(Tab.BLOG)} 
          />
        );

      case Tab.BLOG_POST:
        return (
          <Blog 
            onNavigate={(slug) => navigateTo(Tab.BLOG_POST, slug)} 
            activeSlug={blogPostSlug || undefined} 
            onBackToBlog={() => navigateTo(Tab.BLOG)} 
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-brand-darkBg bg-dots text-brand-text dark:text-gray-200 font-sans selection:bg-brand-primary selection:text-white transition-colors duration-300">
      
      {/* Loading Overlay */}
      {isSubmitting && (
        <LoadingPage 
          isDarkMode={isDarkMode} 
          area={selectedArea || undefined}
          subject={selectedSubject || undefined}
        />
      )}

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcome} 
        onStartTutorial={handleStartTour}
        onSkip={() => setShowWelcome(false)} 
        isDarkMode={isDarkMode}
      />

      {/* Onboarding Tour */}
      <OnboardingTour 
        isOpen={showTour}
        steps={tourSteps}
        onComplete={() => setShowTour(false)}
        onSkip={() => setShowTour(false)}
      />

      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => navigateTo(tab)} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        userProfile={userProfile}
        selectedArea={selectedArea}
        onGoHome={() => {
          setSelectedArea(null);
          setSelectedSubject(null);
          navigateTo(Tab.HOME);
          setHubKey(prev => prev + 1);
        }}
      />

      {/* Main Content Area - Responsive Padding */}
      <main className="md:pl-20 min-h-[calc(100vh-300px)] p-4 md:p-12 max-w-7xl mx-auto transition-all duration-300">
        
        {/* Mobile Menu Trigger (Standalone) */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-white dark:bg-brand-darkSurface text-brand-black dark:text-white shadow-sm border border-gray-100 dark:border-brand-darkBorder rounded-2xl transition-all active:scale-95"
          >
            <Menu size={24} />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shadow-sm overflow-hidden">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              userProfile.name.charAt(0)
            )}
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-4 left-4 right-4 md:left-auto md:top-6 md:right-6 z-[100] p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-slideIn ${notification.type === 'success' ? 'bg-brand-primary text-white' : 'bg-red-500 text-white'}`}>
             {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
             <span className="font-medium text-sm md:text-base flex-1">{notification.message}</span>
             <button onClick={() => setNotification(null)} className="opacity-50 hover:opacity-100 p-1">✕</button>
          </div>
        )}

        {renderContent()}
      </main>

      {/* Global compliance & institutional Footer */}
      <div className="md:pl-20">
        <Footer onNavigate={navigateTo} isDarkMode={isDarkMode} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default App;
