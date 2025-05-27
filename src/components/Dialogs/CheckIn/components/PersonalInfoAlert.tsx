
type PersonalInfoAlertProps = {
  terms: any;
  isOpen: boolean;
  onClose: () => void;
};

export function PersonalInfoAlert(props: PersonalInfoAlertProps) {
  const { terms, isOpen, onClose } = props;

  if (!isOpen) return null;

  return (
    <div className='full_alert'>
      <header className={`modal_header`}>
        <h1 className='title'>{terms.title}</h1>
        <button onClick={onClose}>
          <i className={`icon icn_close`} aria-label='닫기'></i>
        </button>
      </header>
      <div className='terms_scroll'>
        <p className='alert_content' style={{ whiteSpace: 'pre-line' }}>
          {terms.desc}
        </p>
      </div>
    </div>
  );
}
