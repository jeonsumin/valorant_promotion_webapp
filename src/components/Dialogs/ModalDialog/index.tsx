import { useModal } from 'hoc/Context/ModalContext';
import { img } from 'assets/img';
import React, { ReactNode } from 'react';

type Props = {
  title: string;
  isLogo: boolean;
  body: ReactNode;
  closeModal: () => void;
};
export const ModalDialog = (props: Props) => {
  const {title, isLogo, body, closeModal} = props;
  return (
    <div className='modal_wrap'>
      <div className={`modal_header ${isLogo ? 'logo' : ''}`}>
        {isLogo ? (
          <img className='title' src={img.headerLogo} alt='Logo' />
        ) : (
          <h1 className='title'>{title}</h1>
        )}

        <button onClick={closeModal}>
          {isLogo ? (
            <i className={`icon icn_close wh`} aria-label='닫기'></i>
          ) : (
            <img src={img.icnClose} alt='' />
          )}
        </button>
      </div>
      <div className='modal_body'>{body}</div>
    </div>
  );
};
