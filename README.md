# 🛡️ KithKin AI

> **Private, Air-Gapped Local AI Agent Hub Built for Loved Ones.**  
> Built with open-source weights for the **Build for a Friend Hackathon**.

![KithKin AI Banner](https://img.shields.io/badge/Open_Source_AI-Air--Gapped-emerald?style=for-the-badge&logo=shield&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📌 Vision & Purpose

**KithKin AI** is an open-source, 100% air-gapped local agent suite designed to solve intimate, real-world challenges for our closest family and friends without compromising their privacy.

Cloud AI services often require sending personal voice notes, medical dietary restrictions, and confidential family history to remote servers. KithKin AI runs **entirely on-device** using open-weight AI models (Llama 3.2, DeepSeek-R1 Distill, Phi-3.5 Mini, Mistral 7B, and Whisper v3), ensuring **0 external cloud bytes** leave the user's computer.

---

## ✨ Key Features & User Personas

KithKin AI brings specialized local agents to life for three personal stories:

### 👴 1. Grandpa's Voice Recipe Weaver
* **Target User:** Grandparents sharing heirloom family recipes through spoken voice notes.
* **The Problem:** Family recipes stored in old audio clips or informal dictations are messy, multi-lingual, and full of off-topic nostalgic ramblings.
* **The Solution:** 
  * Local speech-to-text via **Whisper v3** running in-browser / local engine.
  * Recipe extraction & preservation via **Mistral 7B** and **Llama 3.2**.
  * Structured format capturing ingredients, precise measurements, secret granddad techniques, nostalgic memory quotes, and allergen warnings.

### 🥗 2. Alex's Bio-Meal Table & Allergen Safety Auditor
* **Target User:** Friends with complex, severe dietary restrictions (e.g., Celiac Disease, Histamine Intolerance, low-FODMAP).
* **The Problem:** Generic AI recipe recommenders generate dangerous ingredients or overlook hidden cross-contamination risks.
* **The Solution:**
  * Strict Chain-of-Thought (CoT) medical audit powered by **DeepSeek-R1 Distill**.
  * Multi-point allergen sensitivity profile (Celiac, Histamines, Tree Nuts, Shellfish, Dairy, Nightshades, custom triggers).
  * Instant safety score rating (0–100%), safe replacement suggestions, and tailored weekly meal plan generation.

### 🗣️ 3. Maya's Local Language Tutor
* **Target User:** Family members or friends practicing a new language in a private, non-judgmental environment.
* **The Problem:** Online language apps harvest audio recordings and sell conversation telemetry.
* **The Solution:**
  * Interactive companion driven by **Microsoft Phi-3.5 Mini**.
  * Real-time grammar error highlighting with explicit explanations.
  * Instant audio waveform feedback and contextual translations.

### ⚙️ 4. Open-Model Workbench & Agent Harness
* Full local LLM playground to inspect model hyper-parameters ($T$, $top\_p$, Context Window).
* Reasoning Depth toggle (`Quick`, `Deep CoT`, `Exhaustive`).
* Real-time token generation benchmark (tokens/sec monitoring).

### 🛡️ 5. Air-Gap Privacy Auditor
* Real-time network monitor confirming **0 external HTTP outgoing requests**.
* Audit logs tracking local loopback connections (`127.0.0.1:11434` / local IndexedDB).
* Verified data isolation proof.

---

## 🤖 Supported Open-Weight Models

KithKin AI leverages state-of-the-art open models:

| Model | Size / Quantization | Primary Purpose |
| :--- | :--- | :--- |
| **Llama 3.2 (3B Instruct)** | `2.0 GB (Q4_K_M)` | General conversational agent & fast structured extraction |
| **DeepSeek-R1 (Distill 7B)** | `4.1 GB (Q4_K_M)` | Explicit Chain-of-Thought (CoT) medical allergy analysis |
| **Phi-3.5 Mini (3.8B)** | `2.3 GB (Q4_K_M)` | Ultra-dense on-device language tutoring & grammar parsing |
| **Mistral 7B Instruct v0.3** | `4.3 GB (Q4_K_M)` | Multilingual recipe extraction & dialect preservation |
| **Whisper Large v3** | `1.5 GB (ONNX/WebGPU)` | Local audio transcription & timestamp extraction |

---

## 🛠️ Technology Stack

* **Frontend Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System & Dev Server:** [Vite 6](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons & Animation:** [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Code Linting:** [Oxlint](https://oxc-project.github.io/)

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/kithkin-ai.git
   cd kithkin-ai
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production:**
   ```bash
   npm run build
   ```

5. **Preview Production Build:**
   ```bash
   npm run preview
   ```

6. **Run Linter:**
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```text
devCh1/
├── public/                 # Static assets
├── src/
│   ├── components/         # Feature components
│   │   ├── GrandpaRecipeWeaver.tsx     # Grandpa's voice recipe agent
│   │   ├── AlexAllergyPlanner.tsx      # Alex's allergy & meal planner
│   │   ├── MayaLanguagePartner.tsx     # Maya's language tutor
│   │   ├── OpenModelHarness.tsx        # LLM agent playground & benchmark
│   │   ├── PrivacyAuditor.tsx          # Real-time network & air-gap monitor
│   │   ├── HackathonPostGenerator.tsx  # Submission write-up generator
│   │   └── Header.tsx                  # Navigation & model bar
│   ├── services/
│   │   └── localLLM.ts     # Open-weight inference engine & mock local backend
│   ├── types.ts            # TypeScript interface definitions
│   ├── App.tsx             # Main application shell
│   ├── index.css           # Design tokens & Tailwind CSS imports
│   └── main.tsx            # React application entry point
├── package.json            # Project dependencies & scripts
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

---

## 📜 Privacy & Security Guarantee

KithKin AI is designed around an **offline-first security model**:
* All voice processing happens locally.
* Personal dietary/medical records remain on the client machine.
* Model inference runs via local loopback APIs (`127.0.0.1`) or local WebGPU backends.

---

## 🏆 Hackathon Context

This project was built for the **Build for a Friend Hackathon** to demonstrate how open-source, local open-weight AI models can deliver meaningful, personalized AI agents for loved ones while guaranteeing absolute privacy.

---

## 📄 License

MIT License. Free for open-source use and modification.
