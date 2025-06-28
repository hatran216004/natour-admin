import { ConversationsList } from '../types/conversations.type';
import { MessagesList } from '../types/messages.type';
import { SuccessResponseApi } from '../types/utils.type';
import http from '../utils/http';

export const conversationsApi = {
  getUserConversations: () =>
    http.get<SuccessResponseApi<ConversationsList>>('/conversations/me'),
  getAllMessages: (conversationId: string) =>
    http.get<SuccessResponseApi<MessagesList>>(
      `/conversations/${conversationId}/messages`
    ),
  deleteConversation: (id: string) => http.delete(`/conversations/${id}`)
};
