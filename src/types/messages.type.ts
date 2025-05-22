export type Message = {
  _id: string;
  conservationId: string;
  sender: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};
export type MessagesList = {
  messages: Message[];
};
