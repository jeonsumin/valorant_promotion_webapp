import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';

export const useApi = (config = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const callApi = useCallback(
    async (overrideConfig = {}) => {
      setError(null);

      try {
        const finalConfig = { ...config, ...overrideConfig };
        const response = await axios(finalConfig);
        setData(response.data);
        return response.data;

      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError);
        return null;
      }
    },
    [config]
  );

  return { data, error, callApi };
};
