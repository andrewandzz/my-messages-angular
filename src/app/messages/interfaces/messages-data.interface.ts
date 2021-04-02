import { Message } from "./message.interface";

export interface MessagesData {
  messages: Message[];
  nextId: number;
}