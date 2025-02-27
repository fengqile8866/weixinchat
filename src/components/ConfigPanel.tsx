import { useState } from 'react';
import { Box, Button, TextField, Typography, styled, Accordion, AccordionSummary, AccordionDetails, Divider, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { motion } from 'framer-motion';
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

const AvatarUpload = styled(motion.div)({
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

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '8px',
  padding: '8px 16px',
  transition: 'all 0.2s ease',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    backgroundColor: theme.palette.primary.dark
  }
}));

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
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#333', mb: 2 }}>聊天配置</Typography>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 500 }}>用户信息</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>左侧头像</Typography>
              <AvatarUpload sx={{ width: 80, height: 80, mb: 1 }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleAvatarUpload(e, false)} id="left-avatar-upload" />
                <label htmlFor="left-avatar-upload" style={{ cursor: 'pointer', display: 'block', height: '100%' }}>
                  <img src={leftAvatar || defaultAvatar} alt="left avatar" />
                </label>
              </AvatarUpload>
              <TextField fullWidth value={leftNickname} onChange={(e) => onLeftNicknameChange(e.target.value)} size="small" label="左侧昵称" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>右侧头像</Typography>
              <AvatarUpload sx={{ width: 80, height: 80, mb: 1 }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleAvatarUpload(e, true)} id="right-avatar-upload" />
                <label htmlFor="right-avatar-upload" style={{ cursor: 'pointer', display: 'block', height: '100%' }}>
                  <img src={rightAvatar || defaultAvatar} alt="right avatar" />
                </label>
              </AvatarUpload>
              <TextField fullWidth value={rightNickname} onChange={(e) => onRightNicknameChange(e.target.value)} size="small" label="右侧昵称" />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 500 }}>消息管理</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MessageInput
            fullWidth
            multiline
            rows={3}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="输入消息内容"
            label="消息内容"
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 2 }}>
            <StyledButton
              variant="contained"
              onClick={() => setIsRight(!isRight)}
              sx={{ flex: 1, bgcolor: '#07C160', '&:hover': { bgcolor: '#06AE56' } }}
              size="small"
            >
              {isRight ? '切换到左侧' : '切换到右侧'}
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={handleAddMessage}
              disabled={!messageContent.trim()}
              sx={{ flex: 1, bgcolor: '#07C160', '&:hover': { bgcolor: '#06AE56' } }}
              size="small"
            >
              添加消息
            </StyledButton>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 500 }}>背景设置</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>背景颜色</Typography>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                style={{
                  width: '100%',
                  height: '32px',
                  padding: 0,
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>背景图片</Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                size="small"
                sx={{ height: '32px' }}
              >
                {backgroundImage ? '更换背景' : '上传背景'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleBackgroundUpload}
                />
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <StyledButton
          variant="outlined"
          onClick={onBatchGenerate}
          sx={{ flex: 1, borderColor: '#07C160', color: '#07C160', '&:hover': { borderColor: '#06AE56', color: '#06AE56' } }}
          size="small"
        >
          批量生成
        </StyledButton>
        <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
          <StyledButton
            variant="outlined"
            onClick={() => onExportMessages('json')}
            sx={{ flex: 1, borderColor: '#07C160', color: '#07C160', '&:hover': { borderColor: '#06AE56', color: '#06AE56' } }}
            size="small"
          >
            导出JSON
          </StyledButton>
          <StyledButton
            variant="outlined"
            onClick={() => onExportMessages('image')}
            sx={{ flex: 1, borderColor: '#07C160', color: '#07C160', '&:hover': { borderColor: '#06AE56', color: '#06AE56' } }}
            size="small"
          >
            导出截图
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigPanel;