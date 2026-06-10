import React, { useMemo, useState } from 'react';
import { HistoryItem, KnowledgeArea } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  ReferenceLine,
  Dot
} from 'recharts';
import { TrendingUp, AlertCircle, Award, Filter, ChevronDown } from 'lucide-react';

interface EvolutionChartProps {
  history: HistoryItem[];
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ history }) => {
  const [selectedArea, setSelectedArea] = useState<KnowledgeArea | 'ALL'>(KnowledgeArea.REDACAO);
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');

  const subjectsByArea: Record<KnowledgeArea, string[]> = {
    [KnowledgeArea.BASIC]: [],
    [KnowledgeArea.REDACAO]: ['Redação'],
    [KnowledgeArea.EXATAS]: ['Matemática'],
    [KnowledgeArea.NATUREZA]: ['Biologia', 'Química', 'Física'],
    [KnowledgeArea.HUMANAS]: ['História', 'Geografia', 'Filosofia', 'Sociologia'],
    [KnowledgeArea.LINGUAGENS]: ['Português', 'Literatura', 'Inglês', 'Espanhol'],
  };

  // Process data: sort by date and filter valid scores
  const data = useMemo(() => {
    return [...history]
      .filter(item => item.status === 'Corrigido' && typeof item.score === 'number')
      .filter(item => selectedArea === 'ALL' || item.area === selectedArea)
      .filter(item => selectedSubject === 'ALL' || item.subject === selectedSubject)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        id: item.id,
        date: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        fullDate: new Date(item.date).toLocaleDateString('pt-BR'),
        score: item.score || 0,
        topic: item.topic,
        subject: item.subject
      }));
  }, [history, selectedArea, selectedSubject]);

  // Calculate stats
  const averageScore = useMemo(() => {
    if (data.length === 0) return 0;
    const total = data.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(total / data.length);
  }, [data]);

  const maxScore = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.max(...data.map(d => d.score));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-white dark:bg-brand-darkSurface p-3 md:p-4 rounded-2xl shadow-xl border border-brand-primary/20 backdrop-blur-sm z-50">
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-1">{point.fullDate} • {point.subject}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-brand-primary">{point.score}</span>
            <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-full font-bold">Pontos</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 max-w-[150px] md:max-w-[200px] line-clamp-2">
            {point.topic}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isHigh = payload.score >= 900;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={isHigh ? 5 : 3} 
        fill={isHigh ? "var(--brand-primary)" : "#fff"} 
        stroke="var(--brand-primary)" 
        strokeWidth={2} 
        className="transition-all duration-300 hover:r-6 cursor-pointer"
      />
    );
  };

  return (
    <div className="w-full animate-fadeIn space-y-6 md:space-y-8">
      
      {/* Filter Bar */}
      <div className="bg-white dark:bg-brand-darkSurface p-4 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-400 mr-2">
          <Filter size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">Filtros</span>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative group min-w-[160px]">
            <select 
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value as any);
                setSelectedSubject('ALL');
              }}
              className="w-full appearance-none bg-gray-50 dark:bg-brand-darkBg border-2 border-transparent focus:border-brand-primary rounded-xl px-4 py-2 text-sm font-bold text-brand-black dark:text-white outline-none cursor-pointer"
            >
              <option value="ALL">Todas as Áreas</option>
              <option value={KnowledgeArea.REDACAO}>Redação</option>
              <option value={KnowledgeArea.EXATAS}>Exatas</option>
              <option value={KnowledgeArea.NATUREZA}>Natureza</option>
              <option value={KnowledgeArea.HUMANAS}>Humanas</option>
              <option value={KnowledgeArea.LINGUAGENS}>Linguagens</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {selectedArea !== 'ALL' && (
            <div className="relative group min-w-[160px]">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full appearance-none bg-gray-50 dark:bg-brand-darkBg border-2 border-transparent focus:border-brand-primary rounded-xl px-4 py-2 text-sm font-bold text-brand-black dark:text-white outline-none cursor-pointer"
              >
                <option value="ALL">Todas as Matérias</option>
                {subjectsByArea[selectedArea as KnowledgeArea].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>

        <div className="ml-auto text-xs text-gray-400 font-medium">
          Exibindo {data.length} resultados
        </div>
      </div>

      {data.length === 0 ? (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white dark:bg-brand-darkSurface rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder">
          <div className="bg-brand-primary/10 p-6 md:p-8 rounded-full mb-6">
            <TrendingUp size={48} className="text-brand-primary md:w-16 md:h-16" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white mb-3">Sem dados para este filtro</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-base md:text-lg leading-relaxed px-4">
            Tente mudar os filtros ou envie novas atividades para ver sua evolução nesta área!
          </p>
        </div>
      ) : (
        <>
          {/* Header Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white dark:bg-brand-darkSurface p-5 md:p-6 rounded-[2rem] shadow-sm border border-transparent hover:border-brand-primary/20 transition-all flex items-center gap-4">
              <div className="p-3 md:p-4 bg-brand-primary/10 rounded-2xl text-brand-primary">
                <TrendingUp size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Média Geral</p>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white">{averageScore}</h3>
              </div>
            </div>
            
            <div className="bg-white dark:bg-brand-darkSurface p-5 md:p-6 rounded-[2rem] shadow-sm border border-transparent hover:border-brand-primary/20 transition-all flex items-center gap-4">
              <div className="p-3 md:p-4 bg-green-100 dark:bg-green-900/20 rounded-2xl text-green-600 dark:text-green-400">
                <Award size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Maior Nota</p>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white">{maxScore}</h3>
              </div>
            </div>

            <div className="bg-white dark:bg-brand-darkSurface p-5 md:p-6 rounded-[2rem] shadow-sm border border-transparent hover:border-brand-primary/20 transition-all flex items-center gap-4">
              <div className="p-3 md:p-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
                <AlertCircle size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Atividades</p>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white">{data.length}</h3>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-white dark:bg-brand-darkSurface p-4 md:p-10 rounded-[2.5rem] shadow-lg shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-brand-darkBorder h-[300px] md:h-[550px] relative flex flex-col">
            <h2 className="text-lg md:text-xl font-bold text-brand-black dark:text-white mb-4 md:mb-6 pl-2">Desempenho no Tempo</h2>
            
            <div className="flex-1 w-full overflow-x-auto custom-scrollbar">
              <div style={{ width: `${Math.max(100, data.length * 80)}%`, height: '100%', minWidth: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      stroke="#E5E7EB" 
                      className="opacity-50 dark:opacity-10"
                    />
                    
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
                      dy={10}
                      interval="preserveStartEnd"
                    />
                    
                    <YAxis 
                      domain={[0, selectedArea === KnowledgeArea.REDACAO ? 1050 : 110]} 
                      hide={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
                      dx={-10}
                      ticks={selectedArea === KnowledgeArea.REDACAO ? [0, 200, 400, 600, 800, 1000] : [0, 20, 40, 60, 80, 100]}
                    />
                    
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={{ stroke: 'var(--brand-primary)', strokeWidth: 1, strokeDasharray: '4 4' }} 
                    />

                    {selectedArea === KnowledgeArea.REDACAO && (
                      <ReferenceLine y={1000} stroke="#10B981" strokeDasharray="3 3" label={{ position: 'top', value: '1000', fill: '#10B981', fontSize: 10, fontWeight: 'bold' }} />
                    )}
                    
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="var(--brand-primary)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--brand-primary)' }}
                      dot={<CustomDot />}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EvolutionChart;