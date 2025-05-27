import React from 'react';
import { img } from 'assets';

type FlagTitleProps = {
  title?: string;
  pointText?: string;
  description?: string;
  className?: string;
  hashTag?: string;
  imgIcn?: string;
};

export const FlagTitle = ({
  title,
  pointText,
  description,
  className = '',
  hashTag,
  imgIcn,
}: FlagTitleProps) => {
  return (
    <div className={`flagtitle ${className}`}>
      {hashTag && <strong className='hashtag'>{hashTag}</strong>}
      {imgIcn && (
        <img
          src={img[imgIcn as keyof typeof img]}
          alt=''
          className='onboard_icn'
        />
      )}{' '}
      {title && <h1 className='bg_title'>{title}</h1>}
      {pointText && <p className='point_txt'>{pointText}</p>}
      {description && <p className='desc'>{description}</p>}
    </div>
  );
};
