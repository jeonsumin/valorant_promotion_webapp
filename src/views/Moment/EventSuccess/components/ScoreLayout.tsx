import { img } from 'assets';

type ScoreLayoutProps = {
  momentType: string;
  title: string;
  subTitle: string;
  rank?: string;
};

export const ScoreLayout = (props: ScoreLayoutProps) => {
  const { momentType, title, subTitle, rank } = props;

  return (
    <div className={`main_con ${momentType}_bg score`}>
      <div className='score_layout'>
        {title && (
          <div className='record_box'>
            <img src={img.momentScroe} alt='Score' />
            <span className='record fail'  dangerouslySetInnerHTML={{ __html: title }}></span>
          </div>
        )}
        {rank && <p className='myrank'>나의 랭크 : {rank}위</p>}
      </div>
      <p className='txt' dangerouslySetInnerHTML={{ __html: subTitle }}></p>
    </div>
  );
};
