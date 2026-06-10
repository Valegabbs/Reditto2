import React, { useEffect, useState } from 'react';
import { KnowledgeArea } from '../types';

interface LoadingPageProps {
  isDarkMode: boolean;
  area?: KnowledgeArea;
  subject?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isDarkMode, area, subject }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const isRedacao = area === KnowledgeArea.REDACAO;
  
  const loadingTitle = isRedacao 
    ? `Corrigindo sua redação${dots}`
    : `Analisando sua dúvida de ${subject}${dots}`;
    
  const loadingDesc = isRedacao
    ? "Nossa inteligência artificial está analisando cada detalhe do seu texto para garantir a melhor avaliação."
    : `Nossa inteligência artificial está processando sua dúvida em ${subject} para trazer a melhor explicação didática.`;

  const logoSrc = isDarkMode 
    ? "https://lh3.googleusercontent.com/d/1cfF_QIz7u1mk3LeA7exTBGwpOaQSND-C" 
    : "https://lh3.googleusercontent.com/d/12dgQKBbgxvcKx63_gBpeIcHM-f-4Q6H0";

  return (
    <div className="fixed inset-0 z-[200] bg-white dark:bg-brand-darkBg flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative flex flex-col items-center max-w-md w-full">
        {/* Writing Animation Container */}
        <div className="relative mb-12">
          {/* The Logo that "writes" */}
          <div className="relative z-10 animate-writing">
            <img 
              src={logoSrc} 
              alt="Donome Logo" 
              className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* The Trail / Rastro */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
             <div className="absolute inset-0 border-b-4 border-brand-primary/30 blur-sm rounded-full animate-trailFade" />
             <div className="absolute inset-0 border-b-2 border-brand-primary/50 rounded-full animate-trailFade" style={{ animationDelay: '0.1s' }} />
          </div>
          
          {/* Floating Particles */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-primary/20 rounded-full blur-md animate-bounce" />
          <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-brand-primary/10 rounded-full blur-md animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 z-20">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white tracking-tight">
            {loadingTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-[280px] mx-auto leading-relaxed">
            {loadingDesc}
          </p>
        </div>

        {/* Progress Bar (Indeterminate) */}
        <div className="mt-12 w-48 h-1.5 bg-gray-100 dark:bg-brand-darkBorder rounded-full overflow-hidden">
          <div className="h-full bg-brand-primary w-1/3 rounded-full animate-progressMove" />
        </div>
      </div>

      <style>{`
        @keyframes writing {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -5px) rotate(2deg); }
          50% { transform: translate(-5px, 5px) rotate(-1deg); }
          75% { transform: translate(8px, 2px) rotate(1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes trailFade {
          0% { opacity: 0; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.5; transform: scale(1.1) rotate(5deg); }
          100% { opacity: 0; transform: scale(1.3) rotate(10deg); }
        }

        @keyframes progressMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .animate-writing {
          animation: writing 3s ease-in-out infinite;
        }

        .animate-trailFade {
          animation: trailFade 2s ease-out infinite;
        }

        .animate-progressMove {
          animation: progressMove 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
