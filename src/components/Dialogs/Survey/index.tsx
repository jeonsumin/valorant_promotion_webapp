import { SurveyItem } from './component/SurveyItem';
import survey from 'data/survey_data.json';
import { useEffect, useState } from 'react';
import { ClearAlert } from 'components/ClearAlert';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';
import { useModal } from 'hoc/Context/ModalContext';

type Props = {
  momentType: number;
};
export const Survey = (props: Props) => {
  const { momentType } = props;
  const { modalClose } = useModal();
  const [isClear, setIsClear] = useState<boolean>(false);
  const [list, setList] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});

  useEffect(() => {
    if(momentType == 99){
      setList(survey.total);
      return;
    }
    setList(survey.data.find((f: any) => f.moment === momentType));

  }, [momentType]);

  const updateReport = () => {
    const user = getCookie('user');
    setIsClear(true);
    $axios
      .get(`/event_review?user_code=${user}&event_group=event${momentType})`)
      .then((response) => {
        const data = response.data;
        if (data.code == 0) setIsClear(true);
      });
  };

  return (
    <div className='stack_screen survey'>
      <div className='content bg_bk'>
        <div className='main_con'>
          <div className='inner'>
            <div className='survey_item'>
              {list &&
                list.questions.map((q: any, index: number) => (
                  <SurveyItem
                    key={`quest_${index}`}
                    id={q.id}
                    question={q.question}
                    options={q.options}
                    onSelect={(answer) => {
                      setSelectedAnswers((prev: any) => ({
                        ...prev,
                        [q.id]: answer,
                      }));
                    }}
                    selectedAnswer={selectedAnswers[q.id]}
                  />
                ))}
            </div>
            <button className='float_btn' onClick={updateReport}>
              제출하기
            </button>
          </div>
        </div>
      </div>
      {isClear && (
        <ClearAlert
          moment={momentType}
          title={list.title}
          onClick={() => {
            modalClose();
          }}
        />
      )}
    </div>
  );
};
