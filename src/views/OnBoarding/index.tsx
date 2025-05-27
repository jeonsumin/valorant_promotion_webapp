import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FlagTitle } from 'components';
import 'swiper/css';
import 'swiper/css/pagination';

import { img } from 'assets';
import { Pagination } from 'swiper/modules';
import { CheckIn } from 'components/Dialogs/CheckIn';
import { useModal } from 'hoc/Context/ModalContext';
import { useNavigate } from 'react-router-dom';

export const OnBoarding = (props: any) => {
  const onboardRef = useRef<HTMLDivElement | null>(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleSlideChange = (swiper: any) => {
    setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1);

    if (onboardRef.current) onboardRef.current.scrollTop = 0;

    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const checkInModal = () => {
    showModal({
      title: '체크인',
      body: <CheckIn goRoute={() => navigate('/space-info')} />,
    });
  };

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
                  플레이 하는 이유
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
              <FlagTitle
                pointText='0.01초 승부수'
                description='시간은 단 7초. 숨을 죽이고, 정확한 타이밍을 노려라. 절체절명의 그 순간, 당신의 손끝이 승리를 결정한다!'
                imgIcn='onBoardIcn1'
              />
              <FlagTitle
                pointText='내가 바로 원탭 전문가'
                description='조준점이 머리 위를 가를 때, 이미 게 임은 끝났다. 단 한 발로 판을 바꾸는, 그 짜릿함을 느껴보자!'
                className='moment2'
                imgIcn='onBoardIcn2'
              />
              <FlagTitle
                pointText='레전드 클러치 명장면'
                description='시야는 막혔지만, 가능성은 열려 있다. 마스터스 방콕을 뒤흔든 메테오의 클러치, 그 전율을 직접 경험하라!'
                imgIcn='onBoardIcn3'
              />
              <FlagTitle
                pointText='오늘의 야.시장 운세'
                description='야시장에선 뭐든 가능하다. 유니크한 스킨, 극적인 순간, 지금 바로 가장 레어한 득템에 도전하자!'
                className='moment4'
                imgIcn='onBoardIcn4'
              />
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
