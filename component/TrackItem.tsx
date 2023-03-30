import { useActions } from '@/hooks/useAction';
import { ITrack } from '@/types/track';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/TrackItem.module.scss';

interface TrackItemProps {
    track: ITrack,
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter();
    const {playTrack, pauseTrack, setActiveTrack} = useActions();

    const play = (e: any) => {
        e.stopPropagation();
        setActiveTrack(track);
        playTrack()
    }

    return(
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick = {play}>
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5001/'+track.picture} alt="#"/>
            <Grid container direction="column" style={{width:200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize:12, color:'grey'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03.22</div>}
            <IconButton style = {{marginLeft: 'auto'}} onClick = {e => e.stopPropagation()}>
                <Delete />
            </IconButton>
        </Card>
    )
}

export default TrackItem;