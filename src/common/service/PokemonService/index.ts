import { PokemonPagination, PokemonType } from "./pokemon.types";

class PokemonService {
    private static pokemonCount = 1281;
    private static endpoint = 'https://pokeapi.co/api/v2';

    static getRandomPokemonId() {
        const randomId = (Math.round(Math.random() * this.pokemonCount) + 1);
        return randomId;
    }

    static pagination({ limit, offset }: {
        limit: number;
        offset: number;
    }) {
        return new Promise<PokemonPagination>(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.endpoint}/pokemon?limit=${limit}&offset=${offset}`);
                const data = await response.json();
                resolve(data);
            } catch (error) {
                console.error('Failed to get pokemons.');
                reject(error);
            }
        });
    }

    static getAll() {
        return new Promise<PokemonPagination['results']>(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.endpoint}/pokemon?limit=${this.pokemonCount}`);
                const data = await response.json();
                resolve(data.results);
            } catch (error) {
                console.error('Failed to get all pokemons.');
                reject(error);
            }
        });
    }

    static getByIdOrName(query: number | string) {
        return new Promise<PokemonType>(async (resolve, reject) => {
            try {
                const response = await fetch(`${this.endpoint}/pokemon/${query}`);
                const data = await response.json();
                const species_data = await (await fetch(data.species.url)).json();
                data.species = species_data;
                resolve(data);
            } catch (error) {
                console.error(`Failed to search pokemon ${query}`);
                reject(error);
            }
        });
    }

}

export default PokemonService;