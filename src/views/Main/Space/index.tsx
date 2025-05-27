import { FlagTitle } from 'components/index';
import { img } from 'assets/index';
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
        <FlagTitle
          title='Event Zone 1'
          pointText='0.01초 승부수'
          description='시간은 단 7초. 숨을 죽이고, 정확한 타이밍을 노려라. 절체절명의 그 순간, 당신의 손끝이 승리를 결정한다!'
        />
        <FlagTitle
          title='Event Zone 2'
          pointText='내가 바로 원탭 전문가'
          description='조준점이 머리 위를 가를 때, 이미 게임은 끝났다. 단 한 발로 판을 바꾸는, 그 짜릿함을 느껴보자!'
        />
        <FlagTitle
          title='Event Zone 3'
          pointText='레전드 클러치 명장면​'
          description='시야는 막혔지만, 가능성은 열려 있다.마스터스 방콕을 뒤흔든 메테오의 클러치, 그 전율을 직접 경험하라!'
        />
        <FlagTitle
          title='Event Zone 4'
          pointText='오늘의 야.시장 운세'
          description='야시장에선 뭐든 가능하다. 유니크한 스킨, 극적인 순간, 지금 바로 가장 레어한 득템에 도전하자!'
        />
        <FlagTitle
          title='Event Zone 5'
          pointText='사격장 플레이존'
          description='PC로 발로란트를 직접 플레이하고, 발로란트 짐색까지 받아보자!'
        />
      </div>
    </div>
  );
};
