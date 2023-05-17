export type PokemonPagination = {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

export type PokemonType = {
    name: string;
    // order: number;
    weight: number;
    height: number;
    sprites: {
        // back_default: string | null;
        // back_female: string | null;
        // back_shiny: string | null;
        // back_shiny_female: string | null;
        // front_default: string | null;
        // front_female: string | null;
        // front_shiny: string | null;
        // front_shiny_female: string | null;
        other: {
            // dream_world: {
            //     front_default: null;
            //     front_female: null;
            // };
            // home: {
            //     front_default: string | null;
            //     front_female: string | null;
            //     front_shiny: string | null;
            //     front_shiny_female: string | null;
            // };
            'official-artwork': {
                front_default: string | null;
                // front_shiny: string | null;
            };
        };
    };
    types: {
        // slot: number;
        type: {
            name: string;
            // url: string;
        };
    }[];
    species: {
        // ase_happiness: number;
        // capture_rate: number;
        // color: object;
        flavor_text_entries: {
            flavor_text: string;
            language: {
                name: string;
                // url: string;
            };
            // version: {
            //     name: string;
            //     url: string;
            // };
        }[];
    }
};