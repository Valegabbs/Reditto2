import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      category: "Geral",
      question: "O corretor Donome é 100% gratuito?",
      answer: "Sim! A nossa plataforma de correção de redações e assistência ao estudo foi criada com a missão social de auxiliar estudantes de todo o Brasil e é 100% gratuita. Custeamos nossa infraestrutura de servidores e o processamento de IA avançada exibindo anúncios publicitários equilibrados via Google AdSense."
    },
    {
      category: "Correção",
      question: "Qual modelo de inteligência artificial é utilizado na correção?",
      answer: "Utilizamos inteligência artificial avançada baseada nos modelos oficiais da família Google Gemini, os mais modernos e otimizados do mercado para compreensão estilística, análise gramatical culta e argumentação em língua portuguesa."
    },
    {
      category: "Fidedignidade",
      question: "A nota dada pela IA é idêntica à nota real do ENEM?",
      answer: "As pontuações geradas no Donome são simulações matemáticas precisas baseadas na cartilha do corretor do ENEM. Embora forneça um excelente diagnóstico dos seus pontos de melhoria, a banca humana oficial do INEP pode ter interpretações subjetivas próprias. Portanto, utilize nossa ferramenta para orientar sua evolução diária, mas consulte sempre corretores credenciados para decisões oficiais."
    },
    {
      category: "Segurança",
      question: "Meus dados de redação estão seguros no Donome?",
      answer: "Com certeza. Seus textos são transmitidos via conexão segura e criptografados. Nós respeitamos integralmente a LGPD (Lei Geral de Proteção de Dados) e nunca comercializamos suas redações ou informações pessoais de cadastro com ninguém."
    },
    {
      category: "Estudos",
      question: "Posso tirar dúvidas sobre matérias além de Redação?",
      answer: "Sim! Expandimos nossa ferramenta para oferecer suporte educacional multidisciplinar. Você pode acessar nosso Hub na Home e escolher entre Exatas (Matemática), Natureza, Humanas e Linguagens para tirar dúvidas e receber guias explicativos detalhados."
    },
    {
      category: "Estudos",
      question: "Como funciona o recurso de resposta longa?",
      answer: "Muitas vezes, a nossa IA pode dar uma resposta curta e direta para sanar sua dúvida na hora. No entanto, se você deseja que ela aprofunde o assunto de modo didático, com exemplos práticos, analogias fáceis e sugestões de exercícios, basta clicar no botão 'Tentar Resposta Longa' localizado na página de resultado."
    }
  ];

  const filteredFaq = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto py-12 px-6 space-y-8">
      
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Suporte ao Estudante</span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white tracking-tight">
          Perguntas Frequentes (FAQ)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          Encontre respostas rápidas para as principais dúvidas sobre nossa inteligência artificial de correção, diretrizes de avaliação e uso geral do site.
        </p>
      </header>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mande sua dúvida aqui..."
          className="w-full bg-white dark:bg-brand-darkSurface border border-gray-100 dark:border-brand-darkBorder focus:border-brand-primary rounded-2xl pl-12 pr-4 py-4 text-sm outline-none transition-all shadow-sm font-semibold text-brand-black dark:text-white"
        />
      </div>

      {/* Accordion list */}
      <div className="space-y-4 pt-4">
        {filteredFaq.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-brand-darkSurface rounded-[2.5rem] border border-dashed border-gray-200 dark:border-brand-darkBorder text-gray-400">
            Nenhuma pergunta corresponde à sua busca. Tente buscar termos mais simples.
          </div>
        ) : (
          filteredFaq.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-brand-darkSurface border border-gray-100 dark:border-brand-darkBorder rounded-3xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary hidden sm:inline-block">
                      <HelpCircle size={18} />
                    </span>
                    <span className="font-bold text-brand-black dark:text-white text-base md:text-lg">
                      {item.question}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 dark:border-brand-darkBorder animate-slideIn text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="whitespace-pre-wrap">{item.answer}</p>
                    <div className="mt-4 flex gap-2">
                      <span className="px-3 py-1 bg-gray-50 dark:bg-brand-darkBg text-xs font-bold text-gray-400 rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default FAQ;
