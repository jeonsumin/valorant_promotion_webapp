import React, { useEffect } from 'react';
import { img } from 'assets';
import { FlagTitle } from 'components';

export const Promotion = () => {
  useEffect(() => {
    // PCView 전용 클래스 추가
    document.body.classList.add('pcview');
  }, []);

  return (
    <div className='pcview'>
      <div className='obj_1 obj'></div>
      <div className='obj_2 obj'></div>
      <div className='kv_box'>
        <div className='logo'>
          <img src={img.logo} alt='' />
        </div>
        <div className='txt'>
          <div className='img_box'>
            <img src={img.promotion} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};
