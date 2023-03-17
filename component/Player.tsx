import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import styles from '../styles/Player.module.scss';
import react from 'react';
import { ITrack } from '@/types/track';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '@/hooks/useTypeSelector';
import { useActions } from '@/hooks/useAction';

const Player = () => {
    const track: ITrack = {_id: "1", name: "name1", artist: "artist1", text:"text1", listens: 5, audio: "http://localhost:5001/audio/0473512f-665f-4f85-a58e-b1f67b432407.mp3", 
        picture: "http://localhost:5001/image/c2f32f00-623d-49f4-85aa-89af9feecad6.jpg", comments: []}
    
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack} = useActions();

    const play = () => {
        if(pause){
            playTrack();
        }else{
            pauseTrack();
        }
    }

    return(
        <div className={styles.player}>
            <IconButton onClick = {play}>
                {!pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction="column" style={{width:200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize:12, color:'grey'}}>{track.artist}</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={() => ({})} />
            <VolumeUp style={{marginLeft: 'audio'}}/>
            <TrackProgress left={0} right={100} onChange={() => ({})} />
        </div>
    )
}

export default Player;