import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  onSurvey?: () => void;
  onStaffCode?: () => void;
  onCoupon: () => void;
};

export const ClearLayout = (props: Props) => {
  const { title, description, onSurvey, onStaffCode, onCoupon } = props;
  return (
    <div className="clear_screen">
      <div className="txt_box">
        <h2>{title}</h2>

        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        {/*<strong>{highlightText}</strong>*/}
      </div>
      <div className="btn_wrap flex-wrap point_color">
        {onStaffCode ? (
            <button onClick={() => onStaffCode()} className="bd_btn">
              스탭 코드 입력(스탭 전용)
            </button>
          ) :
          (
            <button onClick={() => onSurvey()} className="bd_btn">
              만족도 조사
            </button>
          )
        }

        <button onClick={() => onCoupon()} className="">
          쿠폰함
        </button>
      </div>
    </div>
  );
};
