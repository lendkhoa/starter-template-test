import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from './theme-provider';

function TestComponent() {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={() => setTheme('dark')}>Set Dark</button>
        </div>
    );
}

describe('ThemeProvider', () => {
    it('provides theme context', () => {
        render(
            <ThemeProvider defaultTheme="light">
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });
});
