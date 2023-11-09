import { useEffect, useState } from 'react';

export function useGrpcExpress<Message, Metadata>(
  method: (request: Message, metadata: Metadata | null) => any,
  message: Message,
  metadata?: Metadata
) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    method(message, metadata || null)
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
