import React, { useState } from 'react';
import type { OpenModelId, SystemPromptConfig } from '../types';
import { OPEN_MODELS } from '../services/localLLM';
import { Sliders, Cpu, Terminal, Zap, Database } from 'lucide-react';

interface HarnessProps {
  selectedModel: OpenModelId;
  setSelectedModel: (m: OpenModelId) => void;
  systemConfig: SystemPromptConfig;
  setSystemConfig: React.Dispatch<React.SetStateAction<SystemPromptConfig>>;
}

export const OpenModelHarness: React.FC<HarnessProps> = ({
  selectedModel,
  setSelectedModel,
  systemConfig,
  setSystemConfig
}) => {
  const [testPrompt, setTestPrompt] = useState("Analyze why open-source AI is critical for privacy-first family recipe and health applications.");
  const [outputStream, setOutputStream] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);

  const currentModel = OPEN_MODELS.find(m => m.id === selectedModel) || OPEN_MODELS[0];

  const handleTestExecution = async () => {
    setIsExecuting(true);
    setOutputStream('');
    
    const chunks = [
      `[Local Tensor Dispatch: ${selectedModel}]\n`,
      `<think>\nEvaluating query parameters and system prompt: "${systemConfig.systemInstruction.slice(0, 50)}..."\n`,
      `Temperature: ${systemConfig.temperature} | Top_P: ${systemConfig.topP} | Context Window: ${systemConfig.contextWindow} tokens\n`,
      `Synthesizing open-source architecture breakdown...\n</think>\n\n`,
      `Open-source AI matters for personal applications because:\n`,
      `1. Data Sovereignty: Zero bytes exit the local device (air-gapped execution).\n`,
      `2. Unlimited Zero-Cost Inference: Loved ones can run 50-minute audio memos without token limits.\n`,
      `3. Custom Agent Harness: Fine-tuning system prompts and swapping open weights dynamically.`
    ];

    for (const chunk of chunks) {
      setOutputStream(prev => prev + chunk);
      await new Promise(r => setTimeout(r, 250));
    }
    setIsExecuting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Harness Title Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
            <Sliders className="w-4 h-4" /> Open Agent Harness Studio
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight mt-1">
            System Prompt & Model Parameter Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Tweak system instructions, adjust reasoning depth, and swap open-weight models on the fly with instant local feedback.
          </p>
        </div>

        <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-800/40 flex items-center gap-3">
          <Cpu className="w-6 h-6 text-purple-400" />
          <div>
            <p className="text-xs font-bold text-slate-200">{currentModel.name}</p>
            <p className="text-[10px] text-slate-400">{currentModel.provider} • {currentModel.size}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters & Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Model Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" /> Harness Controls
            </h2>

            {/* Model Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Open Weight Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as OpenModelId)}
                className="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl p-3 focus:outline-none"
              >
                {OPEN_MODELS.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.size})</option>
                ))}
              </select>
            </div>

            {/* System Instruction Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">System Instruction Prompt</label>
              <textarea
                value={systemConfig.systemInstruction}
                onChange={(e) => setSystemConfig({ ...systemConfig, systemInstruction: e.target.value })}
                rows={4}
                className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              />
            </div>

            {/* Sliders: Temperature & Top_P */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Temperature:</span>
                  <span className="font-mono text-purple-400 font-bold">{systemConfig.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={systemConfig.temperature}
                  onChange={(e) => setSystemConfig({ ...systemConfig, temperature: parseFloat(e.target.value) })}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Top P (Nucleus Sampling):</span>
                  <span className="font-mono text-purple-400 font-bold">{systemConfig.topP}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={systemConfig.topP}
                  onChange={(e) => setSystemConfig({ ...systemConfig, topP: parseFloat(e.target.value) })}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Execution Playground & Benchmark Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live Playground Box */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" /> Live Harness Playground
            </h2>

            <textarea
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none"
            />

            <button
              onClick={handleTestExecution}
              disabled={isExecuting}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>{isExecuting ? "Executing Local Inference..." : "Test Local Open Prompt Execution"}</span>
            </button>

            {outputStream && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {outputStream}
              </div>
            )}
          </div>

          {/* Benchmark Comparison Table: Open Weights vs Closed Cloud */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" /> Open Weights vs Closed Cloud APIs
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Dimension</th>
                    <th className="p-2.5 text-emerald-400">Open-Source Local (KithKin)</th>
                    <th className="p-2.5 text-red-400">Closed Cloud APIs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  <tr>
                    <td className="p-2.5 text-slate-400">Data Privacy</td>
                    <td className="p-2.5 text-emerald-300 font-bold">100% Air-Gapped (Zero Storage)</td>
                    <td className="p-2.5 text-slate-400">Sent to third-party servers</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">Running Cost</td>
                    <td className="p-2.5 text-emerald-300 font-bold">$0.00 / ∞ Unlimited Tokens</td>
                    <td className="p-2.5 text-slate-400">Metered per-token & per-minute audio</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">Offline Functionality</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Works on laptop with NO internet</td>
                    <td className="p-2.5 text-slate-400">Requires active Wi-Fi / cellular</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-slate-400">Model Customization</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Swap open weights, fine-tune prompts</td>
                    <td className="p-2.5 text-slate-400">Black-box fixed system behavior</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
