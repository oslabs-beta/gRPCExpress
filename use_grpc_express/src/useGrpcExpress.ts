import { useEffect, useState } from 'react';

export function useGrpcExpress(client, message) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    client(message)
      .then(res => {
        setIsLoading(false);
        setData(res);
      })
      .catch(e => {
        setIsError(true);
        setError(e);
      });
  }, []);

  return {
    isLoading,
    isError,
    data,
    error,
  };
}
