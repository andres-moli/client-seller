import { createContext, ReactNode, useCallback, useContext, useRef, useSyncExternalStore } from 'react';
import { produce } from 'immer';

/*----------- cofig -----------*/

type Set<T> = (fn: (value: Partial<T>) => void) => void;

type Store<T> = {
  get: () => T;
  set: Set<T>;
  subscribe: (callback: () => void) => () => void;
};

/*----------- store -----------*/

export default function createCustomerStore<T>(defaultData: Partial<T> = {}) {
  /**
   * create the customer store
   * @returns
   */
  function useCustomeStore(defaultValue?: Partial<T>): Store<T> {
    // values
    const store = useRef<T>((defaultValue as T) || (defaultData as T));
    const subscribers = useRef(new Set<() => void>());

    // functions
    const get: Store<T>['get'] = useCallback(() => store.current, []);

    const set: Store<T>['set'] = useCallback(fn => {
      store.current = produce(store.current, fn);
      subscribers.current.forEach(callback => callback());
    }, []);

    const subscribe: Store<T>['subscribe'] = useCallback(callback => {
      subscribers.current.add(callback);
      return () => {
        subscribers.current.delete(callback);
      };
    }, []);

    return { get, set, subscribe };
  }

  // create the context store type
  type StoreData = ReturnType<typeof useCustomeStore>;

  // create the context
  const StoreContext = createContext<StoreData | null>(null);

  // create the provider context
  function Provider({ children, defaultValue }: { children: ReactNode; defaultValue?: Partial<T> }) {
    // hooks
    const store = useCustomeStore(defaultValue);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  }

  // create the selector
  function useSelectorContext<SelectorOutPut>(selector: (data: T) => SelectorOutPut): [SelectorOutPut, Set<T>] {
    const store = useContext(StoreContext);

    if (!store) throw new Error('Store not found');

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
  }

  return {
    useSelectorContext,
    Provider,
  };
}
