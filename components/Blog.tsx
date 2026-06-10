import React from 'react';
import { Calendar, User, ArrowLeft, BookOpen, Clock, Heart } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

interface BlogProps {
  onNavigate: (slug: string) => void;
  activeSlug?: string;
  onBackToBlog: () => void;
}

const posts: BlogPost[] = [
  {
    slug: 'como-tirar-nota-1000-redacao-enem',
    title: 'Como tirar Nota 1000 na Redação do ENEM: O Guia Definitivo',
    excerpt: 'Descubra os pilares obrigatórios da redação excelente e aprenda a atingir a pontuação máxima nas cinco competências exigidas pela banca examinadora.',
    date: '10 de Junho de 2026',
    author: 'Equipe Pedagógica Donome',
    category: 'Estratégias ENEM',
    readTime: '6 min de leitura',
    content: `
      <h2>A Fórmula Secreta de Quem Obtém Nota Máxima no ENEM</h2>
      <p>A prova de redação do Exame Nacional do Ensino Médio (ENEM) é lendária por seu grande peso sobre a nota final do candidato. Enquanto a nota de matemática e natureza varia de acordo com a Teoria de Resposta ao Item (TRI), a redação é corrigida linearmente de 0 a 1000 pontos. Quem consegue atingir a nota 1000 se coloca à frente de milhares de outros vestibulandos imediatamente no SISU.</p>
      
      <p>Mas, será a redação nota 1000 um golpe de sorte ou fruto de uma fórmula estruturada? A resposta é clara: ela depende de domínio e técnica das diretrizes obrigatórias da banca do INEP. Abaixo, detalhamos como consolidar seu texto passo a passo.</p>

      <h3>1. Domine o Tipo Dissertativo-Argumentativo</h3>
      <p>O texto dissertativo-argumentativo exige uma organização categórica de ideias. Ele não serve apenas para expor fatos (isso seria dissertar apenas); ele exige que você defenda de forma inequívoca uma *tese* (um posicionamento crítico) baseada em argumentos de autoridade e dados interpretativos.</p>
      <ul>
        <li><strong>Introdução (6 a 7 linhas):</strong> Repertório inicial + Apresentação do tema + Tese clara separada em duas causas para os desenvolvimentos (D1 e D2).</li>
        <li><strong>Desenvolvimento 1 (8 a 10 linhas):</strong> Tópico frasal + Fundamentação sociológica/filosófica de autoridade (Causa 1) + Análise crítica + Fechamento.</li>
        <li><strong>Desenvolvimento 2 (8 a 10 linhas):</strong> Tópico frasal + Repertório histórico/dados estatísticos (Causa 2) + Análise crítica + Fechamento.</li>
        <li><strong>Conclusão (7 a 9 linhas):</strong> Proposta de intervenção robusta respondendo aos 5 elementos obrigatórios em um só período contínuo.</li>
      </ul>

      <h3>2. As 5 Competências de Ouro</h3>
      <p>Cada redação do ENEM é avaliada de forma independente por dois corretores com base em 5 competências fundamentais, tendo cada uma o valor de 200 pontos:</p>
      <ol>
        <li><strong>Competência I:</strong> Norma culta escrita. Atenção redobrada com concordância de termos, uso prático da crase e paralelismo sintático.</li>
        <li><strong>Competência II:</strong> Compreensão do tema sem tangenciamento. Use termos chave do próprio comando do tema no primeiro e no último parágrafo de forma explícita.</li>
        <li><strong>Competência III:</strong> Projeto de texto de autoria definida. Os argumentos mostrados no desenvolvimento devem se conectar perfeitamente com a tese gerada na introdução.</li>
        <li><strong>Competência IV:</strong> Coesão textual. Use conectivos como "Outrossim", "Em segunda análise", "Por conseguinte" de forma variada entre e dentro dos parágrafos.</li>
        <li><strong>Competência V:</strong> Proposta de intervenção articulada com os 5 elementos fundamentais (Quem?, Faz o quê?, Através de quê?, Para quê?, além de um Detalhe de um desses elementos).</li>
      </ol>

      <h3>3. Repertório Sociocultural Produtivo</h3>
      <p>Para conseguir pontuação máxima em sua redação, incorpore repertórios externos legítimos e produtivos. Alguns filósofos e conceitos são altamente versáteis:</p>
      <p><em>“O homem é lobo do homem”</em>, de Thomas Hobbes, serve de argumento para explicar que, se o Estado se ausentar e não aplicar leis de amparo social, a desigualdade ou violência irão persistir inevitavelmente na sociedade brasileira contemporânea.</p>

      <p>Foque em treinar regularmente. Utilize a ferramenta de correção do Donome para receber notas estimadas instantâneas em cada competência, permitindo identificar onde você está errando no rascunho de forma imediata antes de passar a limpo!</p>
    `
  },
  {
    slug: 'estrutura-perfeita-texto-dissertativo-argumentativo',
    title: 'A Estrutura Perfeita do Texto Dissertativo-Argumentativo',
    excerpt: 'Aprenda a organizar seus parágrafos, planejar sua tese e distribuir seus conectivos na folha oficial de redação para ter uma leitura fluida.',
    date: '08 de Junho de 2026',
    author: 'Equipe Pedagógica Donome',
    category: 'Estruturação Textual',
    readTime: '5 min de leitura',
    content: `
      <h2>O Esqueleto Nota 1000: Organizando o Pensamento</h2>
      <p>Comumente, diante de uma folha em branco de redação do ENEM, muitos estudantes entram em pânico por não saberem como iniciar a escrita de suas ideias. O segredo para não travar na hora do exame é carregar um modelo ou esqueleto mental pré-definido, altamente adaptável e maleável para qualquer eixo temático do ENEM (tecnologia, saúde, cidadania, segurança, educação).</p>

      <h3>O Tripé do Parágrafo Padrão</h3>
      <p>Cada uma das quatro seções fundamentais de sua redação deve possuir uma mini-estrutura lógica própria:</p>

      <h4>1. Introdução</h4>
      <p>Seja breve e contundente. Inicie contextualizando o assunto através de um filme, romance literário ou fato histórico. Em seguida, faça o link com o tema contemporâneo do Brasil. Finalize declarando a sua tese contendo dois problemas diretos que serão solucionados em seu desenvolvimento. Exemplo de esqueleto:</p>
      <p><em>"No clássico romance da literatura realista 'O Cortiço', de Aluísio Azevedo, é retratada a precarização das condições habitacionais e de dignidade humana dos indivíduos. Fora da ficção, percebe-se que a problemática do(a) [Tema] se assemelha a essa realidade fictícia grave. Isso se deve não apenas ao [Problema 1], mas também ao [Problema 2]."</em></p>

      <h4>2. Os Desenvolvimentos (D1 e D2)</h4>
      <p>A tese declarada acima dita exatamente sobre o que você falará abaixo. No primeiro parágrafo de desenvolvimento (D1), aborde estritamente as causas do [Problema 1]. No segundo parágrafo de desenvolvimento (D2), trate do [Problema 2].</p>
      <p>Lembre-se de sempre abrir o desenvolvimento com um elemento coesivo interparágrafo, como: <em>"De início, vale destacar..."</em> ou <em>"Por outro lado, é crucial examinar..."</em>.</p>

      <h4>3. Conclusão</h4>
      <p>O clímax da avaliação da redação brasileira reside na sua capacidade de intervir na sociedade, preservando os direitos humanos fundamentais. Para gabaritar os 200 pontos de forma limpa, não misture várias propostas superficiais; em vez disso, monte **uma única proposta perfeitamente completa**, garantindo que todos os 5 elementos de avaliação fiquem claros para o corretor:</p>
      <ul>
        <li><strong>Quem faz? (Agente):</strong> Ex: O Ministério da Educação, em parceria com os principais institutos de ensino.</li>
        <li><strong>O que faz? (Ação):</strong> Ex: Elaborar cartilhas digitais e ciclos de debates públicos mensais.</li>
        <li><strong>Como faz? (Meio/Modo):</strong> Ex: Através da realocação de verbas do Fundo Nacional de Desenvolvimento Científico.</li>
        <li><strong>Para que faz? (Efeito):</strong> Ex: Com o fito de conscientizar a comunidade escolar sobre os riscos eminentes.</li>
        <li><strong>Detalhamento de algum item:</strong> Ex: explicitar o papel primordial das mídias unidas do país como catalisadoras dessas ações de longo prazo.</li>
      </ul>

      <p>Pratique regularmente esse método no Donome para fixar a lógica estrutural, gerando hábito de escrita e ganhando velocidade preciosa no dia do exame!</p>
    `
  }
];

const Blog: React.FC<BlogProps> = ({ onNavigate, activeSlug, onBackToBlog }) => {
  
  if (activeSlug) {
    const post = posts.find(p => p.slug === activeSlug);
    if (!post) {
      return (
        <div className="text-center py-20 bg-white dark:bg-brand-darkSurface rounded-[3rem] border border-gray-100 dark:border-brand-darkBorder">
          <h2 className="text-xl font-bold mb-4">Post não encontrado</h2>
          <button onClick={onBackToBlog} className="text-brand-primary font-bold hover:underline">
            Voltar para o Blog
          </button>
        </div>
      );
    }

    return (
      <article className="animate-fadeIn max-w-4xl mx-auto py-12 px-6 space-y-8 bg-white dark:bg-brand-darkSurface rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder transition-colors duration-300">
        <button 
          onClick={onBackToBlog}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Voltar aos artigos
        </button>

        <header className="space-y-4">
          <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary font-bold text-xs rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-bold border-b border-gray-50 dark:border-brand-darkBorder pb-6 shrink-0">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </header>

        <section 
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="pt-8 border-t border-gray-50 dark:border-brand-darkBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
              <Heart size={16} className="fill-current" />
            </span>
            <span className="text-xs font-bold text-gray-400">Achou este artigo útil? Deixe sua curtida!</span>
          </div>
          <span className="text-xs font-bold text-gray-400">Donome Portal Educativo Conforme</span>
        </div>
      </article>
    );
  }

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto py-12 px-6 space-y-12">
      
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Dicas, Notícias e Guias</span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white tracking-tight">
          Nosso Blog Pedagógico
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          Artigos completos elaborados por nossa comissão pedagógica para turbinar seus estudos de redação e linguística para o ENEM e principais vestibulares.
        </p>
      </header>

      {/* Grid structure for posts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="bg-white dark:bg-brand-darkSurface rounded-[2.5rem] border border-gray-100 dark:border-brand-darkBorder overflow-hidden group hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 flex flex-col h-full shadow-sm"
          >
            <div className="p-8 space-y-4 flex flex-col flex-1 justify-between">
              
              <div className="space-y-4">
                <span className="px-3.5 py-1.5 bg-gray-50 dark:bg-brand-darkBg text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-widest rounded-2xl block w-max">
                  {post.category}
                </span>

                <h3 className="text-xl md:text-2xl font-black text-brand-black dark:text-white group-hover:text-brand-primary transition-colors leading-snug tracking-tight">
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-50 dark:border-brand-darkBorder flex items-center justify-between">
                <span className="text-xs text-gray-400 font-bold">{post.readTime}</span>
                <button 
                  onClick={() => onNavigate(post.slug)}
                  className="font-bold text-xs text-brand-primary group-hover:underline flex items-center gap-1.5"
                >
                  Continuar Lendo
                  <BookOpen size={14} className="opacity-70" />
                </button>
              </div>

            </div>
          </article>
        ))}
      </section>

    </div>
  );
};

export default Blog;
