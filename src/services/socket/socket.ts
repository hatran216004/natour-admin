/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor() {
    this.url = 'http://localhost:3000';
  }

  connect(token?: string | null): Socket {
    if (this.socket?.connected) return this.socket;

    this.socket = io(this.url, {
      auth: {
        token
      },
      transports: ['websocket']
    });

    this.setupEventListeners();
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data?: any): void {
    if (this.socket) {
      this.socket?.emit(event, data);
    }
  }

  on(event: string, callback: (data?: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback: (data?: any) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      // console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      // console.log('Disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export default new SocketService();
