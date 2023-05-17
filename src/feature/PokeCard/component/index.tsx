import getColorFromImage from '@/src/common/utils/get-collor-from-image';
import Image from 'next/image';
import { CSSProperties } from 'react';

import { PokemonType } from '../../../common/service/PokemonService/pokemon.types';

import '../style/pokecard.scss';

const PokeCard = async ({ pokemon }: { pokemon: PokemonType }) => {
    try {

        const colors = pokemon.sprites.other['official-artwork'].front_default
        ? await getColorFromImage(pokemon.sprites.other['official-artwork'].front_default)
        : undefined;

        const pokemonColorPalletCSSVars = colors?.reduce((prev, current, index) => {
            prev[`--pokemon-color-pallet-${index}`] = current;
            return prev;
        }, {} as { [key: string]: string });

        const pokemonTypes = pokemon.types
        .map(({ type }) => type.name.slice(0, 1).toLocaleUpperCase() + type.name.slice(1))
        .join(', ');

        const pokemonInfo = pokemon.species.flavor_text_entries
        .find(description => description?.flavor_text && description.language.name === 'en')?.flavor_text
        .replaceAll(/[^\d\w ]/g, '');

        return (
            <div className="pokecard" style={pokemonColorPalletCSSVars as CSSProperties}>
                <div className='pokecard-title'>
                    <h2>{pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}</h2>
                </div>
                {pokemon.sprites.other['official-artwork'].front_default && <div className='pokecard-sprite'>
                    <Image
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={`pokemon ${pokemon.name}`}
                        src={pokemon.sprites.other['official-artwork'].front_default}
                    />
                </div>}
                <div className='pokecard-type'>
                    <h4>Types</h4>
                    <p>{pokemonTypes}</p>
                </div>
                <div className='pokecard-description'>
                    <h4>Description</h4>
                    <p >{pokemonInfo ?? 'No Description'}</p>
                </div>
                <div className='pokecard-info'>
                    <span className='pokecard-tag'>Weight: {pokemon.weight}</span>
                    <span className='pokecard-tag'>Height: {pokemon.height}</span>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div>
                Not found
            </div>
        );
    }
}

export default PokeCard;