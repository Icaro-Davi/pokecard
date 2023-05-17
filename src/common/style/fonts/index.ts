import { Roboto } from "next/font/google";
import localFont from 'next/font/local';

const ROBOTO = Roboto({
    subsets: ['latin'],
    display: 'auto',
    weight: '400'
});

const POKEMON_SOLID = localFont({
    src: './source/Pokemon_Solid.ttf',
    preload: true,
});

const appFonts = {
    ROBOTO,
    POKEMON_SOLID
}

export default appFonts;