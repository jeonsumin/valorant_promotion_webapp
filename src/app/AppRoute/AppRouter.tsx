import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRef } from 'react';
import { CheckDevice } from 'components/CheckDevice';
import { Event01En, Moment01, Moment02, Moment04, MomentClear } from 'views/Moment';
import { OnBoarding } from 'views/OnBoarding';
import { Promotion } from 'views/Promotion';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from 'views/Home';
import { SpaceScreen } from 'views/Home/Space';
import { StampScreen } from 'views/Home/Stamp';
import { EventScreen } from 'views/Home/Event';

export const AppRouter = () => {
  const modalRef = useRef(null);
  const alertRef = useRef(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/event01/en' element={<Event01En />} />

        <Route element={<OnBoarding modalRef={modalRef} />} path='/onboarding' />
        <Route element={<MomentClear />} path='/event-clear' />
        <Route element={<Promotion />} path='/promotion' />

        <Route element={<ProtectedRoute />}>

          <Route element={<Home />} path="/">
            <Route index element={<Navigate to={"/space-info"} replace /> }/>
            <Route element={<SpaceScreen />} path='space-info' />
            <Route element={<StampScreen />} path='stamp' />
            <Route element={<EventScreen />} path='event' />
          </Route>

          <Route path="/event1" element={<Moment01 />} />
          <Route path="/event2" element={<Moment02 />} />
          <Route path="/event4" element={<Moment04 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
