import { OtpField } from './components/OtpField';
import React, { useState } from 'react';

type Props = {
  checkOtp: (data:string) => void;
};

export const StaffCode = (props: Props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleOtpComplete = (otp: string) => {
    setOtpValue(otp);
    setIsComplete(true);
  };

  const handleSubmit = () => {
    console.log('입력된 OTP:', otpValue);
  };

  return (
    <div className='stack_screen'>
      <div className='content bg_bk'>
        <div className='otpfield'>
          <h2>스탭 코드 입력</h2>
          <p className='desc'>
            스텝 전용 기능 입니다.
            <br />
            미션 클리어를 위해 코드를 입력해주세요.
          </p>
          <OtpField onComplete={handleOtpComplete} />
          {/*<p className='error'>※ 코드가 올바르지 않습니다.</p>*/}
        </div>
        <button
          className='chk_submit'
          disabled={!isComplete}
          onClick={() => props.checkOtp(otpValue)}
        ></button>
      </div>
    </div>
  );
};
