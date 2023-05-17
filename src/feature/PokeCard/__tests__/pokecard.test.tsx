import { render, screen } from '@testing-library/react';

import pokemonMock from '../__mocks__/pokemon';
import PokeCard from '../component';

import '@testing-library/jest-dom'

jest.mock('../../../common/utils/get-collor-from-image', () => jest.fn().mockReturnValue([
    'rgb(220,198,97)',
    'rgb(31,28,22)',
    'rgb(217,203,158)',
    'rgb(133,117,91)',
    'rgb(108,91,68)'
]));

describe('Pokecard', () => {
    test('should validade card fields', async () => {
        render(await PokeCard({ pokemon: pokemonMock }));

        expect(
            screen.getByText(
                pokemonMock.types
                    .map(({ type }) => type.name.slice(0, 1).toLocaleUpperCase() + type.name.slice(1))
                    .join(', ')
            )
        ).toBeInTheDocument();

        expect(screen.getByAltText(`pokemon ${pokemonMock.name}`)).toBeInTheDocument();
        expect(screen.getByText(pokemonMock.species.flavor_text_entries[0].flavor_text)).toBeInTheDocument();
        expect(screen.getByText(`Weight: ${pokemonMock.weight}`)).toBeInTheDocument();
        expect(screen.getByText(`Height: ${pokemonMock.height}`)).toBeInTheDocument();

    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});