import { useEffect, useState } from 'react';
import { successMant } from 'data/survey_data';

type Props = {
  data: any;
  onSurvey: () => void;
  onStaffCode: () => void;
  onCoupon: () => void;
};

export const ClearLayout = (props: Props) => {
  const { data, onSurvey, onStaffCode, onCoupon } = props;

  const [result, setResult] = useState<any | null>(null);
  const pass = data.pass === 'N'; // pass == Y &&  직권 QR
  const survey = data.finish_survey === 'N';

  useEffect(() => {
    let str = pass && 'clear' && survey && 'complete';

    str = 'all-clear';
    setResult(successMant.find((f: any) => f.type == str));
  }, [data]);

  if (!result) return null;

  return (
    <div className='clear_screen'>
      <div className='txt_box'>
        <h2>{result.title}</h2>

        <p dangerouslySetInnerHTML={{ __html: result.desc }}></p>
      </div>
      <div className='btn_wrap flex-wrap point_color'>
        {!survey && (
          <button onClick={() => onStaffCode()} className='bd_btn'>
            스탭 코드 입력
          </button>
        )}
        {!pass && (
          <button onClick={() => onSurvey()} className='bd_btn'>
            만족도 조사
          </button>
        )}
        <button onClick={() => onCoupon()} className=''>
          쿠폰함
        </button>
      </div>
    </div>
  );
};
