import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import playlists from '@/data/playlist';
import MainLayout from '@/layouts/MainLayout';

function PlaylistsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPlaylist({ name: '', description: '' });
  };

  const handleCreatePlaylist = () => {
    console.log('Creating playlist:', newPlaylist);
    handleClose();
  };

  return (
    <MainLayout>
      <Box sx={{ py: 4, mt: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" fontWeight={700}>
              Your Playlists
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Create Playlist
            </Button>
          </Box>

          <Grid container spacing={3}>
            {playlists.map((playlist: any) => (
              <Grid item key={playlist.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    '&:hover': { transform: 'translateY(-4px)' },
                    transition: 'transform 0.2s'
                  }}
                  onClick={() => router.push(`/playlists/${playlist.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={playlist.coverImage}
                    alt={playlist.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {playlist.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {playlist.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {playlist.tracks.length} tracks
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Playlist Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={newPlaylist.description}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button 
                onClick={handleCreatePlaylist}
                variant="contained"
                disabled={!newPlaylist.name}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default PlaylistsPage;