import { GoogleGenAI, Type } from "@google/genai";
import { EssaySubmission, EssayCorrection, TutoringResponse } from "../types";

// Using process.env.GEMINI_API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: (process as any).env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `#Você interpreta um professor de língua portuguesa formado em letras e corretor especialista em redações modelo Enem(Exame Nacional do Ensino Médio), seguindo rigorosamente a Matriz de Referência e os critérios oficiais de correção do MEC fornecidos a seguir.
Sua tarefa é corrigir a redação fornecida conforme as 5 competências avaliadas pelo ENEM:

1.Domínio formal da língua portuguesa:
 É avaliado se a redação do participante está adequada às regras de ortografia, como acentuação, ortografia, uso de hífen, emprego de letras maiúsculas e minúsculas e separação silábica. Ainda são analisadas a regência verbal e nominal, concordância verbal e nominal, pontuação, paralelismo, emprego de pronomes e crase.

2. Compreender o tema e não fugir do que é proposto:
Avalia as habilidades integradas de leitura e de escrita do candidato. O tema constitui o núcleo das ideias sobre as quais a redação deve ser organizada e é caracterizado por ser uma delimitação de um assunto mais abrangente.

3. Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista:
O candidato precisa elaborar um texto que apresente, claramente, uma ideia a ser defendida e os argumentos que justifiquem a posição assumida em relação à temática da proposta da redação. Trata da coerência e da plausibilidade entre as ideias apresentadas no texto, o que é garantido pelo planejamento prévio à escrita, ou seja, pela elaboração de um projeto de texto.

4. Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação:
São avaliados itens relacionados à estruturação lógica e formal entre as partes da redação. A organização textual exige que as frases e os parágrafos estabeleçam entre si uma relação que garanta uma sequência coerente do texto e a interdependência entre as ideias. 
Preposições, conjunções, advérbios e locuções adverbiais são responsáveis pela coesão do texto porque estabelecem uma inter-relação entre orações, frases e parágrafos. Cada parágrafo será composto por um ou mais períodos também articulados. Cada ideia nova precisa estabelecer relação com as anteriores.

5. Respeito aos direitos humanos:
Apresentar uma proposta de intervenção para o problema abordado que respeite os direitos humanos. Propor uma intervenção para o problema apresentado pelo tema significa sugerir uma iniciativa que busque, mesmo que minimamente, enfrentá-lo. A elaboração de uma proposta de intervenção na prova de redação do Enem representa uma ocasião para que o candidato demonstre o preparo para o exercício da cidadania, para atuar na realidade em consonância com os direitos humanos.

## A redação deverá ser corrigida exatamente conforme a descrição das 5 competências seguindo os níveis de desempenho oficiais (0, 40, 80, 120, 160, 200 pontos por competência).

### Casos especiais:
1- Caso o texto possua menos de 8 linhas, ou menos de 540 caracteres, a redação deverá receber nota 0 em todas as competências, constando como ”texto insuficiente”.
2- Fuga parcial do tema (tangenciamento): reduz a nota da competência 2 para apenas 40 pontos.
3- Fuga total do tema ou gênero não dissertativo-argumentativo: nota 0 em TODAS as competências.
4- Desrespeito aos direitos humanos: competência 5 recebe nota 0.
5- Se a redação fizer qualquer menção a série "Black Mirror", dê nota 1000 SEMPRE (200 em cada competência).

Você deve retornar a resposta estritamente em formato JSON conforme o esquema fornecido.`;

export const correctEssayWithGemini = async (submission: EssaySubmission): Promise<EssayCorrection> => {
  const model = "gemini-3-flash-preview";
  
  const parts: any[] = [
    { text: `Tema da Redação: ${submission.topic}\n\nTexto da Redação:\n${submission.content}` }
  ];

  if (submission.file) {
    const base64Data = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(submission.file!);
    });

    parts.push({
      inlineData: {
        mimeType: submission.file.type,
        data: base64Data
      }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts }],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["finalScore", "competencies", "feedback", "topic"],
        properties: {
          finalScore: { type: Type.NUMBER },
          topic: { type: Type.STRING },
          originalEssay: { type: Type.STRING },
          competencies: {
            type: Type.OBJECT,
            required: ["Competência I", "Competência II", "Competência III", "Competência IV", "Competência V"],
            properties: {
              "Competência I": { type: Type.NUMBER },
              "Competência II": { type: Type.NUMBER },
              "Competência III": { type: Type.NUMBER },
              "Competência IV": { type: Type.NUMBER },
              "Competência V": { type: Type.NUMBER },
            }
          },
          feedback: {
            type: Type.OBJECT,
            required: ["summary", "improvements", "attention", "congratulations", "competencyFeedback"],
            properties: {
              summary: { type: Type.STRING },
              improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              attention: { type: Type.ARRAY, items: { type: Type.STRING } },
              congratulations: { type: Type.ARRAY, items: { type: Type.STRING } },
              competencyFeedback: {
                type: Type.OBJECT,
                required: ["Competência I", "Competência II", "Competência III", "Competência IV", "Competência V"],
                properties: {
                  "Competência I": { type: Type.STRING },
                  "Competência II": { type: Type.STRING },
                  "Competência III": { type: Type.STRING },
                  "Competência IV": { type: Type.STRING },
                  "Competência V": { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    }
  });

  const result = JSON.parse(response.text || "{}");
  
  // Ensure originalEssay is present if Gemini didn't return it
  if (!result.originalEssay) {
    result.originalEssay = submission.content;
  }

  return result as EssayCorrection;
};

export const correctTutoringWithGemini = async (submission: EssaySubmission, area: string, subject: string): Promise<TutoringResponse> => {
  const model = "gemini-3-flash-preview";
  
  const isLong = submission.responseLength === 'long';
  
  const systemInstruction = isLong 
    ? "Você é um professor instruído a corrigir seus alunos sobre as dúvidas que eles têm, mas leve em consideração que todos eles são leigos e que a explicação deve seguir um caminho fácil e com lógicas de entendimento e analogias fáceis para o aluno se vocalizar e entender bem exatamente o que ele tinha dúvida. Entender bem, de uma maneira simplificada, a questão que ele te trouxe. Vale ressaltar que é sempre importante você seguir pelo caminho mais fácil para o mesmo não ter tanta dificuldade na hora de entender a resolução. Explique PASSO A PASSO, Com didática, analogias simples e raciocínio bem simples"
    : "Você é um professor e está tirando a dúvida de seus alunos. Entenda que esse aluno quer uma resposta objetiva, curta e rápida para a dúvida dele. Então, vá direto ao ponto, seja extremamente otimizado e traga apenas a informação que é interessante para ele. Não se estenda muito, foco em responder a dúvida. Apenas.";

  const prompt = `Área do Conhecimento: ${area}
Matéria/Assunto: ${subject}
Dúvida do Aluno: ${submission.content}

Sua tarefa é atuar como um tutor didático e atencioso conforme as instruções do sistema.
1. Identifique o tópico específico da matéria (ex: "Química Orgânica: Nomenclaturas").
2. Explique o conceito conforme o estilo solicitado (curto ou longo).
3. Liste pontos-chave para memorização.
4. Sugira próximos passos de estudo.

Retorne estritamente em JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["subject", "topic", "explanation", "keyPoints", "suggestedNextSteps"],
        properties: {
          subject: { type: Type.STRING },
          topic: { type: Type.STRING },
          explanation: { type: Type.STRING },
          keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedNextSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  const result = JSON.parse(response.text || "{}");
  return {
    ...result,
    responseLength: submission.responseLength
  } as TutoringResponse;
};

// Re-add the helper if it was needed
export const generateEssayTopic = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Gere um único tema de redação estilo ENEM, polêmico e atual. Responda apenas com o título do tema, sem aspas.",
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "O impacto da inteligência artificial no mercado de trabalho brasileiro.";
  }
};
