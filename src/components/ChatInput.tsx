import { Box, IconButton, InputBase, styled } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const InputContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #e0e0e0'
}));

const InputWrapper = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  padding: '8px 12px',
  margin: '0 10px'
}));

const StyledInput = styled(InputBase)(() => ({
  flex: 1,
  padding: 0
}));

const ActionButton = styled(IconButton)(() => ({
  padding: '8px'
}));

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  return (
    <InputContainer>
      <ActionButton className="voice-btn" sx={{ mr: 1 }}>
        <MicIcon />
      </ActionButton>
      <InputWrapper>
        <StyledInput
          placeholder="发送消息"
          onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const content = (e.target as HTMLInputElement).value.trim();
            if (content) {
              onSendMessage(content);
              (e.target as HTMLInputElement).value = '';
            }
          }
        }}
      />
      </InputWrapper>
      <ActionButton sx={{ ml: 1 }}>
        <InsertEmoticonIcon />
      </ActionButton>
      <ActionButton>
        <AddCircleIcon />
      </ActionButton>
    </InputContainer>
  );
};

export default ChatInput;