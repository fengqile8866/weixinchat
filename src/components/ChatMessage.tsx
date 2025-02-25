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
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0.5, 2),
  transition: 'all 0.2s ease'
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.2, 1.4),
  maxWidth: '280px',
  minWidth: '36px',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  borderRadius: '3px',
  boxShadow: 'none',
  fontSize: '16px',
  lineHeight: '1.4',
  letterSpacing: '0.2px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '12px',
    width: '6px',
    height: '6px',
    transform: 'rotate(45deg)'
  }
}));

const Avatar = styled('img')(() => ({
  width: '42px',
  height: '42px',
  borderRadius: '4px',
  marginRight: '10px',
  marginLeft: '10px',
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