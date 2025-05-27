import eventList from './event_data.json';
import { useModal } from 'hoc/Context/ModalContext';
import { Event } from 'components/Dialogs/Event';

export const EventScreen = () => {
  const { showModal } = useModal();
  const openModal = (item: any) => {
    showModal({
      title: item.title,
      body:<Event/>
    });
  };
  return (
    <div className='contents event_bg'>
      <div className='event_btn_wrap'>
        {eventList.map((event: any, index: number) => (
          <button
            onClick={() => {
              openModal(event);
            }}
            key={`event_${index}`}
            className={'event_btn'}
          >
            {event.title}
          </button>
        ))}
      </div>
    </div>
  );
};
