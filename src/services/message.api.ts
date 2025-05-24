import { Message } from '../types/messages.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const apiMessages = {
  sendMessage: (body: { recipientId: string; message: string }) =>
    http.post<SuccessResponseApi<{ newMessage: Message }>>('/messages', body)
};
