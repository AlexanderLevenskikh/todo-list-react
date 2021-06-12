import { createContext } from 'react';
import { StoreModel } from 'root/stores';

export const StoreContext = createContext<null | StoreModel>(null);
export const StoreProvider = StoreContext.Provider;
