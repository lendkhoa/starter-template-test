import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './sheet';

describe('Sheet', () => {
    it('opens sheet when triggered', () => {
        render(
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                    <SheetTitle>Title</SheetTitle>
                    <SheetDescription>Desc</SheetDescription>
                    <div>Sheet Content</div>
                </SheetContent>
            </Sheet>
        );
        fireEvent.click(screen.getByText('Open'));
        expect(screen.getByText('Sheet Content')).toBeInTheDocument();
    });
});
