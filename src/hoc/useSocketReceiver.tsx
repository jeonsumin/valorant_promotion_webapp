import { useContext, useEffect } from 'react';
import { SocketContext } from 'hoc/Context/SocketContext';

export const useSocketReceiver = (channel:string, onReceive:(data:unknown) => void ) => {

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(channel, onReceive);

    return () => {
      socket.off(channel, onReceive);
    }
  }, [channel, onReceive]);
}

