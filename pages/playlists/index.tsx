import React, { useEffect, useState } from 'react';
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
import MainLayout from '@/layouts/MainLayout';
import UploadIcon from '@mui/icons-material/Upload';
import axios from 'axios';

function PlaylistsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    coverImageFile: null as File | null,
  });
  const [playlists, setPlaylists] = useState<any[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPlaylist({ name: '', description: '', coverImageFile: null  });
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res =  await axios.get('http://localhost:5000/playlists');
        if (!res) throw new Error('Failed to fetch playlists');
        setPlaylists(res.data);
      } catch (err: any) {
        console.log(err);
      } 
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylist.coverImageFile) {
      alert("Please upload a cover image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', newPlaylist.name);
    formData.append('description', newPlaylist.description);
    formData.append('image', newPlaylist.coverImageFile);

    try {
      const res = await fetch('http://localhost:5000/playlists', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to create playlist');
      const data = await res.json();
      console.log('Created playlist:', data);
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Something went wrong while creating playlist.');
    }
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
              <Box sx={{ mt: 2 }}>
                <input
                  accept="image/*"
                  id="upload-cover"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewPlaylist(prev => ({ ...prev, coverImageFile: file }));
                    }
                  }}
                />
                <label htmlFor="upload-cover">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                  >
                    Upload Cover Image
                  </Button>
                </label>
                {newPlaylist.coverImageFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {newPlaylist.coverImageFile.name}
                  </Typography>
                )}
              </Box>
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