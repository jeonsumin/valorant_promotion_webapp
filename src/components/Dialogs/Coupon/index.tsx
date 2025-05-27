import 'swiper/css';
import {CouponCard} from './components/CouponCard';

type Props = {
  couponList:any[]
}

export const Coupon = (props: Props) => {
  return (
    <div className='stack_screen cpu'>
      <div className='content bg_bk'>
        <div className='main_con'>
          <div className='inner'>
            <CouponCard coupons={props.couponList} />
          </div>
        </div>
      </div>
    </div>
  );
};
