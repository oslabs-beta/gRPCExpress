import { useEffect, useState, useMemo } from 'react';

export function useGrpcExpress(client, message) {
  const memoizedClient = useMemo(() => client)
  const memoizedMessage = useMemo(() => message)
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    memoizedClient(memoizedMessage)
      .then(res => {
        setData(res), setIsLoading(false);
      })
      .catch(err => {
        setError(err), setIsError(true);
      });
  }, []);

  return {
    isLoading,
    isError,
    data,
    error,
  };
}
