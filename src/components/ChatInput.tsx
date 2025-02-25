import { Box, IconButton, InputBase, styled } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';

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

interface ChatInputProps {
  onSendMessage: (message: {
    content: string;
    type: 'text' | 'image' | 'emoji';
    imageUrl?: string;
    emojiId?: string;
  }) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onSendMessage({
          content: file.name,
          type: 'image',
          imageUrl: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage({
        content: inputValue.trim(),
        type: 'text'
      });
      setInputValue('');
    }
  };

  return (
    <InputContainer>
      <ActionButton className="voice-btn">
        <MicIcon />
      </ActionButton>
      <InputWrapper>
        <StyledInput
          fullWidth
          placeholder="发送消息"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </InputWrapper>
      <ActionButton onClick={() => fileInputRef.current?.click()}>
        <ImageIcon />
      </ActionButton>
      <ActionButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <InsertEmoticonIcon />
      </ActionButton>
      <ActionButton>
        <AddCircleIcon />
      </ActionButton>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </InputContainer>
  );
};

export default ChatInput;