import React, { useEffect, useState } from 'react';
import { useModal } from 'hoc/Context/ModalContext';
import { Certification } from 'components/Dialogs/Certification';
import { img } from 'assets/img';
import { ClearAlert } from 'components/ClearAlert';
import { useNavigate } from 'react-router-dom';
import { useQueryParams } from 'hoc/useQueryParams';
import { useWebSocket } from 'hoc/Context/SocketContext';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';

export const Moment02 = () => {
  const modal = useModal();

  const queryParam = useQueryParams();
  const socket = useWebSocket();
  const navigate = useNavigate();
  const [code, setCode] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    $axios
      .post('/event_take_check', {
        ...queryParam,
        user_code: getCookie('user'),
      })
      .then((response: any) => {
        setIsSuccess(response.data.code === 1);
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
        } else {
          navigate("/stamp")
        }
      });

  }, []);

  useEffect(() => {
    const eventResult = socket?.messages;

    console.log(eventResult);
    const isExperience = eventResult.filter(
      (f: any) => f.code === 'succ'
    ).length;
    const finished: any = eventResult
      .filter((f: any) => f.type == 'event_finish')
      .at(0);

    if (isExperience > 0) modal?.allClear();

    if (finished) {
      navigate(
        `/event-clear?event_name=event2&status=1&result_data=${finished.result}&rank=${finished.rank}&event_group=${queryParam.event_group}`
      );
    }
  }, [socket?.messages]);

  const isOtpModal = (otp: string) => {
    modal?.showModal({
      title: '인증번호',
      body: <Certification bg={img.moment02Title} otpCode={otp} />,
      onClick: () => {
        // socket?.disConnected();
        navigate('/stamp');
      },
    });
  };

  return (
    <div className={`event_con event_bg`}>
      {code == 0 && (
          <div className={'experience'}>
            <p className='txt'>체험 중입니다</p>
          </div>
      )}

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
