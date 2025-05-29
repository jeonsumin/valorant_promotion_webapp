import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

export const Qr = () => {
  const videoRef = useRef(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    const parsedData = JSON.parse(result.data);
    console.log(parsedData);
    alert(parsedData);
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleScan(result),
        QrOptions
      );

      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  return (
    <div className='stack_screen'>
      <div className='content qr_screen'>
        <div className='camera_canvas'>
          <video
            ref={videoRef}
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export const QrOptions = {
  // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
  // preferredCamera: 'environment',
  // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 60번 QR 코드 감지한다.
  maxScansPerSecond: 60,
  // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
  highlightScanRegion: true,
};