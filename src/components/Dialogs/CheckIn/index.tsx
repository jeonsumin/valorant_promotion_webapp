// import $axios from 'utils/axios';
import { setCookie } from 'utils/index';
import { useModal } from 'hoc/Context/ModalContext';
import { CheckInForm } from './components/CheckInForm';
import { updateUserJoin } from 'utils/apis';

type Props = {
  goRoute: () => void;
};
export const CheckIn = (props: Props) => {
  const { goRoute } = props;
  const modal = useModal();

  const handleSubmit = (data: any) => {
    const user_ph = `${data.phone1}-${data.phone2}-${data.phone3}`;

    const user = { ...data, phone_num: user_ph, step: 1 };

    userJoin(user);
  };

  const checkInAlreadyUser = (user: any) => {
    updateUserJoin(user).then((response:any) => {
      setCookie('user', response.data.user_code);
      modal?.allClear();
      goRoute();
    });
  };

  const userJoin = (user: any) => {
    updateUserJoin(user).then((response:any) => {

      if (response.data.code == 1) {
        modal?.showAlert({
          message: `체크인한 이력이 있습니다. 계속하시겠습니까?`,
          isCancel: true,
          onConfirm: () =>
            checkInAlreadyUser({ ...user, step: response.data.step }),
        });
        return;
      }

      setCookie('user', response.data.user_code);
      goRoute();
      modal?.allClear();
    });
  };

  return (
    <div className='stack_screen'>
      <div className='checkin_bg content'>
        <CheckInForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
