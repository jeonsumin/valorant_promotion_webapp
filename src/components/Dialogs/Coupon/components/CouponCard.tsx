import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { img } from 'assets';
import { Link } from 'react-router-dom';

type Props = {
  coupons: any[];
};

export const CouponCard = (props: Props) => {
  const { coupons } = props;
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex + 1);
  };

  if (coupons.length === 0)
    return (
      <div className='cpu_list'>
        <div className='empty_data'>쿠폰함이 비었습니다.</div>
      </div>
    );

  return (
    <div className='cpu_list'>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='coupon_swiper'
        onSlideChange={handleSlideChange}
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon.id}>
            <div className='cpu_con'>
              <div className='bg'>
                <img src={img.couponBg} alt='쿠폰 배경' />
                <div className='cpu_card'>
                  <div className='top'>
                    <div className='cpu_num'>
                      <span>{coupon.code}</span>
                    </div>
                    <Link to='https://riot.com/4mlbi0i' target='_blank' className='link_btn'>
                      이벤트 페이지 방문하기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='cpu_count'>
        {currentIndex}/{coupons.length}
      </div>
    </div>
  );
};
