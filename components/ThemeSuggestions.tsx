import React, { useMemo } from 'react';
import { BookOpen, Copy, ArrowRight, Clock } from 'lucide-react';

interface ThemeSuggestionsProps {
  onSelectTheme: (theme: string) => void;
}

// 30 Static Themes
const THEMES_LIST = [
  "A persistência da violência contra a mulher na sociedade brasileira",
  "Desafios para a formação educacional de surdos no Brasil",
  "Manipulação do comportamento do usuário pelo controle de dados na internet",
  "Democratização do acesso ao cinema no Brasil",
  "O estigma associado às doenças mentais na sociedade brasileira",
  "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil",
  "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
  "A inteligência artificial e os impactos no mercado de trabalho",
  "Caminhos para combater a intolerância religiosa no Brasil",
  "A questão do lixo e a sustentabilidade ambiental",
  "O combate ao trabalho escravo contemporâneo",
  "A importância da vacinação para a saúde pública",
  "Efeitos da polarização política nas relações sociais",
  "O papel do esporte na inclusão social",
  "Desafios do sistema carcerário brasileiro",
  "A crise hídrica e o consumo consciente de água",
  "O impacto dos influenciadores digitais na formação dos jovens",
  "Mobilidade urbana e o direito à cidade",
  "A preservação da Amazônia e a soberania nacional",
  "O envelhecimento da população brasileira e seus desafios",
  "A educação financeira como ferramenta de cidadania",
  "Combate ao bullying e ao cyberbullying nas escolas",
  "A cultura do cancelamento e a liberdade de expressão",
  "Obesidade infantil: uma questão de saúde pública",
  "O acesso à literatura como direito humano",
  "Os desafios da adoção no Brasil",
  "Turismo sustentável e preservação do patrimônio",
  "A precarização do trabalho na era dos aplicativos",
  "Segurança alimentar e combate à fome",
  "O papel da ciência no desenvolvimento do país"
];

const ThemeSuggestions: React.FC<ThemeSuggestionsProps> = ({ onSelectTheme }) => {

  const dailyThemes = useMemo(() => {
    // Logic to select 3 themes based on Date and 10:00 AM Brasília Time
    const now = new Date();
    
    // Get current time in Brasília Time
    const brazilTimeStr = now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    const brazilDate = new Date(brazilTimeStr);
    
    // If it's before 10:00 AM, consider it "yesterday" for rotation purposes
    // This ensures the update happens exactly at 10 AM
    if (brazilDate.getHours() < 10) {
      brazilDate.setDate(brazilDate.getDate() - 1);
    }
    
    // Create a seed based on the date (Day + Month + Year)
    // This creates a deterministic integer for the "logical day"
    const seed = brazilDate.getDate() + (brazilDate.getMonth() * 31) + (brazilDate.getFullYear() * 365);
    
    // Pseudo-random selection based on seed
    const indices: number[] = [];
    let currentSeed = seed;
    
    // Simple Linear Congruential Generator logic for 3 unique numbers
    while (indices.length < 3) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const index = Math.floor(currentSeed) % THEMES_LIST.length;
      if (!indices.includes(index)) {
        indices.push(index);
      }
    }
    
    return indices.map(i => THEMES_LIST[i]);
  }, []);

  return (
    <div className="w-full animate-fadeIn max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-blue text-white rounded-xl">
             <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand-black dark:text-white">Temas Sugeridos</h2>
            <p className="text-gray-500 dark:text-gray-400">Sugestões diárias para você praticar</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-brand-blueLight dark:bg-brand-darkSurface px-4 py-2 rounded-full text-brand-blue text-sm font-bold">
            <Clock size={16} />
            <span>Atualiza às 10:00 (Brasília)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dailyThemes.map((theme, idx) => (
          <div 
            key={idx}
            className="group relative bg-white dark:bg-brand-darkSurface p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-brand-blue/20 flex flex-col justify-between h-[300px]"
          >
            <div>
                <span className="inline-block px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-lg text-xs font-bold mb-4 uppercase tracking-wider">
                    Opção {idx + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight mb-4 group-hover:text-brand-blue transition-colors">
                    "{theme}"
                </h3>
            </div>
            
            <div className="mt-auto">
                <button
                    onClick={() => onSelectTheme(theme)}
                    className="w-full py-3 bg-gray-50 dark:bg-brand-darkBg group-hover:bg-brand-blue text-gray-600 dark:text-gray-300 group-hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                    <span>Escrever sobre</span>
                    <ArrowRight size={18} />
                </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Fallback info */}
      <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Já escreveu sobre todos? Volte amanhã para novos desafios!
          </p>
      </div>
    </div>
  );
};

export default ThemeSuggestions;