import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  leftAvatar: string;
  rightAvatar: string;
  leftNickname: string;
  rightNickname: string;
}

const MessageList = ({
  messages,
  leftAvatar,
  rightAvatar,
  leftNickname,
  rightNickname
}: MessageListProps) => {
  return (
    <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          isRight={message.isRight}
          timestamp={message.timestamp}
          avatar={message.isRight ? rightAvatar : leftAvatar}
        />
      ))}
    </Box>
  );
};

export default MessageList;