export const Event = (props: any) => {
  return (
    <div className='stack_screen'>
      <div className={'event_warp'}>
        <div className={'img_box'}>
          <img src={props.img} alt='' />
        </div>
      </div>

      { props.isBtn  && (
        <div className={'bottom_btn_wrap'}>
          <button onClick={() => window.location.href= 'https://riot.com/4mlbi0i'}>홈페이지 방문하기</button>
        </div>
      )}
    </div>
  );
};
