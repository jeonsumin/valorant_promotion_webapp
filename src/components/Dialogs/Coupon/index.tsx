import 'swiper/css';
import { img } from 'assets/img';
import { useEffect } from 'react';
import { CouponCard } from './components/CouponCard';

export const Coupon = (props: any) => {
  return (
    <div className='stack_screen cpu'>
      <div className='content bg_bk'>
        <div className='main_con'>
          <div className='inner'>
            <CouponCard coupons={props.coupon} />
          </div>
        </div>
      </div>
    </div>
  );
};
