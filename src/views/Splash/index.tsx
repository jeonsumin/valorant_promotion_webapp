import { img } from 'assets';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlagTitle } from 'components';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onBoarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);
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
