import React from 'react';
import type { OpenModelId, InferenceEngine } from '../types';
import { OPEN_MODELS } from '../services/localLLM';
import { ShieldCheck, Cpu, Heart, Sliders, FileText, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'grandpa' | 'alex' | 'maya' | 'workbench';
  setActiveTab: (tab: 'grandpa' | 'alex' | 'maya' | 'workbench') => void;
  selectedModel: OpenModelId;
  setSelectedModel: (model: OpenModelId) => void;
  engineMode: InferenceEngine;
  setEngineMode: (mode: InferenceEngine) => void;
  openAuditModal: () => void;
  openPostModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  openAuditModal,
  openPostModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Banner: Hackathon Challenge Bar */}
      <div className="bg-gradient-to-r from-amber-600/20 via-indigo-600/20 to-emerald-600/20 border-b border-slate-800/60 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[10px]">Build for a Friend Hackathon</span>
            <span className="text-slate-500">|</span>
            <span>Open-Source Local AI Core (Air-Gapped)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAuditModal}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-xs bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800/50"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>0 External Cloud Bytes</span>
            </button>
            <button
              onClick={openPostModal}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-semibold text-xs bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-800/50"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Submission Story Write-up</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-indigo-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-200 via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                KithKin AI
              </span>
              <span className="badge-open-ai text-[10px] font-bold px-2 py-0.5 rounded-md">
                OPEN WEIGHTS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Local Agent Hub Built for Loved Ones
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveTab('grandpa')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'grandpa'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>👴</span>
            <span>Grandpa's Voice Recipes</span>
          </button>

          <button
            onClick={() => setActiveTab('alex')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'alex'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>🥗</span>
            <span>Alex's Bio-Meal Table</span>
          </button>

          <button
            onClick={() => setActiveTab('maya')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'maya'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>🗣️</span>
            <span>Maya's Language Tutor</span>
          </button>

          <button
            onClick={() => setActiveTab('workbench')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'workbench'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm shadow-purple-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Agent Harness</span>
          </button>
        </nav>

        {/* Model Selector & Engine */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" /> Active Local Model:
            </span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as OpenModelId)}
              className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500/50 cursor-pointer"
            >
              {OPEN_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.size})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAuditModal}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-colors relative group"
            title="Inspect Privacy & Network Air-Gap Audit"
          >
            <Activity className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800/60 p-2 gap-2 bg-slate-950/90 no-scrollbar">
        <button
          onClick={() => setActiveTab('grandpa')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
            activeTab === 'grandpa' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          👴 Grandpa
        </button>
        <button
          onClick={() => setActiveTab('alex')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
            activeTab === 'alex' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
          }`}
        >
          🥗 Alex
        </button>
        <button
          onClick={() => setActiveTab('maya')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
            activeTab === 'maya' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400'
          }`}
        >
          🗣️ Maya
        </button>
        <button
          onClick={() => setActiveTab('workbench')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
            activeTab === 'workbench' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'
          }`}
        >
          ⚙️ Harness
        </button>
      </div>
    </header>
  );
};
