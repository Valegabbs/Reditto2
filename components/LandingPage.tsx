import React from 'react';
import { Tab } from '../types';
import { Sparkles, GraduationCap, CheckCircle2, TrendingUp, Award, Clock, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onNavigate: (tab: Tab, slug?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onNavigate }) => {
  return (
    <article className="animate-fadeIn w-full max-w-6xl mx-auto py-6 space-y-16">
      
      {/* Hero Banner Section */}
      <section className="bg-white dark:bg-brand-darkSurface px-6 py-12 md:py-20 rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder relative overflow-hidden transition-colors duration-300">
        
        {/* Decorative ambient background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 rounded-full border border-brand-primary/20">
            <Sparkles size={16} className="text-brand-primary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Corretor de Redação com IA Integrado</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-brand-black dark:text-white leading-tight tracking-tight">
            Escreva melhor, alcance a <span className="text-brand-primary">Nota 1000</span> no ENEM
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-semibold">
            Nossa plataforma utiliza a tecnologia oficial do Google Gemini para avaliar e corrigir sua redação instantaneamente de acordo com as 5 diretrizes do INEP. Receba notas e dicas didáticas completas na hora!
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onEnterApp}
              className="px-8 py-5 bg-brand-primary text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-brand-primaryHover transition-all shadow-xl shadow-brand-primary/25 hover:scale-105 active:scale-95"
            >
              Começar Correção Grátis (App)
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate(Tab.COMO_FUNCIONA)}
              className="px-8 py-5 bg-gray-50 dark:bg-brand-darkBg text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-brand-darkBorder transition-all border border-gray-100 dark:border-brand-darkBorder"
            >
              Ver Como Funciona
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-gray-50 dark:border-brand-darkBorder max-w-3xl mx-auto">
            <div>
              <p className="text-2xl md:text-3xl font-black text-brand-black dark:text-white">100%</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Conforme ENEM</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-brand-black dark:text-white">&lt; 15s</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Correção Instantânea</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-brand-black dark:text-white">Grátis</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Sustentado por Anúncios</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-brand-black dark:text-white">LGPD</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Total Segurança</p>
            </div>
          </div>

        </div>
      </section>

      {/* Structured Value Proposition: E-E-A-T Content block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6">
        <div className="space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Qualidade e Compromisso Escolar</span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-black dark:text-white tracking-tight leading-tight">
            Por que confiar na nossa correção pedagógica automatizada?
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
            Ao contrário de corretores genéricos de texto, o Donome foi desenhado especificamente em concordância com a cartilha de redação oficial do ENEM de 2024 a 2026.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="p-1 px-2 bg-emerald-500/10 text-emerald-500 rounded-xl mt-1 shrink-0"><CheckCircle2 size={16} /></span>
              <div>
                <p className="font-bold text-sm text-brand-black dark:text-white">Avaliação pelas 5 Competências INEP</p>
                <p className="text-xs text-gray-400 mt-0.5">O sistema analisa separadamente de 0 a 200 pontos cada competência básica exigida.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="p-1 px-2 bg-emerald-500/10 text-emerald-500 rounded-xl mt-1 shrink-0"><CheckCircle2 size={16} /></span>
              <div>
                <p className="font-bold text-sm text-brand-black dark:text-white">Orientação Didática e Proposta de Intervenção</p>
                <p className="text-xs text-gray-400 mt-0.5">Diagnósticos minuciosos sobre o seu rascunho de texto e recomendações do que consertar de imediato.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="p-1 px-2 bg-emerald-500/10 text-emerald-500 rounded-xl mt-1 shrink-0"><CheckCircle2 size={16} /></span>
              <div>
                <p className="font-bold text-sm text-brand-black dark:text-white">Gráficos de Evolução Diária</p>
                <p className="text-xs text-gray-400 mt-0.5">Acompanhe graficamente se a sua Nota Geral está subindo e quais competências exigem maiores treinos.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Visual Mock / Feature Presentation */}
        <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[3rem] border border-gray-100 dark:border-brand-darkBorder space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-50 dark:border-brand-darkBorder pb-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-sm font-black text-brand-black dark:text-white">Simulador de Notas Oficiais</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Apoiado por Inteligência Artifical</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold">
              <span>Nota Simulada Geral</span>
              <span className="text-emerald-500 text-lg">920 / 1000</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-bold">
                <span>Comp. I - Norma Culta</span>
                <span>160</span>
              </div>
              <div className="w-full bg-gray-50 dark:bg-brand-darkBg h-2.5 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-bold">
                <span>Comp. IV - Coesão e Repertório</span>
                <span>200</span>
              </div>
              <div className="w-full bg-gray-50 dark:bg-brand-darkBg h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-bold">
                <span>Comp. V - Intervenção de Cidadania</span>
                <span>160</span>
              </div>
              <div className="w-full bg-gray-50 dark:bg-brand-darkBg h-2.5 rounded-full overflow-hidden">
                <div className="bg-brand-primary h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-4 text-center">
            * Dados simulados ilustrando como sua redação é destrinchada graficamente em nosso painel.
          </p>
        </div>
      </section>

      {/* Multidisciplinary Tutoring Block (Why SaaS is multi-value) */}
      <section className="bg-brand-blueLight dark:bg-brand-darkSurface/50 p-10 md:p-16 rounded-[3.5rem] border border-brand-primary/10 grid grid-cols-1 md:grid-cols-3 gap-8 transition-colors duration-300">
        
        <div className="space-y-4 md:col-span-1 justify-center flex flex-col">
          <span className="p-3.5 bg-brand-primary/10 rounded-2xl text-brand-primary inline-block w-max">
            <TrendingUp size={28} />
          </span>
          <h3 className="text-2xl font-black text-brand-black dark:text-white tracking-tight">Estudos Completos</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
            Nossa plataforma vai além de redação escolar. Desenvolvemos o suporte de tutoria inteligente para sanar dúvidas nas demais grandes áreas de conhecimento do ENEM.
          </p>
        </div>

        <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4 shadow-sm md:col-span-1">
          <h4 className="font-bold text-lg text-brand-black dark:text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            Matérias Integradas (Exatas)
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            Consulte tópicos essenciais de Matemática, Química, Física e Biologia. Receba resoluções passo a passo, conceitos base para gabaritar e teorias essenciais.
          </p>
        </div>

        <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4 shadow-sm md:col-span-1">
          <h4 className="font-bold text-lg text-brand-black dark:text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            História e Filosofia (Humanas)
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            Turbine o seu repertório sociocultural. Faça perguntas diretas à nossa inteligência artificial sobre escolas literárias, governos provisórios ou sociólogos renomados de forma rápida.
          </p>
        </div>
      </section>

      {/* Directory CTA of Institutional Links / SEO Links */}
      <section className="text-center space-y-4 py-6">
        <h3 className="text-xl font-bold text-brand-black dark:text-white">Confira as ferramentas e diretórios do portal:</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate(Tab.FAQ)} 
            className="px-5 py-2.5 bg-white dark:bg-brand-darkSurface hover:bg-gray-50 dark:hover:bg-brand-darkBorder border border-gray-100 dark:border-brand-darkBorder rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all"
          >
            Acessar FAQ
          </button>
          <button 
            onClick={() => onNavigate(Tab.BLOG)} 
            className="px-5 py-2.5 bg-white dark:bg-brand-darkSurface hover:bg-gray-50 dark:hover:bg-brand-darkBorder border border-gray-100 dark:border-brand-darkBorder rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all"
          >
            Dicas & Blog
          </button>
          <button 
            onClick={() => onNavigate(Tab.COMO_FUNCIONA)} 
            className="px-5 py-2.5 bg-white dark:bg-brand-darkSurface hover:bg-gray-50 dark:hover:bg-brand-darkBorder border border-gray-100 dark:border-brand-darkBorder rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all"
          >
            Como Corrigimos
          </button>
          <button 
            onClick={() => onNavigate(Tab.SOBRE_NOS)} 
            className="px-5 py-2.5 bg-white dark:bg-brand-darkSurface hover:bg-gray-50 dark:hover:bg-brand-darkBorder border border-gray-100 dark:border-brand-darkBorder rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-all"
          >
            Quem Somos
          </button>
        </div>
      </section>

    </article>
  );
};

export default LandingPage;
