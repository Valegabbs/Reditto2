import React from 'react';
import { 
  Calculator, 
  Beaker, 
  Globe, 
  Languages, 
  PenTool,
  ChevronRight,
  BookOpen,
  Atom,
  Zap,
  History,
  Map,
  Users,
  MessageSquare,
  Library,
  Globe2,
  Sparkles,
  ChevronLeft,
  Dna,
  FlaskConical,
  MessageCircle,
  Type,
  Landmark,
  Palette,
  Scroll,
  Flag,
  Network,
  Columns
} from 'lucide-react';
import { KnowledgeArea } from '../types';
import { cn } from '@/lib/utils';

export interface AreaOption {
  id: KnowledgeArea;
  title: string;
  description: string;
  icon: any;
  color: string;
  subjects: string[];
  image: string;
  headerImage: string;
}

export const areas: AreaOption[] = [
  {
    id: KnowledgeArea.REDACAO,
    title: 'Redação',
    description: 'Correção inteligente modelo ENEM',
    icon: PenTool,
    color: 'bg-brand-blue',
    subjects: ['Redação'],
    image: 'https://lh3.googleusercontent.com/d/1pV7Ai7q-p-KFtyFwG66bJHlN1idRmbSg',
    headerImage: 'https://lh3.googleusercontent.com/d/1oatj1NSt3auwlAlyvWZrK-3iJGX6S_Gp'
  },
  {
    id: KnowledgeArea.EXATAS,
    title: 'Exatas',
    description: 'Matemática e raciocínio lógico',
    icon: Calculator,
    color: 'bg-purple-500',
    subjects: ['Matemática'],
    image: 'https://lh3.googleusercontent.com/d/1ERlxFPjNGpUTF1-5yY6z8Hc4Oz48j87F',
    headerImage: 'https://lh3.googleusercontent.com/d/1-WBW43FFVO8M6rzYuzMrP0YCIwceP0rZ'
  },
  {
    id: KnowledgeArea.NATUREZA,
    title: 'Natureza',
    description: 'Biologia, Química e Física',
    icon: Beaker,
    color: 'bg-emerald-500',
    subjects: ['Biologia', 'Química', 'Física'],
    image: 'https://lh3.googleusercontent.com/d/1Z7gsWIZrv0yUdreoHT55zuLyUL31Fk6D',
    headerImage: 'https://lh3.googleusercontent.com/d/1rbeByBQrZhY5THbukZYIZOlxzvrT2ey4'
  },
  {
    id: KnowledgeArea.HUMANAS,
    title: 'Humanas',
    description: 'História, Geografia e Sociedade',
    icon: Globe,
    color: 'bg-orange-500',
    subjects: ['História', 'Geografia', 'Filosofia', 'Sociologia'],
    image: 'https://lh3.googleusercontent.com/d/1I_aoSaeHOi98nZrcL-mm4W9JeK0EGJGC',
    headerImage: 'https://lh3.googleusercontent.com/d/1Dg-ScMlw7U8U2swYlImif2yU0MXSj3bd'
  },
  {
    id: KnowledgeArea.LINGUAGENS,
    title: 'Linguagens',
    description: 'Português, Literatura e Idiomas',
    icon: Languages,
    color: 'bg-red-500',
    subjects: ['Português', 'Literatura', 'Inglês', 'Espanhol'],
    image: 'https://lh3.googleusercontent.com/d/1lZlwqyVXGW0LvlWtOehG7kDY0QqAWLho',
    headerImage: 'https://lh3.googleusercontent.com/d/1Rb_u5Ll8bj3oqeRxExJSUdkNmFEkQKF1'
  }
];

interface HubProps {
  onSelectSubject: (area: KnowledgeArea, subject: string) => void;
  onAreaChange?: (area: KnowledgeArea | null) => void;
}

const Hub: React.FC<HubProps> = ({ onSelectSubject, onAreaChange }) => {
  const [selectedArea, setSelectedArea] = React.useState<AreaOption | null>(null);

  const handleSetSelectedArea = (area: AreaOption | null) => {
    setSelectedArea(area);
    if (onAreaChange) {
      onAreaChange(area ? area.id : null);
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Matemática': return Calculator;
      case 'Biologia': return Dna;
      case 'Química': return FlaskConical;
      case 'Física': return Atom;
      case 'Português': return Languages;
      case 'Literatura': return BookOpen;
      case 'Inglês': return Globe;
      case 'Espanhol': return Flag;
      case 'História': return Landmark;
      case 'Geografia': return Map;
      case 'Sociologia': return Network;
      case 'Filosofia': return Columns;
      default: return BookOpen;
    }
  };

  if (selectedArea) {
    return (
      <div className="animate-fadeIn">
        <button 
          onClick={() => handleSetSelectedArea(null)}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors group w-fit"
        >
          <div className="p-2 rounded-full bg-gray-100 dark:bg-brand-darkBorder group-hover:bg-brand-primary/10 transition-colors">
            <ChevronLeft size={18} />
          </div>
          <span className="font-medium">Voltar para Áreas</span>
        </button>

        <header className="mb-8 md:mb-12">
          <div className="w-24 h-24 md:w-32 md:h-32 mb-4">
            <img 
              src={selectedArea.headerImage} 
              alt={selectedArea.title} 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-2">
            {selectedArea.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Selecione a matéria para tirar sua dúvida</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {selectedArea.subjects.map((subject) => {
            const Icon = getSubjectIcon(subject);
            return (
              <button
                key={subject}
                onClick={() => onSelectSubject(selectedArea.id, subject)}
                className="group relative bg-white dark:bg-brand-darkSurface aspect-square rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center overflow-hidden border-2 border-transparent hover:border-brand-primary"
              >
                {/* Animated Background Fill - Organic/Wavy expansion */}
                <div className="absolute -bottom-[20%] -right-[20%] w-0 h-0 bg-brand-primary rounded-full transition-all duration-700 ease-in-out group-hover:w-[300%] group-hover:h-[300%] z-0" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-4 p-4 w-full h-full">
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-brand-darkBorder group-hover:bg-white/10 transition-colors duration-300">
                    <Icon size={40} className="text-gray-700 dark:text-gray-200 group-hover:text-[var(--brand-primary-foreground)] transition-colors duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider text-center group-hover:text-[var(--brand-primary-foreground)] transition-colors duration-300">
                    {subject}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-2">
          Olá, Gabriel! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Qual área do conhecimento vamos explorar hoje?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start justify-center justify-items-center">
        {areas.map((area) => (
          <div key={area.id} className="flex flex-col gap-5 w-full max-w-[380px]">
            <button
              onClick={() => {
                if (area.id === KnowledgeArea.REDACAO) {
                  onSelectSubject(area.id, 'Redação');
                } else {
                  handleSetSelectedArea(area);
                }
              }}
              className="group relative bg-white dark:bg-brand-darkSurface rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-current overflow-hidden aspect-[345/250] w-full p-0"
              style={{ color: area.id === KnowledgeArea.REDACAO ? '#38BDF8' : area.color.replace('bg-', 'text-').replace('-500', '') }}
            >
              <img 
                src={area.image} 
                alt={area.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Background Glow */}
              <div className={`absolute -right-8 -top-8 w-40 h-40 rounded-full ${area.color} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 blur-2xl`} />
            </button>
            <div className="px-6 text-center md:text-left">
              <h3 className="text-2xl font-bold text-brand-black dark:text-white group-hover:text-current transition-colors">
                {area.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {area.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hub;
