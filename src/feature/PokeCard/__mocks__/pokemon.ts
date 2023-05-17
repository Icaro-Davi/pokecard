import { PokemonType } from "@/src/common/service/PokemonService/pokemon.types";

const pokemonMock: PokemonType = {
    name: 'Pokemon',
    height: 100,
    weight: 100,
    types: [
        { type: { name: 'bug' } },
        { type: { name: 'grass' } }
    ],
    species: {
        flavor_text_entries: [
            {
                flavor_text: 'Test pokemon description',
                language: { name: 'en' }

            }
        ]
    },
    sprites: {
        other: {
            "official-artwork": {
                front_default: 'https://picsum.photos/200/300'
            }
        }
    }
}
export default pokemonMock;