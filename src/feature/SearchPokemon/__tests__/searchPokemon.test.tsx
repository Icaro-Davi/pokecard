import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchPokemon from '../';

import '@testing-library/jest-dom';

const pokemons = [
    { key: '1', value: 'pokemon1' },
    { key: '2', value: 'pokemon2' },
    { key: '3', value: 'pokemon3' }
]

var router = { push: jest.fn() }

jest.mock('next/navigation', () => ({
    useRouter() {
        return router;
    }
}));

describe('SearchPokemon', () => {
    test('should redirect to pokecard', async () => {
        render(<SearchPokemon pokemons={pokemons} />);

        const searchInput = screen.getByPlaceholderText('Search pokemon');
        const submitButton = screen.getByText('Preview pokecard');

        expect(searchInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        await act(async () => {
            await userEvent.type(searchInput, 'poke');
            await userEvent.keyboard('{ArrowDown}');
            await userEvent.keyboard('{Enter}');
            await new Promise((r) => setTimeout(r, 200)); // For debounce in Search Component.
        });

        expect(searchInput).toHaveValue(pokemons[0].value);
        await userEvent.click(submitButton);

        expect(router.push).toHaveBeenCalledWith(`/pokecard/${pokemons[0].value}`);
    });
    afterAll(() => jest.restoreAllMocks());
});