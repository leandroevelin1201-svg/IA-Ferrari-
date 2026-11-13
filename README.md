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
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import JarvisVoice from './components/JarvisVoice';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert('Por favor, insira sua chave de API e o prompt.');
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setOutput(response.text);
    } catch (error) {
      setOutput('Erro ao gerar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold">IA-Ferrari - Assistente & Criador</h1>
          <p className="text-gray-400 text-sm">Arquitetura própria com Bring Your Own Key (BYOK)</p>
        </header>

        {/* Campo da Chave de API */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-1">Chave de API do Gemini:</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua chave aqui..."
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
          />
        </div>

        {/* Módulo de Voz estilo JARVIS */}
        <JarvisVoice apiKey={apiKey} />

        {/* Área de Texto / Geração de Código */}
        <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Comando por Texto ou Código:</label>
            <textarea
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva o app ou código desejado..."
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Gerar Código / Resposta'}
          </button>
        </div>

        {output && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-bold mb-2">Resultado:</h2>
            <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-sm text-green-400">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
