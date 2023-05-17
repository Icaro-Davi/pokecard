import { FC, memo, useCallback, useEffect, useMemo, useRef } from "react";

import { SearchInputItem } from "./search.type";

import './style/list.scss';

const SearchFormItems: FC<{
    items: SearchInputItem[];
    filter: string;
    onSelectItem?(result: SearchInputItem): void;
    onFocusItem?(item: SearchInputItem): void;
}> = ({ items, filter, onSelectItem, ...props }) => {
    const destroyEvents = useRef<() => void>();
    const filteredItems = useMemo(() => items.filter(item => {
        const valueLowerCase = item.value.toLocaleLowerCase();
        const filterLowerCase = filter.toLocaleLowerCase();
        return valueLowerCase.match(filterLowerCase) && valueLowerCase !== filterLowerCase;
    }), [items, filter]);

    const eventHandler = useCallback((listRef: HTMLUListElement | null) => {
        const inputSibling = (listRef?.previousSibling as HTMLInputElement);

        const onInputKeyDown = (event: KeyboardEvent) => {
            const allowedEvents = ['ArrowUp', 'ArrowDown'];
            if (allowedEvents.some(allowedEvent => allowedEvent === event.key)) {
                (listRef?.childNodes?.[0] as HTMLElement)?.focus();
            }
        }

        const eventNavigationOnList = (
            event: KeyboardEvent,
            callback: (params: { next?: () => void, previous?: () => void, currentElement?: HTMLElement }) => void
        ) => {
            event.preventDefault();
            const focusedElement = document.querySelector('.search-list li:focus');
            if (focusedElement) {
                const nextElement = (focusedElement?.nextElementSibling as HTMLElement | undefined);
                const prevElement = (focusedElement?.previousElementSibling as HTMLElement | undefined);
                const params: Parameters<Parameters<typeof eventNavigationOnList>['1']>['0'] = {
                    next() {
                        nextElement ? nextElement.focus() : (listRef?.firstChild as HTMLElement)?.focus();
                    },
                    previous() {
                        prevElement ? prevElement.focus() : (listRef?.lastChild as HTMLElement)?.focus();
                    },
                    currentElement: focusedElement as HTMLElement
                };
                callback(params);
            }
        }

        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    eventNavigationOnList(event, params => params.previous?.());
                    break;
                case 'ArrowDown':
                    eventNavigationOnList(event, params => params.next?.());
                    break;
                case 'Enter':
                    eventNavigationOnList(event, params => {
                        if(onSelectItem){
                            const key = params.currentElement?.dataset.key ?? '';
                            const value = params.currentElement?.dataset.value ?? '';
                            onSelectItem({ key, value });
                            inputSibling.focus();
                        }
                    });
                    break;
                default:
                    inputSibling.focus();
                    break;
            }
        }

        return {
            destroy: () => {
                removeEventListener('keydown', onKeyDown);
                removeEventListener('keydown', onInputKeyDown)
            },
            create: () => {
                if (destroyEvents.current) return;
                inputSibling.addEventListener('keydown', onInputKeyDown);
                listRef?.addEventListener('keydown', onKeyDown);
            }
        }
    }, [onSelectItem]);

    useEffect(() => {
        return destroyEvents.current ?? (() => { });
    }, [eventHandler]);

    return (
        <ul
            className='search-list'
            ref={ref => {
                if (ref) {
                    const events = eventHandler(ref);
                    events.create();
                    destroyEvents.current = events.destroy;
                }
            }}
        >
            {filteredItems.map((item, i) => (
                <li
                    key={`search-item-${item.key}`}
                    data-key={item.key}
                    data-value={item.value}
                    tabIndex={i}
                    onClick={() => onSelectItem?.(item)}
                    onFocus={() => props.onFocusItem?.(item)}
                >{item.value}</li>
            ))}
        </ul>
    )
}

export default memo(SearchFormItems);