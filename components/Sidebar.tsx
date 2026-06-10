import React from 'react';
import { Home, History, TrendingUp, BookOpen, Moon, Sun, X } from 'lucide-react';
import { Tab, UserProfile, KnowledgeArea } from '../types';
import Logo from './Logo';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onGoHome: () => void;
  userProfile: UserProfile;
  selectedArea: KnowledgeArea | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  onClose,
  isDarkMode,
  toggleTheme,
  onGoHome,
  userProfile,
  selectedArea
}) => {
  
  const getLogoSrc = () => {
    if (selectedArea) {
      switch (selectedArea) {
        case KnowledgeArea.REDACAO:
          return "https://lh3.googleusercontent.com/d/1FMqPCpMvKJCwYtTmo3RX7oscXUk7FGOP";
        case KnowledgeArea.EXATAS:
          return "https://lh3.googleusercontent.com/d/1VTN_3-SXJ5-0npnOH1hRxyCIht5kjMMe";
        case KnowledgeArea.NATUREZA:
          return "https://lh3.googleusercontent.com/d/1Y-M7AiQU6Q2kd0wpNrt_zM4Zsu24Um1x";
        case KnowledgeArea.HUMANAS:
          return "https://lh3.googleusercontent.com/d/1enSW8IobKutaIRwIG4O0rWQGGvekyybP";
        case KnowledgeArea.LINGUAGENS:
          return "https://lh3.googleusercontent.com/d/1--LnVZ-fWXEXRtjkoXl5bpU0YMp7M9ix";
        default:
          break;
      }
    }

    return isDarkMode 
      ? "https://lh3.googleusercontent.com/d/1DzALlQVyslL5djn1at5Cy58fxyRop1lt" 
      : "https://lh3.googleusercontent.com/d/1ERpu_tFyyG5mjFMkblG_e0Pv8A4LIk3Q";
  };

  const menuItems = [
    { id: Tab.HOME, label: 'Início', icon: Home, tourId: 'tour-menu-home' },
    { id: Tab.HISTORY, label: 'Histórico', icon: History, tourId: 'tour-menu-history' },
    { id: Tab.EVOLUTION, label: 'Evolução', icon: TrendingUp },
    { id: Tab.THEMES, label: 'Temas (Redação)', icon: BookOpen },
  ];

  // Logic for mobile drawer vs desktop sidebar
  const containerClasses = `
    fixed top-0 left-0 h-full flex flex-col z-50
    transition-all duration-300 ease-in-out group
    bg-white dark:bg-brand-darkSurface border-r border-gray-100 dark:border-brand-darkBorder
    ${isOpen ? 'w-64 translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 w-20 hover:w-64'}
  `;

  return (
    <>
      {/* Overlay for mobile when drawer is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <nav className={containerClasses} id="tour-sidebar">
        <div className="mb-10 h-24 pt-6 relative flex items-center justify-center shrink-0">
           <Logo 
             src={getLogoSrc()}
             className="h-16 md:h-20 w-auto object-contain transition-all duration-300" 
             onClick={onGoHome}
           />
           
           {/* Close button for mobile */}
           <button onClick={onClose} className="absolute right-4 md:hidden text-gray-500 dark:text-gray-400 p-2 hover:bg-gray-100 dark:hover:bg-brand-darkBorder rounded-lg transition-colors">
             <X size={24} />
           </button>
        </div>

        <div className="flex flex-col gap-3 flex-1 justify-center" id="tour-menu-container">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={item.tourId}
                onClick={() => {
                  if (item.id === Tab.HOME) {
                    onGoHome();
                  } else {
                    setActiveTab(item.id);
                  }
                  onClose(); // Close drawer on selection (mobile)
                }}
                className={`
                  flex items-center rounded-2xl transition-all duration-300 font-medium text-base relative h-12 mx-2
                  ${isActive 
                    ? 'bg-brand-primary text-[var(--brand-primary-foreground)] shadow-lg shadow-brand-primary/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-brand-darkBorder hover:text-brand-primary'}
                `}
              >
                <div className="w-12 md:w-[64px] shrink-0 flex justify-center items-center">
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          <button 
            id="tour-theme-toggle"
            onClick={toggleTheme}
            className="flex items-center rounded-2xl transition-all duration-300 font-medium text-base relative h-12 mx-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-brand-darkBorder hover:text-brand-primary"
          >
            <div className="w-12 md:w-[64px] shrink-0 flex justify-center items-center">
              {isDarkMode ? <Moon size={22} /> : <Sun size={22} />}
            </div>
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
            </span>
          </button>
        </div>

        {/* Bottom Section: User */}
        <div className="mt-auto p-2 md:p-2">
          <button 
            onClick={() => {
              setActiveTab(Tab.SETTINGS);
              onClose();
            }}
            className={`w-full bg-gray-50 dark:bg-brand-darkBorder rounded-3xl flex items-center h-16 overflow-hidden transition-all hover:bg-gray-100 dark:hover:bg-brand-darkSurface border-2 ${activeTab === Tab.SETTINGS ? 'border-brand-primary bg-brand-primary text-[var(--brand-primary-foreground)]' : 'border-transparent'}`}
          >
            <div className="w-12 md:w-[64px] shrink-0 flex justify-center items-center">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt={userProfile.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">
                  {userProfile.name.charAt(0)}
                </div>
              )}
            </div>
            <div className={`transition-all duration-300 text-left ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <p className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{userProfile.nickname || 'Usuário'}</p>
              <span className="font-semibold text-brand-black dark:text-white block leading-tight truncate whitespace-nowrap max-w-[120px]">{userProfile.name}</span>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;