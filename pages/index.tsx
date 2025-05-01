import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import TrackList from '@/component/TrackListComponent';
import tracks from '@/data/tracks';
import MainLayout from '@/layouts/MainLayout';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '65vh',
  minHeight: 400,
  maxHeight: 700,
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(180deg, rgba(29,185,84,0.6) 0%, rgba(25,20,20,0.9) 100%), url(https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const StatsWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)',
  padding: theme.spacing(8, 0),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

function HomePage() {
  const theme = useTheme();
  const featuredTracks = tracks.filter((track: any) => track.popularity > 92).slice(0, 6);
  
  return (
    <MainLayout>
        <Box>
            <HeroSection>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <Typography 
                                variant="h1" 
                                component="h1" 
                                sx={{ 
                                fontWeight: 900, 
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                mb: 2
                                }}
                            >
                                Listen Without Limits
                            </Typography>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                mb: 4,
                                opacity: 0.9,
                                maxWidth: 600
                                }}
                            >
                                Stream millions of songs and podcasts on your device.
                            </Typography>
                            <Button 
                                variant="contained" 
                                size="large" 
                                sx={{ 
                                px: 4, 
                                py: 1.5,
                                fontSize: '1rem'
                                }}
                            >
                                Get Started
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>
        
            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <HeadphonesIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                                <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                                    Ad-Free Music
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Enjoy uninterrupted music streaming with no advertisements, allowing you to fully immerse in your favorite tracks.
                                </Typography>
                            </CardContent>
                        </FeatureCard>
                    </Grid>
                
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <LibraryMusicIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                                <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                                    Curated Playlists
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Discover new music with our expertly curated playlists designed to match every mood, activity, and genre preference.
                                </Typography>
                            </CardContent>
                        </FeatureCard>
                    </Grid>
                
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <AlbumIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                                <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                                    High Quality Audio
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Experience crystal clear sound quality with our premium audio streaming technology that brings out every detail.
                                </Typography>
                            </CardContent>
                        </FeatureCard>
                    </Grid>
                </Grid>
            </Container>
        
            <Box sx={{ py: 8 }}>
                <TrackList tracks={featuredTracks} title="Featured Tracks" />
            </Box>
        
            <StatsWrapper>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center" textAlign="center">
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                15M+
                            </Typography>
                            <Typography variant="h6">
                                Active Users
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                50M+
                            </Typography>
                            <Typography variant="h6">
                                Tracks Available
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h2" fontWeight={900} sx={{ mb: 1 }}>
                                100+
                            </Typography>
                            <Typography variant="h6">
                                Countries Served
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </StatsWrapper>
        
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                            Take Your Music Everywhere
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                            Listen on your phone, tablet, desktop, and more. Our platform is designed to seamlessly follow you wherever you go, ensuring your favorite tunes are always just a click away.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            With offline listening, you can download your music and take it with you even when there's no internet connection. Perfect for travel, commutes, or anywhere your day takes you.
                        </Typography>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            size="large" 
                            sx={{ mt: 2 }}
                        >
                            Learn More
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg"
                            alt="Person listening to music"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </MainLayout>
  );
}

export default HomePage;