import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Coupon,
  Loading,
  StaffCode,
  Survey,
  StampCard,
  ClearLayout,
  Qr,
} from 'components';
import { useModal } from 'hoc/Context/ModalContext';
import { fetchEventCoupon, updateCompletionSurvey } from 'utils/apis';
import { survey } from 'data/survey_data';
import { useQueryParams } from 'hoc/useQueryParams';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';

export const StampScreen = () => {
  const modal = useModal();
  const queryParams = useQueryParams();
  const [list, setList] = useState<any>(survey);
  const [clearState, setClearState] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    $axios
      .post('/event_stamp', { user_code: getCookie('user') })
      .then((response: any) => {
        setClearState({ ...response.data });
        if (queryParams.moment) {
          const isSurvey = response.data.event_data
            .filter((f: any) => f.event_type == `${queryParams.moment}`)
            .at(0).survey;

          if (isSurvey === 'N') {
            modal?.showModal({
              isLogo: true,
              body: (
                <Survey
                  momentType={`${queryParams.moment}`}
                  fetchData={fetchData}
                />
              ),
            });
          }
        }

        if (response.data?.code == 1) return;

        const mergeList = list.map((item: any) => {
          const matched = response.data?.event_data.find(
            (t: any) => t.event_type === item.moment
          );

          return {
            ...item,
            ...matched,
          };
        });
        setList(mergeList);
      })
      // .catch((e) => {
      //   console.error(e);
      //   modal?.showAlert({
      //     message:
      //       '네트워크가 불안정합니다. 잠시후 다시 이용해주시기 바랍니다.',
      //     onConfirm: () => {
      //       modal?.alertClose();
      //     },
      //   });
      // })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openSurveyModal = (momentType: string) => {
    const modalOption =
      momentType == '99' ? { title: '만족도 조사하기' } : { isLogo: true };
    modal?.showModal({
      ...modalOption,
      body: (
        <Survey momentType={momentType} isClear={'N'} fetchData={fetchData} />
      ),
    });
  };

  const openScanModal = () => {
    modal?.showModal({ title: 'QR 코드 스캔', body: <Qr /> });
  };

  const openStaffCodeModal = () => {
    modal?.showModal({
      title: '스탭 코드 입력',
      body: <StaffCode checkOtp={checkOtp} />,
    });
  };

  const checkOtp = (otp: string) => {
    if (otp == '0602') {
      modal?.allClear();
      openCouponModal();
    }
  };

  const openCouponModal = async () => {
    setIsLoading(true);
    $axios.post('/event_coupon',{user_code:getCookie("user")}).then((response: any) => {
      console.log(response);
      // if (response.data.code === 0) {
        modal?.showModal({
          title: '쿠폰함',
          body: <Coupon coupon={response.data} />,
        });
        // setIsLoading(false);
      // }
    });
  };

  if (!modal) return null;

  return (
    <div className='contents'>
      {isLoading && <Loading on={isLoading} />}
      <div className='main_con bg_bk'>
        {clearState && (
          <ClearLayout
            data={clearState}
            onSurvey={() => openSurveyModal('99')}
            onCoupon={() => openCouponModal()}
            onStaffCode={() => openStaffCodeModal()}
          />
        )}

        <div className='stamp_wrap'>
          {list &&
            list.map((item: any, index: number) => {
              return (
                <StampCard
                  key={`moment${index}`}
                  moment={`Event Zone ${index + 1}`}
                  title={item.title}
                  experienceStatus={item.finish === 'Y'}
                  reportStatus={item.survey === 'Y'}
                  openSurveyModal={() => openSurveyModal(item.moment)}
                />
              );
            })}
        </div>
        <div className='mt20 txt_center'>
          <p>
            2개 이상 적립 시 굿즈 교환이 가능하며 경품 교환소로 이동하여 스탭의
            안내를 받으시기 바랍니다.
          </p>
        </div>
        <div className='btn_wrap'>
          <button onClick={() => openScanModal()}>QR 코드 스캔</button>
          <button onClick={() => openCouponModal()}>쿠폰함</button>
        </div>
      </div>
    </div>
  );
};
