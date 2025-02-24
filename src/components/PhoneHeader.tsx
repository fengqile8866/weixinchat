import { Box, Typography, styled } from '@mui/material';
import { Wifi as WifiIcon } from '@mui/icons-material';
import { SignalCellularAlt as SignalCellularAltIcon } from '@mui/icons-material';
import { BatteryFull as BatteryFullIcon } from '@mui/icons-material';

interface PhoneHeaderProps {
  nickname: string;
}

const StatusBar = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 16px',
  backgroundColor: 'rgba(245, 245, 245, 0.95)',
  backdropFilter: 'blur(10px)',
  fontSize: '14px',
  color: '#1a1a1a',
  '& .MuiSvgIcon-root': {
    fontSize: '18px',
    color: '#1a1a1a'
  }
}));

const ChatHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: 'rgba(245, 245, 245, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  position: 'relative',
  transition: 'all 0.3s ease'
}));

const BackButton = styled(Box)({
  position: 'absolute',
  left: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  color: '#07C160',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateX(-2px)'
  },
  '&::before': {
    content: '"<"',
    marginRight: '4px',
    fontSize: '18px',
    fontWeight: 'bold'
  }
});

const PhoneHeader = ({ nickname }: PhoneHeaderProps) => {
  return (
    <Box>
      <StatusBar>
        <Box>09:41</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SignalCellularAltIcon sx={{ fontSize: 16 }} />
          <WifiIcon sx={{ fontSize: 16 }} />
          <BatteryFullIcon sx={{ fontSize: 16 }} />
        </Box>
      </StatusBar>
      <ChatHeader>
        <BackButton>3</BackButton>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '17px', fontWeight: '500' }}>
            {nickname}
          </Typography>
        </Box>
      </ChatHeader>
    </Box>
  );
};

export default PhoneHeader;