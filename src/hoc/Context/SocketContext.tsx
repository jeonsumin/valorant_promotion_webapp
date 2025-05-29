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
      });

      newSocket.on('connected', (data: any) => {
        console.log('Connection confirmed:', data);
      });

      newSocket.on('registered', (data: any) => {
        console.log('Registered:', data);
        setIsRegistered(data.success);
      });

      newSocket.on('unregistered', (data: any) => {
        console.log('Unregistered:', data);
        setIsRegistered(false);
      });

      newSocket.on('message', (data: any) => {
        console.log('Message:', data);
        setMessages((prev) => [...prev, data]);

        messageEmitter.emit('websocket-message', data);
      });

      newSocket.on('recevemessage', (data: any) => {
        console.log('Message:', data);
        setMessages((prev) => [...prev, data]);

        messageEmitter.emit('websocket-message', data);
      });


      newSocket.on('welcome', (data: any) => {
        console.log('Welcome message:', data);
        setMessages((prev) => [...prev, { type: 'welcome', data }]);
      });

      newSocket.on('broadcast', (data: any) => {
        console.log('Broadcast:', data);
        setMessages((prev) => [...prev, { type: 'broadcast', data }]);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
        setIsConnected(false);
        setIsRegistered(false);
      });

      newSocket.on('reconnect_attempt', (attemptNumber: any) => {
        console.log(`🔄 Reconnection attempt ${attemptNumber}`);
      });

      newSocket.on('reconnect', (attemptNumber: any) => {
        console.log(`Reconnected after ${attemptNumber} attempts`);
      });

      newSocket.on('connect_error', (error: any) => {
        console.error('Connection error:', error.message);
      });

      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [socketOnOff]);

  const disConnect = useCallback(() => {
    socket.disconnect();
  }, []);
  const onOff = useCallback(() => {
    console.log('SOCKET ON OFF');
    setSocketOnOff(true);
  }, []);

  useEffect(() => {
    registeredUsers('experience_user', null);
  }, [socket]);

  const registeredUsers = (clientType: any, eventGroup: any) => {
    if (socket) {
      socket.emit('register', {
        clientType: clientType,
        eventGroup: eventGroup,
        identifier: getCookie('user'),
      });
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
        registeredUsers,
        sendToUser,
        onOff,
        disConnect,
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
