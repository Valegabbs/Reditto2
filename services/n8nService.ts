import { EssaySubmission, WebhookResponse } from '../types';

// Use import.meta.env for Vite environment variables
const WEBHOOK_URL = (import.meta as any).env.VITE_N8N_WEBHOOK_URL || "https://reditto-n8n.yclsjn.easypanel.host/webhook/reditto";

export const submitEssayToN8N = async (submission: EssaySubmission): Promise<WebhookResponse> => {
  console.log("Iniciando envio para n8n...", WEBHOOK_URL);
  
  try {
    // Payload as requested: topic, text, img
    const payload: any = {
      topic: submission.topic,
      text: submission.content,
      img: null
    };

    // If there's a file, convert to base64 for JSON submission
    if (submission.file) {
      console.log("Convertendo arquivo para base64...");
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Erro ao ler o arquivo."));
        reader.readAsDataURL(submission.file!);
      });
      payload.img = await base64Promise;
      console.log("Arquivo convertido com sucesso.");
    }

    console.log("Enviando payload (sem imagem no log):", { ...payload, img: payload.img ? "[BASE64_DATA]" : null });

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na resposta do n8n:", response.status, errorText);
      throw new Error(`Erro no servidor de correção (${response.status}): ${errorText || response.statusText}`);
    }

    const text = await response.text();
    console.log("Resposta bruta do n8n:", text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    return {
      success: true,
      data: data
    };

  } catch (error) {
    console.error("Falha ao enviar para n8n:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro de conexão ao enviar para correção. Verifique se o webhook está ativo."
    };
  }
};
