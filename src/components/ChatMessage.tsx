import { Box, Paper, styled } from '@mui/material';
import defaultAvatar from '../assets/default-avatar.png';

interface ChatMessageProps {
  content: string;
  isRight: boolean;
  timestamp: string;
  avatar?: string;
}

const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(0.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    transform: 'translateY(-1px)'
  }
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.2, 1.8),
  maxWidth: '280px',
  minWidth: '40px',
  wordBreak: 'break-word',
  borderRadius: '12px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  fontSize: '15px',
  lineHeight: '1.5',
  letterSpacing: '0.2px',
  position: 'relative',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '14px',
    width: '8px',
    height: '8px',
    transform: 'rotate(45deg)',
    transition: 'all 0.2s ease'
  }
}));

const Avatar = styled('img')({
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  marginRight: '12px',
  marginLeft: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
  }
});

const Timestamp = styled('div')({
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.45)',
  marginTop: '6px',
  opacity: 0.9,
  fontWeight: '500',
  letterSpacing: '0.2px'
});

const ChatMessage = ({ content, isRight, timestamp, avatar }: ChatMessageProps) => {
  return (
    <MessageContainer sx={{ flexDirection: isRight ? 'row-reverse' : 'row' }}>
      <Avatar src={avatar || defaultAvatar} alt="avatar" />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isRight ? 'flex-end' : 'flex-start' }}>
        <MessageBubble 
          sx={{
            backgroundColor: isRight ? '#95EC69' : '#fff',
            '&::before': {
              [isRight ? 'right' : 'left']: '-3px',
              backgroundColor: isRight ? '#95EC69' : '#fff'
            }
          }}
        >
          {content}
        </MessageBubble>
        <Timestamp>{timestamp}</Timestamp>
      </Box>
    </MessageContainer>
  );
};

export default ChatMessage;