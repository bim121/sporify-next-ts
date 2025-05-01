import React from 'react';
import { 
  Grid, 
  Box, 
  Container,
  Typography
} from '@mui/material';
import TrackCard from './TrackCard';

function TrackList({ tracks, title }: any) {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {title && (
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              mb: 3 
            }}
          >
            {title}
          </Typography>
        )}
        
        <Grid container spacing={3}>
          {tracks.map((track: any) => (
            <Grid item key={track.id} xs={6} sm={4} md={3} lg={2.4}>
              <TrackCard track={track} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default TrackList;