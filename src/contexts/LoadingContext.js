"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoadingContext = createContext({
  isLoading: false,
  show: () => {},
  hide: () => {},
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = useCallback(() => setIsLoading(true), []);
  const hide = useCallback(() => setIsLoading(false), []);

  const value = useMemo(
    () => ({ isLoading, show, hide }),
    [isLoading, show, hide]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}


