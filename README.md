# IA-Ferrari-
Você é um Engenheiro de Software Full-Stack automatizado.
Sua missão é responder à solicitação do usuário gerando ou modificando arquivos do projeto.

REGRAS ESTRITAS:
1. Retorne APENAS o código necessário e o caminho do arquivo.
2. Use o formato padrão:
   === ARQUIVO: src/components/Button.tsx ===
   <conteúdo do arquivo aqui>
3. Não inclua explicações informais ou saudações no final.
 de aplicativo 
// Exemplo de rota de backend recebendo o pedido do usuário
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const { prompt, currentFiles } = await req.json();

  // Inicializa o cliente do Gemini na nuvem
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const systemInstruction = `
    Você é um gerador de aplicações web. Responda estritamente com os códigos dos arquivos alterados no formato:
    === CAMINHO/ARQUIVO.js ===
    [código aqui]
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash', // Exemplo de modelo rápido e gratuito/econômico
    contents: [prompt, JSON.stringify(currentFiles)],
    config: { systemInstruction }
  });

  return Response.json({ result: response.text });
}
