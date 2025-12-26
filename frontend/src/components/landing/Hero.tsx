import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HERO_STYLE_PRESETS, ACTIVE_HERO_STYLE } from "./hero-styles";

/**
 * Hero Component
 * 
 * Elegant, flexible hero section with preset style templates.
 * To change the style, edit ACTIVE_HERO_STYLE in hero-styles.ts
 */

export function Hero() {
  const style = HERO_STYLE_PRESETS[ACTIVE_HERO_STYLE];

  return (
    <section className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center transition-colors duration-500 ${style.background.base}`}>
      {/* Background Decorative Elements */}
      <div className={style.background.gradient1} />
      <div className={style.background.gradient2} />
      
      {/* Main Content */}
      <div className="z-10 max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Badge */}
        <div className="mx-auto w-fit animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className={`${style.badge.container} transition-all hover:scale-105`}>
            <span className={style.badge.text}>
              {style.badge.icon}
              Ready to deploy • {style.name} Style
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="animate-in fade-in slide-in-from-bottom-3 text-5xl font-extrabold tracking-tight duration-900 sm:text-7xl md:text-8xl lg:text-9xl">
          <span className={`block ${style.title.primary} transition-colors`}>
            Welcome to
          </span>
          <span className={`block ${style.title.gradient} transition-all`}>
            NLG AUSTRALIA
          </span>
        </h1>
        
        {/* Description */}
        <p className={`mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-lg duration-1000 sm:text-xl md:text-2xl md:leading-relaxed ${style.description} transition-colors`}>
          A flexible, elegant template designed for{" "}
          <span className={`font-semibold ${style.title.accent}`}>any brand</span>.
          <br className="hidden sm:block" />
          Start with premium design, switch styles instantly.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex animate-in fade-in slide-in-from-bottom-5 flex-col items-center justify-center gap-4 duration-1100 sm:flex-row">
          <Button 
            size="lg" 
            className={`group h-14 w-full px-8 text-base font-semibold transition-all active:scale-95 sm:w-auto ${style.buttons.primary}`}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className={`h-14 w-full px-8 text-base transition-all hover:scale-105 active:scale-95 sm:w-auto ${style.buttons.secondary}`}
          >
            View Styles
          </Button>
        </div>

        {/* Style Indicator (Optional - can be removed in production) */}
        <div className="animate-in fade-in pt-8 opacity-50 duration-1200">
          <p className={`text-xs ${style.description}`}>
            Active Style: <span className="font-semibold">{style.name}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
