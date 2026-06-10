import React, { useState, useRef } from 'react';
import { Camera, Send, Loader2, Sparkles, Upload, ChevronLeft } from 'lucide-react';
import { EssaySubmission, KnowledgeArea } from '../types';
import { generateEssayTopic } from '../services/geminiService';

interface TutoringInputProps {
  onSubmit: (submission: EssaySubmission) => Promise<void>;
  isSubmitting: boolean;
  topic: string;
  setTopic: (topic: string) => void;
  area: KnowledgeArea;
  subject: string;
  onBack: () => void;
  headerImage?: string;
}

const TutoringInput: React.FC<TutoringInputProps> = ({ 
  onSubmit, 
  isSubmitting, 
  topic, 
  setTopic,
  area,
  subject,
  onBack,
  headerImage
}) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [responseLength, setResponseLength] = useState<'short' | 'long'>('long');
  const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isRedacao = area === KnowledgeArea.REDACAO;

  const handleSubmit = () => {
    if (isRedacao && !topic.trim()) {
      alert("Por favor, digite um tema.");
      return;
    }
    if (!content.trim() && !file) {
      alert(isRedacao ? "Por favor, escreva sua redação ou envie uma foto." : "Por favor, descreva sua dúvida ou envie uma foto do exercício.");
      return;
    }
    onSubmit({ topic: isRedacao ? topic : subject, content, file, responseLength });
    setContent('');
    setFile(null);
    if (isRedacao) setTopic('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAiTopic = async () => {
    setIsGeneratingTopic(true);
    const newTopic = await generateEssayTopic();
    setTopic(newTopic);
    setIsGeneratingTopic(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col gap-5 md:gap-6 animate-fadeIn">
      
      {/* Back Button & Header */}
      <div className="flex flex-col gap-4 mb-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors group w-fit"
        >
          <div className="p-2 rounded-full bg-gray-100 dark:bg-brand-darkBorder group-hover:bg-brand-primary/10 transition-colors">
            <ChevronLeft size={18} />
          </div>
          <span className="font-medium">Voltar para matérias</span>
        </button>
        
        <header>
          {headerImage && (
            <div className="w-20 h-20 md:w-24 md:h-24 mb-4">
              <img 
                src={headerImage} 
                alt={subject} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black dark:text-white mb-2">
            {isRedacao ? 'Praticar Redação' : `Tutoria de ${subject}`}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isRedacao ? 'Desenvolva seu texto e receba feedback instantâneo.' : 'Tire suas dúvidas agora com nossa IA especializada.'}
          </p>
        </header>
      </div>

      {/* Topic Section (Only for Redação) */}
      {isRedacao && (
        <div className="relative group" id="tour-topic-section">
          <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 ml-4 uppercase tracking-wider text-[10px]">
            Tema da Redação
          </label>
          <div className="relative prism-box rounded-[2rem]">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Digite o tema..."
              className="w-full bg-white dark:bg-brand-darkSurface border-2 border-transparent focus:border-transparent rounded-[2rem] px-6 py-4 md:px-8 md:py-4 text-base md:text-lg font-medium shadow-sm outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-800 dark:text-white pr-14"
            />
            <button 
              id="tour-ai-btn"
              onClick={handleAiTopic}
              disabled={isGeneratingTopic}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-brand-darkBorder hover:bg-brand-primary text-gray-600 dark:text-gray-300 hover:text-white p-2.5 rounded-full transition-colors duration-300 z-10"
              title="Gerar tema com IA"
            >
              {isGeneratingTopic ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            </button>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="flex-1 relative flex flex-col min-h-[350px] md:min-h-[400px]" id="tour-content-section">
        <div className="flex items-center justify-between mb-2 ml-4">
          <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-[10px]">
            {isRedacao ? 'Sua Redação' : 'Qual sua dúvida?'}
          </label>
          
          {!isRedacao && (
            <div className="flex bg-gray-100 dark:bg-brand-darkBorder p-1 rounded-xl">
              <button
                onClick={() => setResponseLength('short')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  responseLength === 'short' 
                    ? 'bg-white dark:bg-brand-darkSurface text-brand-primary shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`}
              >
                Resposta Curta
              </button>
              <button
                onClick={() => setResponseLength('long')}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  responseLength === 'long' 
                    ? 'bg-white dark:bg-brand-darkSurface text-brand-primary shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`}
              >
                Resposta Longa
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 relative prism-box rounded-[2rem] md:rounded-[2.5rem] shadow-sm">
           <div className="w-full h-full bg-white dark:bg-brand-darkSurface rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-2 border-transparent transition-all">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isRedacao ? "Digite sua redação..." : "Descreva sua dúvida, cole um exercício ou conte o que você não entendeu..."}
              className="w-full h-full p-6 md:p-8 text-base md:text-lg leading-relaxed outline-none resize-none placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-800 dark:text-gray-100 bg-transparent"
              style={{ minHeight: '300px' }}
            />
            
            {/* File Upload Preview */}
            {file && (
              <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 bg-brand-primary/10 border border-brand-primary text-brand-primary p-3 rounded-2xl flex items-center justify-between z-10">
                <span className="text-sm font-medium truncate flex items-center gap-2 max-w-[70%]">
                  <Upload size={16} /> {file.name}
                </span>
                <button 
                  onClick={() => setFile(null)}
                  className="text-xs font-bold hover:underline px-2"
                >
                  Remover
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pb-8 md:pb-0">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <button 
          id="tour-camera-btn"
          onClick={() => fileInputRef.current?.click()}
          className="bg-white dark:bg-brand-darkSurface hover:bg-gray-50 dark:hover:bg-brand-darkBorder text-brand-black dark:text-white border-2 border-transparent hover:border-brand-primary/20 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-sm transition-all duration-300 group flex items-center justify-center gap-2 sm:w-auto"
          title="Envie arquivo"
        >
          <Camera size={24} className="group-hover:scale-110 transition-transform text-brand-primary" />
          <span className="sm:hidden font-medium text-gray-600 dark:text-gray-300 text-sm">Anexar Foto/Doc</span>
        </button>

        <button 
          id="tour-submit-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-brand-primary hover:bg-brand-primaryHover active:scale-[0.98] text-white p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] font-bold text-lg md:text-xl shadow-lg shadow-brand-primary/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>{isRedacao ? 'Enviar para Correção' : 'Enviar Dúvida'}</span>
              <Send size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TutoringInput;
