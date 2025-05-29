import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { playlists } from '@/data/playlist';
import tracks from '@/data/tracks';
import MainLayout from '@/layouts/MainLayout';

function PlaylistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const playlist = playlists.find(p => p.id === Number(id));

  if (!playlist) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Playlist not found</Typography>
      </Container>
    );
  }

  const playlistTracks = tracks.filter((track: any) => playlist.tracks.includes(track.id));

  return (
    <MainLayout>
      <Box>
        <Box
          sx={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%), url(${playlist.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pt: { xs: 12, md: 20 },
            pb: { xs: 4, md: 6 },
            mt: 4
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="overline" sx={{ color: 'white' }}>
              PLAYLIST
            </Typography>
            <Typography variant="h2" component="h1" fontWeight={700} gutterBottom color="white">
              {playlist.name}
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              {playlist.description}
            </Typography>
            <Typography variant="subtitle1" color="white">
              {playlistTracks.length} tracks
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
            <List>
              {playlistTracks.map((track: any, index: any) => (
                <React.Fragment key={track.id}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" sx={{ color: 'error.main' }}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={track.image}
                        alt={track.title}
                        sx={{ width: 56, height: 56, pr:2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={track.title}
                      secondary={
                        <Box component="span">
                          <Typography component="span" variant="body2" color="text.secondary">
                            {track.artist}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {' • '}
                            {track.duration}
                          </Typography>
                        </Box>
                      }
                    />
                    <IconButton sx={{ color: 'primary.main', mr: 2 }}>
                      <PlayArrowIcon />
                    </IconButton>
                  </ListItem>
                  {index < playlistTracks.length - 1 && (
                    <Divider component="li" sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default PlaylistDetailPage;