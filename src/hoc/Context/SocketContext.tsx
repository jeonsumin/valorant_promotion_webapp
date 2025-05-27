import io from 'socket.io-client';
import React, { useEffect } from 'react';

const socket = io(`${import.meta.env.VITE_APP_SOCKET_URL}`, {
  transports: ['websocket'],
  autoConnect: false,
});

const SocketContext = React.createContext(socket);
const SocketProvider = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
