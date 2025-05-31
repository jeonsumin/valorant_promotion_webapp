import React, { useEffect, useState } from 'react';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';
import { useQueryParams } from 'hoc/useQueryParams';
import { ClearAlert } from 'components/ClearAlert';
import { img } from 'assets/img';
import { Certification } from 'components/Dialogs';
import { useModal } from 'hoc/Context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { ScoreLayout } from 'views/Moment/EventSuccess/components/ScoreLayout';
import { useWebSocket } from 'hoc/Context/SocketContext';

export const Moment04 = () => {
  const queryParam = useQueryParams();
  const modal = useModal();
  const navigate = useNavigate();
  const socket = useWebSocket();
  const [code, setCode] = useState<number>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    $axios
      .post('/event_take_check', {
        ...queryParam,
        user_code: getCookie('user'),
      })
      .then((response) => {
        setCode(response.data.code);

        if (response.data?.code == 0) {
          const certParam = {
            ...queryParam,
            event_group: `ex_${queryParam.event_group}`,
          };

          $axios
            .post('/cert_code', { ...queryParam, user_code: getCookie('user') })
            .then((response: any) => {
              if (response.data.code == 1) {
                modal?.showAlert({ message: '1분간 이용할 수 없습니다.' ,onConfirm: () => {navigate('/stamp');}});
                return;
              }

              socket.connected(certParam.event_group);
              isOtpModal(String(response.data.cert_code));
            });
        }
      });
  }, []);


  useEffect(() => {
    const eventResult = socket?.messages;

    console.log('eventResult', eventResult);
    const isExperience = eventResult.filter(
      (f: any) => f.code === 'succ'
    ).length;
    const finished: any = eventResult
      .filter((f: any) => f.type == 'event_finish')
      .at(0);

    if (isExperience > 0) modal?.allClear();

    if (finished) {
      navigate(
        `/event-clear?event_name=event4&status=1&result_data=${finished.result}&rank=${finished.rank}&event_group=${queryParam.event_group}`
      );
    }
  }, [socket?.messages]);

  const isOtpModal = (otp: string) => {
    modal?.showModal({
      title: '인증번호',
      body: <Certification bg={img.moment04Title} otpCode={otp} />,
      onClick: () => {
        // socket?.disConnected();
        navigate('/stamp');
      },
    });
  };
  return (
    <div className={`event_con event4_bg`}>
      <div className={'experience'}>
        {code === 0 && <p className='txt event4'>체험 중입니다</p>}
      </div>

      {isSuccess && (
        <ClearAlert
          onClick={() => {
            navigate('/stamp');
          }}
        />
      )}
    </div>
  );
};
