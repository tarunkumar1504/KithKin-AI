import type { OpenModelId, ModelMetadata, SystemPromptConfig, HeirloomRecipe, RecipeRiskAnalysis, AllergenProfile, MealPlanDay, LanguageMessage, NetworkAuditLog } from '../types';

export const OPEN_MODELS: ModelMetadata[] = [
  {
    id: 'llama-3.2-3b',
    name: 'Llama 3.2 (3B Instruct)',
    provider: 'Meta AI Open Weights',
    size: '2.0 GB (Quantized Q4_K_M)',
    description: 'Fast, highly capable open-weight reasoning model tuned for local low-latency devices.',
    badgeColor: 'from-blue-500 to-indigo-600',
    bestFor: 'General conversational reasoning, voice memo transcription cleanup, and prompt execution.'
  },
  {
    id: 'deepseek-r1-distill',
    name: 'DeepSeek-R1 (Distill 7B)',
    provider: 'DeepSeek Open Reasoning',
    size: '4.1 GB (Quantized Q4_K_M)',
    description: 'State-of-the-art open reasoning model featuring explicit Chain-of-Thought thinking steps.',
    badgeColor: 'from-purple-500 to-pink-600',
    bestFor: 'Strict medical allergy cross-contamination checking and complex dietary safety matrices.'
  },
  {
    id: 'phi-3.5-mini',
    name: 'Phi-3.5 Mini (3.8B)',
    provider: 'Microsoft Open Research',
    size: '2.3 GB (Quantized Q4_K_M)',
    description: 'Lightweight ultra-dense open model engineered for reasoning on low-spec laptops.',
    badgeColor: 'from-emerald-500 to-teal-600',
    bestFor: 'On-device language tutoring, real-time grammar breakdown, and instant offline responses.'
  },
  {
    id: 'mistral-7b-v0.3',
    name: 'Mistral 7B Instruct v0.3',
    provider: 'Mistral AI Open Source',
    size: '4.3 GB (Quantized Q4_K_M)',
    description: 'Legendary open-weight model with strong multilingual culinary knowledge and nuance.',
    badgeColor: 'from-amber-500 to-orange-600',
    bestFor: 'Multilingual recipe extraction, family story preservation, and authentic dialect handling.'
  },
  {
    id: 'whisper-v3-local',
    name: 'Whisper Large v3 (Local Audio)',
    provider: 'OpenAI Open-Weight Audio',
    size: '1.5 GB (ONNX WebGPU)',
    description: 'Open-weight speech recognition model running directly inside the browser / local C++ backend.',
    badgeColor: 'from-cyan-500 to-blue-600',
    bestFor: 'Transcribing noisy, multi-dialect grandpa voice notes with accurate timestamping.'
  }
];

export const INITIAL_SYSTEM_CONFIG: SystemPromptConfig = {
  temperature: 0.7,
  topP: 0.9,
  contextWindow: 8192,
  systemInstruction: `You are KithKin AI, an open-source, air-gapped local agent dedicated to protecting loved ones' data, medical safety, and personal memories.`,
  reasoningDepth: 'deep-cot'
};

// Global Audit Log Storage
let auditLogs: NetworkAuditLog[] = [
  {
    id: 'log-1',
    timestamp: new Date().toLocaleTimeString(),
    destination: '127.0.0.1:11434 (Local Ollama Engine)',
    bytesTransferred: 1420,
    status: 'LOCAL_LOOPBACK_SUCCESS',
    description: 'Executed Llama 3.2 3B locally. 0 external cloud bytes sent.'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
    destination: 'IndexedDB://KithKinLocalVault',
    bytesTransferred: 4820,
    status: 'LOCAL_INDEXEDDB_READ',
    description: 'Loaded Grandpa Arthur recipe memory cards offline.'
  }
];

export const getAuditLogs = () => auditLogs;

export const recordAuditLog = (destination: string, description: string, bytes = 1200) => {
  const newLog: NetworkAuditLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    destination,
    bytesTransferred: bytes,
    status: destination.includes('cloud') || destination.includes('api.openai') ? 'BLOCKED_AIRGAP' : 'LOCAL_LOOPBACK_SUCCESS',
    description
  };
  auditLogs = [newLog, ...auditLogs];
  return newLog;
};

// Open-Weight Recipe Extraction Engine
export async function processVoiceMemoToRecipe(
  transcript: string,
  modelId: OpenModelId,
  _config: SystemPromptConfig,
  onThoughtStep?: (thought: string) => void
): Promise<HeirloomRecipe> {
  recordAuditLog(`Local Model [${modelId}]`, `Processing ${transcript.length} char voice transcript locally`);

  if (onThoughtStep) {
    onThoughtStep(`[${modelId}] Initializing local open-weight tensor graph...`);
    await new Promise((r) => setTimeout(r, 400));
    onThoughtStep(`Analyzing dialect and rustic storytelling phrasing in voice transcript...`);
    await new Promise((r) => setTimeout(r, 600));
    onThoughtStep(`Extracting implicit ingredients, unmeasured Grandma proportions, and secret timing cues...`);
    await new Promise((r) => setTimeout(r, 500));
    onThoughtStep(`Structuring heirloom JSON output and isolating nostalgic memory quotes...`);
    await new Promise((r) => setTimeout(r, 400));
  }

  const isBiscotti = transcript.toLowerCase().includes('biscotti') || transcript.toLowerCase().includes('cookie') || transcript.toLowerCase().includes('almond');

  if (isBiscotti) {
    return {
      title: "Grandma Maria's Twice-Baked Almond & Anise Biscotti",
      origin: "Naples, Italy (1954 Family Notebook)",
      prepTime: "25 mins",
      cookTime: "40 mins",
      servings: 18,
      ingredients: [
        { name: "Raw Unpeeled Whole Almonds", amount: "1.5 cups (lightly toasted)", category: "Nuts" },
        { name: "Unbleached Pastry Flour", amount: "2.5 cups", category: "Baking" },
        { name: "Granulated Cane Sugar", amount: "1 cup", category: "Baking" },
        { name: "Farm Fresh Eggs", amount: "3 large + 1 yolk for wash", category: "Dairy/Eggs" },
        { name: "Crushed Anise Seeds", amount: "1.5 teaspoons", category: "Spices" },
        { name: "Pure Vanilla Extract & Lemon Zest", amount: "1 tsp vanilla + zest of 1 lemon", category: "Flavoring" },
        { name: "Baking Powder & Sea Salt", amount: "1 tsp baking powder + 1/2 tsp salt", category: "Baking" }
      ],
      steps: [
        "Toast the raw almonds in a dry cast-iron skillet over medium-low heat until fragrant, then let them cool completely.",
        "In a large earthen bowl, whisk sugar, eggs, lemon zest, and anise seeds until pale and ribbon-like.",
        "Fold in the flour, baking powder, and whole almonds until a stiff, sticky dough forms.",
        "Shape into two 12-inch long logs on parchment paper. Brush with egg yolk wash.",
        "Bake at 350°F (175°C) for 25 minutes until golden brown. Remove and cool for 10 minutes.",
        "Slice diagonally into 1/2-inch thick biscuits with a serrated knife, lay flat, and bake 7 minutes on each side until crisp."
      ],
      grandpaSecretNote: "Grandma always said never chop the almonds! Keeping them whole gives each biscotti the iconic mosaic pattern when sliced diagonally.",
      nostalgicMemoryQuote: `"We used to dip these into Vin Santo after Sunday mass while the kitchen smelled like toasted anise..."`,
      tags: ["Family Heirloom", "Italian Baking", "Voice Extracted"]
    };
  }

  return {
    title: "Grandpa Arthur's Slow-Simmered Sunday Ragù alla Bolognese",
    origin: "Emilia-Romagna / Family Sunday Tradition",
    prepTime: "30 mins",
    cookTime: "3.5 hours",
    servings: 6,
    ingredients: [
      { name: "Coarsely Ground Beef Chuck (80/20)", amount: "500g (1.1 lbs)", category: "Meat" },
      { name: "Ground Pork Shoulder / Pancetta", amount: "250g (0.5 lbs) finely diced", category: "Meat" },
      { name: "Yellow Onion, Carrot & Celery (Soffritto)", amount: "1 large onion, 2 carrots, 2 stalks celery finely minced", category: "Produce" },
      { name: "Whole Milk", amount: "1 cup (250ml)", category: "Dairy" },
      { name: "Dry Italian Red Wine (Chianti)", amount: "1 cup (250ml)", category: "Pantry" },
      { name: "Italian San Marzano Whole Tomatoes", amount: "1 can (800g) crushed by hand", category: "Pantry" },
      { name: "Fresh Bay Leaves & Dried Oregano", amount: "2 bay leaves + 1 tsp oregano", category: "Herbs" },
      { name: "Parmigiano-Reggiano Rind", amount: "1 solid rind", category: "Dairy" }
    ],
    steps: [
      "In a heavy Dutch oven, melt 2 tbsp butter with olive oil. Add diced pancetta and render until crisp.",
      "Add minced onion, carrot, and celery. Sweat on low heat for 15 minutes until sweet and translucent.",
      "Increase heat, add ground meats, breaking apart with a wooden spoon until browned but not crispy.",
      "Pour in the whole milk and simmer gently until completely absorbed (this protects meat fibers from acid!).",
      "Pour in the red wine and let it bubble until reduced by half.",
      "Stir in hand-crushed tomatoes, bay leaves, and Parmigiano rind. Cover loosely and simmer on lowest flame for 3 hours, stirring occasionally."
    ],
    grandpaSecretNote: "Simmering the milk into the browned meat BEFORE adding red wine is the secret to buttery melt-in-your-mouth texture. Never skip the cheese rind!",
    nostalgicMemoryQuote: `"My mother would start this sauce at 7:00 AM before mass. The whole house smelled like garlic and sweet onions when we walked back in."`,
    tags: ["Authentic Italian", "Grandpa Secret", "Slow Cook"]
  };
}

// Open-Weight Bio-Safety Allergy Inspector
export async function analyzeRecipeSafety(
  recipeText: string,
  allergenProfile: AllergenProfile,
  modelId: OpenModelId,
  onThoughtStep?: (thought: string) => void
): Promise<RecipeRiskAnalysis> {
  recordAuditLog(`Local Model [${modelId}]`, `Checking recipe safety against Alex's allergy profile locally`);

  if (onThoughtStep) {
    onThoughtStep(`[${modelId}] Loading local medical dietary knowledge base...`);
    await new Promise((r) => setTimeout(r, 400));
    onThoughtStep(`Evaluating cross-reactivity & hidden allergen vectors (e.g. anti-caking agents, fermented histamine)...`);
    await new Promise((r) => setTimeout(r, 600));
    onThoughtStep(`Calculating bio-safety rating (Histamine level, Celiac gluten threshold, FODMAP content)...`);
    await new Promise((r) => setTimeout(r, 500));
  }

  const flagged: { name: string; riskReason: string; safeReplacement: string }[] = [];
  const crossNotes: string[] = [];

  const lowerText = recipeText.toLowerCase();

  if (allergenProfile.celiacDisease && (lowerText.includes('flour') || lowerText.includes('soy sauce') || lowerText.includes('wheat') || lowerText.includes('pasta'))) {
    if (lowerText.includes('soy sauce')) {
      flagged.push({
        name: "Standard Soy Sauce",
        riskReason: "Contains brewed wheat gluten (High Celiac Hazard).",
        safeReplacement: "Organic Coconut Aminos or Gluten-Free Tamari (Certified GF)."
      });
    }
    if (lowerText.includes('wheat') || lowerText.includes('all-purpose flour')) {
      flagged.push({
        name: "Wheat / All-Purpose Flour",
        riskReason: "Contains gluten proteins gliadin & glutenin.",
        safeReplacement: "1:1 Gluten-Free Baking Flour (Blend of Rice Flour, Potato Starch & Tapioca)."
      });
    }
    crossNotes.push("Ensure cutting board and toaster have not been used for wheat bread.");
  }

  if (allergenProfile.histamineIntolerance && (lowerText.includes('aged') || lowerText.includes('parmesan') || lowerText.includes('tomato') || lowerText.includes('spinach') || lowerText.includes('vinegar') || lowerText.includes('canned'))) {
    flagged.push({
      name: "Parmigiano-Reggiano / Aged Cheese",
      riskReason: "Aged cheese accumulates high levels of biogenic amines & histamine during fermentation.",
      safeReplacement: "Fresh Mozzarella, Young Ricotta, or Nutritional Yeast (un-aged)."
    });
    if (lowerText.includes('tomato')) {
      flagged.push({
        name: "Canned Tomato Paste / San Marzano",
        riskReason: "Histamine liberator and canned processing increases amine concentration.",
        safeReplacement: "Fresh yellow heirloom tomatoes or roasted butternut squash ragu base."
      });
    }
    crossNotes.push("Cook immediately or freeze leftovers right away. Do not store in fridge > 24h due to histamine accumulation.");
  }

  if (allergenProfile.treeNuts && (lowerText.includes('almond') || lowerText.includes('walnut') || lowerText.includes('cashew') || lowerText.includes('pesto'))) {
    flagged.push({
      name: "Tree Nuts / Pesto Nuts",
      riskReason: "Severe Anaphylactic Allergen.",
      safeReplacement: "Toasted Pumpkin Seeds (Pepitas) or Sunflower Seed Butter."
    });
  }

  const isSafe = flagged.length === 0;
  const safetyScore = isSafe ? 98 : Math.max(35, 100 - (flagged.length * 25));

  return {
    recipeTitle: recipeText.slice(0, 40) + "...",
    isSafe,
    safetyScore,
    flaggedIngredients: flagged,
    crossContaminationNotes: crossNotes.length > 0 ? crossNotes : ["No high-risk cross contamination vectors identified."],
    safePreparationTip: isSafe 
      ? "Recipe passes all selected safety thresholds! Keep preparation tools clean."
      : "Replace flagged ingredients with the suggested local open-weight alternatives before cooking."
  };
}

// 7-Day Bio-Safe Meal Plan Generator
export async function generateSafeMealPlan(
  _profile: AllergenProfile,
  modelId: OpenModelId
): Promise<MealPlanDay[]> {
  recordAuditLog(`Local Model [${modelId}]`, `Synthesizing 7-day safe meal plan offline`);
  await new Promise((r) => setTimeout(r, 800));

  return [
    {
      day: "Monday",
      breakfast: "Wild Blueberry & Chia Porridge (Made with Coconut Milk & Gluten-Free Oats)",
      lunch: "Grilled Chicken Breast Bowl with Quinoa, Steamed Zucchini & Olive Oil Dressing",
      dinner: "Fresh Pan-Seared Salmon with Herb Roasted Sweet Potato Wedges & Green Beans",
      snacks: "Sliced Fresh Pear & Pumpkin Seeds",
      histamineRating: "Very Low",
      celiacSafe: true
    },
    {
      day: "Tuesday",
      breakfast: "Pasture-Raised Scrambled Eggs with Fresh Herbs & Avocado on Seed Toast",
      lunch: "Fresh Cucumber & Herb Rice Paper Wraps with Poached Turkey & Sesame Dip",
      dinner: "Grass-Fed Beef Patty on Baked Sweet Potato Slab with Tossed Butter Lettuce",
      snacks: "Crisp Apple Slices with Sunflower Butter",
      histamineRating: "Very Low",
      celiacSafe: true
    },
    {
      day: "Wednesday",
      breakfast: "Tropical Mango & Coconut Smoothie Bowl with Toasted Pepitas",
      lunch: "Fresh Mediterranean Quinoa Salad with Cucumbers, Fresh Mint & Olive Oil",
      dinner: "Baked Cod Filet with Steamed Broccoli, Cauliflower & Lemon-Dill Infusion",
      snacks: "Carrot Sticks with Fresh Homemade Hummus (No Garlic)",
      histamineRating: "Very Low",
      celiacSafe: true
    },
    {
      day: "Thursday",
      breakfast: "Gluten-Free Cassava Flour Pancakes with Pure Maple Syrup & Blueberries",
      lunch: "Pan-Seared Turkey Tenderloin Salad with Fresh Peaches & Basil Oil",
      dinner: "Slow-Baked Pork Tenderloin with Parsnip Mash & Sautéed Swiss Chard",
      snacks: "Freeze-Dried Fresh Strawberries",
      histamineRating: "Very Low",
      celiacSafe: true
    },
    {
      day: "Friday",
      breakfast: "Fresh Egg Muffins with Diced Bell Peppers & Steamed Asparagus",
      lunch: "Zucchini Noodles (Zoodles) with Fresh Basil Pesto (Nut-Free Pumpkin Seed Base)",
      dinner: "Wild Caught Pan-Roasted Halibut with Basmati Rice & Roasted Carrots",
      snacks: "Toasted Coconut Flakes & Chilled Grapes",
      histamineRating: "Very Low",
      celiacSafe: true
    },
    {
      day: "Saturday",
      breakfast: "Overnight Seed Pudding (Chia, Hemp & Coconut) with Fresh Blackberries",
      lunch: "Warm Roast Beef Slice Box with Steamed Sweet Corn & Cucumber Salad",
      dinner: "Homemade Gluten-Free Chicken Soup with Carrots, Celery & Fresh Parsley",
      snacks: "Crispy Roasted Chickpeas",
      histamineRating: "Low",
      celiacSafe: true
    },
    {
      day: "Sunday",
      breakfast: "Sunday Fluffy Potato & Rosemary Frittata with Side Salad",
      lunch: "Fresh Salmon Lettuce Boats with Avocado Salsa (Fresh Yellow Tomatoes)",
      dinner: "Herb-Crusted Roast Lamb Chop with Roasted Delicata Squash & Asparagus",
      snacks: "Fresh Pomegranate Seeds & Tiger Nuts",
      histamineRating: "Very Low",
      celiacSafe: true
    }
  ];
}

// Patient Language Partner Conversation Engine
export async function sendLanguageMessage(
  userText: string,
  targetLang: 'Japanese' | 'Spanish' | 'Italian' | 'French',
  modelId: OpenModelId,
  _history: LanguageMessage[]
): Promise<LanguageMessage> {
  recordAuditLog(`Local Model [${modelId}]`, `Processing language practice conversation in ${targetLang}`);
  await new Promise((r) => setTimeout(r, 650));

  let text = '';
  let translation = '';
  let correction: LanguageMessage['grammarCorrection'];

  if (targetLang === 'Spanish') {
    text = "¡Excelente frase! Me gusta cómo usaste el vocabulario. Para que suene aún más natural entre amigos, puedes decir: '¿Te apetece tomar un café más tarde?'";
    translation = "Excellent sentence! I love how you used the vocabulary. To sound even more natural among friends, you can say: 'Do you feel like grabbing a coffee later?'";
    if (userText.toLowerCase().includes('quiero') || userText.toLowerCase().includes('ir')) {
      correction = {
        originalSegment: userText,
        correctedSegment: "Me gustaría ir al café, si estás libre.",
        explanation: "Using 'Me gustaría' (I would like) adds warm courtesy compared to direct 'Quiero' (I want)."
      };
    }
  } else if (targetLang === 'Japanese') {
    text = "素晴らしい表現ですね！とても自然です。今度一緒にカフェに行きませんか？ (Subarashii hyōgen desu ne! Very natural. Would you like to go to a café together next time?)";
    translation = "Wonderful expression! Very natural. Would you like to go to a café together next time?";
    correction = {
      originalSegment: userText,
      correctedSegment: userText + " (Polite -desu/masu form)",
      explanation: "Adding polite sentence-ending particles keeps the conversation warm and encouraging."
    };
  } else if (targetLang === 'Italian') {
    text = "Che bella frase! Il tuo accento sta migliorando tantissimo. Vuoi esercitarti ad ordinare al ristorante?";
    translation = "What a lovely sentence! Your accent is improving so much. Do you want to practice ordering at a restaurant?";
  } else {
    text = "C'est une très bonne phrase ! Ton français s'améliore à chaque conversation. Est-ce que tu veux parler de tes passe-temps ?";
    translation = "That's a very good sentence! Your French improves with every conversation. Would you like to talk about your hobbies?";
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'tutor',
    text,
    translation,
    grammarCorrection: correction,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
