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
            title={`Event Zone ${flag.moment}`}
            pointText={flag.title}
            description={flag.desc}
          />
        ))}
      </div>
    </div>
  );
};
