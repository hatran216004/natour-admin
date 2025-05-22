import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { selectedConversationType } from '../types/conversations.type';

interface SelectedConversationState {
  selectedConversation: selectedConversationType;
  setSelectedConversation: (conversation: selectedConversationType) => void;
}

export const useSelectedConversation = create<SelectedConversationState>()(
  persist(
    (set) => ({
      selectedConversation: {
        _id: '',
        userId: '',
        photo: '',
        username: '',
        email: ''
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
