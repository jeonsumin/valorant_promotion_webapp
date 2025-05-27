import React from 'react';
import { img } from 'assets';

export const Header = () => {
  return (
    <header className={`header`}>
      <div className='logo'>
        <img src={img.headerLogo} alt='Logo' />
      </div>
    </header>
  );
};
