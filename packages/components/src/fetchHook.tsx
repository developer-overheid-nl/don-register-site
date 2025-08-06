import { useState, useEffect } from "react";

interface FetchAPIResponse {
  data: any;
  isPending: boolean;
  error: { message: string } | null;
}

export const useFetch = (resource: string, key: string): FetchAPIResponse => {
  const [data, setData] = useState<FetchAPIResponse["data"]>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<FetchAPIResponse["error"]>(null);
  console.log('useFetch called with resource:', resource, 'and key:', key);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      await fetch(`${resource}`, 
        {
          headers: {
            'x-api-key': key,
          },
        }
      ).then((response) => 
        {
          console.log('fetchAPI response:', response);
          if (!response.ok) {
            setError({
              message: `HTTP error! Status: ${response.status} ${response.statusText}`,
            });
          }

          setData(response && response.json());
        }
      ).catch((error) => {
        setError({ message: error.message });
      });
      setIsPending(false);
    };
    console.log('fetchData function:', fetchData);

    fetchData();
  }, [resource, key]);
  console.log('useFetch data:', data, 'isPending:', isPending, 'error:', error);

  return { data, isPending, error };
}
