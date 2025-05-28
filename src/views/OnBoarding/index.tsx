import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FlagTitle } from 'components';
import 'swiper/css';
import 'swiper/css/pagination';

import { img } from 'assets';
import { Pagination } from 'swiper/modules';
import { CheckIn } from 'components/Dialogs/CheckIn';
import { useModal } from 'hoc/Context/ModalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Splash } from 'views/OnBoarding/Splash';
import { survey } from 'data/survey_data';


export const OnBoarding = (props: any) => {
  const location = useLocation();
  const from = location.state?.from;

  const onboardRef = useRef<HTMLDivElement | null>(null);
  const modal = useModal();
  const navigate = useNavigate();

  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isSplash, setIsSplash] = useState(true);

  const handleSlideChange = (swiper: any) => {
    setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1);
    if (onboardRef.current) onboardRef.current.scroll({ top: 0 });
  };

  const checkInModal = () => {
    modal?.showModal({
      title: '체크인',
      body: <CheckIn goRoute={() => navigate(from)} />,
    });
  };

  if (isSplash) {
    return <Splash deleteSplash={setIsSplash} />;
  }

  return (
    <div className='onboarding'>
      <div
        className='swiper-container onboard_con'
        ref={(el) => (onboardRef.current = el)}
      >
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          autoHeight={true}
        >
          <SwiperSlide>
            <div className='board_con'>
              <div className='img'>
                <img src={img.logo} alt='' />
              </div>
              <div className='txtbox'>
                <p>발로란트 5주년 팝업</p>
                <strong>
                  내가 <em className='point'>발로란트</em>를<br />
                  플레이하는 이유
                </strong>
                <p>
                  극적인 순간의 감정을 경험하고
                  <br />
                  디지털 스탬프를 모아보세요.
                </p>
                <div className='img_box'>
                  <img src={img.onboard_1} alt='' />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='board_con'>
              {survey.map((flag: any, index: number) => (
                <FlagTitle
                  key={`flag_${index}`}
                  pointText={flag.title}
                  description={flag.desc}
                  imgIcn={flag.img}
                  className={`moment${flag.moment}`}
                />
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='board_con'>
              <div className='img'>
                <img src={img.logo} alt='' />
              </div>
              <div className='txtbox'>
                <p>모먼트 참여 후</p>
                <strong>
                  반드시
                  <br />
                  <em className='point'>감정 리포트</em>를<br />
                  작성해야 <br />
                  <em className='point'>스탬프</em>가<br />
                  적립됩니다.
                </strong>
                <div>
                  <p className='noti point_colr mb10'>
                    스탬프 2개 이상 적립 시 플레이어카드가 제공됩니다.
                  </p>
                  <p className='noti'>
                    *체크인이 풀렸을 경우 동일한 연락처를 <br /> 재 입력하여
                    진행해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {isLastSlide && (
        <button className='float_btn' onClick={() => checkInModal()}>
          체크인
        </button>
      )}
    </div>
  );
};
