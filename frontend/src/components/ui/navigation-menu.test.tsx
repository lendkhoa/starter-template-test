import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './navigation-menu';

describe('NavigationMenu', () => {
    it('renders list', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>Link 1</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        expect(screen.getByText('Link 1')).toBeInTheDocument();
    });
});
