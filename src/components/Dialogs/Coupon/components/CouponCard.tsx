import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { img } from 'assets';
import { Link } from 'react-router-dom';
import { UTILS } from 'utils/utils';

type Props = {
  coupons: any;
};

export const CouponCard = (props: Props) => {
  const { coupons } = props;
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex + 1);
  };

  return (
    <div className='cpu_list'>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='coupon_swiper'
        onSlideChange={handleSlideChange}
      >
          <SwiperSlide >

          </SwiperSlide>
      </Swiper>
    </div>
  );
};
