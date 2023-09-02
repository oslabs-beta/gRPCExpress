import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import eventEmitter from '../concepts/eventEmitter';

const Context = createContext<any>(undefined);
const SetContext = createContext<any>(undefined);
const ProviderContext = createContext<any>(undefined);

export function useCache() {
  return useContext(Context);
}

export function useSetCache() {
  return useContext(SetContext);
}

export function useGrpcExpress() {
  return useContext(ProviderContext);
}

function ContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    setState(eventEmitter.store);
  }, [eventEmitter.store]);

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

export function grpcHook(func) {
  const setCache = useContext(SetContext);
  let res;
  useEffect(() => {
    (async () => {
      res = await func();
      setCache(res);
    })();
  }, []);
  return res;
}
