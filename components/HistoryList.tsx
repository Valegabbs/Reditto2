import React, { useState, useMemo } from 'react';
import { HistoryItem, KnowledgeArea } from '../types';
import { ChevronRight, Filter, ChevronDown, Search } from 'lucide-react';

interface HistoryListProps {
  history: HistoryItem[];
  onSelectEssay: (essay: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectEssay }) => {
  const [selectedArea, setSelectedArea] = useState<KnowledgeArea | 'ALL'>(KnowledgeArea.REDACAO);
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const subjectsByArea: Record<KnowledgeArea, string[]> = {
    [KnowledgeArea.BASIC]: [],
    [KnowledgeArea.REDACAO]: ['Redação'],
    [KnowledgeArea.EXATAS]: ['Matemática'],
    [KnowledgeArea.NATUREZA]: ['Biologia', 'Química', 'Física'],
    [KnowledgeArea.HUMANAS]: ['História', 'Geografia', 'Filosofia', 'Sociologia'],
    [KnowledgeArea.LINGUAGENS]: ['Português', 'Literatura', 'Inglês', 'Espanhol'],
  };

  const filteredHistory = useMemo(() => {
    return history
      .filter(item => selectedArea === 'ALL' || item.area === selectedArea)
      .filter(item => selectedSubject === 'ALL' || item.subject === selectedSubject)
      .filter(item => item.topic.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [history, selectedArea, selectedSubject, searchQuery]);

  return (
    <div className="animate-fadeIn w-full max-w-4xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white">Seu Histórico</h2>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-brand-darkSurface border-2 border-transparent focus:border-brand-primary rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition-all shadow-sm"
          />
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-brand-darkSurface p-4 rounded-[2rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-gray-400 mr-2">
          <Filter size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Filtros</span>
        </div>
        
        <div className="relative group min-w-[140px]">
          <select 
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value as any);
              setSelectedSubject('ALL');
            }}
            className="w-full appearance-none bg-gray-50 dark:bg-brand-darkBg border-2 border-transparent focus:border-brand-primary rounded-xl px-4 py-2 text-xs font-bold text-brand-black dark:text-white outline-none cursor-pointer"
          >
            <option value="ALL">Todas as Áreas</option>
            <option value={KnowledgeArea.REDACAO}>Redação</option>
            <option value={KnowledgeArea.EXATAS}>Exatas</option>
            <option value={KnowledgeArea.NATUREZA}>Natureza</option>
            <option value={KnowledgeArea.HUMANAS}>Humanas</option>
            <option value={KnowledgeArea.LINGUAGENS}>Linguagens</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {selectedArea !== 'ALL' && (
          <div className="relative group min-w-[140px]">
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-brand-darkBg border-2 border-transparent focus:border-brand-primary rounded-xl px-4 py-2 text-xs font-bold text-brand-black dark:text-white outline-none cursor-pointer"
            >
              <option value="ALL">Todas as Matérias</option>
              {subjectsByArea[selectedArea as KnowledgeArea].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        )}

        <div className="ml-auto text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          {filteredHistory.length} itens encontrados
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredHistory.length === 0 ? (
          <div className="bg-white dark:bg-brand-darkSurface p-12 rounded-[2.5rem] text-center border border-dashed border-gray-200 dark:border-brand-darkBorder">
            <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhum registro encontrado para estes filtros.</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelectEssay(item)}
              className="group bg-white dark:bg-brand-darkSurface p-5 md:p-6 rounded-[2rem] flex items-center justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-brand-primary/20"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{item.subject}</span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-gray-400 text-[10px]">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <h3 className="font-bold text-base md:text-lg text-brand-black dark:text-white truncate group-hover:text-brand-primary transition-colors">{item.topic}</h3>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4 text-right flex-shrink-0">
                 <div className="flex flex-col items-end">
                   <span className={`
                     inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold mb-1
                     ${item.status === 'Corrigido' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-brand-primary text-white'}
                   `}>
                     {item.status}
                   </span>
                   {item.score !== undefined && item.status === 'Corrigido' && (
                     <div className="text-xl md:text-2xl font-bold text-brand-black dark:text-white">{item.score}</div>
                   )}
                 </div>
                 <ChevronRight className="text-gray-300 group-hover:text-brand-primary transition-colors" size={20} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;
