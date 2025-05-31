import React from 'react';

type SurveyItemProps = {
  id: number;
  question: string;
  options: string[];
  onSelect: (answer: number) => void;
  selectedAnswer?: number[]; // ✅ 배열로 변경
};

export const SurveyItem = ({
                             id,
                             question,
                             options,
                             onSelect,
                             selectedAnswer = [],
                           }: SurveyItemProps) => {
  return (
    <div className='survey_list'>
      <div className='q_box'>
        <p>Q{id}.</p>
        <h4>{question}</h4>
      </div>
      <div className='a_box'>
        {options.map((option, index) => {
          const isSelected = selectedAnswer.includes(index); // ✅ 다중 선택 체크

          return (
            <button
              key={index}
              className={isSelected ? 'on' : ''}
              onClick={() => onSelect(index)} // ✅ 부모가 토글 처리
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
