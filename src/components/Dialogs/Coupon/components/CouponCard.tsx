import { img } from 'assets';

export const CouponCard = ({ coupons }: any) => {
  return (
    <div className='cpu_list'>
      {coupons == null ? (
        <div className='empty_data'>쿠폰함이 비었습니다.</div>
      ) : (
        <div className='cpu_con'>
          <div className='bg'>
            <img src={img.couponBg} alt='쿠폰 배경' />
            <div className='cpu_card'>
              <div className='top'>
                <div className='cpu_num'>
                  <span>{coupons.COUPON_CODE}</span>
                </div>
                <button
                  className='link_btn'
                  onClick={() =>
                    (window.location.href = 'https://riot.com/4mlbi0i')
                  }
                >
                  이벤트 페이지 방문하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
