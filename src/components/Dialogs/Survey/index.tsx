import { SurveyItem } from './component/SurveyItem';
import { useEffect, useState } from 'react';
import { ClearAlert } from 'components/ClearAlert';
import { useModal } from 'hoc/Context/ModalContext';
import { UTILS as utils } from 'utils/utils';
import { review, survey } from 'data/survey_data';
import { getCookie } from 'utils/cookies';
import $axios from 'utils/axios';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

type Props = {
  momentType: string;
  isClear?: string;
  fetchData: () => void;
  momentNum?: number;
};
export const Survey = (props: Props) => {
  const { momentType, isClear, momentNum } = props;
  const modal = useModal();
  const [list, setList] = useState<any>(
    survey.find((f: any) => f.moment === momentType),
  );
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [multAnswer, setMultAnswer] = useState([]);
  const [startSurvey, setStartSurvey] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(true);
  const [clear, setClear] = useState<string>(isClear!);
  const [submitData, setSubmitData] = useState({ event_name: momentType == '99' ? 'finish_survey' : momentType });

  useEffect(() => {
    if (momentType == '99') {
      setList(review);
      return;
    }
  }, [momentType]);

  useEffect(() => {
    if (list) {
      const allAnswered = list.questions.every(
        (q: any) => selectedAnswers[q.id]?.length > 0,
      );
      setIsSubmit(allAnswered);

      const result = utils.transformToQKeys(selectedAnswers);
      setSubmitData((prev) => ({ ...prev, ...result }));
    }
  }, [selectedAnswers, list]);

  const updateReport = () => {
    if (momentNum == 9) {
      modal.showAlert({ message: '소중한 의견 전달해 주셔서 감사합니다.앞으로 더욱 노력하겠습니다.' });
    }

    $axios.post('/event_survey', { ...submitData, user_code: getCookie('user') }).then((response: any) => {

      if (response.code == 0) setClear('Y');

      props.fetchData();
    });

  };

  if (momentType == '99' && startSurvey)
    return (
      <div className="survey_modal">
        <header className={`modal_header`}>
          <h1 className="title">만족도 조사하기</h1>
          <button
            onClick={() => {
              modal?.allClear();
            }}
          >
            <i className={`icon icn_close`} aria-label="닫기"></i>
          </button>
        </header>
        <div className="info_warp">
          <div className="desc_box">
            <h1>사전 안내</h1>
            <p className="alert_content">
              본 만족도 조사는 참가자들의 의견을 수렴해 차후 좀 더 나은 행사를
              준비하기 위한 목적으로 진행됩니다. 작성해주신 모든 정보와 답변은
              통계법 제33조(비밀 보호 등)에 의해 비밀이 보장되며, 본 만족도 조사
              결과 외의 목적으로 결코 활용되지 않습니다.
            </p>
            <button
              className="float_btn"
              onClick={() => setStartSurvey((prev) => !prev)}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="stack_screen survey">
      <div className="content bg_bk">
        <div className="main_con">
          <div className="inner">
            <div className="survey_item">
              {list &&
                list.questions.map((q: any, index: number) => (
                  <SurveyItem
                    key={`quest_${index}`}
                    id={q.id}
                    question={q.question}
                    options={q.options}
                    onSelect={(answerIndex: number) => {
                      setSelectedAnswers((prev: any) => {
                        const currentAnswers = prev[q.id] || [];
                        const isAlreadySelected = currentAnswers.includes(answerIndex);
                        const max = q.maxSelect ?? 1; // maxSelect가 undefined이면 사실상 무제한

                        if (isAlreadySelected) {
                          // 이미 선택된 항목이면 → 제거
                          return {
                            ...prev,
                            [q.id]: currentAnswers.filter((i: number) => i !== answerIndex),
                          };
                        }

                        if (currentAnswers.length >= max) {
                          // 최대 개수 도달한 상태 → 새로운 선택 불가
                          return prev;

                        }
                        // 새로운 항목 추가
                        return {
                          ...prev,
                          [q.id]: [...currentAnswers, answerIndex],
                        };
                      });
                    }}

                    selectedAnswer={selectedAnswers[q.id]}
                  />
                ))}
            </div>
            <button
              className="float_btn"
              onClick={() => updateReport()}
              disabled={!isSubmit}
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
      {clear === 'Y' && (
        <ClearAlert
          moment={momentType}
          title={list.title}
          num={momentNum}
          onClick={() => {
            modal?.modalClose();
          }}
        />
      )}
    </div>
  );
};
