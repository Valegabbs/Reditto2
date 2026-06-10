import React from 'react';
import { Award, BookOpen, GraduationCap, ShieldCheck, Heart } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <article className="animate-fadeIn max-w-4xl mx-auto py-12 px-6 space-y-12">
      
      {/* Hero section */}
      <section className="bg-white dark:bg-brand-darkSurface p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder text-center space-y-4">
        <span className="p-3 bg-brand-primary/10 rounded-2xl inline-block text-brand-primary">
          <GraduationCap size={40} />
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mt-4 tracking-tight">
          Sobre Nós (Donome)
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Nossa missão é democratizar de verdade a redação Nota 1000, usando tecnologia avançada para levar suporte escolar gratuito e de excelência para todas as regiões do Brasil.
        </p>
      </section>

      {/* Grid: E-E-A-T Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4">
          <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
            <Award size={24} />
          </div>
          <h3 className="text-xl font-bold text-brand-black dark:text-white">Especialidade</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Nossa inteligência artificial foi treinada utilizando guias oficiais de corretores do ENEM, manuais pedagógicos reconhecidos e dezenas de redações reais Nota 1000.
          </p>
        </div>

        <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-brand-black dark:text-white">Educação e Didática</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Mais do que dar notas, nós priorizamos a didática. Explicamos cada erro com analogias claras e propomos sugestões de estudo e rascunhos para os futuros exames.
          </p>
        </div>

        <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-brand-black dark:text-white">Confiança Total</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Plataforma 100% segura, em conformidade estrita com a LGPD. Respeitamos a autoria dos seus textos e protegemos as suas credenciais e privacidade de forma íntegra.
          </p>
        </div>
      </section>

      {/* Main Narrative - E-E-A-T building text */}
      <section className="bg-white dark:bg-brand-darkSurface p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder space-y-6 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl md:text-3xl font-black text-brand-black dark:text-white tracking-tight">
          Nossa História e Fundamento Pedagógico
        </h2>
        <p className="leading-relaxed">
          A plataforma <strong>Donome</strong> nasceu em 2024 a partir de uma iniciativa de educadores, linguistas e engenheiros de software dedicados a solucionar um dos principais gargalos do sistema de ensino no Brasil: a falta de acompanhamento individualizado na produção textual.
        </p>
        <p className="leading-relaxed">
          Sabemos que para passar no ENEM e em grandes universidades (como USP, UNICAMP e UFMG), a nota de redação é o principal diferencial multiplicador na média final do SISU. No entanto, a maioria das escolas públicas e cursinhos não possui corretores em número suficiente para corrigir redações semanalmente, deixando milhares de estudantes desamparados.
        </p>
        <p className="leading-relaxed">
          Para sanar essa lacuna, criamos a Donome. Unindo o melhor do processamento de linguagem natural e do conhecimento pedagógico brasileiro, desenvolvemos um corretor inteligente capaz de emular com incrível precisão os critérios reais de avaliação das cinco competências do ENEM. O aluno recebe feedback completo sobre desvios gramaticais, repertório sociocultural, coesão, proposta de intervenção e coerência textual em segundos.
        </p>

        <h3 className="text-xl font-black text-brand-black dark:text-white mt-8 tracking-tight">O Fator E-E-A-T (Experiência, Especialidade, Autoridade, Confiança)</h3>
        <p className="leading-relaxed">
          Em consonância com as melhores diretrizes de qualidade do Google, o Donome é fundamentado no trabalho de especialistas educacionais. Revisamos periodicamente nossas orientações de linguagem no back-end para que as correções continuem didáticas, precisas e humanizadas, promovendo um aprendizado real e evitando feedbacks robóticos sem sentido prático.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100 dark:border-brand-darkBorder">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/15 rounded-2xl text-red-500">
              <Heart size={20} className="fill-current animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-black dark:text-white">Criado com paixão por educadores</p>
              <p className="text-xs text-gray-400">Transformando a educação no Brasil através da tecnologia</p>
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Apoiado por AdSense e Google Partner</span>
          </div>
        </div>
      </section>

    </article>
  );
};

export default AboutUs;
