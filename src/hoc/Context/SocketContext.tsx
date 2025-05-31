import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import { messageEmitter } from 'utils/MessageEmitter';
import { getCookie } from 'utils/cookies';

const WebSocketContext = createContext<any>(null);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [socketId, setSocketId] = useState(null);
  const [socketOnOff, setSocketOnOff] = useState(false);

  const socketURL = import.meta.env.VITE_APP_SOCKET_URL;

  useEffect(() => {
    if (socketOnOff) {


      socket.on('recevemessage', (data: any) => {
        console.log('Message:', data);
        setMessages((prev) => [...prev, data]);

        messageEmitter.emit('websocket-message', data);
      });

    }
  }, [socketOnOff]);
  const connected = (event_group) => {
    const newSocket = io(socketURL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO');
      console.log('Socket ID:', newSocket.id);
      setSocketId(newSocket.id);
      setIsConnected(true);
      setSocketOnOff(true);
      setSocket(newSocket);
    });

    newSocket.emit('register', {
      clientType: 'experience_user',
      eventGroup: event_group,
      identifier: getCookie('user'),
    });
  };

  const disConnected = () => {
    console.log('socket Id ', socketId);
    if (socket) {
      console.log('socket ', socket);
      socket.disconnect();
      setIsConnected(false);
      setIsRegistered(false);
      setSocket(null);
    }
  };


  const sendMessage = (eventName: any, data: any) => {
    if (socket && socket.connected) {
      socket.emit(eventName, data);
      console.log(`📤 Sent [${eventName}]:`, data);
    } else {
      console.warn('Socket is not connected');
    }
  };

  const sendToUser = (data: any) => {
    socket.emit('device_to_user', data);
    console.log(`📤 Sent [device_to_user]:`, data);
  };

  const sendSimpleMessage = (message: any) => {
    sendMessage('message', message);
  };

  const addEventListener = (eventName: any, handler: any) => {
    if (socket) {
      socket.on(eventName, handler);
    }
  };

  const removeEventListener = (eventName: any, handler: any) => {
    if (socket) {
      socket.off(eventName, handler);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        isConnected,
        isRegistered,
        socketId,
        sendMessage,
        sendSimpleMessage,
        messages,
        addEventListener,
        removeEventListener,
        sendToUser,
        connected,
        disConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};
