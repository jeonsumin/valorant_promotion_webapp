import React, { useEffect, useState } from 'react';
import { useModal } from 'hoc/Context/ModalContext';
import { Certification } from 'components/Dialogs/Certification';
import { img } from 'assets/img';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';
import { ClearAlert } from 'components/ClearAlert';
import { useNavigate } from 'react-router-dom';

export const Moment02 = () => {
  const { showModal, modalClose } = useModal();
  const navigate = useNavigate();
  const [code, setCode] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    $axios
      .get(`/event2_check?user_code=${getCookie('user')}&event_group=event2-1`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.code == 0) {
          //TODO: WS 연결후 모달 닫기
          isOtpModal(data.certCode);
        }

        setIsSuccess(data.code !== 0);
      });
  }, []);

  const isOtpModal = (otp) => {
    showModal({
      title: '인증번호',
      body: <Certification bg={img.moment02Title} otpCode={otp} />,
    });
  };

  return (
    <div className={`event_con moment2_bg`}>
      {isSuccess && (
        <ClearAlert
          onClick={() => {
            navigate('/stamp');
          }}
        />
      )}

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
