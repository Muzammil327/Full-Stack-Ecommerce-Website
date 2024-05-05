import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";

interface FetchCustomHookOptions {
  axiosConfig?: AxiosRequestConfig;
}

interface FetchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useFetchArray<T>(
  URL: string,
  options?: FetchCustomHookOptions
): FetchResult<T> {
  const { axiosConfig } = options || {};
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T[]> = await axios.get(URL, axiosConfig);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URL, axiosConfig]);

  return { data, loading, error };
}
