import { useEffect, useState } from 'react';

export function useGrpcExpress(client, message) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    client(message)
      .then(res => {
        setData(res), setIsLoading(false);
      })
      .catch(err => {
        setError(err), setIsError(true);
      });
  }, [client, message]);

  return {
    isLoading,
    isError,
    data,
    error,
  };
}
