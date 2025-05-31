import React from 'react';

type CheckboxFieldProps = {
  label?: string;
  id?: string;
  htmlFor?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onLabelClick?: (e: React.MouseEvent<HTMLSpanElement>) => void; // 라벨 클릭 핸들러 추가
  regire?: boolean;
};

export function CheckboxField({
  label = '',
  id,
  htmlFor,
  checked = false,
  onChange,
  className = '',
  onLabelClick,
  regire,
}: CheckboxFieldProps) {
  const handleLabelClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (onLabelClick) {
      onLabelClick(e);
    }
  };

  return (
    <div className={`checkbox_row ${className}`}>
      <label className='form_chk' htmlFor={htmlFor || id}>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={onChange}
          className=''
        />
        <span className='chk_mark'></span>
        <span className={`chk_txt ${className}`} onClick={handleLabelClick}>
          {label}
        </span>
      </label>
      <label htmlFor='form_chk'>
        {regire && <span className='chk_txt ml05'>(필수)</span>}
      </label>
    </div>
  );
}
