import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface FetchCustomHookOptions {
  axiosConfig?: AxiosRequestConfig;
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function usePost<T>(
  URL: string,
  postData: any,
  options?: FetchCustomHookOptions
): FetchResult<T> {
  const { axiosConfig } = options || {};
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const postDataAsync = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axios.post(
          URL,
          postData,
          axiosConfig
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to post data");
        console.error("Failed to post data:", error);
      } finally {
        setLoading(false);
      }
    };

    postDataAsync();
  }, [URL, postData, axiosConfig]);

  return { data, loading, error };
}
