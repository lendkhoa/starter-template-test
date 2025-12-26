import { Sparkles } from "lucide-react";

/**
 * Hero Style Configuration
 * 
 * This file contains all style presets for the Hero component.
 * Add new presets here to keep the main component clean.
 */

export type HeroStylePreset = {
  name: string;
  background: {
    base: string;
    gradient1: string;
    gradient2: string;
    pattern?: string;
  };
  badge: {
    container: string;
    text: string;
    icon?: React.ReactNode;
  };
  title: {
    primary: string;
    accent: string;
    gradient: string;
  };
  description: string;
  buttons: {
    primary: string;
    secondary: string;
  };
};

// ============================================
// STYLE PRESETS
// ============================================

export const HERO_STYLE_PRESETS: Record<string, HeroStylePreset> = {
  // Modern Tech - Blue/Purple gradient (Default)
  modern: {
    name: "Modern Tech",
    background: {
      base: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50",
      gradient1: "absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-[120px] animate-pulse",
      gradient2: "absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]",
    },
    badge: {
      container: "rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 backdrop-blur-sm dark:border-blue-800/50 dark:bg-blue-950/30",
      text: "text-xs font-medium text-blue-700 dark:text-blue-300 md:text-sm",
      icon: <Sparkles className="mr-1.5 inline h-3.5 w-3.5"/>,
    },
    title: {
      primary: "text-slate-900 dark:text-slate-100",
      accent: "text-slate-800 dark:text-slate-200",
      gradient: "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400",
    },
    description: "text-slate-600 dark:text-slate-400",
    buttons: {
      primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 dark:from-blue-500 dark:to-indigo-500",
      secondary: "border-slate-300 bg-white/50 text-slate-700 backdrop-blur-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800/50",
    },
  },

  // Vibrant Startup - Orange/Pink energy
  vibrant: {
    name: "Vibrant Startup",
    background: {
      base: "bg-gradient-to-br from-orange-50 via-pink-50/40 to-rose-50/60 dark:from-orange-950/40 dark:via-pink-950/30 dark:to-rose-950/40",
      gradient1: "absolute top-1/2 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-400/25 to-pink-400/25 blur-[140px] animate-pulse",
      gradient2: "absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-rose-500/15 blur-[120px]",
    },
    badge: {
      container: "rounded-full border border-orange-200/60 bg-gradient-to-r from-orange-50 to-pink-50 px-4 py-1.5 shadow-sm dark:border-orange-800/50 dark:from-orange-950/50 dark:to-pink-950/50",
      text: "text-xs font-semibold text-orange-700 dark:text-orange-300 md:text-sm",
      icon: <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-pink-500" />,
    },
    title: {
      primary: "text-slate-900 dark:text-white",
      accent: "text-slate-800 dark:text-slate-100",
      gradient: "bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent dark:from-orange-400 dark:via-pink-400 dark:to-rose-400",
    },
    description: "text-slate-700 dark:text-slate-300",
    buttons: {
      primary: "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105",
      secondary: "border-orange-300 bg-white/60 text-orange-700 backdrop-blur-sm hover:bg-orange-50 dark:border-orange-700 dark:bg-orange-950/30 dark:text-orange-300 dark:hover:bg-orange-900/40",
    },
  },

  // Professional - Emerald/Teal sophistication
  professional: {
    name: "Professional",
    background: {
      base: "bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/40 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30",
      gradient1: "absolute top-1/2 left-1/2 -z-10 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-400/15 to-teal-400/15 blur-[130px]",
      gradient2: "absolute top-20 right-20 -z-10 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[110px]",
    },
    badge: {
      container: "rounded-full border border-emerald-200/50 bg-emerald-50/40 px-4 py-1.5 backdrop-blur-sm dark:border-emerald-800/40 dark:bg-emerald-950/30",
      text: "text-xs font-medium text-emerald-700 dark:text-emerald-300 md:text-sm",
    },
    title: {
      primary: "text-slate-900 dark:text-slate-50",
      accent: "text-slate-800 dark:text-slate-100",
      gradient: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400",
    },
    description: "text-slate-600 dark:text-slate-400",
    buttons: {
      primary: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-teal-500/35 hover:scale-105",
      secondary: "border-emerald-300 bg-white/50 text-emerald-700 backdrop-blur-sm hover:bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-900/40",
    },
  },

  // Minimal Dark - Monochrome elegance
  minimal: {
    name: "Minimal Dark",
    background: {
      base: "bg-gradient-to-br from-zinc-50 via-gray-50 to-slate-50 dark:from-zinc-950 dark:via-gray-950 dark:to-slate-950",
      gradient1: "absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-400/10 to-slate-400/10 blur-[120px]",
      gradient2: "absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-zinc-500/5 blur-[100px]",
    },
    badge: {
      container: "rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-1.5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50",
      text: "text-xs font-medium text-zinc-700 dark:text-zinc-300 md:text-sm",
    },
    title: {
      primary: "text-zinc-900 dark:text-zinc-100",
      accent: "text-zinc-800 dark:text-zinc-200",
      gradient: "bg-gradient-to-r from-zinc-700 via-gray-700 to-slate-700 bg-clip-text text-transparent dark:from-zinc-300 dark:via-gray-300 dark:to-slate-300",
    },
    description: "text-zinc-600 dark:text-zinc-400",
    buttons: {
      primary: "bg-zinc-900 text-white shadow-lg shadow-zinc-900/30 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/40 hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
      secondary: "border-zinc-300 bg-white/50 text-zinc-700 backdrop-blur-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50",
    },
  },

  // Sunset - Warm amber/red tones
  sunset: {
    name: "Sunset",
    background: {
      base: "bg-gradient-to-br from-amber-50 via-orange-50/50 to-red-50/40 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-red-950/30",
      gradient1: "absolute top-1/2 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-[140px] animate-pulse",
      gradient2: "absolute top-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]",
    },
    badge: {
      container: "rounded-full border border-amber-200/60 bg-amber-50/50 px-4 py-1.5 backdrop-blur-sm dark:border-amber-800/50 dark:bg-amber-950/40",
      text: "text-xs font-semibold text-amber-700 dark:text-amber-300 md:text-sm",
      icon: <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-orange-500" />,
    },
    title: {
      primary: "text-slate-900 dark:text-amber-50",
      accent: "text-slate-800 dark:text-amber-100",
      gradient: "bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-red-400",
    },
    description: "text-slate-700 dark:text-amber-200/80",
    buttons: {
      primary: "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105",
      secondary: "border-amber-300 bg-white/60 text-amber-700 backdrop-blur-sm hover:bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-900/40",
    },
  },
};

// ============================================
// ACTIVE STYLE CONFIGURATION
// Change this to switch the hero style
// ============================================
export const ACTIVE_HERO_STYLE: keyof typeof HERO_STYLE_PRESETS = "sunset";
