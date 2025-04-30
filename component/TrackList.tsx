import { ITrack } from '@/types/track';
import { Box, Grid } from '@mui/material';
import React from 'react';
import TrackItem from './TrackItem';

interface TrackListProps{
    tracks: ITrack[];
}

export const TrackList: React.FC<TrackListProps> = ({tracks})=>{
    return (
        <Grid container direction="column" 
        style={{backgroundColor:'rgba(54, 53, 53, 1)'}}>
            <Box p = {2}>
                {tracks.map(track =>
                        <TrackItem 
                            key={track.id}
                            track={track}
                        />
                    )}
            </Box>
        </Grid>
    )
}