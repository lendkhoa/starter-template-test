import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';

describe('DropdownMenu', () => {
    it('opens menu when triggered', async () => {
        const user = userEvent.setup();
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
        
        const trigger = screen.getByText('Open');
        await user.click(trigger);
        
        expect(await screen.findByText('Item 1')).toBeInTheDocument();
    });
});
