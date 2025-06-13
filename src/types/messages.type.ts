export type Message = {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};
export type MessagesList = {
  messages: Message[];
};
