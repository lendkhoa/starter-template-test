import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import { getPageTheme } from "@/config/page-theme";

/**
 * Hero Component
 * 
 * Landing page hero section with dynamic theming.
 * Uses the centralized page-theme system for consistent styling.
 */

export function Hero() {
  const theme = getPageTheme();
  const heroStyle = theme.hero;

  if (!heroStyle) {
    throw new Error("Hero styles not found in active theme");
  }

  return (
    <section className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center transition-colors duration-500 ${heroStyle.background.base}`}>
      {/* Animated Background Gradients */}
      <div className={heroStyle.background.gradient1}></div>
      <div className={heroStyle.background.gradient2}></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-8 animate-fade-in">
        {/* Badge */}
        <div className="flex justify-center animate-slide-down">
          <div className={heroStyle.badge.container}>
            <span className={heroStyle.badge.text}>
              {heroStyle.badge.icon}
              {theme.description}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="animate-slide-up text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className={heroStyle.title.primary}>A flexible </span>
          <span className={heroStyle.title.gradient}>starter template</span>
          <br />
          <span className={heroStyle.title.accent}>for your next project</span>
        </h1>

        {/* Description */}
        <p className={`mx-auto max-w-2xl text-base sm:text-lg md:text-xl animate-fade-in-delayed ${heroStyle.description}`}>
          Built with React, TypeScript, and Tailwind CSS. Features authentication, 
          theming, and modern UI components. Start building in minutes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row animate-slide-up-delayed">
          <Button size="lg" className={`group gap-2 px-8 ${theme.buttons.primary}`}>
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className={`gap-2 px-8 ${theme.buttons.secondary}`}>
            <Github className="h-4 w-4" />
            View on GitHub
          </Button>
        </div>

        {/* Stats or Features (Optional) */}
        <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in-delayed">
          <div>
            <div className={`text-3xl font-bold ${theme.colors.primary}`}>100%</div>
            <div className={`text-sm ${theme.colors.muted}`}>Type Safe</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${theme.colors.secondary}`}>5+</div>
            <div className={`text-sm ${theme.colors.muted}`}>Themes</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${theme.colors.accent}`}>∞</div>
            <div className={`text-sm ${theme.colors.muted}`}>Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
