import { getCookie, createApi } from 'utils';

const user = getCookie('user');

const baseParams = {
  user_code: user,
};


export const updateUserJoin = (params: any)   => createApi('/user_join', { ...baseParams, ...params });
export const fetchEventTake = (params: any)   => createApi('/event_take_check', { ...baseParams, ...params });
export const updateSetEvent = (params: any)   => createApi('/event_set', { ...baseParams, ...params });
export const updateSurvey = (params: any)     => createApi('/event_survey', { ...baseParams, ...params });
export const fetchCertCode =  (params: any) => createApi("/cert_code", {...baseParams, ...params})

export const updateCompletionSurvey = ()      => createApi('/event_stamp', { ...baseParams });
export const fetchEventCoupon = ()            => createApi('/event_coupon', { ...baseParams });
export const updateCompletionEvent =  ()      => createApi("/event_pass", { ...baseParams });

