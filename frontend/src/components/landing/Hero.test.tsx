import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
    it('renders main heading', () => {
        render(<Hero />);
        expect(screen.getByText(/A flexible/i)).toBeInTheDocument();
    });
    it('renders call to action buttons', () => {
        render(<Hero />);
        expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
});
