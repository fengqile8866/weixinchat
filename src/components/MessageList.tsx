import { Box, styled } from '@mui/material';
import { Message } from '../types';
import defaultAvatar from '../assets/default-avatar.png';

interface MessageListProps {
  messages: Message[];
  leftAvatar: string;
  rightAvatar: string;
  leftNickname: string;
  rightNickname: string;
}

const MessageWrapper = styled(Box)({
  padding: '8px 16px',
  overflowY: 'auto',
  flex: 1,
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '2px'
  }
});

const MessageItem = styled(Box)({
  display: 'flex',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0
  }
});

const Avatar = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '4px',
  marginRight: '8px',
  objectFit: 'cover'
});

const MessageContent = styled(Box)({
  maxWidth: '280px',
  padding: '8px 12px',
  backgroundColor: 'white',
  borderRadius: '4px',
  position: 'relative',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  fontSize: '16px',
  lineHeight: '1.4',
  letterSpacing: '0.2px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
});

const Nickname = styled(Box)({
  fontSize: '12px',
  color: '#999',
  marginBottom: '4px'
});

const Timestamp = styled(Box)({
  fontSize: '12px',
  color: '#999',
  marginTop: '4px',
  textAlign: 'right'
});

const MessageList = ({ messages, leftAvatar, rightAvatar, leftNickname, rightNickname }: MessageListProps) => {
  return (
    <MessageWrapper>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          sx={{
            flexDirection: message.isRight ? 'row-reverse' : 'row',
            '& > img': {
              marginRight: message.isRight ? 0 : '8px',
              marginLeft: message.isRight ? '8px' : 0
            }
          }}
        >
          <Avatar
            src={message.isRight ? (rightAvatar || defaultAvatar) : (leftAvatar || defaultAvatar)}
            alt={message.isRight ? rightNickname : leftNickname}
          />
          <Box>
            <Nickname>{message.isRight ? rightNickname : leftNickname}</Nickname>
            <MessageContent
              sx={{
                backgroundColor: message.isRight ? '#95EC69' : '#fff'
              }}
            >
              {message.content}
              <Timestamp>{message.timestamp}</Timestamp>
            </MessageContent>
          </Box>
        </MessageItem>
      ))}
    </MessageWrapper>
  );
};

export default MessageList;