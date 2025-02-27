import { useState } from 'react';
import { Box, Button, TextField, Typography, styled, Accordion, AccordionSummary, AccordionDetails, Divider, IconButton, Tooltip, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import defaultAvatar from '../assets/default-avatar.png';
import { Message, ChatConfig } from '../types';

interface ConfigPanelProps extends ChatConfig {
  messages: Message[];
  onUpdateMessages: (updater: (prevMessages: Message[]) => Message[]) => void;
  onExportMessages: (type: 'json' | 'image') => void;
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

const MessageItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2]
  }
}));

const ConfigPanel = ({ 
  messages, 
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
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

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

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (messageContent.trim()) {
      onUpdateMessages(prev => [...prev, {
        id: Date.now(),
        content: messageContent.trim(),
        isRight,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessageContent('');
    }
  };

  const handleDeleteMessage = (id: number) => {
    onUpdateMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const startEditMessage = (id: number, content: string) => {
    setEditingMessageId(id);
    setEditingContent(content);
  };

  const handleEditMessage = () => {
    if (editingMessageId !== null && editingContent.trim()) {
      onUpdateMessages(prev => prev.map(msg => 
        msg.id === editingMessageId ? { ...msg, content: editingContent.trim() } : msg
      ));
      setEditingMessageId(null);
      setEditingContent('');
    }
  };

  const cancelEditMessage = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        微信聊天生成器
      </Typography>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 500 }}>基本设置</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>左侧用户昵称</Typography>
            <TextField 
              fullWidth 
              size="small" 
              value={leftNickname}
              onChange={(e) => onLeftNicknameChange(e.target.value)}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>右侧用户昵称</Typography>
            <TextField 
              fullWidth 
              size="small" 
              value={rightNickname}
              onChange={(e) => onRightNicknameChange(e.target.value)}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>左侧头像</Typography>
              <input
                accept="image/*"
                id="left-avatar-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handleAvatarUpload(e, false)}
              />
              <label htmlFor="left-avatar-upload">
                <AvatarUpload whileHover={{ scale: 1.05 }}>
                  <img src={leftAvatar || defaultAvatar} alt="左侧头像" />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}
                  >
                    点击更换
                  </Box>
                </AvatarUpload>
              </label>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>右侧头像</Typography>
              <input
                accept="image/*"
                id="right-avatar-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handleAvatarUpload(e, true)}
              />
              <label htmlFor="right-avatar-upload">
                <AvatarUpload whileHover={{ scale: 1.05 }}>
                  <img src={rightAvatar || defaultAvatar} alt="右侧头像" />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      padding: '4px',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}
                  >
                    点击更换
                  </Box>
                </AvatarUpload>
              </label>
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>背景颜色</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
              />
              <TextField 
                size="small" 
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                sx={{ width: '120px' }}
              />
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>背景图片</Typography>
            <input
              accept="image/*"
              id="background-image-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleBackgroundImageUpload}
            />
            <label htmlFor="background-image-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{ textTransform: 'none' }}
              >
                {backgroundImage ? '更换背景图片' : '上传背景图片'}
              </Button>
            </label>
            {backgroundImage && (
              <Button 
                variant="text" 
                color="error" 
                size="small"
                onClick={() => onBackgroundImageChange('')}
                sx={{ ml: 1, textTransform: 'none' }}
              >
                移除
              </Button>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 500 }}>消息管理</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>添加新消息</Typography>
            <MessageInput
              fullWidth
              multiline
              rows={2}
              placeholder="输入消息内容"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              variant="outlined"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Button
                  variant="outlined"
                  color={isRight ? 'primary' : 'inherit'}
                  onClick={() => setIsRight(true)}
                  sx={{ mr: 1, textTransform: 'none' }}
                >
                  右侧发送
                </Button>
                <Button
                  variant="outlined"
                  color={!isRight ? 'primary' : 'inherit'}
                  onClick={() => setIsRight(false)}
                  sx={{ textTransform: 'none' }}
                >
                  左侧发送
                </Button>
              </Box>
              <Button
                variant="contained"
                onClick={handleAddMessage}
                disabled={!messageContent.trim()}
                sx={{ textTransform: 'none' }}
              >
                添加消息
              </Button>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>批量操作</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <StyledButton
                variant="contained"
                onClick={onBatchGenerate}
              >
                批量生成随机消息
              </StyledButton>
              <StyledButton
                variant="outlined"
                onClick={() => onUpdateMessages(() => [])}
              >
                清空所有消息
              </StyledButton>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>消息列表</Typography>
            {messages.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 2, textAlign: 'center' }}>
                暂无消息，请添加新消息或批量生成
              </Typography>
            ) : (
              messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{ mb: 1 }}
                >
                  <MessageItem>
                    {editingMessageId === msg.id ? (
                      <Box>
                        <TextField
                          fullWidth
                          multiline
                          size="small"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          sx={{ mb: 1 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <IconButton size="small" onClick={handleEditMessage} color="primary">
                            <CheckIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={cancelEditMessage}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {msg.isRight ? rightNickname : leftNickname} · {msg.timestamp}
                          </Typography>
                          <Box>
                            <Tooltip title="编辑">
                              <IconButton size="small" onClick={() => startEditMessage(msg.id, msg.content)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="删除">
                              <IconButton size="small" color="error" onClick={() => handleDeleteMessage(msg.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Typography variant="body2">{msg.content}</Typography>
                      </Box>
                    )}
                  </MessageItem>
                </Box>
              ))
            )}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>导出</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <StyledButton
                variant="contained"
                onClick={() => onExportMessages('image')}
                disabled={messages.length === 0}
              >
                导出为图片
              </StyledButton>
              <StyledButton
                variant="outlined"
                onClick={() => onExportMessages('json')}
                disabled={messages.length === 0}
              >
                导出为JSON
              </StyledButton>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ConfigPanel;