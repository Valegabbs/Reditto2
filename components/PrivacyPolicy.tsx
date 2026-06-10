import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <article className="animate-fadeIn max-w-4xl mx-auto py-12 px-6 bg-white dark:bg-brand-darkSurface rounded-[3rem] shadow-sm border border-gray-100 dark:border-brand-darkBorder transition-colors duration-300">
      <header className="mb-10 text-center">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Conformidade Legal & LGPD</span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mt-2 tracking-tight">
          Política de Privacidade
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Última atualização: 10 de Junho de 2026</p>
      </header>

      <section className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed">
        
        <h2>1. Introdução</h2>
        <p>
          Bem-vindo à <strong>Donome</strong>. Nós nos comprometemos profundamente com a privacidade, transparência e proteção dos dados pessoais de todos os nossos usuários, alunos, colaboradores e visitantes. 
          Esta Política de Privacidade estabelece como coletamos, usamos, processamos e protegemos as suas informações pessoais e os dados obtidos através do uso da nossa plataforma de correção de redação orientada por inteligência artificial.
        </p>

        <h2>2. Consentimento e Aceite Legal</h2>
        <p>
          Ao utilizar a nossa plataforma, enviar redações, perguntas ou navegar em nosso portal, você concorda expressamente com os termos descritos nesta política de privacidade e com as nossas diretrizes operacionais de coleta e tratamento em total consonância com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </p>

        <h2>3. Coleta de Informações</h2>
        <p>
          A fim de entregar um serviço de alto nível, didático e adaptativo de correção de textos de redação, a Donome coleta as seguintes informações:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Informações Cadastrais Básicas:</strong> Nome completo, apelido de preferência, endereço de e-mail e preferências de navegação coletadas através das configurações do perfil.</li>
          <li><strong>Texto e Conteúdo Submetido:</strong> Os textos de redações informados pelo usuário, arquivos fotográficos ou uploads de documentos de escrita manual destinados à análise e correção pelas respectivas inteligências artificiais.</li>
          <li><strong>Dados de Desempenho Escolar:</strong> Notas geradas de acordo com as cinco competências de avaliação do ENEM, sugestões pedagógicas e histórico de aprendizado gerado pelas interações.</li>
          <li><strong>Dados Técnicos de Conexão:</strong> Endereço de IP, tipo de navegador, sistema operacional, cookies de sessão, tempos de carregamento, páginas acessadas e informações dos mecanismos de navegação técnica.</li>
        </ul>

        <h2>4. Cookies e Tecnologias de Rastreamento</h2>
        <p>
          A nossa plataforma utiliza cookies técnicos essenciais para manter a sua sessão de usuário ativa, preservar preferências de tema de cores (como o modo escuro) e melhorar a experiência de uso. Nós não utilizamos cookies invasivos que violem os regulamentos de integridade ou a privacidade do indivíduo.
        </p>

        <h2>5. Cookies de Terceiros e Anúncios do Google AdSense</h2>
        <p>
          Como parte de nossa estrutura sustentada e monetização de nosso portal de utilidade pública educacional gratuita, adotamos serviços de publicidade fornecidos por terceiros, nomeadamente o <strong>Google AdSense</strong>. 
        </p>
        <p>
          O Google, como fornecedor de terceiros, utiliza cookies para veicular anúncios apropriados neste site. O uso do cookie <strong>DART</strong> pelo Google permite que ele veicule anúncios para nossos usuários com base em sua visita a este e a outros sites na Internet. Os usuários podem desativar o uso do cookie DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google.
        </p>
        <p>
          Esses cookies de publicidade de terceiros coletam dados demográficos e informações de navegação genéricas para personalizar os anúncios que você visualiza, garantindo relevância e ajudando a manter os nossos serviços educacionais 100% gratuitos para os estudantes brasileiros de baixa renda.
        </p>

        <h2>6. Segurança e Armazenamento dos Dados</h2>
        <p>
          Nós tomamos as medidas de segurança organizacionais e técnicas estritas para cobrir vazamentos, acessos não autorizados, perdas acidentais ou destruição de dados privados. Os seus dados são transmitidos de forma segura através do protocolo HTTPS com criptografia SSL avançada de 256 bits, garantindo integridade nos canais públicos de internet.
        </p>

        <h2>7. Direitos do Titular dos Dados (LGPD)</h2>
        <p>
          Sob o escopo da Lei Geral de Proteção de Dados (LGPD), você é proprietário dos seus dados pessoais e possui os seguintes direitos em relação a eles:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Confirmar a existência do tratamento dos seus dados armazenados em nossa plataforma.</li>
          <li>Acessar os seus dados pessoais completos a qualquer momento.</li>
          <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Solicitar a eliminação completa dos seus dados pessoais coletados do nosso banco de dados histórico (Direito ao Esquecimento).</li>
          <li>Revogar o consentimento previamente fornecido a qualquer momento de forma simples e direta pelo e-mail de suporte.</li>
        </ul>

        <h2>8. Isenção e Uso de Serviços de Inteligência Artificial</h2>
        <p>
          Para processar as análises detalhadas das competências gramaticais e estilísticas das redações enviadas, utilizamos serviços seguros de processamento de linguagem natural fornecidos pela API oficial do Google Gemini. Nenhuma informação pessoal de cadastro do aluno (como e-mail ou nome) é transmitida a essas APIs, preservando por completo o anonimato de identificação do autor do texto.
        </p>

        <h2>9. Contato para Tratamento de Dados Pessoais (DPO)</h2>
        <p>
          Se você deseja fazer alguma pergunta sobre esta Política de Privacidade, requerer a exclusão ou exercer seus direitos de privacidade assegurados por lei, favor enviar um e-mail direto para o nosso encarregado de proteção de dados no endereço: <strong>suporte@donome.com</strong>.
        </p>

      </section>
    </article>
  );
};

export default PrivacyPolicy;
