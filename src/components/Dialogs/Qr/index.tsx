import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import 'barcode-detector/side-effects';

type Props = {
  onScanSuccess: (text: string) => void;
};

export const Qr = ({ onScanSuccess }: Props) => {
  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: 250,
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
    };

    const qrCodeScanner = new Html5Qrcode('qr-reader');

    qrCodeScanner.start(
      {
        facingMode: 'environment',
      },

      config,
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        // 실패 시
        console.warn('실패:', errorMessage);
      }
    );

    return () => {
      qrCodeScanner.stop().catch(console.error);
    };
  }, []);

  return (
    <div>
      <div id='qr-reader' />
    </div>

  );
};
