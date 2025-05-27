import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScoreLayout } from './components/ScoreLayout';
import { useModal } from 'hoc/Context/ModalContext';
import { Survey } from 'components/Dialogs';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';
import { img } from 'assets/img';

export const MomentClear = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const momentType: number = Number(searchParams.get('moment'));
  const result = searchParams.get('result');
  const status = searchParams.get('status');
  const groupCode = searchParams.get("groupCode")

  const [rank, setRank] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');

  useEffect(() => {
    if (result != null) {
      $axios
        .get(`/event${momentType}_set?user_code=${getCookie('user')}&event_group=${groupCode}&result=${result > 0 && result}`)
        .then((response) => {
          const data = response.data;
          if (data.code == 1) navigate(`/event01?event_group=${groupCode}`)

          setRank(data.rank)
      });
    }
  }, []);

  useEffect(() => {
    setTitle(() => {
      if (!result) return `<img src="${img.momentClear}" alt="clear"/>`;

      return status == 'fail'
        ? '스파이크 해체 실패'
        : `${result} ${momentType == 1 ? '초' : '점'}`;
    });

    setSubTitle(() => {
      if (momentType !== 1)
        return `체험을 완료 했습니다! <br> 감정 리포트를 작성하고 <br>굿즈를 받아보세요.`;

      const isFailTitle: string = status == 'fail' ? '실패' : '성공';
      return `스파이크 해체에 ${isFailTitle}하셨습니다!<br> 감정 리포트를 작성하고 <br> 굿즈를 받아보세요.`;
    });
  }, []);

  const handleReportClick = () => {
    navigate(`/stamp?moment=${momentType}`)
  };

  return (
    <div className='moment_screen has_btn not_header'>
      <div className='content'>
        <ScoreLayout
          momentType={momentType}
          title={title}
          subTitle={subTitle}
          rank={rank}
        />
      </div>
      <button
        className={`float_btn moment${momentType}_bg`}
        onClick={handleReportClick}
      >
        감정 리포트 작성하기
      </button>
    </div>
  );
};
