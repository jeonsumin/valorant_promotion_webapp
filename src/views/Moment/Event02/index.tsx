import React, { useEffect, useState } from 'react';
import { useModal } from 'hoc/Context/ModalContext';
import { Certification } from 'components/Dialogs/Certification';
import { img } from 'assets/img';
import { ClearAlert } from 'components/ClearAlert';
import { useNavigate } from 'react-router-dom';
import { fetchCertCode, fetchEventTake } from 'utils/apis';
import { useQueryParams } from 'hoc/useQueryParams';
import { useWebSocket } from 'hoc/Context/SocketContext';

export const Moment02 = () => {
  const modal = useModal();


  const queryParam = useQueryParams();
  const socket = useWebSocket();
  const navigate = useNavigate();
  const [code, setCode] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchEventTake(queryParam).then((response: any) => {
      if (response.data.code == 0) {
        const certParam = {
          ...queryParam,
          event_group: `ex_${queryParam.event_group}`,
        };
        fetchCertCode(queryParam).then((response: any) => {
          if (response.data.code == 1) return navigate('/stamp');

          socket?.connect();
          //TODO: socket receive 받으면 registerdUser 호출
          // socket?.registeredUsers('experience_user', certParam.event_group );

          isOtpModal(String(response.data.cert_code));
        });
      }
    });

  }, []);

  const isOtpModal = (otp: string) => {
    modal?.showModal({
      title: '인증번호',
      body: <Certification bg={img.moment02Title} otpCode={otp} />,
      onClick: () => {
        navigate('/stamp');
      },
    });
  };

  return (
    <div className={`event_con moment2_bg`}>
      {code == 0 && (
        <>
          <div className={'experience'}>
            <p className='txt'>체험 중입니다</p>
          </div>
        </>
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
