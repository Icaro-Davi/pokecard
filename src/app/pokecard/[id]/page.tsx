import TiltWrapper from "@/src/common/components/Tilt";
import PokemonService from "@/src/common/service/PokemonService";
import PokeCard from "@/src/feature/PokeCard/component";
import PokecardSkeleton from "@/src/feature/PokeCard/component/Skeleton/PokecardSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const pokemon = await PokemonService.getByIdOrName(params.id);
        return {
            title: `${pokemon.name} | Pokecard`,
            description: pokemon.species.flavor_text_entries[0].flavor_text ?? `Pokemon ${pokemon.name} does not have a description.`,
            keywords: ['pokecard', 'pokemon', 'cards', 'games', 'monsters', 'preview pokecard', pokemon.name],
            ...pokemon.sprites.other["official-artwork"].front_default
                ? {
                    openGraph: {
                        images: pokemon.sprites.other["official-artwork"].front_default
                    }
                } : {}
        }
    } catch (error) {
        return {
            title: 'Not Found',
            description: 'Pokemon not found, try again!'
        };
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const pokemon = await PokemonService.getByIdOrName(params.id);
        return (
            <TiltWrapper>
                <Suspense fallback={<PokecardSkeleton />}>
                    {/* @ts-expect-error Server Component */}
                    <PokeCard pokemon={pokemon} />
                </Suspense>
            </TiltWrapper>
        );
    } catch (error) {
        return (
            <div style={{ color: '#FFFFFF', textAlign: 'center' }}>
                <h2>Pokecard not found</h2>
            </div>
        );
    }
}
