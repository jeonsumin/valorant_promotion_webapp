import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const NavigateBar = () => {
  const location = useLocation();

  return (
    <>
      <div className='navigate-bar'>
        <Link
          to={'/space-info'}
          className={
            location.pathname == '/space-info'
              ? 'active space_info'
              : 'space_info'
          }
        >
          공간 소개
        </Link>
        <Link
          to={'/stamp'}
          className={location.pathname == '/stamp' ? 'active stamp' : 'stamp'}
        >
          {' '}
          스탬프 투어
        </Link>
        <Link
          to={'/event'}
          className={location.pathname == '/event' ? 'active event' : 'event'}
        >
          이벤트
        </Link>
      </div>
    </>
  );
};
