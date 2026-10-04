import React, { useState, useEffect, useRef } from 'react';
import type { OpenModelId, SystemPromptConfig, VoiceMemo, HeirloomRecipe } from '../types';
import { processVoiceMemoToRecipe } from '../services/localLLM';
import { Mic, MicOff, Play, Pause, Sparkles, BookOpen, Clock, Users, Printer, Heart, Shield, MessageSquareQuote, ChevronRight, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrandpaProps {
  selectedModel: OpenModelId;
  systemConfig: SystemPromptConfig;
}

const SAMPLE_MEMOS: VoiceMemo[] = [
  {
    id: 'memo-1',
    title: "Sunday Ragù alla Bolognese & Family Memories",
    speaker: "Grandpa Arthur (82 yrs)",
    date: "Recorded Oct 2, 2026",
    audioDuration: "03:42",
    rawTranscript: `Ah, capisci, if you want real Sunday ragù, you don't start with oil and high heat! My mother Maria would always render pancetta in the heavy iron pot first. Then you add your soffritto—onion, carrot, celery, diced real small. Now listen close: when you brown the beef chuck and ground pork, you MUST add the whole milk first before any wine! The milk coats the meat fibers so it stays tender after hours on the stove. Once the milk evaporates, pour a glass of Chianti—one for the pot, one for you, haha! Throw in hand-crushed San Marzano tomatoes, a bay leaf, and the Parmigiano cheese rind. Simmer low for 3 hours. We used to eat this after Sunday mass while the kitchen smelled like garlic and sweet onions...`,
  },
  {
    id: 'memo-2',
    title: "Grandma Maria's Twice-Baked Almond Biscotti",
    speaker: "Grandpa Arthur (82 yrs)",
    date: "Recorded Sep 18, 2026",
    audioDuration: "02:15",
    rawTranscript: `People ask why our family biscotti don't break your teeth like the ones in coffee shops! The trick Grandma used was unpeeled raw whole almonds, never toasted beforehand, and a full spoon of crushed anise seeds. Whisk 3 eggs with sugar until it looks like golden ribbon, then fold in flour and whole almonds. Don't chop the almonds! Bake the long dough logs at 350 for 25 minutes, slice them diagonally while warm, then bake again for 7 minutes. We dipped them in Vin Santo on Christmas Eve while watching the snow in Naples...`,
  }
];

export const GrandpaRecipeWeaver: React.FC<GrandpaProps> = ({ selectedModel, systemConfig }) => {
  const [selectedMemo, setSelectedMemo] = useState<VoiceMemo>(SAMPLE_MEMOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [thoughtLog, setThoughtLog] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<HeirloomRecipe | null>(null);

  // Audio wave canvas animation simulation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    handleExtractRecipe(selectedMemo.rawTranscript);
  }, [selectedMemo]);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => setRecordTime(t => t + 1), 1000);
    } else {
      setRecordTime(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 40;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        let height = 6;
        if (isPlaying || isRecording) {
          height = Math.sin(step + i * 0.3) * 18 + 22 + Math.random() * 8;
        } else {
          height = Math.sin(i * 0.4) * 4 + 8;
        }
        ctx.fillStyle = isRecording ? '#ef4444' : isPlaying ? '#f59e0b' : '#475569';
        ctx.fillRect(i * barWidth + 2, (canvas.height - height) / 2, barWidth - 3, height);
      }
      step += 0.15;
      animationFrameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, isRecording]);

  const handleExtractRecipe = async (textToProcess: string) => {
    setIsProcessing(true);
    setThoughtLog([]);
    setRecipe(null);

    try {
      const extracted = await processVoiceMemoToRecipe(
        textToProcess,
        selectedModel,
        systemConfig,
        (thought) => setThoughtLog((prev) => [...prev, thought])
      );
      setRecipe(extracted);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      const simulatedText = "Grandpa's Fresh Homemade Gnocchi secret: boil potatoes with skins ON so they don't absorb water, then ricer them while burning hot with 1 egg and just enough flour so they stay pillowy soft!";
      handleExtractRecipe(simulatedText);
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Friend Story Card Header */}
      <div className="glass-panel-amber rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-amber-500/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
          <div className="relative">
            <img
              src="/grandpa.jpg"
              alt="Grandpa Arthur"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-amber-400/40 shadow-xl shadow-amber-950/40"
            />
            <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-lg">
              <Heart className="w-4 h-4 fill-slate-950" />
            </span>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" /> Built for Grandpa Arthur
              </span>
              <span className="badge-local-airgap text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> 100% Offline Whisper + Open LLM
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Grandpa Arthur's Voice Memo Recipe Treasury
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              "Grandpa Arthur leaves 20-minute rambling audio notes about Naples family traditions. Cloud speech APIs log intimate family stories and charge per minute. KithKin AI runs local Whisper & open-weight LLMs directly on laptop hardware to extract exact ingredients, nostalgic memories, and secret tips—creating a permanent digital family heirloom."
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-amber-300/80 pt-1">
              <span>🎙️ Voice Notes: Preserved</span>
              <span>•</span>
              <span>📖 Secret Tips: Extracted</span>
              <span>•</span>
              <span>🔒 Server Expense: $0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Audio Player / Selector & Recipe Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Voice Memos & Recording (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Audio Player & Microphone Controls */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <span>🎙️ Voice Audio Console</span>
              </h2>
              <span className="text-xs text-amber-400 font-mono bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                Whisper Audio Engine
              </span>
            </div>

            {/* Audio Waveform Canvas */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 flex flex-col items-center justify-center space-y-3">
              <canvas ref={canvasRef} width={320} height={48} className="w-full h-12" />
              <div className="flex items-center justify-between w-full text-xs font-mono text-slate-400 px-1">
                <span>{isRecording ? `REC ${formatTime(recordTime)}` : selectedMemo.audioDuration}</span>
                <span className="text-emerald-400">100% Local PCM Audio</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={handleRecordToggle}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-red-400" />}
                <span>{isRecording ? "Stop Recording" : "Record Grandpa's Voice"}</span>
              </button>
            </div>

            {/* Pre-recorded Memos List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Saved Voice Memos from Grandpa
              </span>
              <div className="space-y-2">
                {SAMPLE_MEMOS.map((memo) => (
                  <button
                    key={memo.id}
                    onClick={() => {
                      setSelectedMemo(memo);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedMemo.id === memo.id
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{memo.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{memo.date} • {memo.audioDuration}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Raw Audio Transcript Box */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Raw Audio Transcript
              </h3>
              <button
                onClick={() => handleExtractRecipe(selectedMemo.rawTranscript)}
                disabled={isProcessing}
                className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" /> Re-extract
              </button>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto italic font-serif">
              "{selectedMemo.rawTranscript}"
            </div>
          </div>

          {/* Local Reasoning Stream Box */}
          {thoughtLog.length > 0 && (
            <div className="bg-slate-950/90 rounded-xl p-4 border border-amber-500/20 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-[11px]">
                <Terminal className="w-3.5 h-3.5" /> Open Weight Reasoning Log ({selectedModel})
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-400">
                {thoughtLog.map((log, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500">›</span> {log}
                  </p>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Extracted Heirloom Recipe Card (7 cols) */}
        <div className="lg:col-span-7">
          {isProcessing ? (
            <div className="glass-panel rounded-2xl p-12 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              <p className="text-sm font-semibold text-slate-300">
                Running {selectedModel} locally...
              </p>
              <p className="text-xs text-slate-500 max-w-sm">
                Parsing voice phrasing, converting unmeasured Grandma hints into exact grams/cups, isolating secret tips.
              </p>
            </div>
          ) : recipe ? (
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-500/30 space-y-6 bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl relative">
              
              {/* Recipe Header */}
              <div className="border-b border-slate-800 pb-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                    📜 Extracted Heirloom Recipe Card
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1 text-xs text-slate-300 hover:text-slate-100 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print Book
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                  {recipe.title}
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  📍 Origin: {recipe.origin}
                </p>

                {/* Quick Meta Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium pt-1">
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Prep: {recipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> Cook: {recipe.cookTime}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    <Users className="w-3.5 h-3.5 text-indigo-400" /> Servings: {recipe.servings}
                  </span>
                </div>
              </div>

              {/* Nostalgic Memory Quote Callout */}
              <div className="bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 p-4 rounded-xl border border-amber-500/20 flex gap-3 items-start">
                <MessageSquareQuote className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-amber-200 italic font-serif leading-relaxed">
                    {recipe.nostalgicMemoryQuote}
                  </p>
                  <p className="text-[10px] text-amber-400 font-semibold mt-1">— Grandpa Arthur's Voice Memory</p>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                  <span>🛒 Extracted Ingredients</span>
                  <span className="text-[11px] text-slate-400 font-normal">{recipe.ingredients.length} items</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex items-start justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-200">{ing.name}</p>
                        <p className="text-[11px] text-slate-400">{ing.amount}</p>
                      </div>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                        {ing.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  🍳 Preparation Steps
                </h3>
                <ol className="space-y-2.5">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/70 text-xs text-slate-300 flex items-start gap-3 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Grandpa's Secret Culinary Secret Note */}
              <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Grandpa Arthur's Secret Cooking Tip</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {recipe.grandpaSecretNote}
                </p>
              </div>

              {/* Tags Footer */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                {recipe.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
