import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [savedCallback]);

  useEffect(() => {
    const executeCallback = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};
