export interface User {
  name: string;
  avatar: string;
}

export interface Message {
  id: number;
  content: string;
  isRight: boolean;
  timestamp: string;
}

export interface ChatConfig {
  leftNickname: string;
  rightNickname: string;
  leftAvatar: string;
  rightAvatar: string;
  backgroundColor: string;
  backgroundImage?: string;
  messages?: Message[];
}