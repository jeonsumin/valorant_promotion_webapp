import React from 'react';
import { QrReader } from 'react-qr-reader';

export const Qr = (props: any) => {
  const handleScan = (text: string) => {
    window.location.replace(text);
  };

  return (
    <div className='stack_screen'>
      <div className='content qr_screen'>
        <div className='camera_canvas'>
          <QrReader
            onResult={(result, error) => {
              if (result && typeof result !== 'string') {
                const text = result.getText ? result.getText() : '';
                handleScan(text);
              }
            }}
            constraints={{ facingMode: 'environment' }} // 후면카메라 사용
            containerStyle={{
              width: '100%',
            }}
            videoContainerStyle={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
            videoStyle={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};
