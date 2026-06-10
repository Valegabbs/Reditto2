import React from 'react';
import { Award, ArrowLeft, Download, Share2, Lightbulb, BookOpen, CheckCircle2, Target, Sparkles, MessageSquare } from 'lucide-react';
import { HistoryItem, KnowledgeArea, EssaySubmission } from '../types';
import Logo from './Logo';

interface ResultsPageProps {
  essay: HistoryItem;
  onBack: () => void;
  onTryLongResponse?: (submission: EssaySubmission, area: KnowledgeArea, subject: string) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ essay, onBack, onTryLongResponse }) => {
  if (!essay) return null;

  const isRedacao = essay.area === KnowledgeArea.REDACAO;

  // Area Colors Mapping
  const areaColors: Record<KnowledgeArea, string> = {
    [KnowledgeArea.EXATAS]: 'bg-purple-600',
    [KnowledgeArea.NATUREZA]: 'bg-emerald-600',
    [KnowledgeArea.HUMANAS]: 'bg-orange-600',
    [KnowledgeArea.LINGUAGENS]: 'bg-rose-600',
    [KnowledgeArea.REDACAO]: 'bg-brand-primary',
    [KnowledgeArea.BASIC]: 'bg-gray-600',
  };

  const areaTextColors: Record<KnowledgeArea, string> = {
    [KnowledgeArea.EXATAS]: 'text-purple-600',
    [KnowledgeArea.NATUREZA]: 'text-emerald-600',
    [KnowledgeArea.HUMANAS]: 'text-orange-600',
    [KnowledgeArea.LINGUAGENS]: 'text-rose-600',
    [KnowledgeArea.REDACAO]: 'text-brand-primary',
    [KnowledgeArea.BASIC]: 'text-gray-600',
  };

  const areaBorderColors: Record<KnowledgeArea, string> = {
    [KnowledgeArea.EXATAS]: 'border-purple-100 dark:border-purple-500/20',
    [KnowledgeArea.NATUREZA]: 'border-emerald-100 dark:border-emerald-500/20',
    [KnowledgeArea.HUMANAS]: 'border-orange-100 dark:border-orange-500/20',
    [KnowledgeArea.LINGUAGENS]: 'border-rose-100 dark:border-rose-500/20',
    [KnowledgeArea.REDACAO]: 'border-brand-primary/20 dark:border-brand-primary/20',
    [KnowledgeArea.BASIC]: 'border-gray-100 dark:border-gray-500/20',
  };

  const areaLightBgColors: Record<KnowledgeArea, string> = {
    [KnowledgeArea.EXATAS]: 'bg-purple-50 dark:bg-purple-500/5',
    [KnowledgeArea.NATUREZA]: 'bg-emerald-50 dark:bg-emerald-500/5',
    [KnowledgeArea.HUMANAS]: 'bg-orange-50 dark:bg-orange-500/5',
    [KnowledgeArea.LINGUAGENS]: 'bg-rose-50 dark:bg-rose-500/5',
    [KnowledgeArea.REDACAO]: 'bg-brand-primary/5 dark:bg-brand-primary/5',
    [KnowledgeArea.BASIC]: 'bg-gray-50 dark:bg-gray-500/5',
  };

  const accentColor = areaColors[essay.area] || 'bg-brand-primary';
  const accentText = areaTextColors[essay.area] || 'text-brand-primary';
  const accentBorder = areaBorderColors[essay.area] || 'border-brand-primary/20';
  const accentLightBg = areaLightBgColors[essay.area] || 'bg-brand-primary/5';

  const getLogoSrc = (area: KnowledgeArea) => {
    switch (area) {
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
        return "https://lh3.googleusercontent.com/d/1DzALlQVyslL5djn1at5Cy58fxyRop1lt";
    }
  };

  // Redação specific logic
  if (isRedacao && essay.correction) {
    const { correction } = essay;
    const feedback = correction.feedback || {
      summary: '',
      improvements: [],
      attention: [],
      congratulations: [],
      competencyFeedback: {} as any
    };
    const competencies = correction.competencies || {};
    const finalScore = correction.finalScore || essay.score || 0;
    const topic = correction.topic || essay.topic;
    const originalEssay = correction.originalEssay;

    return (
      <div className="animate-fadeIn w-full max-w-6xl mx-auto pb-20 px-4">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <button 
              onClick={onBack}
              className="p-4 bg-white dark:bg-brand-darkSurface rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-brand-darkBorder transition-all text-gray-500 dark:text-gray-300 group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-brand-black dark:text-white tracking-tight">Análise Detalhada</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avaliação processada em {new Date(essay.date).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-brand-darkSurface rounded-2xl shadow-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-brand-darkBorder transition-all border border-gray-100 dark:border-brand-darkBorder">
              <Download size={20} />
              Exportar PDF
            </button>
            <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 ${accentColor} text-white rounded-2xl shadow-xl shadow-brand-primary/20 font-bold hover:opacity-90 transition-all transform active:scale-95`}>
              <Share2 size={20} />
              Compartilhar
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Summary & Score (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Topic Card */}
            <div className="bg-white dark:bg-brand-darkSurface p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 ${accentColor} opacity-5 rounded-full -mr-16 -mt-16 blur-3xl`} />
              <span className={`text-xs font-black ${accentText} uppercase tracking-[0.2em] mb-4 block`}>Tema Proposto</span>
              <h2 className="text-2xl md:text-3xl font-black text-brand-black dark:text-white leading-[1.1] tracking-tight">
                {topic || essay.topic}
              </h2>
            </div>

            {/* Original Essay Section */}
            {originalEssay && (
              <div className="bg-white dark:bg-brand-darkSurface p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-brand-darkBg flex items-center justify-center text-gray-400">
                    <Download size={20} className="rotate-180" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black dark:text-white">Seu Texto</h3>
                </div>
                <div className="bg-gray-50 dark:bg-brand-darkBg/50 p-8 rounded-[2rem] border border-gray-100 dark:border-brand-darkBorder">
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-serif leading-relaxed italic text-lg opacity-90">
                    {originalEssay}
                  </div>
                </div>
              </div>
            )}

            {/* Summary & Feedback Sections */}
            <div className="bg-white dark:bg-brand-darkSurface p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder space-y-10">
              <div>
                <div className={`flex items-center gap-3 mb-6 ${accentText}`}>
                  <Award size={28} />
                  <h3 className="text-2xl font-black tracking-tight">Resumo da Avaliação</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xl font-medium opacity-90">
                  {feedback.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Congratulations */}
                <div className="p-8 bg-emerald-50 dark:bg-emerald-500/5 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-500/10 group hover:bg-emerald-100/50 dark:hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center gap-3 mb-5 text-emerald-600 dark:text-emerald-400 font-black uppercase text-xs tracking-widest">
                    <CheckCircle2 size={20} />
                    <span>Pontos Fortes</span>
                  </div>
                  <ul className="space-y-4">
                    {(feedback.congratulations || []).map((item, i) => (
                      <li key={i} className="text-sm text-emerald-800 dark:text-emerald-300/80 flex gap-3 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attention */}
                <div className="p-8 bg-amber-50 dark:bg-amber-500/5 rounded-[2.5rem] border border-amber-100 dark:border-amber-500/10 group hover:bg-amber-100/50 dark:hover:bg-amber-500/10 transition-colors">
                  <div className="flex items-center gap-3 mb-5 text-amber-600 dark:text-amber-400 font-black uppercase text-xs tracking-widest">
                    <Target size={20} />
                    <span>Atenção</span>
                  </div>
                  <ul className="space-y-4">
                    {(feedback.attention || []).map((item, i) => (
                      <li key={i} className="text-sm text-amber-800 dark:text-amber-300/80 flex gap-3 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className={`p-8 ${accentLightBg} rounded-[2.5rem] border ${accentBorder} group hover:opacity-80 transition-colors`}>
                  <div className={`flex items-center gap-3 mb-5 ${accentText} font-black uppercase text-xs tracking-widest`}>
                    <Lightbulb size={20} />
                    <span>Melhorias</span>
                  </div>
                  <ul className="space-y-4">
                    {(feedback.improvements || []).map((item, i) => (
                      <li key={i} className={`text-sm ${accentText} opacity-80 flex gap-3 leading-snug`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${accentColor} mt-1.5 shrink-0`} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Competencies Detail */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-6">
                <h3 className="text-3xl font-black text-brand-black dark:text-white tracking-tight">Competências ENEM</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {Object.entries(competencies).map(([name, score]) => (
                  <div key={name} className={`bg-white dark:bg-brand-darkSurface p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder group hover:${accentBorder} transition-all duration-500`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                       <div className="max-w-xl">
                         <h4 className={`text-2xl font-black text-brand-black dark:text-white group-hover:${accentText} transition-colors mb-2`}>
                           {name}
                         </h4>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed">
                           {name === 'Competência I' ? 'Domínio da norma culta da língua escrita' :
                            name === 'Competência II' ? 'Compreender a proposta e aplicar conceitos de várias áreas' :
                            name === 'Competência III' ? 'Selecionar, relacionar, organizar e interpretar informações' :
                            name === 'Competência IV' ? 'Conhecimento dos mecanismos linguísticos para argumentação' :
                            'Elaborar proposta de intervenção para o problema abordado'}
                         </p>
                       </div>
                       <div className={`${accentLightBg} px-8 py-4 rounded-[2rem] text-center min-w-[140px] border ${accentBorder}`}>
                         <span className={`text-4xl font-black ${accentText} tracking-tighter`}>{score}</span>
                         <span className={`text-xs ${accentText} opacity-60 font-bold ml-1`}>/ 200</span>
                       </div>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="w-full bg-gray-100 dark:bg-brand-darkBg h-4 rounded-full overflow-hidden mb-8 p-1">
                      <div 
                        className={`h-full ${accentColor} rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(56,189,248,0.5)]`} 
                        style={{ width: `${((score as number) / 200) * 100}%` }}
                      />
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-brand-darkBg/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder relative">
                      <div className={`absolute top-4 left-4 opacity-5 ${accentText}`}>
                        <Award size={40} />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-lg relative z-10">
                        {feedback.competencyFeedback[name as keyof typeof feedback.competencyFeedback] || "Sem feedback específico para esta competência."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Score Card & Tips (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Final Score Card */}
            <div className={`${accentColor} p-12 rounded-[4rem] shadow-2xl shadow-brand-primary/30 text-white text-center relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl" />
              
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 relative z-10 opacity-80">Pontuação Total</h3>
              <div className="relative inline-block mb-10">
                <div className="w-56 h-56 rounded-full border-[12px] border-white/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                  <span className="text-8xl font-black tracking-tighter leading-none">{finalScore}</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-brand-primary w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black shadow-2xl transform rotate-12">
                  1k
                </div>
              </div>
              
              <div className="space-y-2 relative z-10">
                <p className="text-white text-2xl font-black tracking-tight">
                  {finalScore >= 900 ? 'Elite!' : 
                   finalScore >= 700 ? 'Ótimo!' :
                   finalScore >= 500 ? 'Bom!' : 'Pratique!'}
                </p>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Nível Avançado</p>
              </div>
            </div>

            {/* Study Tips Card */}
            <div className="bg-white dark:bg-brand-darkSurface p-10 rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder sticky top-8">
              <h3 className="text-2xl font-black text-brand-black dark:text-white mb-8 flex items-center gap-3">
                <Lightbulb className={accentText} size={28} />
                Plano de Ação
              </h3>
              
              <div className="space-y-6">
                {feedback.improvements.slice(0, 2).map((tip, i) => (
                  <div key={i} className={`p-6 bg-gray-50 dark:bg-brand-darkBg rounded-[2rem] border border-gray-100 dark:border-brand-darkBorder group hover:${accentBorder} transition-all`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{tip}</p>
                  </div>
                ))}
              </div>

              <button className={`w-full mt-10 py-5 rounded-[2rem] bg-brand-black dark:${accentColor} text-white font-black text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-brand-black/10 dark:shadow-brand-primary/20 transform active:scale-95`}>
                Refazer Redação
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tutoring specific logic
  if (essay.tutoring) {
    const { tutoring } = essay;
    const isShort = tutoring.responseLength === 'short';

    return (
      <div className="animate-fadeIn w-full max-w-5xl mx-auto pb-20 px-4">
        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <button 
            onClick={onBack}
            className="p-4 bg-white dark:bg-brand-darkSurface rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-brand-darkBorder transition-all text-gray-500 dark:text-gray-300 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-brand-black dark:text-white tracking-tight">Resposta da Tutoria</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{essay.subject} • {new Date(essay.date).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Topic Card */}
          <div className={`p-8 md:p-10 rounded-[3rem] shadow-sm border relative overflow-hidden ${accentLightBg} ${accentBorder}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 blur-3xl ${accentColor}`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 block opacity-70 ${accentText}`}>Tópico Identificado</span>
            <h2 className="text-2xl md:text-3xl font-black leading-[1.1] tracking-tight">
              {tutoring.topic}
            </h2>
          </div>

          {/* Chat-like Interaction */}
          <div className="space-y-12">
            {/* User Question */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-gray-100 dark:bg-brand-darkBorder p-6 rounded-[2rem] rounded-tr-none shadow-sm">
                <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
                  {essay.originalSubmission?.content || essay.topic}
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start gap-4 md:gap-6">
              <div className="shrink-0 pt-2">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-white dark:bg-brand-darkSurface shadow-md border ${accentBorder}`}>
                  <Logo src={getLogoSrc(essay.area)} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>
              </div>
              
              <div className="flex-1 space-y-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg md:text-xl font-medium opacity-95 whitespace-pre-wrap">
                    {tutoring.explanation}
                  </div>
                </div>

                {/* Key Points Section within Chat */}
                <div className="pt-10 border-t border-gray-100 dark:border-brand-darkBorder">
                   <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 opacity-60">
                     <CheckCircle2 size={18} className="text-emerald-500" />
                     Pontos Importantes
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {tutoring.keyPoints.map((point, i) => (
                       <div key={i} className={`p-5 rounded-2xl border ${accentBorder} ${accentLightBg} flex gap-3 shadow-sm`}>
                         <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${accentColor}`} />
                         <p className="text-sm md:text-base font-medium opacity-80">{point}</p>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Suggested Next Steps */}
                <div className="pt-2">
                   <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 opacity-60">
                     <Target size={18} className={accentText} />
                     Sugestão de Estudo
                   </h4>
                   <div className="flex flex-wrap gap-3">
                     {tutoring.suggestedNextSteps.map((step, i) => (
                       <span key={i} className="px-5 py-2.5 bg-gray-50 dark:bg-brand-darkBg rounded-full text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-brand-darkBorder hover:bg-gray-100 transition-colors">
                         {step}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Try Long Response Button */}
          {isShort && onTryLongResponse && essay.originalSubmission && (
            <div className="pt-10 flex flex-col items-center text-center gap-6">
              <div className="space-y-2">
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Você pode entender melhor essa questão, com uma resposta longa, caso a curta não tenha sido o suficiente!
                </p>
                <button
                  onClick={() => onTryLongResponse({ ...essay.originalSubmission!, responseLength: 'long' }, essay.area, essay.subject)}
                  className={`flex items-center gap-3 px-10 py-5 rounded-[2rem] ${accentColor} text-white font-black text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl shadow-brand-primary/20 transform active:scale-95`}
                >
                  <MessageSquare size={20} />
                  Tentar Resposta Longa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ResultsPage;
