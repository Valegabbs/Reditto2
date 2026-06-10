import React from 'react';
import { PenTool, CheckCircle, Info, Star, Shield, ArrowRight } from 'lucide-react';

const ComoFunciona: React.FC = () => {
  return (
    <article className="animate-fadeIn max-w-4xl mx-auto py-12 px-6 space-y-12">
      
      {/* Header section */}
      <section className="bg-white dark:bg-brand-darkSurface p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Manual Operacional Pedagógico</span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mt-2 tracking-tight">
          Como Funciona a Correção por Inteligência Artificial?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
          Compreenda nos mínimos detalhes como nossa IA avançada avalia cada linha da sua redação de acordo com as diretrizes oficiais do ENEM.
        </p>
      </section>

      {/* Grid: 5 ENEM Competencies explained */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-brand-black dark:text-white tracking-tight border-b border-gray-100 dark:border-brand-darkBorder pb-4">
          As 5 Competências Avaliadas
        </h2>

        <div className="grid grid-cols-1 gap-6">
          
          <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder flex gap-6 flex-col sm:flex-row items-start shadow-sm">
            <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0 font-black text-2xl w-14 h-14 flex items-center justify-center">1</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-black dark:text-white">Competência I: Domínio da norma culta da língua escrita</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Nossa IA verifica desvios de gramática, ortografia, concordância verbal e nominal, regência, crase e acentuação gráfica. O sistema identifica as exatas palavras onde ocorreram desvios e sinaliza reformas.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder flex gap-6 flex-col sm:flex-row items-start shadow-sm">
            <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0 font-black text-2xl w-14 h-14 flex items-center justify-center">2</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-black dark:text-white">Competência II: Compreensão do tema e aplicação das áreas de conhecimento</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Análise de legibilidade sobre o tema proposto, examinando se houve fuga ou tangenciamento. Avalia a estrutura dissertativo-argumentativa e o uso de repertório sociocultural legítimo e produtivo (filósofos, dados, história).
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder flex gap-6 flex-col sm:flex-row items-start shadow-sm">
            <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0 font-black text-2xl w-14 h-14 flex items-center justify-center">3</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-black dark:text-white">Competência III: Seleção, relação, organização e interpretação de informações</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Exame profundo do projeto de texto. A IA avalia se a sua tese está evidente na introdução e se os argumentos de defesa se desenvolvem de forma lógica, sem contradições e com autoria definida.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder flex gap-6 flex-col sm:flex-row items-start shadow-sm">
            <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0 font-black text-2xl w-14 h-14 flex items-center justify-center">4</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-black dark:text-white">Competência IV: Demonstrar conhecimento dos mecanismos linguísticos (Coesão)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Nossa IA mapeia o uso de conectivos interparágrafos e intraparágrafos. Ela analisa se há repetições excessivas, inadequação ou falta de elementos de ligação que prejudiquem a fluidez e a coesão textual.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder flex gap-6 flex-col sm:flex-row items-start shadow-sm">
            <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary shrink-0 font-black text-2xl w-14 h-14 flex items-center justify-center">5</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-black dark:text-white">Competência V: Elaborar proposta de intervenção para o problema abordado</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                A IA verifica rigorosamente os 5 elementos obrigatórios da intervenção ENEM: **Agente**, **Ação**, **Meio/Modo**, **Efeito** e **Detalhamento**. A falta de qualquer um deles é apontada para que o aluno saiba onde ajustar para garantir 200 pontos.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Narrative Section - Before and After */}
      <section className="bg-white dark:bg-brand-darkSurface p-10 md:p-16 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder space-y-6 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl md:text-3xl font-black text-brand-black dark:text-white tracking-tight">
          Exemplo Prático: Antes e Depois da Correção
        </h2>
        <p className="leading-relaxed">
          Para garantir total clareza no processo pedagógico, a plataforma não apresenta apenas uma nota fria, ela cria um roteiro de estudos detalhado e interativo para cada aluno:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl space-y-2">
            <h4 className="font-bold text-red-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Submissão do Estudante (Rascunho)
            </h4>
            <div className="font-medium text-sm text-gray-500 dark:text-gray-400 font-mono leading-relaxed bg-white dark:bg-brand-darkBg p-4 rounded-2xl border border-gray-50 dark:border-brand-darkBorder">
              "A persistência da violência doméstica contra a mulher brasileira é um problema grave pois as leis no Brasil as vezes não são cumpridas."
            </div>
            <p className="text-xs text-red-500/80 mt-2">❌ Desvios de pontuação, crase ausente ("as vezes"), falta de conectivos e argumentação rasa.</p>
          </div>

          <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl space-y-2">
            <h4 className="font-bold text-emerald-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Feedback Detalhado pela nossa IA
            </h4>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 space-y-2 bg-white dark:bg-brand-darkBg p-4 rounded-2xl border border-gray-50 dark:border-brand-darkBorder">
              <p className="text-xs font-semibold text-brand-primary">💡 Dica de Correção (Comp. I):</p>
              <p className="text-xs">Insira crase no termo "às vezes" para indicar locução adverbial de tempo feminina.</p>
              <p className="text-xs font-semibold text-brand-primary">💡 Dica de Argumento (Comp. II):</p>
              <p className="text-xs">Incorpore a Lei Maria da Penha ou a teoria do Contratualismo Social de Thomas Hobbes para validar os direitos civis garantidos pelo Estado.</p>
            </div>
            <p className="text-xs text-emerald-500/80 mt-2">✅ Orientações corretas, didáticas e aplicáveis imediatamente no rascunho seguinte.</p>
          </div>
        </div>

        <p className="leading-relaxed pt-4">
          Nossa infraestrutura utilitária aproveita a grande especialidade pedagógica do modelo Google Gemini para criar pontuações e caminhos educativos de alto valor prático, auxiliando os estudantes de forma completa.
        </p>
      </section>

    </article>
  );
};

export default ComoFunciona;
