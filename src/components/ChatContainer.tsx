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
  height: 667,
  backgroundColor: '#f7f7f7',
  position: 'relative',
  borderRadius: 32,
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
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
  opacity: 0.6,
  zIndex: 0
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
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
        <TitleBar>
          <div className="back">
            <span>⬅️</span>
            <span>3</span>
          </div>
          <div className="title">一米阳光</div>
          <div className="more">⋮</div>
        </TitleBar>
        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {backgroundImage && <BackgroundLayer bgImage={backgroundImage} />}
          {children}
        </Box>
      </ContentLayer>
    </Container>
  );
};

export default ChatContainer;