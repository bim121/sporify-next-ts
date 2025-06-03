"use client"
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function AddToPlaylistDialog({ open, onClose, onAddToPlaylist }: any) {
  const [playlists, setPlaylists] = useState<any>([]);

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
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add to Playlist</DialogTitle>
      <DialogContent>
        <List sx={{ minWidth: 300 }}>
          {playlists.map((playlist: any) => (
            <ListItem
              key={playlist.id}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  aria-label="add to playlist"
                  onClick={() => {
                    onAddToPlaylist(playlist.id);
                    onClose();
                  }}
                >
                  <AddIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={playlist.coverImage}
                  alt={playlist.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={playlist.name}
                secondary={`${playlist.tracks.length} tracks`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default AddToPlaylistDialog;