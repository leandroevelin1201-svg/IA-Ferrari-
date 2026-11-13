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
