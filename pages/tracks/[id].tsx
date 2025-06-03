import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Chip,
  IconButton,
  Divider,
  Button,
  Stack
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import comments from '@/data/comments';
import CommentForm from '@/component/CommentForm';
import CommentList from '@/component/CommentList';
import { ITrack } from '@/types/track';
import { useFetcher } from '@/hooks/useFetch';
import { fetchTracks } from '@/store/actions-creators/track';
import { useTypedSelector } from '@/hooks/useTypeSelector';
import MainLayout from '@/layouts/MainLayout';
import { Comment } from "@/types/comment";
import { useActions } from '@/hooks/useAction';
import { getSession, useSession } from 'next-auth/react';
import AddToPlaylistDialog from '@/component/AddToPlaylistDialog';
import axios from 'axios';

function TrackDetailPage() {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  useFetcher(fetchTracks);
  const {tracks} = useTypedSelector(state => state.track)
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const { active, pause } = useTypedSelector(state => state.player);
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);

  useEffect(() => {
    if (!tracks.length) {
      fetchTracks(); 
    }
  }, [tracks]);
  
  useEffect(() => {  
    if (id && tracks.length > 0) {
        const foundTrack = tracks.find(t =>Number(t.id) === Number(id));
        if (foundTrack) {
            setTrack(foundTrack);
        }

        setLoading(false);
    }
  }, [id, tracks]);
  
  const handleAddComment = async (newComment: any) => {
    try {
        const accessToken = (session as any)?.backendTokens.accessToken;

        const response = await fetch(`http://localhost:5000/tracks/comment/${track?.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
                }),
            },
            body: JSON.stringify(newComment),
        });

        if (!response.ok) {
        throw new Error("Ошибка при отправке комментария");
        }

        const data = await response.json();

        const updatedTrackRes = await fetch(`http://localhost:5000/tracks/${track?.id}`);
        const updatedTrack = await updatedTrackRes.json();
        setTrack(updatedTrack);
        console.log("Комментарий создан:", data);
    } catch (error) {
        console.error("Ошибка:", error);
    }
  };

  const handleAddToPlaylist = async (playlistId: any) => {
    try {
        const response = await axios.post(`http://localhost:5000/playlists/${playlistId}/tracks/${track?.id}`);
        console.log('Track added successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to add track:', error);
        throw error;
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  
  if (!track) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Track not found</Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push('/tracks')}
          sx={{ mt: 2 }}
        >
          Back to Tracks
        </Button>
      </Box>
    );
  }
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!active || active.id !== track.id) {
      setActiveTrack(track);
      playTrack();
    } else {
      if (pause) {
        playTrack();
      } else {
        pauseTrack();
      }
    }
  };

  const urlImage = track.image;
  
  return (
    <MainLayout>
        <Box>
            <Box 
                sx={{ 
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(18,18,18,1) 100%), url(${urlImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    pt: { xs: 12, md: 20 },
                    pb: { xs: 4, md: 6 },
                }}
            >
                <Container maxWidth="lg">
                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={() => router.push('/tracks')}
                        sx={{ mb: 2, color: 'white' }}
                    >
                        Back to Tracks
                    </Button>
                
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={6}
                                sx={{
                                    width: '100%',
                                    position: 'relative',
                                    paddingTop: '100%',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={urlImage}
                                    alt={track.title}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={8}>
                            <Chip 
                                label={track.genre} 
                                color="primary" 
                                size="small" 
                                sx={{ mb: 2 }} 
                            />
                            <Typography variant="h2" component="h1" fontWeight={700} gutterBottom color="white">
                                {track.title}
                            </Typography>
                            <Typography variant="h5" gutterBottom color="white">
                                {track.artist}
                            </Typography>
                            <Typography variant="body1" color="white" gutterBottom>
                                {track.duration} • Released: {new Date(track.releaseDate).toLocaleDateString()}
                            </Typography>
                            
                            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<PlayArrowIcon />}
                                    sx={{ px: 4 }}
                                    onClick={handlePlay}
                                >
                                    Play
                                </Button>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                    <AddIcon onClick={() => setPlaylistDialogOpen(true)}/>
                                </IconButton>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                    <ShareIcon />
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom fontWeight={600}>
                            About this track
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {track.description}
                        </Typography>
                        
                        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Comments ({track.comments.length})
                            </Typography>
                            <CommentForm onAddComment={handleAddComment} />
                            <CommentList comments={track.comments} />
                        </Box>
                    </Grid>
                
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, mt: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                Track Stats
                            </Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Popularity
                                    </Typography>
                                    <Typography variant="h6">
                                        {track.popularity}/100
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Duration
                                    </Typography>
                                    <Typography variant="h6">
                                        {track.duration}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Released
                                    </Typography>
                                    <Typography variant="h6">
                                        {new Date(track.releaseDate).getFullYear()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Comments
                                    </Typography>
                                    <Typography variant="h6">
                                        {track.comments.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <AddToPlaylistDialog
                open={playlistDialogOpen}
                onClose={() => setPlaylistDialogOpen(false)}
                onAddToPlaylist={handleAddToPlaylist}
            />                          
        </Box>
    </MainLayout>
  );
}

export default TrackDetailPage;