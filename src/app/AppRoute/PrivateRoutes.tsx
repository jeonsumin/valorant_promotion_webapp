import { Navigate, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Main, SpaceScreen, StampScreen, EventScreen, Moment01, Moment02, Moment04 } from 'views';

export const PrivateRoutes = (modalRef:any,alertRef:any) => (
    <Route element={<ProtectedRoute />}>

      <Route element={<Main />} path="/">
        <Route index element={<Navigate to={"/space-info"} replace /> }/>
        <Route element={<SpaceScreen />} path='space-info' />
        <Route element={<StampScreen />} path='stamp' />
        <Route element={<EventScreen />} path='event' />
      </Route>

      <Route path="/event1" element={<Moment01 />} />
      <Route path="/event2" element={<Moment02 />} />
      <Route path="/event4" element={<Moment04 />} />
    </Route>
);
