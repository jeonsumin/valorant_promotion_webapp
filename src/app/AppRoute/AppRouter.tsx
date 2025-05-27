import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRef } from 'react';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { CheckDevice } from 'components/CheckDevice';

export const AppRouter = () => {
  const modalRef = useRef(null);
  const alertRef = useRef(null);
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes(modalRef, alertRef)}
        {PrivateRoutes(modalRef, alertRef)}
      </Routes>
    </BrowserRouter>
  );
};
