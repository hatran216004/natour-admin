import { ConversationsList } from '../types/conversations.type';
import { MessagesList } from '../types/messages.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const conversationsApi = {
  getUserConversations: () =>
    http.get<SuccessResponseApi<ConversationsList>>('/messages/conversations'),
  getAllMessages: (otherUserId: string) =>
    http.get<SuccessResponseApi<MessagesList>>(`/messages/${otherUserId}`)
};
