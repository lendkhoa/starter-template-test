import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './dialog';

describe('Dialog', () => {
    it('opens content when triggered', () => {
        render(
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>Desc</DialogDescription>
                    <div>Content</div>
                </DialogContent>
            </Dialog>
        );
        fireEvent.click(screen.getByText('Open'));
        expect(screen.getByText('Content')).toBeInTheDocument();
    });
});
