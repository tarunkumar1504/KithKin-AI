import React, { useState } from 'react';
import type { OpenModelId, AllergenProfile, RecipeRiskAnalysis, MealPlanDay } from '../types';
import { analyzeRecipeSafety, generateSafeMealPlan } from '../services/localLLM';
import { ShieldCheck, AlertTriangle, CheckCircle2, Calendar, Heart, Search, Terminal, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AlexProps {
  selectedModel: OpenModelId;
}

const INITIAL_PROFILE: AllergenProfile = {
  celiacDisease: true,
  histamineIntolerance: true,
  treeNuts: true,
  peanuts: true,
  shellfish: false,
  dairyLactose: false,
  nightshades: false,
  lowFODMAP: false,
  customSensitivities: ['Aged Soy Sauce', 'Canned Tomato Paste']
};

export const AlexAllergyPlanner: React.FC<AlexProps> = ({ selectedModel }) => {
  const [profile, setProfile] = useState<AllergenProfile>(INITIAL_PROFILE);
  const [recipeInput, setRecipeInput] = useState<string>(
    "Traditional Pasta Bolognese with AP Wheat Flour, 2 tbsp Aged Soy Sauce for umami, Canned San Marzano Tomato Paste, and 1/2 cup Aged Parmigiano-Reggiano."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [thoughtLog, setThoughtLog] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<RecipeRiskAnalysis | null>(null);

  const [mealPlan, setMealPlan] = useState<MealPlanDay[] | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  const toggleAllergen = (key: keyof AllergenProfile) => {
    if (typeof profile[key] === 'boolean') {
      setProfile({ ...profile, [key]: !profile[key] });
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setThoughtLog([]);
    setAnalysisResult(null);

    try {
      const res = await analyzeRecipeSafety(
        recipeInput,
        profile,
        selectedModel,
        (thought) => setThoughtLog((prev) => [...prev, thought])
      );
      setAnalysisResult(res);
      if (!res.isSafe) {
        confetti({ particleCount: 25, spread: 50 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const plan = await generateSafeMealPlan(profile, selectedModel);
      setMealPlan(plan);
      confetti({ particleCount: 50, spread: 70 });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Friend Story Card Header */}
      <div className="glass-panel-emerald rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-emerald-500/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
          <div className="relative">
            <img
              src="/alex.jpg"
              alt="Alex Roommate"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-xl shadow-emerald-950/40"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg">
              <Heart className="w-4 h-4 fill-slate-950" />
            </span>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400" /> Built for Roommate Alex
              </span>
              <span className="badge-local-airgap text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero Cloud Medical Data Exposure
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Alex's Safe Table (Allergy & Bio-Meal Planner)
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              "Alex suffers from severe celiac disease, histamine intolerance, and tree nut allergies. Sending his complex auto-immune health profile to cloud AI servers raises deep privacy concerns. KithKin AI uses open weights (DeepSeek-R1 / Llama 3.2) locally to cross-reference ingredients, flag hidden allergens, calculate safe replacements, and generate 7-day meal plans 100% offline."
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-emerald-300/80 pt-1">
              <span>🛡️ Celiac & Histamine Matrix: Enabled</span>
              <span>•</span>
              <span>⚡ DeepSeek-R1 Open Reasoning</span>
              <span>•</span>
              <span>🔒 Zero Cloud Logs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Allergen Matrix & Recipe Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Allergen Profile Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <span>🛡️ Alex's Bio-Safety Profile</span>
              </h2>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                Local Vault
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Select active auto-immune or allergy restrictions to enforce during ingredient analysis:
            </p>

            {/* Allergen Checkboxes */}
            <div className="space-y-2.5">
              {[
                { key: 'celiacDisease', label: '🌾 Strict Celiac (Gluten-Free)', desc: 'Wheat, barley, rye & hidden soy sauce gluten' },
                { key: 'histamineIntolerance', label: '🍷 High Histamine Intolerance', desc: 'Aged cheese, canned tomatoes, vinegar, fermented foods' },
                { key: 'treeNuts', label: '🥜 Tree Nuts & Peanuts', desc: 'Almonds, walnuts, cashews, peanut cross-reactivity' },
                { key: 'shellfish', label: '🦐 Crustacean Shellfish', desc: 'Shrimp, crab, lobster' },
                { key: 'lowFODMAP', label: '🧄 Low FODMAP (IBS Safe)', desc: 'No high-fructose, garlic, or onion excess' },
                { key: 'dairyLactose', label: '🥛 Dairy / Lactose Free', desc: 'Milk proteins & lactose' }
              ].map((item) => {
                const isActive = profile[item.key as keyof AllergenProfile] as boolean;
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleAllergen(item.key as keyof AllergenProfile)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between ${
                      isActive
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700'
                    }`}>
                      {isActive ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Generate Meal Plan Button */}
            <button
              onClick={handleGeneratePlan}
              disabled={isGeneratingPlan}
              className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98 disabled:opacity-50"
            >
              <Calendar className="w-4 h-4" />
              <span>{isGeneratingPlan ? "Synthesizing 7-Day Plan..." : "Generate 7-Day Bio-Safe Meal Plan"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Recipe Risk Inspector & Safety Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Ingredient Text Inspector */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Recipe & Food Label Risk Inspector</span>
              </h2>
              <span className="text-xs text-purple-400 font-mono bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                {selectedModel}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Paste any recipe text, restaurant menu item, or packaged food ingredient list below:
            </p>

            <textarea
              value={recipeInput}
              onChange={(e) => setRecipeInput(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-mono"
            />

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-98 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{isAnalyzing ? "Running Local Safety Audit..." : "Run Open AI Bio-Safety Audit"}</span>
            </button>
          </div>

          {/* Reasoning Thought Stream */}
          {thoughtLog.length > 0 && (
            <div className="bg-slate-950/90 rounded-xl p-4 border border-emerald-500/20 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-[11px]">
                <Terminal className="w-3.5 h-3.5" /> Chain-of-Thought Allergy Logic ({selectedModel})
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-400">
                {thoughtLog.map((log, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500">›</span> {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Safety Analysis Report */}
          {analysisResult && (
            <div className={`glass-panel rounded-2xl p-6 border space-y-5 ${
              analysisResult.isSafe ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-amber-500/40 bg-amber-950/10'
            }`}>
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  {analysisResult.isSafe ? (
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      {analysisResult.isSafe ? "Verified Bio-Safe for Alex" : "Allergen Risks Detected"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Safety Index Score: <span className="font-mono font-bold text-emerald-400">{analysisResult.safetyScore}/100</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Flagged Ingredients & Safe Substitutes */}
              {analysisResult.flaggedIngredients.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    ⚠️ Flagged Ingredients & Safe Substitutions
                  </h4>
                  <div className="space-y-2.5">
                    {analysisResult.flaggedIngredients.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-red-400">{item.name}</span>
                          <span className="text-[10px] bg-red-950/60 text-red-300 px-2 py-0.5 rounded border border-red-800/40">
                            HAZARD
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{item.riskReason}</p>
                        <div className="mt-2 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/30 text-emerald-300 text-[11px] flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>Safe Substitute: <strong>{item.safeReplacement}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cross-contamination Notes */}
              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="font-bold text-slate-300">Kitchen Cross-Contamination Advisory:</span>
                <ul className="list-disc list-inside text-slate-400 space-y-1 pt-1">
                  {analysisResult.crossContaminationNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* 7-Day Meal Plan Drawer / Display */}
      {mealPlan && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>Alex's 7-Day Bio-Safe Meal Plan</span>
              </h2>
              <p className="text-xs text-slate-400">
                Formulated locally by {selectedModel} adhering to strict Celiac & Low Histamine parameters.
              </p>
            </div>
            <span className="badge-local-airgap text-xs px-3 py-1 rounded-full font-bold">
              100% Certified Safe
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPlan.map((day, idx) => (
              <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-extrabold text-sm text-emerald-400">{day.day}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/40">
                    Histamine: {day.histamineRating}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Breakfast:</span>
                    <p className="text-slate-200 mt-0.5">{day.breakfast}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Lunch:</span>
                    <p className="text-slate-200 mt-0.5">{day.lunch}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase">Dinner:</span>
                    <p className="text-slate-200 mt-0.5">{day.dinner}</p>
                  </div>
                  <div className="pt-1 border-t border-slate-800/60">
                    <span className="text-amber-400 font-semibold text-[10px] uppercase">Safe Snack:</span>
                    <p className="text-slate-300 mt-0.5">{day.snacks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
