import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { ThemeProvider } from '@/components/ui/theme-provider';

// Mock simpler components to avoid deep nesting issues
vi.mock('@/components/layout/MenuSlider', () => ({
  MenuSlider: () => <div data-testid="menu-slider" />
}));
vi.mock('@/components/landing/Hero', () => ({
  Hero: () => <div data-testid="hero" />
}));

describe('App', () => {
  it('renders application shell', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByTestId('menu-slider')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });
});
