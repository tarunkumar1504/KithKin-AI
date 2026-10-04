import { useState } from 'react';
import type { OpenModelId, InferenceEngine, SystemPromptConfig } from './types';
import { INITIAL_SYSTEM_CONFIG } from './services/localLLM';
import { Header } from './components/Header';
import { GrandpaRecipeWeaver } from './components/GrandpaRecipeWeaver';
import { AlexAllergyPlanner } from './components/AlexAllergyPlanner';
import { MayaLanguagePartner } from './components/MayaLanguagePartner';
import { OpenModelHarness } from './components/OpenModelHarness';
import { PrivacyAuditor } from './components/PrivacyAuditor';
import { HackathonPostGenerator } from './components/HackathonPostGenerator';
import { ShieldCheck, Heart, FileText } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'grandpa' | 'alex' | 'maya' | 'workbench'>('grandpa');
  const [selectedModel, setSelectedModel] = useState<OpenModelId>('llama-3.2-3b');
  const [engineMode, setEngineMode] = useState<InferenceEngine>('simulated-open-engine');
  const [systemConfig, setSystemConfig] = useState<SystemPromptConfig>(INITIAL_SYSTEM_CONFIG);

  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        engineMode={engineMode}
        setEngineMode={setEngineMode}
        openAuditModal={() => setIsAuditOpen(true)}
        openPostModal={() => setIsPostOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'grandpa' && (
          <GrandpaRecipeWeaver
            selectedModel={selectedModel}
            systemConfig={systemConfig}
          />
        )}

        {activeTab === 'alex' && (
          <AlexAllergyPlanner
            selectedModel={selectedModel}
          />
        )}

        {activeTab === 'maya' && (
          <MayaLanguagePartner
            selectedModel={selectedModel}
          />
        )}

        {activeTab === 'workbench' && (
          <OpenModelHarness
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            systemConfig={systemConfig}
            setSystemConfig={setSystemConfig}
          />
        )}
      </main>

      {/* Footer & Air-Gap Status Bar */}
      <footer className="border-t border-slate-800 bg-slate-950/90 py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span className="font-semibold text-slate-200">KithKin AI</span>
            <span className="text-slate-600">•</span>
            <span>Built for Loved Ones with Open-Source AI at its Core</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAuditOpen(true)}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Air-Gap Active: 0 External HTTP Bytes</span>
            </button>

            <button
              onClick={() => setIsPostOpen(true)}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Submission Post</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyAuditor
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      <HackathonPostGenerator
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
      />

    </div>
  );
}

export default App;
