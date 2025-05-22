export type Participant = {
  _id: string;
  name: string;
  email: string;
  photo: string;
};

export type Conversation = {
  lastMessage: {
    text: string;
    sender: string;
  };
  _id: string;
  participants: Participant[];
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationsList = {
  conversations: Conversation[];
};

export type selectedConversationType = {
  _id: string;
  userId: string;
  username: string;
  photo: string;
  email: string;
};
