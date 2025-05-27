import React, { useEffect, useState, useRef } from 'react';

type CountdownProps = {
  initialCount?: number; // Optional number
  onComplete?: () => void;
};

export const Countdown = ({ initialCount = 3, onComplete }: CountdownProps) => {
  const [count, setCount] = useState<number>(initialCount ?? 3); // 초기값 안전 처리
  const circleRef = useRef<SVGCircleElement>(null);
  const circumference = 2 * Math.PI * 45;

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [count, onComplete]);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = 'none';
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      requestAnimationFrame(() => {
        if (circleRef.current) {
          circleRef.current.style.transition = `stroke-dashoffset ${
            initialCount ?? 3
          }s linear`;
          circleRef.current.style.strokeDashoffset = '0';
        }
      });
    }
  }, [initialCount]);

  return (
    <div className='countdown'>
      <svg width='120' height='120' className='countdown_circle'>
        <circle
          r='45'
          cx='60'
          cy='60'
          className='border'
          stroke='#e0e0e0'
          strokeWidth='4'
          fill='none'
        />
        <circle
          ref={circleRef}
          r='45'
          cx='60'
          cy='60'
          className='progress'
          stroke='#00bcd4'
          strokeWidth='4'
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
        <text
          x='50%'
          y='50%'
          textAnchor='middle'
          dy='0.35em'
          className='count-text'
          fontSize='24px'
          fill='#333'
        >
          {count}
        </text>
      </svg>
    </div>
  );
};
