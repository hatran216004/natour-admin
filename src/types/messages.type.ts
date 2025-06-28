export type Message = {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  isSeen?: boolean;
};
export type MessagesList = {
  messages: Message[];
};

export type StartTypingData = {
  conversationId: string;
  recipientId: string;
};

export type SendMessageData = {
  recipientId: string;
  message: string;
};

export type MartMessagesAsSeenData = {
  _id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
}[];

export type MessagesSeenConfirmData = {
  messageIds: string[];
  conversationId: string;
};

export type UnReadCountUpdatedData = {
  conversationId: string;
  unreadCount: number;
};

export type UserTypingData = {
  isTyping: boolean;
  userId: string;
  conversationId: string;
};
