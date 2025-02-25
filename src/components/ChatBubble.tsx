import React from 'react';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const BubbleContainer = styled(Box)<{ isRight: boolean }>(({ theme, isRight }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: isRight ? 'flex-end' : 'flex-start',
  padding: '4px 16px',
  position: 'relative',
  '&:hover .delete-button': {
    opacity: 1,
  },
  transition: 'all 0.2s ease',
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const Avatar = styled('img')({
  width: '42px',
  height: '42px',
  borderRadius: '3px',
  objectFit: 'cover',
  border: '1px solid rgba(0, 0, 0, 0.1)',
});

const MessageContent = styled(Box)<{ isRight: boolean }>(({ isRight }) => ({
  maxWidth: '60%',
  marginLeft: isRight ? '0' : '12px',
  marginRight: isRight ? '12px' : '0',
  position: 'relative',
}));

const Bubble = styled(Box)<{ isRight: boolean }>(({ isRight }) => ({
  backgroundColor: isRight ? '#95EC69' : '#fff',
  borderRadius: '3px',
  padding: '9px 13px',
  fontSize: '16px',
  lineHeight: '1.5',
  wordBreak: 'break-word',
  position: 'relative',
  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.08)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '14px',
    [isRight ? 'right' : 'left']: '-8px',
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: isRight ? '6px 8px 6px 0' : '6px 0 6px 8px',
    borderColor: isRight
      ? 'transparent #95EC69 transparent transparent'
      : 'transparent transparent transparent #fff',
    transform: isRight ? 'rotate(180deg)' : 'none',
  },
}));

const Timestamp = styled(Box)({
  fontSize: '12px',
  color: '#999',
  marginTop: '4px',
  textAlign: 'center',
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  padding: '4px',
  opacity: 0,
  transition: 'opacity 0.2s',
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
});

interface ChatBubbleProps {
  content: string;
  isRight: boolean;
  avatar: string;
  timestamp: string;
  onDelete?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  isRight,
  avatar,
  timestamp,
  onDelete,
}) => {
  return (
    <Box>
      <BubbleContainer isRight={isRight}>
        {!isRight && <Avatar src={avatar} alt="avatar" />}
        <MessageContent isRight={isRight}>
          <Bubble isRight={isRight}>{content}</Bubble>
          {onDelete && (
            <DeleteButton
              className="delete-button"
              size="small"
              onClick={onDelete}
            >
              <DeleteOutlineIcon />
            </DeleteButton>
          )}
        </MessageContent>
        {isRight && <Avatar src={avatar} alt="avatar" />}
      </BubbleContainer>
      <Timestamp>{timestamp}</Timestamp>
    </Box>
  );
};

export default ChatBubble;