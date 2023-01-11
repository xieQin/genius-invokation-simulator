import { useCallback, useSyncExternalStore } from "react";

export const createStore = <T>(initialState: T) => {
  let state = initialState;
  const listeners = new Set();
  const getState = () => state;
  const setState = (fn: (v: T) => T) => {
    state = fn(state);
    listeners.forEach((l: any) => l());
  };
  const subscribe = (listener: (v: T) => T) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

export const useStore = (store: any, selector: any) => {
  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector])
  );
};
