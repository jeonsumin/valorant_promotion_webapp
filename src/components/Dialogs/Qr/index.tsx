import { QrReader } from 'react-qr-reader';

export const Qr = () => {
  const handleScan = (text: string) => {
    console.log('QR Code Result:', text);
    if (text.startsWith('http://') || text.startsWith('https://')) {
      window.open(text, '_self');
    } else {
      navigate('/stamp');
    }
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
            className='qr_video'
          />
        </div>
      </div>
    </div>
  );
};
