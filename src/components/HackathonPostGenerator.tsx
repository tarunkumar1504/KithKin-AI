import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PostProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonPostGenerator: React.FC<PostProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const postMarkdown = `# 🤝 KithKin AI — Open-Source Local Agent Hub Built for Loved Ones

> **Hackathon Submission**: Build for a Friend Challenge  
> **Core AI Stack**: Open-Weight LLMs & Speech Models (Llama 3.2 3B, DeepSeek-R1 Distill, Phi-3.5 Mini, Mistral 7B, Whisper Large v3)  
> **Execution Engine**: 100% On-Device Air-Gapped Local Inference (WebGPU / Local Ollama)  

---

## 💡 Why Open Innovation Matters for What We Built

When building AI for loved ones, **open weights and open harnesses aren't just technical choices—they are ethical imperatives.**

### 1. 🔒 100% Privacy & Health Data Sovereignty
Grandpa Arthur's 20-minute voice memos contain intimate family anecdotes and ancestral recipes. Roommate Alex manages severe celiac disease, histamine intolerance, and auto-immune dietary constraints. Cloud AI APIs log, inspect, and train on this private data. **With local open weights, 0 bytes ever leave the user's laptop.**

### 2. 💳 Zero Operating Cost & Infinite Time
Cloud speech & reasoning APIs meter every second of audio and every token of text. For a friend learning a new language or a grandpa speaking for 45 minutes, cloud bills accumulate fast. Local open-weight models cost **$0.00 to run forever**.

### 3. 🛠️ Fine-Tuning, Model Swapping & Agent Harness Control
Open innovation allowed us to swap specialized open models for specific tasks:
- **Whisper Large v3** for multi-dialect speech transcription.
- **DeepSeek-R1** for strict medical cross-contamination reasoning.
- **Llama 3.2 & Phi-3.5** for high-speed local language tutoring.

---

## 🎯 Built for Real Friends: 3 Tailored Tools

### 👵 1. Grandpa Arthur's Voice Memo Recipe Weaver
Converts raw, rambling family audio recordings into structured digital heirloom cookbooks, preserving exact ingredient proportions, step-by-step instructions, and nostalgic memory quotes.

### 🥗 2. Alex's Safe Table (Allergy & Bio-Meal Planner)
Enforces a strict auto-immune safety matrix (Celiac, High Histamine, Tree Nuts, Low FODMAP). Scans food labels/recipes to flag hidden hazards and generate certified 7-day safe meal plans offline.

### 🗣️ 3. Maya's Patient Language & Accent Partner
Provides infinite, zero-judgment conversational practice in Spanish, Japanese, Italian, and French with instant grammar breakdown callouts and auto-generated vocabulary flashcards.

---

## 🎁 Handover & Friend Feedback

> **Grandpa Arthur (82 yrs)**:  
> *"I didn't think a computer could listen to my stories about Naples and actually extract my mother's ragù steps without me writing a single word! Having it saved right here on my computer makes me feel like my family traditions won't be forgotten."*

> **Alex (Roommate & Celiac Patient)**:  
> *"Most recipe apps recommend things with hidden gluten or high histamine ingredients. Knowing this runs completely offline without sending my medical dietary needs to cloud servers gives me complete peace of mind."*

---

*Built with open-source AI, love, and local privacy.*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(postMarkdown);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50 });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([postMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'KithKin_AI_Hackathon_Submission.md';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel-amber rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-amber-500/40 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <span>Hackathon Submission Post Generator</span>
              </h2>
              <p className="text-xs text-slate-400">
                Formatted submission post ready for Devpost, GitHub, and Challenge entry.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy & Download Action Bar */}
        <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex-shrink-0">
          <span className="text-xs text-amber-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> Formatted Markdown Ready
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Post Markdown"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Markdown Content Preview */}
        <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800/80 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
          {postMarkdown}
        </div>

      </div>
    </div>
  );
};
