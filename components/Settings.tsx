import React, { useState } from 'react';
import { User, Camera, Palette, Check, Save } from 'lucide-react';
import { UserProfile, KnowledgeArea } from '../types';

interface SettingsProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ userProfile, onUpdateProfile }) => {
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  const themeOptions = [
    { id: KnowledgeArea.BASIC, label: 'Básico (Padrão)', color: 'bg-brand-black dark:bg-white' },
    { id: KnowledgeArea.REDACAO, label: 'Redação (Azul)', color: 'bg-[#38BDF8]' },
    { id: KnowledgeArea.NATUREZA, label: 'Natureza (Verde)', color: 'bg-[#10B981]' },
    { id: KnowledgeArea.HUMANAS, label: 'Humanas (Laranja)', color: 'bg-[#F97316]' },
    { id: KnowledgeArea.EXATAS, label: 'Exatas (Roxo)', color: 'bg-[#A855F7]' },
    { id: KnowledgeArea.LINGUAGENS, label: 'Linguagens (Vermelho)', color: 'bg-[#F43F5E]' },
  ];

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="animate-fadeIn w-full max-w-4xl mx-auto">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-2">
          Configurações
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Personalize sua experiência no Donome</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
                <User size={24} />
              </div>
              <h2 className="text-xl font-bold text-brand-black dark:text-white">Perfil do Usuário</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-brand-darkBorder overflow-hidden border-4 border-white dark:border-brand-darkSurface shadow-lg">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                        {formData.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-brand-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </button>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 ml-2 uppercase tracking-wider text-[10px]">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-brand-darkBg border-2 border-transparent focus:border-brand-primary rounded-2xl px-6 py-3 outline-none transition-all text-brand-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 ml-2 uppercase tracking-wider text-[10px]">
                      Apelido
                    </label>
                    <input
                      type="text"
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-brand-darkBg border-2 border-transparent focus:border-brand-primary rounded-2xl px-6 py-3 outline-none transition-all text-brand-black dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-brand-darkSurface p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
                <Palette size={24} />
              </div>
              <h2 className="text-xl font-bold text-brand-black dark:text-white">Tema Padrão</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({ ...formData, defaultArea: option.id })}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    formData.defaultArea === option.id 
                      ? 'border-brand-primary bg-brand-primary text-[var(--brand-primary-foreground)]' 
                      : 'border-transparent bg-gray-50 dark:bg-brand-darkBg hover:border-gray-200 text-brand-black dark:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${option.color} shadow-sm border border-white/20`} />
                  <span className="font-medium">{option.label}</span>
                  {formData.defaultArea === option.id && <Check size={18} className="ml-auto" />}
                </button>
              ))}
            </div>
          </section>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-brand-primary/20 transition-all active:scale-95"
            >
              {isSaved ? <Check size={20} /> : <Save size={20} />}
              {isSaved ? 'Salvo!' : 'Salvar Alterações'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="bg-brand-primary/10 p-8 rounded-[2.5rem] border border-brand-primary/20">
            <h3 className="text-lg font-bold text-brand-primary mb-4">Dica de Personalização</h3>
            <p className="text-sm text-brand-primary/80 leading-relaxed">
              O tema padrão que você escolher será aplicado automaticamente ao iniciar o aplicativo. Você sempre pode mudar de área no Hub inicial para ver outras cores!
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-brand-darkSurface p-8 rounded-[2.5rem] border border-transparent dark:border-brand-darkBorder">
            <h3 className="text-lg font-bold text-brand-black dark:text-white mb-4">Sobre o Donome</h3>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>Versão 2.1.0</p>
              <p>© 2026 Donome Tutoria</p>
              <p>Feito com ❤️ para estudantes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
