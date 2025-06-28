import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Conversation,
  SelectedConversationType
} from '../types/conversations.type';
import { Message } from '../types/messages.type';

type SelectedConversationState = {
  selectedConversation: SelectedConversationType;
};

type SelectedConversationAct = {
  setSelectedConversation: (conversation: SelectedConversationType) => void;
};

type ConversationsState = {
  conversations: Conversation[];
};

type ConversationsAct = {
  setConversations: (conversations: Conversation[]) => void;
};

type MessagesState = {
  messages: Message[];
};

type MessagesAction = {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessages: (messageIds: string[], isSeen: boolean) => void;
  clearMessages: () => void;
  getLastMessage: () => Message | null;
};

export const useMessages = create<MessagesState & MessagesAction>(
  (set, get) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, message]
      })),
    updateMessages: (messageIds, isSeen) =>
      set((state) => ({
        messages: state.messages.map((msg) =>
          messageIds.includes(msg._id) ? { ...msg, isSeen } : msg
        )
      })),
    clearMessages: () => set({ messages: [] }),
    getLastMessage: () => {
      const { messages } = get();
      return messages.length ? messages[messages.length - 1] : null;
    }
  })
);

// export const useConversationsStore = create<
//   ConversationsState & ConversationsAct
// >()(
//   persist(
//     (set) => ({
//       conversations: [],
//       setConversations: (conversations) => set(() => ({ conversations }))
//     }),
//     {
//       name: 'conversations',
//       partialize: ({ conversations }) => ({ conversations })
//     }
//   )
// );

export const useConversationsStore = create<
  ConversationsState & ConversationsAct
>((set) => ({
  conversations: [],
  setConversations: (conversations) => set(() => ({ conversations }))
}));

export const useSelectedConversation = create<
  SelectedConversationState & SelectedConversationAct
>()(
  persist(
    (set) => ({
      selectedConversation: {
        _id: '',
        userId: '',
        photo: '',
        username: '',
        email: '',
        mock: false
      },
      setSelectedConversation: (conversation) =>
        set({ selectedConversation: conversation })
    }),
    {
      name: 'selected-conversation',
      partialize: (state) => ({
        selectedConversation: state.selectedConversation
      })
    }
  )
);
