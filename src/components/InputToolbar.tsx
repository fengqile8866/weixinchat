import { Box, IconButton, InputBase, styled } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';

interface InputToolbarProps {
  onImageUpload?: () => void;
}

const InputContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: '#f6f6f6',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  position: 'relative',
  minHeight: '52px'
}));

const InputWrapper = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  padding: '8px 12px',
  margin: '0 8px',
  border: '1px solid #ddd',
  '&:focus-within': {
    borderColor: '#07C160'
  }
}));

const StyledInput = styled(InputBase)(() => ({
  flex: 1,
  padding: 0,
  fontSize: '16px',
  '& input': {
    padding: 0
  },
  '& input::placeholder': {
    color: '#999',
    fontSize: '15px'
  }
}));

const ActionButton = styled(IconButton)(() => ({
  padding: '8px',
  color: '#7d7d7d',
  '&:hover': {
    color: '#07C160'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '24px'
  }
}));

const InputToolbar = ({ onImageUpload }: InputToolbarProps) => {
  return (
    <InputContainer>
      <InputWrapper>
        <StyledInput
          fullWidth
          placeholder="发送消息"
        />
      </InputWrapper>
      <ActionButton onClick={onImageUpload}>
        <ImageIcon />
      </ActionButton>
    </InputContainer>
  );
};

export default InputToolbar;