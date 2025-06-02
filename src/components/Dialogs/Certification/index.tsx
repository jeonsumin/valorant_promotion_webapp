type CertificationProps = {
  bg: string;
  otpCode: string;
};

export const Certification = (props: CertificationProps) => {
  const {bg, otpCode} = props;

  return (
    <div className='moment02 moment_screen not_has_btn'>
      <div className='main_con intro'>
        <div className='txt_box'>
          <div className='img'>
            <img src={bg} alt='' />
          </div>
          <div className='certification'>
            <div className='otp_box'>
              {otpCode.split('').map((num, index) => (
                <span key={index}>{num}</span>
              ))}
            </div>
            <p>
              인증번호를 입력하고 거치대에 핸드폰을 올려 두세요!<br/> 종료되면 결과와 함께 화면에 자동 갱신됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
