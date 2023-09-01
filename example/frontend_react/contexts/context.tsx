import React, { ReactNode, createContext, useContext, useState } from 'react';

const Context = createContext<any>(undefined);
const SetContext = createContext<any>(undefined);
const ProviderContext = createContext<any>(undefined);

export function useCache() {
  return useContext(Context);
}

export function useSetCache() {
  return useContext(SetContext);
}

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<any>(null);

  return (
    <Context.Provider value={state}>
      <SetContext.Provider value={setState}>{children}</SetContext.Provider>
    </Context.Provider>
  );
}

export function GrpcExpressProvider({ children, client }) {
  return (
    <ContextProvider>
      <ProviderContext.Provider value={client}>
        {children}
      </ProviderContext.Provider>
    </ContextProvider>
  );
}
