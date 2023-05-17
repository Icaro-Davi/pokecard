'use client';
import Button from "@/src/common/components/Button";
import SearchInputForm from "@/src/common/components/form/Search";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import './style/Search.scss';

type FormData = {
    name: string;
}

const SearchForm: FC<{ pokemons: { key: string; value: string }[] }> = (props) => {
    const methods = useForm<FormData>();
    const router = useRouter();
    const pokemonName = methods.watch('name');

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (props.pokemons.some(pokemon => pokemon.value === data.name)) {
            router.push(`/pokecard/${data.name}`);
        }
    }

    return (
        <div className="search-form">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <SearchInputForm
                    {...methods.register('name')}
                    items={props.pokemons}
                    placeholder="Search pokemon"
                    onSelectItem={(result) => methods.setValue('name', result.value)}
                />
                <Button
                    type="submit"
                    disabled={!props.pokemons.some(pokemon => pokemon.value === pokemonName)}
                >
                    Preview pokecard
                </Button>
            </form>
        </div>
    );
}

export default SearchForm;