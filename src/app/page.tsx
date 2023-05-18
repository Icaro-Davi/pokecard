import { Metadata } from 'next';

import MainContent from '../common/components/Layout/MainContent';
import PokemonLogo from '../common/components/PokemonLogo';
import PokemonService from '../common/service/PokemonService';
import SearchPokemon from '../feature/SearchPokemon';

export const metadata: Metadata = {
  title: 'Home | Pokecard',
  description: 'Search for your favorite Pokemon and view its card.',
  keywords: ['pokecard', 'pokemon', 'cards', 'games', 'monsters'],
  openGraph: {
    images: '/favicon.ico'
  },
  authors: [
    { name: 'Icaro Davi', url: 'https://github.com/Icaro-Davi' }
  ]
}

async function Home() {

  const pokemons = (await PokemonService.getAll())
    .map((pokemon) => {
      const key = pokemon.url.split('/')[6];
      const value = pokemon.name;
      return { key, value };
    }).sort((a, b) => {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
    });

  return (
    <MainContent>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PokemonLogo />
      </div>
      <SearchPokemon pokemons={pokemons} />
    </MainContent>
  );
}


export default Home;