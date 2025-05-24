import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Conversation,
  selectedConversationType
} from '../types/conversations.type';

interface SelectedConversationState {
  selectedConversation: selectedConversationType;
  setSelectedConversation: (conversation: selectedConversationType) => void;
}

interface ConversationsState {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
}

export const useConversationsStore = create<ConversationsState>()(
  persist(
    (set) => ({
      conversations: [],
      setConversations: (conversations) => set(() => ({ conversations }))
    }),
    {
      name: 'conversations',
      partialize: ({ conversations }) => ({ conversations })
    }
  )
);

export const useSelectedConversation = create<SelectedConversationState>()(
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
