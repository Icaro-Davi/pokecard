import { forwardRef, InputHTMLAttributes, useCallback, useRef, useState } from "react";
import { ChangeEvent } from "react";

import SearchFormItems from "./Items";
import { SearchInputItem } from "./search.type";

import './style/searchInput.scss';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    items: SearchInputItem[];
    onSelectItem?: (result: SearchInputItem) => void;
}

const SearchInputForm = forwardRef<HTMLInputElement, SearchProps>(({ items, onSelectItem, onChange, ...props }, ref) => {
    const [input, setInput] = useState<string>('');
    const debounce = useRef<Map<string, NodeJS.Timeout>>(new Map());

    const customOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        setInput(event.currentTarget.value);
    }, [setInput, onChange]);

    const onSelect = useCallback((item: SearchInputItem) => {
        clearTimeout(debounce.current.get('onSelect'));
        debounce.current.set('onSelect', setTimeout(() => {
            onSelectItem?.(item);
            setInput(item.value);
        }, 150));
    }, [onSelectItem]);

    const onFocusItem = useCallback((item: SearchInputItem) => {
        clearTimeout(debounce.current.get('onSelect'));
        debounce.current.set('onSelect', setTimeout(() => {
            onSelectItem?.(item);
        }, 150));
    }, [onSelectItem]);

    return (
        <div className="search">
            <input {...props} onChange={customOnChange} ref={ref} autoComplete="off" spellCheck="false" />
            <SearchFormItems
                filter={input}
                items={items}
                onSelectItem={onSelect}
                onFocusItem={onFocusItem}
            />
        </div>
    )
});

SearchInputForm.displayName = 'SearchInputForm';
export default SearchInputForm;