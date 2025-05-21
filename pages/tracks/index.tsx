"use client"
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MainLayout from '@/layouts/MainLayout';
import { useFetcher } from '@/hooks/useFetch';
import { fetchTracks } from '@/store/actions-creators/track';
import { useTypedSelector } from '@/hooks/useTypeSelector';
import router from 'next/router';
import { useActions } from '@/hooks/useAction';

function TracksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  useFetcher(fetchTracks);
  const {tracks, error} = useTypedSelector(state => state.track)
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const { active, pause } = useTypedSelector(state => state.player);
  
  const filteredTracks = tracks.filter((track: any) => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'popularity':
      default:
        return b.popularity - a.popularity;
    }
  });
  
  return (
    <MainLayout>
        <Box sx={{ py: 10,  backgroundColor: '#fafafa', }}>
            <Container maxWidth="lg">
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    sx={{ fontWeight: 700, mb: 3 }}
                >
                    Browse All Tracks
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by title, artist, album or genre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                        variant="outlined"
                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                    />
                
                    <FormControl sx={{ minWidth: 200, bgcolor: 'background.paper', borderRadius: 1 }}>
                        <InputLabel id="sort-by-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            label="Sort By"
                        >
                            <MenuItem value="popularity">Most Popular</MenuItem>
                            <MenuItem value="title">Title (A-Z)</MenuItem>
                            <MenuItem value="artist">Artist (A-Z)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                
                {filteredTracks.length === 0 ? (
                    <Box sx={{ py: 8, textAlign: 'center' }}>
                        <Typography variant="h5" color="text.secondary">
                            No tracks found matching your search.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                            Try adjusting your search criteria.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                            Showing {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'}
                        </Typography>
                    
                        <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                            {sortedTracks.map((track, index) => (
                                <React.Fragment key={track.id}>
                                    <ListItem
                                        onClick={() => router.push('/tracks/' + track.id)}
                                        alignItems="center"
                                        sx={{
                                            py: 2,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                            }
                                        }}
                                        secondaryAction={
                                            <IconButton edge="end" sx={{ color: 'primary.main', px:4 }}>
                                                <PlayArrowIcon onClick={(e: any) => {
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
                                                }}/>
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            src={track.image}
                                            alt={track.title}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" component="div" fontWeight={600} sx={{ ml: 2 }}>
                                                    {track.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 2 }}>
                                                        {track.artist}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" component="span" sx={{ mx: 1 }}>
                                                        •
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" component="span">
                                                        {track.duration}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    {index < sortedTracks.length - 1 && (
                                        <Divider component="li" sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </>
                )}
            </Container>
        </Box>
    </MainLayout>
  );
}

export default TracksPage;