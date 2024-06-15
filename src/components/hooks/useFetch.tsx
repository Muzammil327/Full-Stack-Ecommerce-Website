'use client'
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface FetchCustomHookOptions {
  axiosConfig?: AxiosRequestConfig;
}

interface FetchResult<T> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(
  URL: string,
  options?: FetchCustomHookOptions
): FetchResult<T> {
  const { axiosConfig } = options || {};
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axios.get(
          URL,
          axiosConfig || {}
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [URL, axiosConfig]);

  return { data, loading, error };
}
