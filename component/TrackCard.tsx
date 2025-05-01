import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: theme.palette.background.paper,
    '& .MuiCardMedia-root': {
      opacity: 0.7,
    },
    '& .play-button': {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },
}));


function TrackCard({ track }: any) {
  return (
    <StyledCard>
      <Box sx={{ position: 'relative', pt: '100%' }}>
        <CardMedia
          component="img"
          image={track.image}
          alt={track.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" component="div" noWrap fontWeight={600}>
          {track.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {track.artist}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

export default TrackCard;