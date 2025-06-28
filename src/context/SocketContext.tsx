import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { Socket } from 'socket.io-client';
import socketService from '../services/socket/socket';
import { USER_EVENTS } from '../services/socket/events';

type ValueType = {
  socket: Socket | null;
  onlineUsers: string[];
};

const Context = createContext<ValueType | null>(null);

export default function SocketContext({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, token } = useAuthStore();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !isAuthenticated || !user) return;

    socketRef.current = socketService.connect(token);

    const onOnlineUsers = (data: string[]) => {
      setOnlineUsers(data);
    };

    socketRef.current.on(USER_EVENTS.ONLINE_USERS, onOnlineUsers);
    return () => {
      if (socketRef.current) {
        socketRef.current.off(USER_EVENTS.ONLINE_USERS, onOnlineUsers);
        socketRef.current.disconnect();
      }
    };
  }, [user, isAuthenticated, token]);

  return (
    <Context.Provider
      value={{
        socket: socketRef.current,
        onlineUsers
      }}
    >
      {children}
    </Context.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return value;
}
