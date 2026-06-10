import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <article className="animate-fadeIn max-w-4xl mx-auto py-12 px-6 bg-white dark:bg-brand-darkSurface rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder transition-colors duration-300">
      <header className="mb-10 text-center">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Acordo Operacional</span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mt-2 tracking-tight">
          Termos de Uso
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Última atualização: 10 de Junho de 2026</p>
      </header>

      <section className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
        
        <h2>1. Aceitação do Termo de Uso</h2>
        <p>
          Ao acessar e interagir com a plataforma <strong>Donome</strong>, seja como usuário visitante ou estudante registrado, você declara ter lido, compreendido e aceitado integralmente estes Termos de Uso. Caso não concorde com qualquer de nossas cláusulas, você não deve utilizar a nossa plataforma de correção e tutoria.
        </p>

        <h2>2. Descrição Geral dos Serviços</h2>
        <p>
          A Donome oferece serviços utilitários educacionais na internet compostos por:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Correção automática e instantânea de redações com base no modelo de correção do Exame Nacional do Ensino Médio (ENEM), fornecendo notas detalhadas para cada uma das cinco competências obrigatórias.</li>
          <li>Mecanismos de sugestões de temas e assistência aos estudos orientada de forma multidisciplinar.</li>
          <li>Gráficos de evolução para acompanhamento histórico de desempenho acadêmico ao longo do tempo.</li>
        </ul>

        <h2>3. Uso Autorizado e Responsabilidades do Aluno</h2>
        <p>
          O usuário concorda em utilizar a nossa plataforma de boa-fé, de maneira ética e apenas para fins didáticos, estudo pessoal e preparação para vestibulares.
        </p>
        <p>
          É terminantemente proibido enviar conteúdos que:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sejam ofensivos, caluniosos, difamatórios, discriminatórios ou incitem a violência.</li>
          <li>Contenham ataques pessoais, discursos de ódio ou imagens com direitos autorais restritos de terceiros.</li>
          <li>Contenham vírus de computador, arquivos corrompidos ou códigos maliciosos destinados a comprometer a segurança da infraestrutura de servidores da plataforma.</li>
        </ul>

        <h2>4. Direitos Autorais e Propriedade Intelectual</h2>
        <p>
          Toda a estrutura visual, marcas de design, identidade visual da marca <strong>Donome</strong>, logotipos oficiais, códigos-fonte deste portal e estrutura de banco de dados são propriedade intelectual exclusiva dos desenvolvedores da plataforma. É vedada a engenharia reversa, reprodução de layout ou exploração comercial não autorizada do nosso sistema utilitário sem permissão formal explícita dos criadores.
        </p>
        <p>
          As redações, textos e ideias digitadas pelos estudantes ou fotogradas são de propriedade intelectual exclusiva de seus respectivos autores. Nós apenas utilizamos esse conteúdo de forma temporária para executar o processamento da correção pedagógica solicitada.
        </p>

        <h2>5. Isenção de Responsabilidade sobre as Notas Reais</h2>
        <p>
          Sendo um sistema utilitário de suporte pedagógico assistido por computador e inteligência artificial, as notas geradas pela nossa IA em cada competência representam apenas uma **estimativa de cunho educativo e uma simulação de desempenho probabilística**. 
        </p>
        <p>
          A Donome não garante aprovação em concursos, faculdades públicas, vestibulares federais ou resultados específicos em bancas reais do ENEM. As bancas de corretores oficiais contam com critérios interpretativos humanos subjetivos e regras específicas de avaliação. Portanto, use a nossa plataforma como um valioso complemento e ferramenta de rascunhos práticos diários para os seus estudos, e não como uma decisão legal absoluta de aprovação.
        </p>

        <h2>6. Monetização e Publicidade</h2>
        <p>
          Nosso serviço é oferecido gratuitamente e, como forma de compensar os altos custos de processamento técnico de IA avançada no servidor, exibimos comerciais digitais através do Google AdSense. Ao utilizar nosso site, você permite que estes comerciais apareçam nas margens e seções pertinentes da página de forma equilibrada, e compreende que nenhuma compensação financeira lhe é devida em decorrência da sua visualização publicitária.
        </p>

        <h2>7. Alterações destes Termos</h2>
        <p>
          Nós podemos revisar e atualizar as cláusulas presentes nestes termos de uso a qualquer momento para se adequar a mudanças de legislação pedagógica ou atualizações de infraestrutura técnica. Caso continuemos prestando o serviço após tais alterações, o seu uso persistente assumirá plena anuência com as regras atualizadas.
        </p>

        <h2>8. Resolução de Conflitos e Suporte</h2>
        <p>
          Em caso de dúvidas operacionais ou quaisquer objeções às resoluções propostas nestes termos, as partes tentarão buscar acordo amigável e direto através da nossa secretaria virtual enviando um correio formal para: <strong>suporte@donome.com</strong>.
        </p>

      </section>
    </article>
  );
};

export default TermsOfUse;
