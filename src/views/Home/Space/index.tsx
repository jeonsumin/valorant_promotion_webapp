import { FlagTitle } from 'components/index';
import { img } from 'assets';
import { survey } from 'data/survey_data';

export const SpaceScreen = () => {
  return (
    <div className='contents'>
      <div className='kv_box'>
        <img src={img.mainBg} alt='' className='kv' />
      </div>
      <div className='main_con bg'>
        <div className='img_box space_img'>
          <img src={img.spaceInfo} alt='' />
        </div>
        {survey.map((flag: any, index: number) => (
          <FlagTitle
            key={`flag_${index}`}
            title={`Event Zone ${index + 1}`}
            pointText={flag.title}
            description={flag.desc}
          />
        ))}
        <FlagTitle
          key={`flag_${99}`}
          title={`Event Zone 5`}
          pointText={'사격장 플레이존'}
          description={"PC로 발로란트를 직접 플레이하고,\n발로란트 짐색까지 받아보자!"}
        />
      </div>
    </div>
  );
};
