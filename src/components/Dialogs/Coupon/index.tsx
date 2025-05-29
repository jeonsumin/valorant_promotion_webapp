import 'swiper/css';
import { CouponCard } from './components/CouponCard';
import { img } from 'assets/img';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const Coupon = (props: any) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className='stack_screen cpu'>
      <div className='content bg_bk'>
        <div className='main_con'>
          <div className='inner'>
            <div className='cpu_con'>
              <div className='bg'>
                <img src={img.couponBg} alt='쿠폰 배경' />
                <div className='cpu_card'>
                  <div className='top'>
                    <div className='cpu_num'>
                      <span>{props.coupon.coupon_data.COUPON_CODE}</span>
                    </div>
                    이벤트 페이지 방문하기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
