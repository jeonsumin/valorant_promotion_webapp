import { useEffect } from 'react';
import $axios from 'utils/axios';
import { getCookie } from 'utils/cookies';
import { useNavigate } from 'react-router-dom';

export const EventPass = () => {
  const navigate = useNavigate();

  useEffect(() => {
    $axios
      .post('/event_pass', { user_code: getCookie('user') })
      .then((response) => {
        navigate('/stamp');
      });
  }, []);

  return null;
};
