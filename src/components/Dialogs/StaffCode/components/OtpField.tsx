import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';

type OtpFieldProps = {
  onComplete: (otp: string) => void;
};

export const OtpField = ({ onComplete }: OtpFieldProps) => {
  const [otp, setOtp] = useState('');

  const handleChange = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    if (otp.length === 4) {
      onComplete(otp);
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
            style={{
              width: '60px',
              height: '60px',
              margin: '8px',
              fontSize: '18px',
              textAlign: 'center',
              border: '1px solid var(--point)',
              borderRadius: '4px',
            }}
          />
        )}
      />
    </div>
  );
};
