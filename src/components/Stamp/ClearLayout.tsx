import React from 'react';
import { Link } from 'react-router-dom';

type ClearLayoutProps = {
  status: 'momentClear' | 'surveyClear' | 'couponClear';
  onSurvey: () => void;
  onCoupon: () => void;
  onStaffCode: () => void;
};

export const ClearLayout = ({
  status,
  onCoupon,
  onSurvey,
  onStaffCode,
}: ClearLayoutProps) => {
  let title = '';
  let description = '';
  let highlightText = '';
  let Link_1 = '';
  let Link_1_txt = '';
  let Link_2 = '';
  let Link_2_txt = '';

  switch (status) {
    case 'momentClear':
      title = 'CLEAR!';
      description =
        '<p>이벤트 참여를 완료하여 스탬프를 획득하였습니다</p><strong>간단한 만족도 조사 후<br/> 경품 교환소에서 경품을 수령하세요.</strong>';
      Link_1 = 'survey';
      Link_1_txt = '만족도 조사하기';
      Link_2 = '/coupon';
      Link_2_txt = '쿠폰함';
      break;

    case 'surveyClear':
      title = 'COMPLETE!';
      description =
        '<strong>만족도 조사를 완료 했습니다!</strong><p>경품 수령을 위해 경품 교환소에 <br/> 방문하고 스탭에게<br/>화면을 보여주세요.</p>';
      Link_1 = 'staffcode';
      Link_1_txt = '스탭 코드 입력';
      Link_2 = '/coupon';
      Link_2_txt = '쿠폰함';
      break;

    case 'couponClear':
      title = 'ALL CLEAR!';
      description = '<strong>발로란트 5주년 팝업에 <br/>준비된 체험을 완료 했습니다!</strong> <p>앞으로도 많은 관심과 <br/> 참여 부탁드립니다.</p>';
      highlightText =
        '발로란트 5주년 팝업에 준비된 체험을 완료 했습니다! 앞으로도 많은 관심과 참여 부탁드립니다.';
      Link_2 = '/coupon';
      Link_2_txt = '쿠폰함';
      break;
  }

  return (
    <div className='clear_screen'>
      <div className='txt_box'>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <div className='btn_wrap flex-wrap point_color'>
        {Link_1 && (
          <button
            onClick={() => (Link_1 == 'staffcode' ? onStaffCode() : onSurvey())}
            className='bd_btn'
          >
            {Link_1_txt}
          </button>
        )}
        <button onClick={() => onCoupon()} className=''>
          {Link_2_txt}
        </button>
      </div>
    </div>
  );
};
