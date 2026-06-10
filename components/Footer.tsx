import React from 'react';
import { Tab } from '../types';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (tab: Tab, slug?: string) => void;
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-brand-darkSurface border-t border-gray-100 dark:border-brand-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo 
                src={isDarkMode 
                  ? "https://lh3.googleusercontent.com/d/1DzALlQVyslL5djn1at5Cy58fxyRop1lt" 
                  : "https://lh3.googleusercontent.com/d/1ERpu_tFyyG5mjFMkblG_e0Pv8A4LIk3Q"
                }
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-brand-black dark:text-white">Donome</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Plataforma pedagógica inteligente de correção de redações e tutoria multidisciplinar orientada pela inteligência artificial avançada. Elevando o desempenho escolar de forma acessível e didática.
            </p>
          </div>

          {/* Links: Platform */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-brand-black dark:text-white">Plataforma</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate(Tab.HOME)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Principal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate(Tab.APP)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Área de Estudos (App)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate(Tab.COMO_FUNCIONA)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate(Tab.FAQ)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Dúvidas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Institutional & Edu */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-brand-black dark:text-white">Conteúdo</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate(Tab.BLOG)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Nosso Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate(Tab.SOBRE_NOS)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Sobre Nós (E-E-A-T)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate(Tab.CONTATO)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Legal & AdSense Compliance */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-brand-black dark:text-white">Legal</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => onNavigate(Tab.POLITICA_PRIVACIDADE)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate(Tab.TERMOS_USO)} 
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors font-medium text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-brand-darkBorder rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Google AdSense Partner</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-brand-darkBorder flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            &copy; {currentYear} Donome. Todos os direitos reservados. Orgulhosamente focado na democratização da educação no Brasil.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-gray-400 hover:text-brand-primary transition-colors cursor-pointer font-semibold">LGPD Conforme</span>
            <span className="text-xs text-gray-400 hover:text-brand-primary transition-colors cursor-pointer font-semibold">SSL 256-bit Certificado</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
