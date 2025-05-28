import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScoreLayout } from './components/ScoreLayout';
import { useModal } from 'hoc/Context/ModalContext';
import { img } from 'assets/img';
import { updateSetEvent } from 'utils/apis';
import { useQueryParams } from 'hoc/useQueryParams';
import { ClearAlert } from 'components/ClearAlert';

export const MomentClear = () => {
  const modal = useModal();
  const queryParams = useQueryParams();
  const navigate = useNavigate();



  const [rank, setRank] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [isActivity, setIsActivity] = useState(false);

  useEffect(() => {
    momentSet();
  }, []);

  useEffect(() => {
    setTitle(() => {
      if (queryParams.result_data == null) return `<img src="${img.momentClear}" alt="clear"/>`;

      return queryParams.result_data == null
        ? '스파이크 해체 실패'
        : `${queryParams.result_data} ${queryParams.event_name == 'event1' ? '초' : '점'}`;
    });

    setSubTitle(() => {
      if (queryParams.event_name !== 'event1')
        return `체험을 완료 했습니다! <br> 감정 리포트를 작성하고 <br>굿즈를 받아보세요.`;

      const isFailTitle: string = queryParams.status ? '실패' : '성공';
      return `스파이크 해체에 ${isFailTitle}하셨습니다!<br> 감정 리포트를 작성하고 <br> 굿즈를 받아보세요.`;
    });
  }, []);

  const momentSet = () => {
    console.log(queryParams);
  // if (result != null) {
  //   console.log(
  //     'momentType :: ',
  //     momentType,
  //     ' result :: ',
  //     result,
  //     ' status :: ',
  //     status,
  //     ' groupCode: ',
  //     groupCode
  //   );
  // }
  // const params = {
  //   event_name: `event${momentType}`,
  //   event_group:`event1-0`,
  //   result_date: result
  // }

  updateSetEvent(queryParams).then((response: any) => {
    console.log(response);
    setIsActivity(response.data.code)
    setRank(response.data.rank);
  });
};

const handleReportClick = () => {
  navigate(`/stamp?moment=${queryParams.event_name}`);
};

return (
  <div className="moment_screen has_btn not_header">
    {isActivity && (
      <ClearAlert
        onClick={() => {
          navigate('/stamp');
        }}
      />
    )}
    <div className="content">
      <ScoreLayout
        momentType={queryParams.event_name}
        title={title}
        subTitle={subTitle}
        rank={rank}
      />
    </div>
    <button
      className={`float_btn ${queryParams.event_name}_bg`}
      onClick={handleReportClick}
    >
      감정 리포트 작성하기
    </button>
  </div>
);
}
;
