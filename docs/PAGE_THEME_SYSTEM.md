# Page Theme System

A centralized, modular theming system for consistent styling across the entire application.

## 📁 File Structure

```
frontend/src/
├── config/
│   ├── page-theme.tsx          # Main theme configuration
│   └── page-theme.test.tsx     # Theme system tests
│
└── components/
    ├── theme/
    │   └── ThemePreview.tsx    # Visual theme preview component
    │
    └── landing/
        └── Hero.tsx            # Updated to use page-theme
```

## 🎨 Features

- **5 Pre-built Themes**: Modern, Vibrant, Professional, Minimal, Sunset
- **Comprehensive Styling**: Colors, gradients, buttons, cards, badges
- **Type-Safe**: Full TypeScript support
- **Well-Tested**: 100% test coverage
- **Easy to Extend**: Add new themes easily
- **Backward Compatible**: Supports legacy hero-styles

## 🚀 Quick Start

### Using the Active Theme

```typescript
import { getPageTheme } from '@/config/page-theme';

function MyComponent() {
  const theme = getPageTheme();
  
  return (
    <div className={theme.colors.primary}>
      <button className={theme.buttons.primary}>
        Click me
      </button>
    </div>
  );
}
```

### Using a Specific Theme

```typescript
import { getThemeByName } from '@/config/page-theme';

function MyComponent() {
  const theme = getThemeByName('vibrant');
  
  return (
    <div className={theme.gradients.background}>
      <span className={theme.badges.success}>Success!</span>
    </div>
  );
}
```

### Changing the Active Theme

Edit `frontend/src/config/page-theme.tsx`:

```typescript
export const ACTIVE_PAGE_THEME: keyof typeof PAGE_THEMES = "vibrant";
```

## 📊 Theme Structure

Each theme includes:

### Colors
```typescript
{
  primary: string;      // Primary brand color
  secondary: string;    // Secondary brand color
  accent: string;       // Accent color
  muted: string;        // Muted text color
  background: string;   // Background color
  foreground: string;   // Foreground text color
  border: string;       // Border color
}
```

### Gradients
```typescript
{
  primary: string;      // Primary gradient
  secondary: string;    // Secondary gradient
  background: string;   // Background gradient
}
```

### Buttons
```typescript
{
  primary: string;      // Primary button style
  secondary: string;    // Secondary button style
  ghost: string;        // Ghost button style
  destructive: string;  // Destructive button style
}
```

### Cards
```typescript
{
  base: string;         // Base card style
  hover: string;        // Hover effect
  border: string;       // Border style
}
```

### Badges
```typescript
{
  default: string;      // Default badge
  success: string;      // Success badge
  warning: string;      // Warning badge
  error: string;        // Error badge
}
```

## 🎯 Available Themes

### 1. Modern Tech (modern)
Blue and indigo gradients perfect for SaaS and tech startups.

**Best for**: SaaS, Tech Startups, Developer Tools

### 2. Vibrant Startup (vibrant)
Orange and pink energy for creative agencies and consumer apps.

**Best for**: Creative Agencies, Consumer Apps, E-commerce

### 3. Professional (professional)
Emerald and teal sophistication for finance and B2B services.

**Best for**: Finance, B2B Services, Corporate Sites

### 4. Minimal Dark (minimal)
Monochrome elegance for portfolios and luxury brands.

**Best for**: Portfolios, Luxury Brands, Minimalist Sites

### 5. Sunset (sunset)
Warm amber and red tones for food, beverage, and lifestyle brands.

**Best for**: Food & Beverage, Lifestyle, Wellness

## 🔧 Helper Functions

### getPageTheme()
Get the currently active theme.

```typescript
const theme = getPageTheme();
```

### getThemeByName(themeName)
Get a specific theme by name.

```typescript
const vibrantTheme = getThemeByName('vibrant');
```

### getAvailableThemes()
Get all available theme names.

```typescript
const themes = getAvailableThemes();
// ['modern', 'vibrant', 'professional', 'minimal', 'sunset']
```

### themeExists(themeName)
Check if a theme exists.

```typescript
if (themeExists('modern')) {
  // Theme exists
}
```

## 📝 Usage Examples

### Button with Theme

```typescript
import { getPageTheme } from '@/config/page-theme';
import { Button } from '@/components/ui/button';

function MyButton() {
  const theme = getPageTheme();
  
  return (
    <Button className={theme.buttons.primary}>
      Get Started
    </Button>
  );
}
```

### Card with Theme

```typescript
import { getPageTheme } from '@/config/page-theme';
import { Card } from '@/components/ui/card';

function MyCard() {
  const theme = getPageTheme();
  
  return (
    <Card className={`${theme.cards.base} ${theme.cards.border}`}>
      <div className={theme.colors.primary}>
        Card Content
      </div>
    </Card>
  );
}
```

### Badge with Theme

```typescript
import { getPageTheme } from '@/config/page-theme';

function MyBadge({ status }: { status: 'success' | 'warning' | 'error' }) {
  const theme = getPageTheme();
  
  return (
    <span className={theme.badges[status]}>
      {status}
    </span>
  );
}
```

### Background Gradient

```typescript
import { getPageTheme } from '@/config/page-theme';

function MySection() {
  const theme = getPageTheme();
  
  return (
    <section className={theme.gradients.background}>
      <h1 className={theme.colors.foreground}>
        Welcome
      </h1>
    </section>
  );
}
```

## ➕ Adding a New Theme

1. **Add theme to `PAGE_THEMES` object**:

```typescript
export const PAGE_THEMES: Record<string, PageTheme> = {
  // ... existing themes
  
  myNewTheme: {
    name: "My New Theme",
    description: "Description of my theme",
    colors: {
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-purple-600 dark:text-purple-400",
      // ... other colors
    },
    gradients: {
      primary: "bg-gradient-to-r from-blue-600 to-purple-600",
      // ... other gradients
    },
    buttons: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      // ... other buttons
    },
    cards: {
      base: "rounded-lg border bg-card",
      // ... other card styles
    },
    badges: {
      default: "bg-blue-100 text-blue-700",
      // ... other badges
    },
    hero: {
      // Optional: hero-specific styles
    },
  },
};
```

2. **Update the active theme** (optional):

```typescript
export const ACTIVE_PAGE_THEME: keyof typeof PAGE_THEMES = "myNewTheme";
```

3. **Test your theme**:

```bash
npm test page-theme
```

## 🧪 Testing

Run theme system tests:

```bash
npm test page-theme
```

All tests should pass:
- ✅ Theme structure validation
- ✅ Helper function tests
- ✅ Theme consistency checks
- ✅ Value validation

## 🎨 Theme Preview

Use the `ThemePreview` component to visualize all themes:

```typescript
import { ThemePreview } from '@/components/theme/ThemePreview';

function ThemeGallery() {
  return (
    <ThemePreview 
      onThemeSelect={(themeName) => {
        console.log('Selected theme:', themeName);
      }}
    />
  );
}
```

## 🔄 Migration from hero-styles

The old `hero-styles.tsx` has been replaced with `page-theme.tsx`.

**Before**:
```typescript
import { HERO_STYLE_PRESETS, ACTIVE_HERO_STYLE } from './hero-styles';

const style = HERO_STYLE_PRESETS[ACTIVE_HERO_STYLE];
```

**After**:
```typescript
import { getPageTheme } from '@/config/page-theme';

const theme = getPageTheme();
const heroStyle = theme.hero;
```

## 📚 Best Practices

1. **Use Helper Functions**: Always use `getPageTheme()` instead of directly accessing `PAGE_THEMES`
2. **Type Safety**: Leverage TypeScript types for theme properties
3. **Consistency**: Use theme values consistently across components
4. **Testing**: Test components with different themes
5. **Documentation**: Document custom theme additions

## 🎯 Benefits

- ✅ **Centralized**: Single source of truth for all styling
- ✅ **Consistent**: Ensures visual consistency across the app
- ✅ **Maintainable**: Easy to update and extend
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Tested**: Comprehensive test coverage
- ✅ **Flexible**: Easy to add new themes
- ✅ **Scalable**: Works for small and large applications

## 🔗 Related Files

- `frontend/src/config/page-theme.tsx` - Main theme configuration
- `frontend/src/config/page-theme.test.tsx` - Theme tests
- `frontend/src/components/theme/ThemePreview.tsx` - Theme preview component
- `frontend/src/components/landing/Hero.tsx` - Example usage

## 📖 Further Reading

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)

---

**Questions?** Check the source code or create an issue!
