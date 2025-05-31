import { useEffect } from 'react';

export const Event = (props: any) => {
  useEffect(() => {
    console.log('props ', props);
  }, []);
  return (
    <div className='stack_screen'>
      <div className={'event_warp'}>
        <div className={"img_box"}>
        <img src={props.img} alt="" />
        </div>
      </div>
      <div className={'bottom_btn_wrap'}>
        <button>홈페이지 방문하기</button>
      </div>
    </div>
  );
};
