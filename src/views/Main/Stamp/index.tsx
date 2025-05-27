import React, { useEffect, useState } from 'react';
import { Coupon, Loading, Qr, StaffCode, Survey } from 'components';
import stampData from 'data/survey_data.json';
import { useModal } from 'hoc/Context/ModalContext';
import { getCookie } from 'utils';
import { StampCard, ClearLayout } from './components';
import $axios from 'utils/axios';
import { useSearchParams } from 'react-router-dom';

export const StampScreen = () => {
  const { showModal, showAlert, alertClose  } = useModal();

  const [searchParam] = useSearchParams();
  const moment: number = Number(searchParam.get('moment'));

  const [list, setList] = useState<any>(stampData.data);
  const [clearState, setClearState] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();

    if (moment) {
      showModal({
        isLogo: true,
        body: <Survey momentType={moment} />,
      });
    }
  }, [moment]);

  const fetchData = () => {
    $axios
      .get(`/event_stamp?user_code=${getCookie('user')}`)
      .then((response) => {
        const data = response.data;

        console.log(data);
        setClearState({ ...data });
        if (data.code == 1) return;

        const mergeList = list.map((item: any) => {
          const matched = data.result.find(
            (t: any) => t.event_group == item.moment,
          );
          return {
            ...item,
            ...matched,
          };
        });
        console.log('mergeList', mergeList);

        setList(mergeList);
      })
      .catch(() => {
        showAlert({
          title: '네트워크가 불안정합니다. 잠시후 다시 이용해주시기 바랍니다.',
          onConfirm: () => {
            alertClose();
          },
        });
      })
      .finally(() => {
        setIsLoading(prev=> !prev)
      });
  };

  const openSurveyModal = (momentType: number) => {
    const modalOption = momentType == 99 ? { title: '만족도 조사하기' } : { isLogo: true };
    showModal({
      ...modalOption,
      body: <Survey momentType={momentType} />,
    });
  };

  const openScanModal = () => {
    showModal({ title: 'QR 코드 스캔' });
  };

  const openStaffCodeModal = () => {
    showModal({ title: '스탭 코드 입력', body: <StaffCode /> });
  };

  const openCouponModal = () => {
    let couponList:any = [];
    $axios
      .get(`/event_coupon?user_code=${getCookie('user')}`)
      .then((response) => {
        const data = response.data;
        if (data.code == 0) couponList = data.coupon;
      });
    showModal({ title: '쿠폰함', body: <Coupon couponList={couponList} /> });
  };

  if (isLoading){
    return <Loading on={isLoading}/>
  }
  return (
    <div className="contents">
      <div className="main_con bg_bk">
        {/* 전부 체험,감정리포트 clear시 등장 레이아웃 */}
        {
          clearState.finish === 'Y' &&
          <ClearLayout
            title={'CLEAR!'}
            description={'이벤트 참여를 완료하여 스탬프를 획득하였습니다.<br/><br/><strong>간단한 만족도 조사 후 <br/>굿즈 샵에서 경품을 수령하세요.</strong>'}
            onSurvey={() => openSurveyModal(99)}
            onCoupon={() => openCouponModal()}
          />
        }

        {/* 전부 체험,감정리포트,만족도 조사까지 clear시 등장 레이아웃 */}
        {clearState.survey === 'Y' &&
          <ClearLayout
            title={'COMPLETE!'}
            description={'이벤트 참여를 완료하여 스탬프를 획득하였습니다.<br/><br/><strong>간단한 만족도 조사 후 <br/>굿즈 샵에서 경품을 수령하세요.</strong>'}
            onSurvey={() => openSurveyModal(99)}
            onCoupon={() => openCouponModal()}
          />}

        {/* 쿠폰 증정까지 완료시 등장 레이아웃 */}
        {clearState.pass === 'N' &&
          <ClearLayout
            title="ALL CLEAR!"
            description={'<strong>발로란트 5주년 팝업에​ 준비된 체험을 완료 했습니다!</strong><br/><br/> 앞으로도 많은 관심과 참여 부탁드립니다.'}
            onStaffCode={() => openStaffCodeModal()}
            onCoupon={() => openCouponModal()
            } />
        }

        <div className="stamp_wrap">
          {list &&
            list.map((item: any, index: number) => {
              return (
                <StampCard
                  key={`moment${index}`}
                  moment={`Event Zone ${index + 1}`}
                  title={item.title}
                  experienceStatus={item.event === 'Y'}
                  reportStatus={item.event_review === 'Y'}
                  openSurveyModal={() => openSurveyModal(item.moment)}
                />
              );
            })}
        </div>
        <div className="mt20 txt_center">
          <p>
            스탬프 2개이상 적립시 굿즈 교환이 가능하며 굿즈 교환소로 이동하여
            스탭의 안내를 받으시기 바랍니다.
          </p>
        </div>
        <div className="btn_wrap">
          <button onClick={() => openScanModal()}>QR 코드 스캔</button>
          <button onClick={() => openCouponModal()}>쿠폰함</button>
        </div>
      </div>
    </div>
  );
};
