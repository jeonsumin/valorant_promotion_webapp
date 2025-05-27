import { Route } from 'react-router-dom';
import { Event01En, MomentClear, OnBoarding, Promotion } from 'views';

export const PublicRoutes = (modalRef: any, alertRef: any) => (
  <>
    <Route path="/event01/en" element={<Event01En />} />

    <Route element={<OnBoarding modalRef={modalRef} />} path='/onboarding' />
    <Route element={<MomentClear/>} path="/event-clear"/>
    <Route element={<Promotion/>} path="/promotion"/>
  </>
);
