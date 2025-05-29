import { Link } from 'react-router-dom';
import { img } from 'assets/index';

type StampCardProps = {
  moment: string;
  title: string;
  experienceStatus: boolean;
  reportStatus: boolean;
  openSurveyModal: () => void;
};

export const StampCard = (props: StampCardProps) => {
  const { moment, title, experienceStatus, reportStatus, openSurveyModal } =
    props;
  const isComplete: boolean = experienceStatus && reportStatus;
  const isHalfComplete: boolean =
    (experienceStatus && !reportStatus) || (!experienceStatus && reportStatus);


  const cardClass: string = isComplete
    ? 'card clear'
    : isHalfComplete
    ? 'card half_clear'
    : 'card';

  const imageSrc: string = isComplete ? img.stampOn : img.stamp;

  return (
    <div className={cardClass}>
      <div className='card_inner'>
        <div className='img_box'>
          <img src={imageSrc} alt={title} />
        </div>
        <div className='txt_box'>
          <p>{moment}</p>
          <h2 className='title'>{title}</h2>
          <div className='status'>
            <div className='btn'>
              <span>체험 </span>
              <span className='bd_btn'>
                {experienceStatus ? '완료' : '미완료'}
              </span>
            </div>
            <div className='btn'>
              <span>감정리포트</span>
              {reportStatus ? (
                <span className='bd_btn'>작성완료</span>
              ) : (
                <button
                  onClick={openSurveyModal}
                  className='bd_btn'
                  disabled={!experienceStatus}
                >
                  작성하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
