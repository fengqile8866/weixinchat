import { Box, Paper, styled } from '@mui/material';
import defaultAvatar from '../assets/default-avatar.png';

interface ChatMessageProps {
  content: string;
  isRight: boolean;
  timestamp: string;
  avatar?: string;
  type?: 'text' | 'image' | 'emoji';
  imageUrl?: string;
  emojiId?: string;
}

const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0.5, 1.5),
  transition: 'all 0.2s ease'
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 1.2),
  maxWidth: '280px',
  minWidth: '36px',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  borderRadius: '4px',
  boxShadow: 'none',
  fontSize: '17px',
  lineHeight: '1.4',
  letterSpacing: '0.3px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '14px',
    width: '8px',
    height: '8px',
    transform: 'rotate(45deg)'
  }
}));

const Avatar = styled('img')(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '3px',
  margin: '0 4px',
  objectFit: 'cover'
}));

const Timestamp = styled('div')(() => ({
  fontSize: '14px',
  color: '#999',
  marginTop: '4px',
  fontWeight: '400',
  padding: '0 2px'
}));

const ChatMessage = ({ content, isRight, timestamp, avatar, type = 'text', imageUrl, emojiId }: ChatMessageProps) => {
  return (
    <MessageContainer sx={{ flexDirection: isRight ? 'row-reverse' : 'row' }}>
      <Avatar src={avatar || defaultAvatar} alt="avatar" />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isRight ? 'flex-end' : 'flex-start' }}>
        <MessageBubble 
          sx={{
            backgroundColor: isRight ? '#95EC69' : '#fff',
            border: isRight ? 'none' : '1px solid #E7E7E7',
            '&::before': {
              [isRight ? 'right' : 'left']: '-4px',
              backgroundColor: isRight ? '#95EC69' : '#fff'
            }
          }}
        >
          {type === 'image' ? (
            <Box
              component="img"
              src={imageUrl}
              alt="图片消息"
              sx={{
                maxWidth: '200px',
                maxHeight: '200px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            />
          ) : type === 'emoji' ? (
            <Box sx={{ fontSize: '24px' }}>{content}</Box>
          ) : (
            content
          )}
        </MessageBubble>
        <Timestamp>{timestamp}</Timestamp>
      </Box>
    </MessageContainer>
  );
};

export default ChatMessage;