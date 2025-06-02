import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { img } from 'assets';
import { Countdown } from './components/CountDown';
import { ClearAlert, Header } from 'components';
import { useQueryParams } from 'hoc/useQueryParams';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';

export const Moment01 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const [buttonText, setButtonText] = useState<string>('해체하기');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isCountdownComplete, setIsCountdownComplete] =
    useState<boolean>(false);

  useEffect(() => {
    $axios.post("/event_take_check",{...queryParams, user_code:getCookie("user")}).then((res: any) => {
      if (res.data.code === 1) {
        setIsSuccess(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isCountdownComplete && videoRef.current) {
      videoRef.current.play();

      setStartTime(performance.now());

      videoRef.current.onended = () => {
        // 실패로 네비게이트 (7초 지나면 자동 실패)
        navigate(
          `/event-clear?event_name=event1&status=0&result_data=&${queryParams}`
        );
      };

      // 7초 후 버튼을 disabled로 변경 및 텍스트 변경
      const timer = setTimeout(() => {
        setIsButtonDisabled(true);
        setButtonText('해체 실패');
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [isCountdownComplete, navigate]);


  const handleButtonClick = () => {
    if (startTime !== null && !isButtonDisabled) {
      const currentTime = performance.now();
      const timeDifference = (currentTime - startTime) / 1000;


      // 성공 여부 결정 (7초 이하)
      const isSuccess = timeDifference <= 7;
      const score = (7 - timeDifference).toFixed(3);

      // 성공 시 점수를 파라미터로 전달
      if (isSuccess) {
        navigate(
          `/event-clear?event_name=event1&status=1&result_data=${score}&event_group=${queryParams.event_group}`
        );
      } else {
        navigate(
          `/event-clear?event_name=event1&status=0&result_data=&event_group=${queryParams.event_group}`
        );
      }
    }
  };

  return (
    <div className='moment01 moment_screen has_btn'>
      <Header />
      {isSuccess && (
        <ClearAlert
          onClick={() => {
            navigate('/stamp');
          }}
        />
      )}
      <div className='content'>
        {isStarted ? (
          <div className='main_con'>
            <div className='video_bg'>
              <video ref={videoRef} src={img.moment01Video} playsInline />
            </div>
            <p className='noti_txt'>7초 직전에 해체하기를 눌러주세요.</p>
            <button
              className={'float_btn'}
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
            {!isCountdownComplete && (
              <Countdown
                initialCount={3}
                onComplete={() => setIsCountdownComplete(true)}
              />
            )}
          </div>
        ) : (
          <div className='main_con intro'>
            <div className='txt_box'>
              <div className='img'>
                <img src={img.moment01Title} alt='' />
              </div>
              <div className='txt'>
                <strong>
                  스파이크가 해체되는 7초를
                  <br />
                  정확하게 맞춰보세요!
                </strong>
                <p className='desc'>
                  7초보다 늦게 누를 경우는 실패 입니다.
                  <br />
                  (1회만 참여 가능, 재도전 불가능)
                </p>
                <div className='arrow_box'>
                  <i className='icon icn_arrow_down_red'></i>
                  <p>
                    카운트 다운 후 시작됩니다.
                    <br />
                    시작하기 버튼을 눌러주세요.
                  </p>
                </div>
              </div>
              <button className='float_btn' onClick={() => setIsStarted(true)}>
                시작하기
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
