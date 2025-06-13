import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthStore } from '../store/auth.store';

type ValueType = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  onlineUsers: string[];
  isOnline: boolean;
};

const SocketContext = createContext<ValueType>(null!);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      query: {
        userId: user?._id
      }
    });
    socket.on('getOnlineUsers', (users) => {
      setOnlineUsers(users);
      setIsOnline(users.includes(user?._id));
    });

    setSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, isOnline, setSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  const value = useContext(SocketContext);
  if (!value) {
    throw new Error('SocketContext is being used out of range');
  }
  return value;
}

export default SocketProvider;
