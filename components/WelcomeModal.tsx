import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface WelcomeModalProps {
  isOpen: boolean;
  onStartTutorial: () => void;
  onSkip: () => void;
  isDarkMode: boolean;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onStartTutorial, onSkip, isDarkMode }) => {
  if (!isOpen) return null;

  const logoSrc = isDarkMode 
    ? "https://lh3.googleusercontent.com/d/1cfF_QIz7u1mk3LeA7exTBGwpOaQSND-C" 
    : "https://lh3.googleusercontent.com/d/12dgQKBbgxvcKx63_gBpeIcHM-f-4Q6H0";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn" />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-brand-darkSurface w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp flex flex-col items-center text-center p-6 md:p-8 border border-white/20 dark:border-brand-darkBorder max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button (Skip) */}
        <button 
          onClick={onSkip}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-6 mt-2">Bem-vindo!</h2>

        {/* Logo Image - Clean, no background */}
        <div className="mb-8">
            <img 
              src={logoSrc} 
              alt="Donome Logo" 
              className="h-48 md:h-64 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
          O <strong>Donome</strong> é a sua plataforma inteligente para correção de redações modelo ENEM. 
          Utilize nossa IA para corrigir seus textos, acompanhar sua evolução e conquistar a nota 1000!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={onStartTutorial}
            className="w-full py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-2xl font-bold text-lg shadow-lg shadow-brand-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Conhecer o App
            <ArrowRight size={20} />
          </button>
          
          <button 
            onClick={onSkip}
            className="w-full py-3 text-gray-400 hover:text-brand-primary dark:text-gray-500 dark:hover:text-gray-300 font-medium text-sm transition-colors"
          >
            Pular Tutorial
          </button>
        </div>

      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); scale: 0.95; }
          to { opacity: 1; transform: translateY(0); scale: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default WelcomeModal;