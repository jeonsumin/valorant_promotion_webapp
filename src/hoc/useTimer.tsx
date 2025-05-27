import { useEffect, useRef, useState } from 'react';

export const useTimer = (delay: number) => {
  const [sec, setSec] = useState<number>(delay);

  useEffect(() => {
    if (sec <= 0) {
      return; // 타이머 종료
    }

    const timerId = setInterval(() => {
      setSec((prev) => prev - 1);
    }, 1000); // 1초마다 감소

    return () => clearInterval(timerId); // 클린업
  }, [sec]);

  return sec; // 현재 남은 시간 반환
};
