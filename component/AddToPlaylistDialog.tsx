import React from 'react';
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
import playlists from '@/data/playlist';

function AddToPlaylistDialog({ open, onClose, onAddToPlaylist }: any) {
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