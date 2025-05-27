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
          <p>해당 사이트는</p>
          <div className='img_box'>
            <img src={img.pcviewTitle} alt='' />
          </div>
        </div>
        <div className='flag_box'>
          <FlagTitle
            title='오픈기간'
            description='2025. 06. 02(월) ~ 06. 22(일)'
            className='kr'
          />
          <FlagTitle
            title='운영장소'
            description='DDP SHOWROOM'
            className='kr'
          />
        </div>
      </div>
    </div>
  );
};
