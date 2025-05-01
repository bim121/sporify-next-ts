import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid
} from '@mui/material';
import { AudioPlayer } from '../AudioPlayer';

function Footer() {
  return (
    <Box 
        sx={{
            backgroundColor: (theme) => theme.palette.grey[900],
            color: (theme) => theme.palette.grey[300],
        }}
    > 
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Company
                    </Typography>
                    <Typography variant="body2" paragraph>
                        About
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Jobs
                    </Typography>
                    <Typography variant="body2" paragraph>
                        For the Record
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Communities
                    </Typography>
                    <Typography variant="body2" paragraph>
                        For Artists
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Developers
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Advertising
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Legal
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Privacy Center
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Privacy Policy
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Cookies
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="body2" color="white" align="center">
                    © 2025 MiniSpotify. All rights reserved.
                </Typography>
            </Box>
        </Container>
      
        <AudioPlayer />
    </Box>
  );
}

export default Footer;