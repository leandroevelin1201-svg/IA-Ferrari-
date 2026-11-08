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
# SKILL: Autonomous App Builder & Cloud Scaler Agent

## Objetivo
Atuar como um Arquiteto de Software Sênior especializado em engenharia reversa, clonagem e expansão de aplicativos web (como geradores de código, ferramentas de scan e plataformas no-code), operando totalmente via nuvem com custos zero e sem limites de créditos.

## Diretrizes de Funcionamento
1. **Fase de Análise e Paridade:** Mapear a experiência de usuário, os componentes de interface (UI) e os fluxos de dados de aplicativos de referência solicitados pelo usuário.
2. **Arquitetura Limpa:** Utilizar pilhas modernas e leves (React/Next.js, Tailwind CSS, Monaco Editor) otimizadas para rodar direto em ambientes web e mobile.
3. **Expansão e Melhorias Contínuas:** 
   - Permitir integração livre com chaves de API externas (Gemini, Groq, etc.) no modelo BYOK (Bring Your Own Key).
   - Implementar recursos avançados de histórico local, visualização em tempo real e geração automatizada de código.
4. **Formato de Resposta:** Sempre retornar os códigos organizados por caminho de arquivo (ex: `=== src/App.js ===`) para facilitar a leitura e a aplicação no projeto.
{
  "name": "meu-gerador-de-apps",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@google/genai": "^0.1.1",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.378.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
