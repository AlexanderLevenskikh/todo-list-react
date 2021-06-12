import { useContext } from 'react';
import { StoreContext } from 'root/stores/react/context';

export function useMst() {
    const store = useContext(StoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }

    return store;
}
