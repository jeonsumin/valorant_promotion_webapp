import { eventList } from 'data/event_data';
import { useModal } from 'hoc/Context/ModalContext';
import { Event } from 'components/Dialogs/Event';

export const EventScreen = () => {
  const modal = useModal();
  const openModal = (item: any) => {
    modal?.showModal({
      title: item.title,
      body: <Event img={item.img} />,
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
