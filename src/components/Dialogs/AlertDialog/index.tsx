type Props = {
  message: string;
  isCancel: boolean;
  onConfirm: () => void;
  alertClose: () => void;
};
export const AlertDialog = (props: Props) => {
  const { message, isCancel, onConfirm, alertClose } = props;
  return (
    <>
      <div className={'dimmed'} />
      <div className='alert_wrap'>
        <h1 className='message'>{message}</h1>
        <div className='alert_btn_wrap'>
          {isCancel && (
            <button className='submit_btn cancel' onClick={alertClose}>
              아니오
            </button>
          )}
          <button type='submit' className='submit_btn' onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </>
  );
};
