import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function JarvisVoice({ apiKey }) {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Aguardando ativação...');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef(null);

  // Função para o navegador falar a resposta em voz alta
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      // Volta a ouvir automaticamente após terminar de falar
      if (recognitionRef.current && isListening) {
        setStatus('Ouvindo ("OK, Ferrari" ou comando direto)...');
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Envia o texto falado para a IA
  const processWithAI = async (userText) => {
    if (!apiKey) {
      speak('Por favor, insira sua chave de API do Gemini primeiro.');
      return;
    }

    setStatus('Processando resposta...');
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userText,
        config: {
          systemInstruction:
            'Você é o Ferrari, uma inteligência artificial avançada no estilo JARVIS. Responda de forma direta, natural, inteligente e concisa em português, ideal para ser lida em voz alta sem formatações complexas.',
        },
      });

      const reply = response.text;
      setAiResponse(reply);
      speak(reply);
    } catch (error) {
      setStatus('Erro na comunicação com a IA.');
      speak('Desculpe, ocorreu um erro ao processar sua solicitação.');
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const spokenText = event.results[lastResultIndex][0].transcript
        .trim()
        .toLowerCase();

      setTranscript(spokenText);

      // Verifica se disse "ok ferrari" ou "ferrari"
      if (spokenText.includes('ferrari')) {
        const cleanCommand = spokenText
          .replace(/ok,?\s*ferrari/gi, '')
          .replace(/ferrari/gi, '')
          .trim();

        if (cleanCommand.length > 1) {
          // Se já falou o comando junto (ex: "OK Ferrari, que horas são?")
          processWithAI(cleanCommand);
        } else {
          // Se disse apenas "OK Ferrari"
          speak('Sim, senhor. Como posso ajudar?');
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
        setStatus(`Erro no microfone: ${event.error}`);
      }
    };

    recognition.onend = () => {
      // Reinicia o microfone automaticamente se o modo contínuo estiver ativo
      if (isListening) {
        try {
          recognition.start();
        } catch (e) {}
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [isListening, apiKey]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      setStatus('Microfone desativado.');
    } else {
      setIsListening(true);
      try {
        recognitionRef.current?.start();
        setStatus('Ouvindo... Diga "OK, Ferrari" seguido do seu pedido.');
      } catch (e) {}
    }
  };

  return (
    <div className="bg-gray-800 border border-blue-500/30 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-blue-400">Modo Voz (Estilo JARVIS)</h2>
          <p className="text-xs text-gray-400">{status}</p>
        </div>

        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isListening ? 'Desativar Escuta' : 'Ativar "OK, Ferrari"'}
        </button>
      </div>

      {transcript && (
        <div className="text-sm bg-gray-900 p-2 rounded border border-gray-700">
          <span className="text-gray-400">Você disse: </span>
          <span className="text-white">"{transcript}"</span>
        </div>
      )}

      {aiResponse && (
        <div className="text-sm bg-gray-900 p-3 rounded border border-blue-900">
          <span className="text-blue-400 font-semibold block mb-1">Ferrari:</span>
          <p className="text-gray-200">{aiResponse}</p>
        </div>
      )}
    </div>
  );
}
