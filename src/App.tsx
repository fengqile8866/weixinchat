import { useState } from 'react';
import { Box, Container } from '@mui/material';
import MessageList from './components/MessageList';
import ChatContainer from './components/ChatContainer';
import ConfigPanel from './components/ConfigPanel';
import InputToolbar from './components/InputToolbar';
import { Message } from './types';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好啊！',
      isRight: false,
      timestamp: '12:01'
    },
    {
      id: '2',
      content: '最近在忙什么呢？',
      isRight: true,
      timestamp: '12:02'
    }
  ]);
  const [leftNickname, setLeftNickname] = useState('上山下');
  const [rightNickname, setRightNickname] = useState('右侧昵称');
  const [leftAvatar, setLeftAvatar] = useState('');
  const [rightAvatar, setRightAvatar] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ebebeb');
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleExportMessages = () => {
    // TODO: 实现导出消息功能
    console.log('导出消息');
  };

  const handleBatchGenerate = () => {
    // TODO: 实现批量生成消息功能
    console.log('批量生成消息');
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const newMessage = {
          id: Date.now().toString(),
          content: e.target.result as string,
          isRight: true,
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          type: 'image'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEmojiSelect = (emoji: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: emoji,
      isRight: true,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      type: 'emoji'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'zh-CN';

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        const newMessage = {
          id: Date.now().toString(),
          content: text,
          isRight: true,
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMessage]);
      };

      recognition.start();
    } else {
      alert('您的浏览器不支持语音输入功能');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100%', py: 3 }}>
      <Box sx={{
        display: 'flex',
        gap: 4,
        height: '100%',
        alignItems: 'flex-start'
      }}>
        <ChatContainer
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              onImageUpload={handleImageUpload}
              onEmojiSelect={handleEmojiSelect}
              onVoiceInput={handleVoiceInput}
            />
          </Box>
        </ChatContainer>
        <Box sx={{ flex: 1 }}>
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
    </Container>
  );
};

export default App;