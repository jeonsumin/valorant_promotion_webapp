import { Header } from 'components/Header';
import { img } from 'assets/img';
import React, { useEffect, useRef, useState } from 'react';
import { Countdown } from 'views/Moment/Event01/components/CountDown';
import { ScoreLayout } from 'views/Moment/EventSuccess/components/ScoreLayout';

export const Event01En = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [start, setStart] = useState<boolean>(false);
  const [isDefuse, setIsDefuse] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    if (isDefuse) {
      videoStart();
    }
  }, [isDefuse]);

  const videoStart = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setCurrentTime(performance.now());
      videoRef.current.onended = () => {
        setResult(10);
      };
    }
  };

  const onDefuse = () => {
    const stopTimer = performance.now();
    const diff = (stopTimer - currentTime) / 1000;
    const result = (7 - diff).toFixed(3);

    setCurrentTime(0);
    setResult(Number(result));
  };

  if (result > 0)
    return (
      <div className='moment_screen has_btn not_header'>
        <div className={'content'}>
          <ScoreLayout
            momentType={'event1'}
            title={result <= 7 ? `${result}s` : 'Defuse Failed'}
            subTitle={
              result <= 7
                ? 'Spike Successfully defused!'
                : 'Defuse attempt <br/> unsuccessful.'
            }
            rank={''}
          />
        </div>
      </div>
    );

  return (
    <div className='moment01 moment_screen has_btn'>
      <Header />
      <div className='content'>
        {start ? (
          <div className='main_con'>
            {!isDefuse && (
              <Countdown
                initialCount={3}
                onComplete={() => setIsDefuse(true)}
              />
            )}
            <div className='video_bg'>
              <video ref={videoRef} src={img.moment01Video} playsInline />
            </div>
            <p className='noti_txt'>
              Hit defuse right before
              <br />7 seconds!
            </p>
            <button className={'float_btn'} onClick={() => onDefuse()}>
              Defuse
            </button>
          </div>
        ) : (
          <div className='main_con intro'>
            <div className='txt_box'>
              <div className='img'>
                <img src={img.moment01TitleEn} alt='' />
              </div>
              <div className='txt'>
                <strong>
                  Hit defuse at exactly <br />7 seconds!
                </strong>
                <p className='desc'>
                  After 7.00 seconds <br />
                  = Defuse Failed
                  <br />
                  (Only one attempt. No retries.)
                </p>
                <div className='arrow_box'>
                  <i className='icon icn_arrow_down_red'></i>
                  <p>
                    Countdown begins on Start. <br />
                    Press Start to begin.
                  </p>
                </div>
              </div>
              <button className='float_btn' onClick={() => setStart(true)}>
                Start
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
