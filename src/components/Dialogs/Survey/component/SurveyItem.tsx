import React from 'react';

type SurveyItemProps = {
  id: number;
  question: string;
  options: string[];
  onSelect: (answer: number) => void;
  selectedAnswer?: number;
};

export const SurveyItem = ({
  id,
  question,
  options,
  onSelect,
  selectedAnswer,
}: SurveyItemProps) => {
  return (
    <div className='survey_list'>
      <div className='q_box'>
        <p>Q{id}.</p>
        <h4>{question}</h4>
      </div>
      <div className='a_box'>
        {options.map((option, index) => (
          <button
            key={index}
            className={selectedAnswer === index ? 'on' : ''}
            onClick={() => onSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
