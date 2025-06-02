import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useRef } from 'react';
import {
  Event01En,
  Moment01,
  Moment02,
  Moment04,
  MomentClear,
} from 'views/Moment';
import {
  EventPass,
  EventScreen,
  StampScreen,
  SpaceScreen,
  Home,
  OnBoarding,
  Promotion,
} from 'views';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  const modalRef = useRef(null);
  const alertRef = useRef(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/event01/en' element={<Event01En />} />
        <Route element={<OnBoarding modalRef={modalRef} />} path='/onboarding'/>
        <Route element={<Promotion />} path='/promotion' />

        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path='/'>
            <Route index element={<Navigate to={'/space-info'} replace />} />
            <Route element={<SpaceScreen />} path='space-info' />
            <Route element={<StampScreen />} path='stamp' />
            <Route element={<EventScreen />} path='event' />
          </Route>

          <Route element={<Moment01 />} path='/event1' />
          <Route element={<Moment02 />} path='/event2' />
          <Route element={<Moment04 />} path='/event4' />
          <Route element={<EventPass />} path={'/event_pass'} />
          <Route element={<MomentClear />} path='/event-clear' />

          <Route path='*' element={<Navigate to={'/'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
