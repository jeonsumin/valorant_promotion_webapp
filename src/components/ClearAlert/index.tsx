import React from 'react';
import { img } from 'assets';

type Props = {
  title?: string;
  moment?: string;
  onClick: () => void;
};

export const ClearAlert = (props: Props) => {
  const { title, moment, onClick } = props;

  return (
    <div className='clear_alert_dimm'>
      <div className={`clear_alert ${!moment ? 'done' : ''}`}>
        {!moment ? (

          <>
            <div className='logo'>
              <img src={img.logo} alt='' />
            </div>

            <div className='txt'>
              <p className='done'>이미 모먼트 참여를 완료했습니다.</p>
            </div>
          </>

        ) : (

          <div className={'txt'}>
            <h2 className='moment'>{`Event Zone ${moment}`}</h2>
            <p className='title'>{title}</p>

            <div className='img_box'>
              <img src={img.momentClear} alt='Moment Clear' />
            </div>
          </div>

        )}

        <div className='btn_wrap'>
          <button onClick={onClick}>{!moment ? '스탬프 투어 페이지로 이동' : '확인'}</button>
        </div>
      </div>
    </div>
  );
};
