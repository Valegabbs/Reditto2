import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSubmitted(true);
    // Wait and reset just for emulation
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto py-12 px-6 space-y-12">
      
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Fale Conosco</span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white tracking-tight">
          Central de Suporte & Contato
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          Tem alguma dúvida, relato de bug, sugestão ou proposta de parceria institucional? Nossa equipe está pronta para te atender.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-brand-darkSurface p-6 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-black dark:text-white">Envie um E-mail</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Nossa caixa oficial está aberta para dúvidas e assistência:</p>
              <a href="mailto:suporte@donome.com" className="text-sm font-bold text-brand-primary block mt-2 hover:underline">
                suporte@donome.com
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-darkSurface p-6 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-black dark:text-white">Fale pelo WhatsApp</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dúvidas rápidas e feedback escolar direto com nossa secretaria virtual:</p>
              <span className="text-sm font-bold text-brand-primary block mt-2">
                +55 (11) 99999-8888
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-brand-darkSurface p-6 rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-bold text-brand-black dark:text-white">Endereço Físico</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sede administrativa de suporte tecnológico educacional:</p>
              <span className="text-sm text-gray-400 dark:text-gray-500 block mt-2">
                Av. Paulista, 1000 - Bela Vista, São Paulo - SP, CEP 01310-100
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white dark:bg-brand-darkSurface p-8 md:p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder">
          
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-2xl font-black text-brand-black dark:text-white leading-tight">Mensagem Enviada!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                Agradecemos o seu contato. Nossa equipe pedagógica analisará as suas observações e responderá em até 24 horas úteis.
              </p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="mt-6 text-sm text-brand-primary font-bold hover:underline"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-brand-black dark:text-white">Formulário de Mensagem Direta</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-400">Seu Nome *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Gabriel Silva"
                    className="w-full bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-brand-darkBorder py-3 px-4 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-400">Seu Endereço de E-mail *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: gabriel@email.com"
                    className="w-full bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-brand-darkBorder py-3 px-4 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400">Assunto</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Sugestão para Matéria de Biologia / Dúvida sobre AdSense"
                  className="w-full bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-brand-darkBorder py-3 px-4 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400">Mensagem *</label>
                <textarea 
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descreva detalhadamente a sua solicitação..."
                  className="w-full bg-gray-50 dark:bg-brand-darkBg border border-gray-100 dark:border-brand-darkBorder py-3 px-4 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primaryHover transition-all shadow-lg shadow-brand-primary/10 active:scale-[0.98]"
              >
                <Send size={18} />
                Enviar Mensagem
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};

export default Contact;
