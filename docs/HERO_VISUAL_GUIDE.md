# Hero Section - Visual Guide

## 🎨 Style Presets at a Glance

### 1. Modern (Default)
```
Colors: Blue → Indigo → Purple
Vibe:   Tech-forward, innovative, trustworthy
Use:    SaaS, Tech startups, Developer tools

┌─────────────────────────────────────┐
│  🚀 Ready to deploy • Modern Tech   │
│                                     │
│     Build Faster with               │
│        Your Brand                   │
│     (Blue→Indigo→Purple gradient)   │
│                                     │
│  Flexible template for any brand    │
│                                     │
│  [Get Started]  [View Styles]       │
└─────────────────────────────────────┘
```

### 2. Vibrant
```
Colors: Orange → Pink → Rose
Vibe:   Energetic, creative, bold
Use:    Creative agencies, Consumer apps

┌─────────────────────────────────────┐
│  ✨ Ready to deploy • Vibrant       │
│                                     │
│     Build Faster with               │
│        Your Brand                   │
│     (Orange→Pink→Rose gradient)     │
│                                     │
│  Flexible template for any brand    │
│                                     │
│  [Get Started]  [View Styles]       │
└─────────────────────────────────────┘
```

### 3. Professional
```
Colors: Emerald → Teal → Cyan
Vibe:   Sophisticated, reliable, growth
Use:    Finance, Healthcare, B2B

┌─────────────────────────────────────┐
│  Ready to deploy • Professional     │
│                                     │
│     Build Faster with               │
│        Your Brand                   │
│     (Emerald→Teal→Cyan gradient)    │
│                                     │
│  Flexible template for any brand    │
│                                     │
│  [Get Started]  [View Styles]       │
└─────────────────────────────────────┘
```

### 4. Minimal
```
Colors: Monochrome (Zinc/Gray/Slate)
Vibe:   Clean, elegant, timeless
Use:    Portfolios, Luxury brands

┌─────────────────────────────────────┐
│  Ready to deploy • Minimal Dark     │
│                                     │
│     Build Faster with               │
│        Your Brand                   │
│     (Monochrome gradient)           │
│                                     │
│  Flexible template for any brand    │
│                                     │
│  [Get Started]  [View Styles]       │
└─────────────────────────────────────┘
```

### 5. Sunset
```
Colors: Amber → Orange → Red
Vibe:   Warm, inviting, passionate
Use:    Food & Beverage, Lifestyle

┌─────────────────────────────────────┐
│  ✨ Ready to deploy • Sunset        │
│                                     │
│     Build Faster with               │
│        Your Brand                   │
│     (Amber→Orange→Red gradient)     │
│                                     │
│  Flexible template for any brand    │
│                                     │
│  [Get Started]  [View Styles]       │
└─────────────────────────────────────┘
```

## 📁 File Structure

```
frontend/src/components/landing/
│
├── Hero.tsx                    ← Main component (rendering only)
│   └── imports from ↓
│
├── hero-styles.ts             ← Style configuration (edit here!)
│   ├── HERO_STYLE_PRESETS     ← All 5 presets
│   └── ACTIVE_HERO_STYLE      ← Current active style
│
├── HeroStylePreview.tsx       ← Preview tool (optional)
│   └── imports from hero-styles.ts
│
└── README.md                  ← Documentation
```

## 🔄 How It Works

```
1. Edit hero-styles.ts
   ↓
   export const ACTIVE_HERO_STYLE = "vibrant";
   
2. Hero.tsx imports it
   ↓
   const style = HERO_STYLE_PRESETS[ACTIVE_HERO_STYLE];
   
3. Styles applied automatically
   ↓
   className={style.background.base}
   className={style.title.gradient}
   className={style.buttons.primary}
```

## 🎯 Quick Actions

### Change Style
```typescript
// File: hero-styles.ts
export const ACTIVE_HERO_STYLE = "vibrant"; // ← Change this line
```

### Add Custom Style
```typescript
// File: hero-styles.ts
export const HERO_STYLE_PRESETS = {
  // ... existing presets
  
  myBrand: {
    name: "My Brand",
    // ... your custom styles
  },
};

export const ACTIVE_HERO_STYLE = "myBrand";
```

### Preview All Styles
```typescript
// File: App.tsx (temporarily)
import { HeroStylePreview } from "@/components/landing/HeroStylePreview";

<HeroStylePreview />
```

## 🎨 Style Properties

Each preset includes:

```typescript
{
  name: "Style Name",
  
  background: {
    base: "Main background gradient",
    gradient1: "Large decorative blob",
    gradient2: "Small decorative blob"
  },
  
  badge: {
    container: "Badge wrapper styles",
    text: "Badge text styles",
    icon: <OptionalIcon />
  },
  
  title: {
    primary: "First line color",
    accent: "Emphasized text color",
    gradient: "Brand name gradient"
  },
  
  description: "Body text color",
  
  buttons: {
    primary: "Main CTA button",
    secondary: "Secondary button"
  }
}
```

## 🌓 Dark Mode

All styles automatically adapt:

```
Light Mode:  from-blue-50 to-indigo-50
             ↓
Dark Mode:   dark:from-blue-950 dark:to-indigo-950
```

## 📱 Responsive Breakpoints

```
Mobile:    text-5xl  (< 640px)
Tablet:    text-7xl  (≥ 640px)
Desktop:   text-8xl  (≥ 768px)
Large:     text-9xl  (≥ 1024px)
```

## ✨ Animation Timeline

```
0ms    → Page loads
700ms  → Badge fades in
900ms  → Title fades in
1000ms → Description fades in
1100ms → Buttons fade in
1200ms → Style indicator fades in
```

## 🎯 Decision Tree

```
What do you want to do?

├─ Change the style?
│  └─ Edit: hero-styles.ts → ACTIVE_HERO_STYLE
│
├─ Preview all styles?
│  └─ Import: HeroStylePreview component
│
├─ Change text content?
│  └─ Edit: Hero.tsx → JSX content
│
├─ Add custom style?
│  └─ Edit: hero-styles.ts → HERO_STYLE_PRESETS
│
└─ Customize existing style?
   └─ Edit: hero-styles.ts → specific preset
```

## 🚀 Getting Started (3 Steps)

```
Step 1: Choose Your Style
┌──────────────────────────┐
│ Open: hero-styles.ts     │
│ Change: ACTIVE_HERO_STYLE│
└──────────────────────────┘

Step 2: Customize Text (Optional)
┌──────────────────────────┐
│ Open: Hero.tsx           │
│ Edit: JSX content        │
└──────────────────────────┘

Step 3: Preview
┌──────────────────────────┐
│ Run: npm run dev         │
│ View: localhost:5173     │
└──────────────────────────┘
```

## 📊 Comparison

| Aspect | Before | After |
|--------|--------|-------|
| Files | 1 (300+ lines) | 2 (clean separation) |
| Maintenance | Edit large file | Edit config only |
| Adding styles | Modify component | Add to config |
| Code clarity | Mixed concerns | Separated concerns |
| Type safety | ✅ | ✅ |

---

**Ready to customize?** Start with `hero-styles.ts` and change `ACTIVE_HERO_STYLE`!
