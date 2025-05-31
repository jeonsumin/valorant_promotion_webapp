import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';

type OtpFieldProps = {
  onComplete: (otp: string) => void;
};

export const OtpField = ({ onComplete }: OtpFieldProps) => {
  const [otp, setOtp] = useState('');
  const [failOtp, setFailOtp] = useState<any>({
    width: '60px',
    height: '60px',
    margin: '8px',
    fontSize: '18px',
    textAlign: 'center',
    borderRadius: '4px',
  });
  const handleChange = (value: string) => {
    if (otp === '0602') {
      onComplete(otp);
    } else {
        setOtp('');
      if (value.length === 4) {
        setFailOtp((prev) => ({ ...prev, border: '1px solid var(--point)' }));
      } else {
        setFailOtp((prev) => ({ ...prev, border: '' }));
      }
    }
    setOtp(value);
  };

  useEffect(() => {
    if (otp === '0602') {
      onComplete(otp);
    }else {
      if(otp.length === 4)
        setOtp('')
    }
  }, [otp, onComplete]);

  return (
    <div className='otp_wrap'>
      <OTPInput
        value={otp}
        onChange={handleChange}
        numInputs={4}
        renderInput={(props) => (
          <input
            {...props}
            type='password'
            inputMode='numeric'
            style={{ ...failOtp }}
          />
        )}
      />
    </div>
  );
};
