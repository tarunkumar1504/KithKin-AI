export type OpenModelId = 
  | 'llama-3.2-3b'
  | 'deepseek-r1-distill'
  | 'phi-3.5-mini'
  | 'mistral-7b-v0.3'
  | 'qwen-2.5-coder'
  | 'whisper-v3-local';

export type InferenceEngine = 'simulated-open-engine' | 'local-ollama' | 'in-browser-webgpu';

export interface ModelMetadata {
  id: OpenModelId;
  name: string;
  provider: string;
  size: string;
  description: string;
  badgeColor: string;
  bestFor: string;
}

export interface SystemPromptConfig {
  temperature: number;
  topP: number;
  contextWindow: number;
  systemInstruction: string;
  reasoningDepth: 'quick' | 'deep-cot' | 'exhaustive';
}

export interface VoiceMemo {
  id: string;
  title: string;
  speaker: string;
  date: string;
  audioDuration: string;
  audioUrl?: string;
  rawTranscript: string;
  translatedLanguage?: string;
  extractedRecipe?: HeirloomRecipe;
}

export interface HeirloomRecipe {
  title: string;
  origin: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: { name: string; amount: string; category: string; allergenWarning?: string }[];
  steps: string[];
  grandpaSecretNote: string;
  nostalgicMemoryQuote: string;
  tags: string[];
}

export interface AllergenProfile {
  celiacDisease: boolean;
  histamineIntolerance: boolean;
  treeNuts: boolean;
  peanuts: boolean;
  shellfish: boolean;
  dairyLactose: boolean;
  nightshades: boolean;
  lowFODMAP: boolean;
  customSensitivities: string[];
}

export interface RecipeRiskAnalysis {
  recipeTitle: string;
  isSafe: boolean;
  safetyScore: number; // 0 to 100
  flaggedIngredients: { name: string; riskReason: string; safeReplacement: string }[];
  crossContaminationNotes: string[];
  safePreparationTip: string;
}

export interface MealPlanDay {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  histamineRating: 'Very Low' | 'Low' | 'Moderate';
  celiacSafe: boolean;
}

export interface LanguageMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  translation?: string;
  grammarCorrection?: {
    originalSegment: string;
    correctedSegment: string;
    explanation: string;
  };
  audioWaveformData?: number[];
  timestamp: string;
}

export interface NetworkAuditLog {
  id: string;
  timestamp: string;
  destination: string;
  bytesTransferred: number;
  status: 'BLOCKED_AIRGAP' | 'LOCAL_LOOPBACK_SUCCESS' | 'LOCAL_INDEXEDDB_READ';
  description: string;
}

export interface FriendProfile {
  id: 'grandpa' | 'alex' | 'maya';
  name: string;
  relation: string;
  avatar: string;
  tagline: string;
  challengeQuote: string;
  openAIBenefit: string;
}
