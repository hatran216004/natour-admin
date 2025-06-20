import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Conversation,
  SelectedConversationType
} from '../types/conversations.type';

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

export const useConversationsStore = create<
  ConversationsState & ConversationsAct
>()(
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
