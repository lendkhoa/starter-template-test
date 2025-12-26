import { PAGE_THEMES, type PageTheme } from "@/config/page-theme";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * ThemePreview Component
 * 
 * Visual preview of all available themes.
 * Useful for theme selection and documentation.
 */

interface ThemePreviewProps {
  onThemeSelect?: (themeName: string) => void;
}

export function ThemePreview({ onThemeSelect }: ThemePreviewProps) {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-3xl font-bold">Available Themes</h2>
        <p className="mt-2 text-muted-foreground">
          Preview all available page themes. Click on a theme to see it in action.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(PAGE_THEMES).map(([key, theme]) => (
          <ThemeCard
            key={key}
            themeName={key}
            theme={theme}
            onSelect={onThemeSelect}
          />
        ))}
      </div>
    </div>
  );
}

interface ThemeCardProps {
  themeName: string;
  theme: PageTheme;
  onSelect?: (themeName: string) => void;
}

function ThemeCard({ themeName, theme, onSelect }: ThemeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Theme Preview */}
      <div className={`h-32 ${theme.gradients.background} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-2xl font-bold ${theme.colors.foreground}`}>
            {theme.name}
          </div>
        </div>
      </div>

      {/* Theme Info */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{theme.name}</h3>
          <p className="text-sm text-muted-foreground">{theme.description}</p>
        </div>

        {/* Color Swatches */}
        <div>
          <p className="text-xs font-medium mb-2">Colors</p>
          <div className="flex gap-2">
            <div className={`h-8 w-8 rounded ${theme.colors.primary} bg-current`} title="Primary" />
            <div className={`h-8 w-8 rounded ${theme.colors.secondary} bg-current`} title="Secondary" />
            <div className={`h-8 w-8 rounded ${theme.colors.accent} bg-current`} title="Accent" />
          </div>
        </div>

        {/* Button Preview */}
        <div className="space-y-2">
          <p className="text-xs font-medium">Buttons</p>
          <div className="flex gap-2">
            <Button size="sm" className={theme.buttons.primary}>
              Primary
            </Button>
            <Button size="sm" variant="outline" className={theme.buttons.secondary}>
              Secondary
            </Button>
          </div>
        </div>

        {/* Badge Preview */}
        <div className="space-y-2">
          <p className="text-xs font-medium">Badges</p>
          <div className="flex flex-wrap gap-2">
            <span className={theme.badges.default}>Default</span>
            <span className={theme.badges.success}>Success</span>
            <span className={theme.badges.warning}>Warning</span>
            <span className={theme.badges.error}>Error</span>
          </div>
        </div>

        {/* Select Button */}
        {onSelect && (
          <Button
            onClick={() => onSelect(themeName)}
            variant="outline"
            className="w-full"
          >
            Use This Theme
          </Button>
        )}
      </div>
    </Card>
  );
}
