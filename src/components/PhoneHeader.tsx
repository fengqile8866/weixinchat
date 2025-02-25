import { Box, Typography, styled } from '@mui/material';
import { Wifi as WifiIcon } from '@mui/icons-material';
import { SignalCellularAlt as SignalCellularAltIcon } from '@mui/icons-material';
import { BatteryFull as BatteryFullIcon } from '@mui/icons-material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';

interface PhoneHeaderProps {
  nickname: string;
}

const StatusBar = styled(Box)(() => ({
  height: 24,
  backgroundColor: '#ededed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 12px',
  color: '#000',
  fontSize: 12,
  fontWeight: 500,
  '& .MuiSvgIcon-root': {
    fontSize: 14,
    color: '#000'
  },
  '& .battery-level': {
    marginLeft: 2,
    fontSize: 12
  }
}));

const ChatHeader = styled(Box)(() => ({
  height: 48,
  backgroundColor: '#EDEDED',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  position: 'relative',
  zIndex: 1,
  borderBottom: '1px solid #d6d6d6',
  '& .MuiSvgIcon-root': {
    color: '#000',
    fontSize: 24,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }
}));

const BackButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  left: '16px',
  cursor: 'pointer',
  color: '#000',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateX(-2px)'
  }
});

const PhoneHeader = ({ nickname }: PhoneHeaderProps) => {
  return (
    <Box>
      <StatusBar>
        <Box>09:41</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SignalCellularAltIcon />
          <WifiIcon />
          <BatteryFullIcon />
          <span className="battery-level">99%</span>
        </Box>
      </StatusBar>
      <ChatHeader>
        <BackButton>
          <ArrowBackIcon />
        </BackButton>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '17px', fontWeight: '500', color: '#000' }}>
            {nickname}
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', right: '16px', cursor: 'pointer' }}>
          <MoreHorizIcon />
        </Box>
      </ChatHeader>
    </Box>
  );
};

export default PhoneHeader;