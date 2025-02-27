import { useState } from 'react';
import { Box, Container, useTheme, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import MessageList from './components/MessageList';
import ChatContainer from './components/ChatContainer';
import ConfigPanel from './components/ConfigPanel';
import InputToolbar from './components/InputToolbar';
import { Message } from './types';
import PhoneHeader from './components/PhoneHeader';



const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
    transform: 'translateY(-2px)'
  }
}));

const AppContainer = styled(Box)({
  minHeight: '100vh',
  padding: '16px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const App = () => {
  const [leftNickname, setLeftNickname] = useState('上山下');
  const [rightNickname, setRightNickname] = useState('右侧昵称');
  const [leftAvatar, setLeftAvatar] = useState('');
  const [rightAvatar, setRightAvatar] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ebebeb');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: '你好啊！',
    isRight: false,
    timestamp: '12:01'
  }, {
    id: '2',
    content: '最近在忙什么呢？',
    isRight: true,
    timestamp: '12:02'
  }]);

  const handleExportMessages = async (type: 'json' | 'image' = 'json') => {
    if (type === 'json') {
      const exportData = JSON.stringify(messages, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        try {
          const canvas = await html2canvas(chatContainer);
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = `chat-screenshot-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (error) {
          console.error('截图失败:', error);
        }
      }
    }
  };

  const handleBatchGenerate = () => {
    const templates = [
      '好的，没问题',
      '我知道了',
      '稍等一下',
      '现在就去处理',
      '已经完成了',
      '收到',
      '正在路上',
      '马上到'
    ];
    
    const newMessages = Array(5).fill(null).map((_, index) => ({
      id: Date.now().toString() + index,
      content: templates[Math.floor(Math.random() * templates.length)],
      isRight: Math.random() > 0.5,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }));

    setMessages(prev => [...prev, ...newMessages]);
  };



  const theme = useTheme();

  return (
    <AppContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            height: '100vh',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            padding: '16px'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ height: '750px' }}
          >
            <GlassPaper
              sx={{
                height: '100%'
              }}
            >
              <ChatContainer
                backgroundColor={backgroundColor}
                backgroundImage={backgroundImage}
              >
                <Box
                  className="chat-container"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <PhoneHeader nickname={leftNickname} />
                  <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    <MessageList
                      messages={messages}
                      leftAvatar={leftAvatar}
                      rightAvatar={rightAvatar}
                      leftNickname={leftNickname}
                      rightNickname={rightNickname}
                    />
                  </Box>
                  <InputToolbar
                    onImageUpload={() => {}}
                    onEmojiSelect={() => {}}
                    onVoiceInput={() => {}}
                  />
                </Box>
              </ChatContainer>
            </GlassPaper>
          </motion.div>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              flex: 1,
              height: '750px',
              overflowY: 'auto',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              p: 3
            }}
          >
            <ConfigPanel
              messages={messages}
              onUpdateMessages={setMessages}
              onExportMessages={handleExportMessages}
              leftNickname={leftNickname}
              onLeftNicknameChange={setLeftNickname}
              rightNickname={rightNickname}
              onRightNicknameChange={setRightNickname}
              leftAvatar={leftAvatar}
              onLeftAvatarChange={setLeftAvatar}
              rightAvatar={rightAvatar}
              onRightAvatarChange={setRightAvatar}
              backgroundColor={backgroundColor}
              onBackgroundColorChange={setBackgroundColor}
              backgroundImage={backgroundImage}
              onBackgroundImageChange={setBackgroundImage}
              onBatchGenerate={handleBatchGenerate}
            />
          </Box>
        </Box>
      </motion.div>
    </AppContainer>
  );
};

export default App;