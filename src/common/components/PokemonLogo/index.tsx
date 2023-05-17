import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import fonts from "../../style/fonts";

import './style/pokemonLogo.scss';

interface PokemonLogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

const className =  ' ' + (['pokemon-logo',fonts.POKEMON_SOLID.className]).join(' ');

const PokemonLogo: FC<PokemonLogoProps> = props => (
    <h1 {...props} className={props.className?.concat(className).trim() ?? className.trim()}>Pokécard</h1>
);

export default PokemonLogo;