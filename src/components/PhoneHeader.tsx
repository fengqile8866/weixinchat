import { Box, Typography, styled } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';

interface PhoneHeaderProps {
  nickname: string;
}

const ChatHeader = styled(Box)(() => ({
  height: 48,
  backgroundColor: '#f7f7f7',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
  position: 'relative',
  zIndex: 1,
  borderBottom: '1px solid #e6e6e6',
  '& .MuiSvgIcon-root': {
    color: '#000',
    fontSize: 22,
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
    <ChatHeader>
      <BackButton>
        <ArrowBackIcon />
      </BackButton>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: '18px', fontWeight: '400', color: '#000' }}>
          {nickname}
        </Typography>
      </Box>
      <Box sx={{ position: 'absolute', right: '16px', cursor: 'pointer' }}>
        <MoreHorizIcon />
      </Box>
    </ChatHeader>
  );
};

export default PhoneHeader;