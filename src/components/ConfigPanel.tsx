import { useState } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import defaultAvatar from '../assets/default-avatar.png';
import { Message, ChatConfig } from '../types';

interface ConfigPanelProps extends ChatConfig {
  onUpdateMessages: (updater: (prevMessages: Message[]) => Message[]) => void;
  onExportMessages: () => void;
  onLeftNicknameChange: (name: string) => void;
  onRightNicknameChange: (name: string) => void;
  onLeftAvatarChange: (avatar: string) => void;
  onRightAvatarChange: (avatar: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onBackgroundImageChange: (image: string) => void;
  onBatchGenerate: () => void;
}

const AvatarUpload = styled(Box)({
  cursor: 'pointer',
  width: '100px',
  height: '100px',
  position: 'relative',
  marginBottom: '16px',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)'
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
});

const MessageInput = styled(TextField)({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.01)'
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.05)'
    }
  }
});

const ConfigPanel = ({ 
  onUpdateMessages, 
  onExportMessages,
  leftNickname,
  onLeftNicknameChange,
  rightNickname,
  onRightNicknameChange,
  leftAvatar,
  onLeftAvatarChange,
  rightAvatar,
  onRightAvatarChange,
  backgroundColor,
  onBackgroundColorChange,
  backgroundImage,
  onBackgroundImageChange,
  onBatchGenerate
}: ConfigPanelProps) => {
  const [messageContent, setMessageContent] = useState('');
  const [isRight, setIsRight] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>, isRight: boolean) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isRight) {
          onRightAvatarChange(e.target?.result as string);
        } else {
          onLeftAvatarChange(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onBackgroundImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMessage = () => {
    if (!messageContent.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: messageContent,
      isRight,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    onUpdateMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageContent('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>聊天配置</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mt: 2 }}>左侧头像</Typography>
          <AvatarUpload>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleAvatarUpload(e, false)}
              id="left-avatar-upload"
            />
            <label htmlFor="left-avatar-upload" style={{ cursor: 'pointer', display: 'block', height: '100%' }}>
              <img src={leftAvatar || defaultAvatar} alt="left avatar" />
            </label>
          </AvatarUpload>

          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>左侧昵称</Typography>
          <TextField
            fullWidth
            value={leftNickname}
            onChange={(e) => onLeftNicknameChange(e.target.value)}
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mt: 2 }}>右侧头像</Typography>
          <AvatarUpload>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleAvatarUpload(e, true)}
              id="right-avatar-upload"
            />
            <label htmlFor="right-avatar-upload" style={{ cursor: 'pointer', display: 'block', height: '100%' }}>
              <img src={rightAvatar || defaultAvatar} alt="right avatar" />
            </label>
          </AvatarUpload>

          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>右侧昵称</Typography>
          <TextField
            fullWidth
            value={rightNickname}
            onChange={(e) => onRightNicknameChange(e.target.value)}
            margin="normal"
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>添加消息</Typography>
      <MessageInput
        fullWidth
        multiline
        rows={4}
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="输入消息内容"
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>聊天背景</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#666' }}>背景颜色</Typography>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                padding: 0,
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#666' }}>背景图片</Typography>
            <AvatarUpload sx={{ width: '100%', height: '40px', borderRadius: '4px' }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleBackgroundUpload}
                id="background-upload"
              />
              <label htmlFor="background-upload" style={{ cursor: 'pointer', display: 'block', height: '100%', width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    color: '#666',
                    fontSize: '14px'
                  }}
                >
                  {backgroundImage ? '更换背景图片' : '上传背景图片'}
                </Box>
              </label>
            </AvatarUpload>
          </Box>
        </Box>
        {backgroundImage && (
          <Box sx={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', mb: 2 }}>
            <img src={backgroundImage} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <StyledButton
            variant="contained"
            onClick={() => setIsRight(!isRight)}
            sx={{ flex: 1, bgcolor: '#07C160', '&:hover': { bgcolor: '#06AE56' } }}
          >
            {isRight ? '切换到左侧' : '切换到右侧'}
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleAddMessage}
            disabled={!messageContent.trim()}
            sx={{ flex: 1, bgcolor: '#07C160', '&:hover': { bgcolor: '#06AE56' } }}
          >
            添加消息
          </StyledButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
          <StyledButton
            variant="outlined"
            onClick={onBatchGenerate}
            fullWidth
            sx={{ borderColor: '#07C160', color: '#07C160', '&:hover': { borderColor: '#06AE56', color: '#06AE56' } }}
          >
            批量生成消息
          </StyledButton>
          <StyledButton
            variant="outlined"
            onClick={onExportMessages}
            fullWidth
            sx={{ borderColor: '#07C160', color: '#07C160', '&:hover': { borderColor: '#06AE56', color: '#06AE56' } }}
          >
            导出消息
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigPanel;