import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const CheckDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /iphone|android|ipad|ipod|mobile|chrome/.test(userAgent);
    console.log('userAgent ::: ', isMobileDevice);
    setIsMobile(isMobileDevice);
  }, []);

  return isMobile ? <Outlet/>: <Navigate to={"/promotion"} replace />;

};
