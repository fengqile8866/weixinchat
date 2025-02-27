import { Box, styled } from '@mui/material';
import { ReactNode } from 'react';

interface ChatContainerProps {
  children: ReactNode;
  backgroundColor: string;
  backgroundImage: string;
}

const StatusBar = styled(Box)(() => ({
  height: 32,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  color: '#000',
  fontSize: '14px',
  fontWeight: 500,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  '& .time': {
    marginLeft: 4
  },
  '& .right': {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  }
}));

const TitleBar = styled(Box)(() => ({
  height: 44,
  backgroundColor: '#ededed',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  position: 'relative',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  '& .back': {
    fontSize: '16px',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  '& .title': {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '17px',
    fontWeight: 500
  },
  '& .more': {
    position: 'absolute',
    right: 12,
    fontSize: '20px'
  }
}));

const Container = styled(Box)(({ theme }) => ({
  width: 375,
  height: 750,  // 修改为宽度的2倍，实现2:1的比例
  backgroundColor: '#f7f7f7',
  position: 'relative',
  borderRadius: 32,
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  transition: 'all 0.3s ease-in-out'
}));

const BackgroundLayer = styled(Box)<{ bgImage: string }>(({ bgImage }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: bgImage ? `url(${bgImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.8,
  zIndex: -1
}));

const ContentLayer = styled(Box)(() => ({
  height: '100%',
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  '& > *:last-child': {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent'
  }
}));

const ChatContainer = ({ children, backgroundColor, backgroundImage }: ChatContainerProps) => {
  return (
    <Container>
      <ContentLayer
        sx={{
          backgroundColor: backgroundColor || '#ebebeb'
        }}
      >
        <StatusBar>
          <span className="time">09:04</span>
          <div className="right">
            <span>👁️</span>
            <span>📶</span>
            <span>🔋 99%</span>
          </div>
        </StatusBar>

        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {backgroundImage && <BackgroundLayer bgImage={backgroundImage} />}
          {children}
        </Box>
      </ContentLayer>
    </Container>
  );
};

export default ChatContainer;