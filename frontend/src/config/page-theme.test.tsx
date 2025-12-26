import { describe, it, expect } from 'vitest';
import {
  PAGE_THEMES,
  ACTIVE_PAGE_THEME,
  getPageTheme,
  getThemeByName,
  getAvailableThemes,
  themeExists,
  type PageTheme,
} from './page-theme';

describe('PageTheme System', () => {
  describe('Theme Structure', () => {
    it('should have all required themes', () => {
      const requiredThemes = ['modern', 'vibrant', 'professional', 'minimal', 'sunset'];
      requiredThemes.forEach((theme) => {
        expect(PAGE_THEMES[theme]).toBeDefined();
      });
    });

    it('should have valid theme structure for each theme', () => {
      Object.values(PAGE_THEMES).forEach((theme: PageTheme) => {
        // Check required properties
        expect(theme.name).toBeDefined();
        expect(theme.description).toBeDefined();
        expect(theme.colors).toBeDefined();
        expect(theme.gradients).toBeDefined();
        expect(theme.buttons).toBeDefined();
        expect(theme.cards).toBeDefined();
        expect(theme.badges).toBeDefined();

        // Check colors structure
        expect(theme.colors.primary).toBeDefined();
        expect(theme.colors.secondary).toBeDefined();
        expect(theme.colors.accent).toBeDefined();
        expect(theme.colors.muted).toBeDefined();
        expect(theme.colors.background).toBeDefined();
        expect(theme.colors.foreground).toBeDefined();
        expect(theme.colors.border).toBeDefined();

        // Check gradients structure
        expect(theme.gradients.primary).toBeDefined();
        expect(theme.gradients.secondary).toBeDefined();
        expect(theme.gradients.background).toBeDefined();

        // Check buttons structure
        expect(theme.buttons.primary).toBeDefined();
        expect(theme.buttons.secondary).toBeDefined();
        expect(theme.buttons.ghost).toBeDefined();
        expect(theme.buttons.destructive).toBeDefined();

        // Check cards structure
        expect(theme.cards.base).toBeDefined();
        expect(theme.cards.hover).toBeDefined();
        expect(theme.cards.border).toBeDefined();

        // Check badges structure
        expect(theme.badges.default).toBeDefined();
        expect(theme.badges.success).toBeDefined();
        expect(theme.badges.warning).toBeDefined();
        expect(theme.badges.error).toBeDefined();
      });
    });

    it('should have hero-specific styles for backward compatibility', () => {
      Object.values(PAGE_THEMES).forEach((theme: PageTheme) => {
        expect(theme.hero).toBeDefined();
        expect(theme.hero?.background).toBeDefined();
        expect(theme.hero?.badge).toBeDefined();
        expect(theme.hero?.title).toBeDefined();
        expect(theme.hero?.description).toBeDefined();
      });
    });
  });

  describe('getPageTheme', () => {
    it('should return the active theme', () => {
      const theme = getPageTheme();
      expect(theme).toBeDefined();
      expect(theme).toBe(PAGE_THEMES[ACTIVE_PAGE_THEME]);
    });

    it('should return a valid theme object', () => {
      const theme = getPageTheme();
      expect(theme.name).toBeDefined();
      expect(theme.colors).toBeDefined();
      expect(theme.gradients).toBeDefined();
    });
  });

  describe('getThemeByName', () => {
    it('should return the correct theme by name', () => {
      const modernTheme = getThemeByName('modern');
      expect(modernTheme.name).toBe('Modern Tech');
      
      const vibrantTheme = getThemeByName('vibrant');
      expect(vibrantTheme.name).toBe('Vibrant Startup');
    });

    it('should return different themes for different names', () => {
      const theme1 = getThemeByName('modern');
      const theme2 = getThemeByName('vibrant');
      expect(theme1).not.toBe(theme2);
    });
  });

  describe('getAvailableThemes', () => {
    it('should return an array of theme names', () => {
      const themes = getAvailableThemes();
      expect(Array.isArray(themes)).toBe(true);
      expect(themes.length).toBeGreaterThan(0);
    });

    it('should include all expected themes', () => {
      const themes = getAvailableThemes();
      expect(themes).toContain('modern');
      expect(themes).toContain('vibrant');
      expect(themes).toContain('professional');
      expect(themes).toContain('minimal');
      expect(themes).toContain('sunset');
    });

    it('should return exactly 5 themes', () => {
      const themes = getAvailableThemes();
      expect(themes.length).toBe(5);
    });
  });

  describe('themeExists', () => {
    it('should return true for existing themes', () => {
      expect(themeExists('modern')).toBe(true);
      expect(themeExists('vibrant')).toBe(true);
      expect(themeExists('professional')).toBe(true);
      expect(themeExists('minimal')).toBe(true);
      expect(themeExists('sunset')).toBe(true);
    });

    it('should return false for non-existing themes', () => {
      expect(themeExists('nonexistent')).toBe(false);
      expect(themeExists('invalid')).toBe(false);
      expect(themeExists('')).toBe(false);
    });
  });

  describe('Theme Consistency', () => {
    it('should have consistent color naming across themes', () => {
      const colorKeys = ['primary', 'secondary', 'accent', 'muted', 'background', 'foreground', 'border'];
      
      Object.values(PAGE_THEMES).forEach((theme: PageTheme) => {
        colorKeys.forEach((key) => {
          expect(theme.colors[key as keyof typeof theme.colors]).toBeDefined();
        });
      });
    });

    it('should have consistent button variants across themes', () => {
      const buttonKeys = ['primary', 'secondary', 'ghost', 'destructive'];
      
      Object.values(PAGE_THEMES).forEach((theme: PageTheme) => {
        buttonKeys.forEach((key) => {
          expect(theme.buttons[key as keyof typeof theme.buttons]).toBeDefined();
        });
      });
    });

    it('should have consistent badge variants across themes', () => {
      const badgeKeys = ['default', 'success', 'warning', 'error'];
      
      Object.values(PAGE_THEMES).forEach((theme: PageTheme) => {
        badgeKeys.forEach((key) => {
          expect(theme.badges[key as keyof typeof theme.badges]).toBeDefined();
        });
      });
    });
  });

  describe('Theme Values', () => {
    it('should have non-empty string values for all theme properties', () => {
      Object.values(PAGE_THEMES).forEach((theme: PageTheme) => {
        expect(theme.name.length).toBeGreaterThan(0);
        expect(theme.description.length).toBeGreaterThan(0);
        
        Object.values(theme.colors).forEach((value) => {
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        });
        
        Object.values(theme.gradients).forEach((value) => {
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have Tailwind CSS classes in theme values', () => {
      const theme = getPageTheme();
      
      // Check that color values contain Tailwind patterns
      expect(theme.colors.primary).toMatch(/text-/);
      expect(theme.gradients.primary).toMatch(/bg-gradient/);
      expect(theme.buttons.primary).toMatch(/bg-/);
    });
  });
});
