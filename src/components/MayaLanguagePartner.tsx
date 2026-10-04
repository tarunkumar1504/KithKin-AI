import React, { useState } from 'react';
import type { OpenModelId, LanguageMessage } from '../types';
import { sendLanguageMessage } from '../services/localLLM';
import { Volume2, Send, Languages, Heart, Shield, BookOpen, UserCheck } from 'lucide-react';

interface MayaProps {
  selectedModel: OpenModelId;
}

const INITIAL_MESSAGES: LanguageMessage[] = [
  {
    id: 'msg-1',
    sender: 'tutor',
    text: "¡Hola Maya! ¿Cómo estás hoy? Estoy listo para practicar español contigo sobre viajes y comida.",
    translation: "Hello Maya! How are you today? I'm ready to practice Spanish with you about travel and food.",
    timestamp: "10:14 AM"
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: "Hola! Yo quiero comprar un café con leche, pero no sé cómo pedir en el restaurante.",
    translation: "Hello! I want to buy a coffee with milk, but I don't know how to order in the restaurant.",
    timestamp: "10:15 AM"
  },
  {
    id: 'msg-3',
    sender: 'tutor',
    text: "¡Excelente inicio! Para pedir de forma muy natural y educada, puedes decir: '¿Me das un café con leche, por favor?' o 'Quisiera un café con leche.'",
    translation: "Great start! To order in a very natural and polite way, you can say: 'Could I get a coffee with milk, please?' or 'I would like a coffee with milk.'",
    grammarCorrection: {
      originalSegment: "Yo quiero comprar un café...",
      correctedSegment: "Quisiera un café con leche...",
      explanation: "Using 'Quisiera' (I would like) sounds warmer and more polite in Spanish cafés than direct 'Quiero'."
    },
    timestamp: "10:15 AM"
  }
];

export const MayaLanguagePartner: React.FC<MayaProps> = ({ selectedModel }) => {
  const [messages, setMessages] = useState<LanguageMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [targetLang, setTargetLang] = useState<'Spanish' | 'Japanese' | 'Italian' | 'French'>('Spanish');
  const [persona, setPersona] = useState<'patient-coach' | 'friendly-neighbor' | 'strict-tutor'>('patient-coach');
  const [isSending, setIsSending] = useState(false);
  const [flashcards, setFlashcards] = useState<{ original: string; translation: string; note: string }[]>([
    { original: "Quisiera un café con leche", translation: "I would like a coffee with milk", note: "Polite café ordering phrase" },
    { original: "¿Te apetece...?", translation: "Do you feel like...?", note: "Casual friendly invitation" }
  ]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMsg: LanguageMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const tutorReply = await sendLanguageMessage(input, targetLang, selectedModel, messages);
      setMessages((prev) => [...prev, tutorReply]);

      if (tutorReply.grammarCorrection) {
        setFlashcards((prev) => [
          {
            original: tutorReply.grammarCorrection!.correctedSegment,
            translation: tutorReply.translation || tutorReply.text,
            note: tutorReply.grammarCorrection!.explanation
          },
          ...prev
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleSpeakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (targetLang === 'Spanish') utterance.lang = 'es-ES';
      if (targetLang === 'Japanese') utterance.lang = 'ja-JP';
      if (targetLang === 'Italian') utterance.lang = 'it-IT';
      if (targetLang === 'French') utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Friend Story Card Header */}
      <div className="glass-panel-indigo rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-indigo-500/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
          <div className="relative">
            <img
              src="/maya.jpg"
              alt="Maya Friend"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-xl shadow-indigo-950/40"
            />
            <span className="absolute -bottom-2 -right-2 bg-indigo-500 text-slate-950 p-1.5 rounded-full shadow-lg">
              <Heart className="w-4 h-4 fill-slate-950" />
            </span>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-indigo-400/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-indigo-400" /> Built for Friend Maya
              </span>
              <span className="badge-local-airgap text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Infinite Zero-Cost Offline Practice
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Maya's Patient Language & Accent Partner
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              "Maya is preparing to travel abroad and feels self-conscious practicing spoken Spanish & Japanese with strangers or expensive per-minute cloud AI bots. KithKin AI gives her an infinite, 100% free, open-weight practice companion running locally on her laptop—complete with custom persona system prompts, real-time grammar breakdown cards, and audio pronunciation."
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-indigo-300/80 pt-1">
              <span>🗣️ Languages: Spanish, Japanese, Italian, French</span>
              <span>•</span>
              <span>🧠 Phi-3.5 / Llama 3.2 Tutor</span>
              <span>•</span>
              <span>💳 Cost: 100% Free Forever</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Language & Persona Selector + Flashcards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Languages className="w-4 h-4 text-indigo-400" />
              <span>Language & Agent Persona Setup</span>
            </h2>

            {/* Target Language selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Target Practice Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { lang: 'Spanish', flag: '🇪🇸' },
                  { lang: 'Japanese', flag: '🇯🇵' },
                  { lang: 'Italian', flag: '🇮🇹' },
                  { lang: 'French', flag: '🇫🇷' }
                ].map((item) => (
                  <button
                    key={item.lang}
                    onClick={() => setTargetLang(item.lang as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                      targetLang === item.lang
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-base">{item.flag}</span>
                    <span>{item.lang}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Persona Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Agent Persona System Prompt
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              >
                <option value="patient-coach">Patient & Encouraging Coach (Slow Cues)</option>
                <option value="friendly-neighbor">Friendly Local Neighbor (Casual Slang)</option>
                <option value="strict-tutor">Grammar Specialist (Exhaustive Analysis)</option>
              </select>
            </div>
          </div>

          {/* Flashcard Vault */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Auto-Generated Flashcards ({flashcards.length})
              </h3>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {flashcards.map((card, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-indigo-300">{card.original}</span>
                    <button
                      onClick={() => handleSpeakText(card.original)}
                      className="text-slate-400 hover:text-indigo-400 p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-300 text-[11px]">{card.translation}</p>
                  <p className="text-[10px] text-slate-500 italic">💡 {card.note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Chat Interface & Grammar Breakdown (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[600px] glass-panel rounded-2xl border border-indigo-500/30 overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  {targetLang} Practice Partner ({selectedModel})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Mode: {persona} • Audio Speech Enabled
                </p>
              </div>
            </div>
            <span className="badge-open-ai text-[10px] px-2 py-0.5 rounded font-mono">
              LOCAL HARNESS
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/10'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="text-sm font-medium">{msg.text}</p>
                  
                  {msg.translation && (
                    <p className="text-[11px] opacity-80 border-t border-white/10 pt-1.5 italic font-serif">
                      "{msg.translation}"
                    </p>
                  )}

                  {/* Grammar Correction Box */}
                  {msg.grammarCorrection && (
                    <div className="bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30 text-[11px] text-amber-200 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-[10px] text-amber-400 uppercase">
                        ✨ Native Nuance Suggestion
                      </div>
                      <p><strong>Original:</strong> {msg.grammarCorrection.originalSegment}</p>
                      <p className="text-emerald-300"><strong>Natural:</strong> {msg.grammarCorrection.correctedSegment}</p>
                      <p className="text-slate-400 text-[10px]">{msg.grammarCorrection.explanation}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] opacity-60 pt-1">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'tutor' && (
                      <button
                        onClick={() => handleSpeakText(msg.text)}
                        className="hover:opacity-100 flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Listen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Type or speak in ${targetLang} or English...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
            <button
              onClick={handleSend}
              disabled={isSending || !input.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
