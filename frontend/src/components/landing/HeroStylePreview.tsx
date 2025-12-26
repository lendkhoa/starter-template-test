/**
 * Hero Style Preview Component
 * 
 * This component allows you to preview all hero style presets side-by-side.
 * Use this to help choose the right style for your brand.
 * 
 * To use: Import and render this component in your app temporarily
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { HERO_STYLE_PRESETS } from "./hero-styles";

type StyleName = keyof typeof HERO_STYLE_PRESETS;

const STYLE_INFO: Record<StyleName, { description: string; colors: string }> = {
  modern: {
    description: "Blue → Indigo → Purple gradient. Perfect for SaaS and tech startups.",
    colors: "Blue, Indigo, Purple",
  },
  vibrant: {
    description: "Orange → Pink → Rose gradient. Energetic and creative.",
    colors: "Orange, Pink, Rose",
  },
  professional: {
    description: "Emerald → Teal → Cyan gradient. Sophisticated and trustworthy.",
    colors: "Emerald, Teal, Cyan",
  },
  minimal: {
    description: "Monochrome elegance. Timeless and clean.",
    colors: "Zinc, Gray, Slate",
  },
  sunset: {
    description: "Amber → Orange → Red gradient. Warm and inviting.",
    colors: "Amber, Orange, Red",
  },
};

export function HeroStylePreview() {
  const [selectedStyle, setSelectedStyle] = useState<StyleName>("modern");
  const currentStyle = HERO_STYLE_PRESETS[selectedStyle];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Hero Style Presets</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Choose the perfect style for your brand
          </p>
        </div>

        {/* Style Selector */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {(Object.keys(HERO_STYLE_PRESETS) as StyleName[]).map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`group relative overflow-hidden rounded-lg border-2 p-4 text-left transition-all hover:scale-105 ${
                selectedStyle === style
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {selectedStyle === style && (
                <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-semibold">{HERO_STYLE_PRESETS[style].name}</h3>
                <p className="text-xs text-muted-foreground">
                  {STYLE_INFO[style].colors}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Style Info */}
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{currentStyle.name}</h2>
            <p className="text-muted-foreground">{STYLE_INFO[selectedStyle].description}</p>
            <div className="pt-4">
              <p className="mb-2 text-sm text-muted-foreground">Update hero-styles.ts:</p>
              <code className="block rounded bg-muted px-3 py-2 text-sm">
                export const ACTIVE_HERO_STYLE = "{selectedStyle}";
              </code>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-lg border shadow-2xl">
          <HeroPreview style={selectedStyle} />
        </div>

        {/* Instructions */}
        <div className="rounded-lg border bg-muted/50 p-6">
          <h3 className="mb-3 font-semibold">How to Apply This Style</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>
              1. Open <code className="rounded bg-background px-2 py-0.5">hero-styles.ts</code>
            </li>
            <li>
              2. Find the line:{" "}
              <code className="rounded bg-background px-2 py-0.5">
                export const ACTIVE_HERO_STYLE = "modern";
              </code>
            </li>
            <li>
              3. Change it to:{" "}
              <code className="rounded bg-background px-2 py-0.5">
                export const ACTIVE_HERO_STYLE = "{selectedStyle}";
              </code>
            </li>
            <li>4. Save and see your hero update instantly! ✨</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// Mini Hero Preview Component
function HeroPreview({ style }: { style: StyleName }) {
  const styleConfig = HERO_STYLE_PRESETS[style];

  return (
    <section className={`relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center ${styleConfig.background.base}`}>
      <div className={styleConfig.background.gradient1} />
      <div className={styleConfig.background.gradient2} />
      
      <div className="z-10 max-w-4xl space-y-6">
        <div className="mx-auto w-fit">
          <div className={styleConfig.badge.container}>
            <span className={styleConfig.badge.text}>
              {styleConfig.badge.icon}
              {styleConfig.name} Style
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <span className={`block ${styleConfig.title.primary}`}>
            Build Faster with
          </span>
          <span className={`block ${styleConfig.title.gradient}`}>
            Your Brand
          </span>
        </h1>
        
        <p className={`mx-auto max-w-xl text-base sm:text-lg ${styleConfig.description}`}>
          A flexible template designed for any brand. Switch styles instantly.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className={`${styleConfig.buttons.primary} group`}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className={styleConfig.buttons.secondary}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
