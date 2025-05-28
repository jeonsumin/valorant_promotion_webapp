import { img } from 'assets/index';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlagTitle } from 'components/index';

export const Splash = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      props.deleteSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [props]);
  return (
    <>
      <section className='splash'>
        <div className='bg'></div>
        <div className='zindex'>
          <img className='logo' src={img.logo} alt='logo' />
        </div>
      </section>
    </>
  );
};
