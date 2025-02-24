import { useState } from 'react';
import { Box, Container, Paper, styled } from '@mui/material';
import ConfigPanel from './components/ConfigPanel';
import ChatMessage from './components/ChatMessage';
import PhoneHeader from './components/PhoneHeader';
import ChatInput from './components/ChatInput';

interface ChatContainerProps {
  backgroundImage?: string;
  backgroundColor?: string;
}

const ChatContainer = styled(Paper)<ChatContainerProps>(({ theme, backgroundImage, backgroundColor }) => ({
  height: '750px',
  width: '375px',
  margin: '0 auto',
  overflowY: 'auto',
  backgroundColor: backgroundColor || '#EBEBEB',
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#C1C1C1',
    borderRadius: '3px',
    '&:hover': {
      background: '#A8A8A8'
    }
  }
}));

const ConfigContainer = styled(Box)({
  width: '300px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.12)'
});

const App = () => {
  const [leftNickname, setLeftNickname] = useState('一米阳光');
  const [rightNickname, setRightNickname] = useState('微信好友');
  const [leftAvatar, setLeftAvatar] = useState('');
  const [rightAvatar, setRightAvatar] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#EBEBEB');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: number;
    content: string;
    isRight: boolean;
    timestamp: string;
  }>>([{
    id: 1,
    content: '你好！欢迎使用微信聊天生成器',
    isRight: false,
    timestamp: '10:00'
  }, {
    id: 2,
    content: '谢谢，这个工具很实用',
    isRight: true,
    timestamp: '10:01'
  }]);

  const handleExportMessages = () => {
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

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now(),
      content,
      isRight: false,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3, minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
        <Box sx={{ flex: '0 1 auto', position: 'relative' }}>
          <ChatContainer backgroundColor={backgroundColor} backgroundImage={backgroundImage}>
            <PhoneHeader nickname={leftNickname} />
            <Box sx={{ p: 2, height: 'calc(100% - 130px)', overflowY: 'auto' }}>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isRight={message.isRight}
                  timestamp={message.timestamp}
                  avatar={message.isRight ? rightAvatar : leftAvatar}
                />
              ))}
            </Box>
            <ChatInput onSendMessage={handleSendMessage} />
          </ChatContainer>
        </Box>
        <ConfigContainer>
          <ConfigPanel
            leftNickname={leftNickname}
            rightNickname={rightNickname}
            leftAvatar={leftAvatar}
            rightAvatar={rightAvatar}
            backgroundColor={backgroundColor}
            backgroundImage={backgroundImage}
            onUpdateMessages={setMessages}
            onExportMessages={handleExportMessages}
            onLeftNicknameChange={(name) => setLeftNickname(name)}
            onRightNicknameChange={(name) => setRightNickname(name)}
            onLeftAvatarChange={(avatar) => setLeftAvatar(avatar)}
            onRightAvatarChange={(avatar) => setRightAvatar(avatar)}
            onBackgroundColorChange={setBackgroundColor}
            onBackgroundImageChange={setBackgroundImage}
            onBatchGenerate={handleBatchGenerate}
          />
        </ConfigContainer>
      </Box>
    </Container>
  );
};

export default App;