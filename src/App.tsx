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
  background: 'transparent',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  padding: '0',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const PhoneScreen = styled(Box)({
  background: '#fff',
  overflow: 'hidden',
  height: '100%',
  position: 'relative'
});

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '你好啊！',
      isRight: false,
      timestamp: '12:01'
    }, 
    {
      id: 2,
      content: '最近在忙什么呢？',
      isRight: true,
      timestamp: '12:02'
    }
  ]);

  const handleExportMessages = async (type: 'json' | 'image' = 'json') => {
    try {
      if (type === 'json') {
        const exportData = JSON.stringify({
          messages,
          leftNickname,
          rightNickname,
          leftAvatar,
          rightAvatar,
          backgroundColor,
          backgroundImage
        }, null, 2);
        const blob = new Blob([exportData], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      } else {
        const phoneContainer = document.querySelector('.MuiPaper-root');
        if (!phoneContainer) {
          throw new Error('聊天容器不存在');
        }

        // 临时调整容器样式以确保完整捕获
        const originalStyle = phoneContainer.style.cssText;
        const originalHeight = phoneContainer.style.height;
        const originalPosition = phoneContainer.style.position;
        const originalOverflow = phoneContainer.style.overflow;

        // 设置临时样式
        phoneContainer.style.height = 'auto';
        phoneContainer.style.position = 'relative';
        phoneContainer.style.overflow = 'visible';

        const canvas = await html2canvas(phoneContainer as HTMLElement, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: 'transparent',
          scale: 2,
          logging: false,
          windowWidth: phoneContainer.scrollWidth,
          windowHeight: phoneContainer.scrollHeight,
          width: phoneContainer.scrollWidth,
          height: phoneContainer.scrollHeight,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          onclone: (clonedDoc) => {
            const clonedContainer = clonedDoc.querySelector('.MuiPaper-root');
            if (clonedContainer) {
              (clonedContainer as HTMLElement).style.height = 'auto';
              (clonedContainer as HTMLElement).style.position = 'relative';
              (clonedContainer as HTMLElement).style.overflow = 'visible';
            }
          }
        });

        // 恢复原始样式
        phoneContainer.style.height = originalHeight;
        phoneContainer.style.position = originalPosition;
        phoneContainer.style.overflow = originalOverflow;

        canvas.toBlob((blob) => {
          if (!blob) {
            throw new Error('生成图片失败');
          }
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `chat-screenshot-${new Date().toISOString().split('T')[0]}.png`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }, 'image/png', 1.0);
      }
    } catch (error: any) {
      console.error('导出失败:', error);
      alert(`导出失败: ${error.message}`);
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
      id: Date.now() + index,
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
              <PhoneScreen>
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
              </PhoneScreen>
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