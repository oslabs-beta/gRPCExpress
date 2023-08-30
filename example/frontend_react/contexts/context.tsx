import React, { ReactNode, createContext, useContext, useState } from 'react';

const Context = createContext<unknown | undefined>(undefined);
const SetContext = createContext<any | undefined>(undefined);

export function useCache() {
  return useContext(Context);
}

export function useSetCache() {
  return useContext(SetContext);
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(null);

  return (
    <Context.Provider value={state}>
      <SetContext.Provider value={setState}>{children}</SetContext.Provider>
    </Context.Provider>
  );
}
