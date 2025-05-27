import React from 'react';
import $axios from 'utils/axios';
import { setCookie } from 'utils/index';
import { useModal } from 'hoc/Context/ModalContext';
import { CheckInForm } from './components/CheckInForm';

type Props = {
  goRoute: () => void;
};
export const CheckIn = (props: Props) => {
  const { goRoute } = props;
  const { showAlert, modalClose, alertClose }  = useModal();

  const handleSubmit = (data: any) => {
    const user_ph = `${data.phone1}-${data.phone2}-${data.phone3}`;

    if (import.meta.env.DEV) {

      showAlert({
        title: '체크인한 이력이 있습니다. 계속하시겠습니까?',
        isCancel: true,
        onConfirm: () => {
          console.log("@test test");
          setCookie('user', 'test');
          goRoute();
          modalClose();
          alertClose();
        },
      });
      return;
    }

    $axios
      .get(
        `/event_join?user_nickname=${data.nickname}&user_ph=${user_ph}&step=1`
      )
      .then((response) => {
        setCookie('user', response.data.user_code);

        if (response.data.code == 0) {
          goRoute();
        }
      });

    modalClose();
  };

  return (
    <div className='stack_screen'>
      <div className='checkin_bg content'>
        <CheckInForm onSubmit={handleSubmit} />
        <button type='submit' className='submit_btn'>
          예
        </button>
      </div>
    </div>
  );
};
