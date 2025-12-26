# 🎨 Flexible Hero Section

An elegant, adaptable hero section with **5 preset style templates** that can be instantly switched to match any brand identity.

## ✨ Features

- **5 Beautiful Presets**: Modern, Vibrant, Professional, Minimal, and Sunset
- **One-Line Style Switching**: Change your entire hero design by modifying a single constant
- **Separated Configuration**: Styles are in `hero-styles.ts` for easy maintenance
- **Dark Mode Ready**: All presets automatically adapt to light and dark themes
- **Fully Responsive**: Looks stunning on all devices
- **Smooth Animations**: Staggered entrance animations for a polished feel
- **Accessible**: WCAG AA compliant with semantic HTML

## 🚀 Quick Start

### 1. Switch Styles

Open `hero-styles.ts` and change this line:

```typescript
export const ACTIVE_HERO_STYLE = "modern"; // Change to: vibrant, professional, minimal, or sunset
```

### 2. Preview All Styles

Import the preview component to see all styles side-by-side:

```typescript
import { HeroStylePreview } from "@/components/landing/HeroStylePreview";

// Render it temporarily to choose your style
<HeroStylePreview />
```

### 3. Customize Content

Edit the text content in the `Hero.tsx` component:

```typescript
{/* Badge */}
Ready to deploy • {style.name} Style

{/* Title */}
Build Faster with
Your Brand

{/* Description */}
A flexible, elegant template designed for any brand.
```

## 🎨 Available Styles

| Style | Colors | Best For |
|-------|--------|----------|
| **Modern** | Blue → Indigo → Purple | SaaS, Tech startups, Developer tools |
| **Vibrant** | Orange → Pink → Rose | Creative agencies, Consumer apps |
| **Professional** | Emerald → Teal → Cyan | Finance, Healthcare, B2B services |
| **Minimal** | Monochrome (Zinc/Gray) | Portfolios, Luxury brands |
| **Sunset** | Amber → Orange → Red | Food & Beverage, Lifestyle |

## 📁 File Structure

```
frontend/src/components/landing/
├── Hero.tsx                    # Main hero component (clean, focused on rendering)
├── hero-styles.ts             # Style presets configuration (edit styles here)
├── HeroStylePreview.tsx       # Interactive preview tool
└── README.md                  # This file
```

## 📖 Documentation

For detailed customization options, see:
- **[Hero Style Guide](../../../docs/HERO_STYLE_GUIDE.md)** - Complete customization guide
- **[hero-styles.ts](./hero-styles.ts)** - Style configuration file
- **[HeroStylePreview.tsx](./HeroStylePreview.tsx)** - Interactive preview component

## 🎯 Usage Examples

### Tech Startup
```typescript
export const ACTIVE_HERO_STYLE = "modern";
```
Perfect for SaaS platforms, developer tools, and tech companies.

### Creative Agency
```typescript
export const ACTIVE_HERO_STYLE = "vibrant";
```
Energetic and bold, ideal for creative and marketing agencies.

### Financial Services
```typescript
export const ACTIVE_HERO_STYLE = "professional";
```
Sophisticated and trustworthy for finance and B2B services.

### Portfolio
```typescript
export const ACTIVE_HERO_STYLE = "minimal";
```
Clean and elegant for personal portfolios and luxury brands.

### Restaurant/Cafe
```typescript
export const ACTIVE_HERO_STYLE = "sunset";
```
Warm and inviting for food, beverage, and lifestyle brands.

## 🛠️ Creating Custom Styles

Add your own preset to `HERO_STYLE_PRESETS` in `hero-styles.ts`:

```typescript
export const HERO_STYLE_PRESETS = {
  // ... existing presets
  
  custom: {
    name: "My Brand",
    background: {
      base: "bg-gradient-to-br from-your-color-50 to-your-color-100",
      gradient1: "...",
      gradient2: "...",
    },
    badge: { /* ... */ },
    title: { /* ... */ },
    description: "...",
    buttons: { /* ... */ },
  },
};

// Then activate it:
export const ACTIVE_HERO_STYLE = "custom";
```

See the [Style Guide](../../../docs/HERO_STYLE_GUIDE.md) for detailed instructions.

## 💡 Tips

1. **Edit in One Place**: All styles are in `hero-styles.ts` - no need to touch `Hero.tsx`
2. **Test Both Themes**: Always preview in light and dark mode
3. **Mobile First**: Check responsive design on small screens
4. **Brand Alignment**: Choose colors that match your brand identity
5. **Use the Preview**: The `HeroStylePreview` component helps you choose

## 🌟 Key Benefits

- **Save Time**: No need to design from scratch
- **Consistency**: Coordinated colors across all elements
- **Flexibility**: Easy to switch or customize
- **Maintainable**: Separated configuration for easy updates
- **Professional**: Premium design out-of-the-box
- **Clean Code**: Component focused on rendering, styles in separate file

## 📝 License

Part of the starter template. Use freely for any project.

---

**Need help?** Check the [Hero Style Guide](../../../docs/HERO_STYLE_GUIDE.md) for detailed documentation.
