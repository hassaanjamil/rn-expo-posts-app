import React, { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type ApiStatusContextType = {
  isLoading: boolean;
  error: string | null;
};

const ApiStatusContext = createContext<ApiStatusContextType>({
  isLoading: false,
  error: null,
});

export const useApiStatus = () => useContext(ApiStatusContext);

export const ApiStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Memoize queries and mutations arrays to avoid selector warning
  const queries = useSelector((state: RootState) =>
    state.jsonPlaceholderApi.queries
  );
  const mutations = useSelector((state: RootState) =>
    state.jsonPlaceholderApi.mutations
  );

  // Memoize derived arrays
  const queriesArr = useMemo(() => Object.values(queries), [queries]);
  const mutationsArr = useMemo(() => Object.values(mutations), [mutations]);

  const isLoading =
    queriesArr.some((q: any) => q?.status === 'pending') ||
    mutationsArr.some((m: any) => m?.status === 'pending');

  const error =
    queriesArr.find((q: any) => q?.error)?.error?.error ||
    mutationsArr.find((m: any) => m?.error)?.error?.error ||
    null;

  return (
    <ApiStatusContext.Provider value={{ isLoading, error }}>
      {children}
    </ApiStatusContext.Provider>
  );
};