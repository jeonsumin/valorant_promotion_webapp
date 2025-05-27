import { Header, NavigateBar } from 'components';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  return (
    <>
      <section id='wrap'>
        <Header />
        <section className='container'>
          <Outlet />
        </section>
        <NavigateBar />
      </section>
    </>
  );
};
