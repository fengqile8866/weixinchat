import { useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImageIcon from '@mui/icons-material/Image';

interface InputToolbarProps {
  onImageUpload: (file: File) => void;
  onEmojiSelect: (emoji: string) => void;
  onVoiceInput: () => void;
}

const InputField = styled('input')({
  backgroundColor: '#fff',
  flex: 1,
  margin: '0 8px',
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  outline: 'none',
  fontSize: '14px',
  '&:focus': {
    borderColor: '#07C160'
  }
});

const ToolbarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #e0e0e0',
  minHeight: '50px',
  position: 'relative'
});

const StyledIconButton = styled(IconButton)({
  color: '#7d7d7d',
  padding: '8px',
  '&:hover': {
    color: '#07C160',
    backgroundColor: 'rgba(7, 193, 96, 0.04)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '24px'
  }
});

const EmojiPanel = styled(Box)({
  position: 'absolute',
  width: '320px',
  bottom: '100%',
  left: 0,
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '12px',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gap: '8px',
  maxHeight: '240px',
  overflowY: 'auto',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '3px'
  }
});

const EmojiButton = styled(Box)({
  cursor: 'pointer',
  fontSize: '24px',
  padding: '4px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderRadius: '4px'
  }
});

const commonEmojis = ['😊', '😂', '🤣', '❤️', '😍', '🤔', '👍', '🎉', '🌹', '🔥', '😭', '😘', '🥰', '😅', '😉', '🤗'];

const InputToolbar = ({ onImageUpload, onEmojiSelect, onVoiceInput }: InputToolbarProps) => {
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  return (
    <ToolbarContainer>
      <StyledIconButton onClick={onVoiceInput}>
        <MicIcon />
      </StyledIconButton>
      <InputField
        type="text"
        placeholder="发送消息"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Box sx={{ position: 'relative' }}>
        <StyledIconButton onClick={() => setShowEmojiPanel(!showEmojiPanel)}>
          <InsertEmoticonIcon />
        </StyledIconButton>
        {showEmojiPanel && (
          <EmojiPanel>
            {commonEmojis.map((emoji, index) => (
              <EmojiButton
                key={index}
                onClick={() => {
                  onEmojiSelect(emoji);
                  setShowEmojiPanel(false);
                }}
              >
                {emoji}
              </EmojiButton>
            ))}
          </EmojiPanel>
        )}
      </Box>
      <StyledIconButton component="label">
        <ImageIcon />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </StyledIconButton>
    </ToolbarContainer>
  );
};

export default InputToolbar;