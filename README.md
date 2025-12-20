# Premium Starter Template
> A robust, backend-agnostic frontend template built for speed and flexibility.

## 🚀 Status
- **Architecture**: Decoupled (Headless)
- **Frontend**: Vite + React + TypeScript + shadcn/ui
- **Backend Ready**: Connects to any REST API (Django, Node, Go)
- **Current Mock**: JSON Server (simulating API on port 8001)

## 🛠 Tech Stack
- **Core**: [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State/Data**: Axios + Custom Hooks
- **Mocking**: JSON Server

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Environment
You need two terminals running simultaneously:

**Terminal 1: The Mock Backend** (Simulates your future Django/Node API)
Runs on `http://localhost:8001`
```bash
npm run mock
```

**Terminal 2: The Frontend** (The UI you interact with)
Runs on `http://localhost:5173`
```bash
npm run dev
```

### 3. Verify Connection
Open the **Menu Slider** (top left hamburger icon). You should see:
- **Status: Online (1.0.0-simulated)**
- This confirms the Frontend (5173) is successfully talking to the Backend (8001).

---

## 🔌 Connecting a Real Backend
This template is designed to swap the backend without changing UI code.

1.  **Stop** the `npm run mock` command.
2.  **Start** your real backend (e.g., Django on port 8000).
3.  **Update** your `.env` file:
    ```env
    # Change this to your real backend URL
    VITE_API_BASE_URL=http://localhost:8000/api
    ```
4.  **Restart** the frontend (`npm run dev`).

## 📁 Project Structure
```text
src/
├── components/
│   ├── ui/           # shadcn primitives (Button, Sheet, etc.)
│   ├── layout/       # Global layout (MenuSlider, Shell)
│   └── landing/      # Page-specific components (Hero)
├── services/         # API Service Layer (Axios configuration)
├── hooks/            # Data hooks (useHealthCheck)
├── lib/              # Utilities
└── App.tsx           # Main application entry
```

## 🧩 Adding New Features
1.  **Define Interface**: Add types in `src/types`.
2.  **Add Service**: Create `src/services/productService.ts`.
3.  **Create Hook**: Create `src/hooks/useProducts.ts`.
4.  **Build Component**: Use the hook in your UI.
