import React, { useEffect } from 'react';
import { useActions } from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypeSelector';
import {
  Box,
  IconButton,
  Paper,
  Slider,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import CloseIcon from '@mui/icons-material/Close';

const PlayerWrapper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1, 2),
  backgroundColor: '#181818',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1000,
}));

const TrackInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '30%',
});

const Controls = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const VolumeControl = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '30%',
  justifyContent: 'flex-end',
});

const TrackImage = styled('img')({
  width: 56,
  height: 56,
  objectFit: 'cover',
  marginRight: 12,
  borderRadius: 4,
});

let audio: HTMLAudioElement | null = null;

export function AudioPlayer() {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(
        (state) => state.player
    );
    const {
        pauseTrack,
        playTrack,
        setVolume,
        setCurrentTime,
        setDuration,
        setActiveTrack
    } = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        }

        if (active) {
            if (audio.src !== 'http://localhost:5000/' + active.audio) {
                audio.src = 'http://localhost:5000/' + active.audio;
            }

            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio!.duration));
            };
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio!.currentTime));
            };

            audio.volume = volume / 100;

            if (!pause) {
                audio.play();
            }
        }
    }, [active]);

    useEffect(() => {
        if (!audio) return;
    
        if (pause) {
            audio.pause();
        } else {
            audio.play();
        }
    }, [pause]);    

    const play = () => {
        if (pause) {
            playTrack();
            audio!.play();
        } else {
            pauseTrack();
            audio!.pause();
        }
    };

    const closePlayer = () => {
        audio?.pause();
        setActiveTrack(null); 
    };

    const changeVolume = (_: Event, value: number | number[]) => {
        if (!audio) return;
        const newVolume = typeof value === 'number' ? value : value[0];
        audio.volume = newVolume / 100;
        setVolume(newVolume);
    };

    const changeCurrentTime = (_: Event, value: number | number[]) => {
        if (!audio) return;
        const newTime = typeof value === 'number' ? value : value[0];
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (seconds: number) =>
        new Date(seconds * 1000).toISOString().substr(14, 5);

    if (!active) return null;

    return (
        <PlayerWrapper elevation={3}>
            <IconButton 
                onClick={closePlayer} 
                sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    color: '#fff' 
                }}
                >
                <CloseIcon />
            </IconButton>
            <TrackInfo>
                <TrackImage
                    src={'http://localhost:5000/' + active.image}
                    alt={active.title}
                />
                <Box>
                    <Typography variant="subtitle2" noWrap sx={{ color: '#fff' }}>
                        {active.title}
                    </Typography>
                    <Typography variant="caption" noWrap sx={{ color: '#ccc' }}>
                        {active.artist}
                    </Typography>
                </Box>
            </TrackInfo>

            <Controls>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <IconButton sx={{ color: '#fff' }}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'primary.main' }} onClick={play}>
                        {pause ? (
                            <PlayCircleIcon sx={{ fontSize: 40 }} />
                            ) : (
                            <PauseCircleIcon sx={{ fontSize: 40 }} />
                            )
                        }
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <SkipNextIcon />
                    </IconButton>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', maxWidth: 500 }}>
                    <Typography variant="caption" sx={{ color: '#fff' }}>
                        {formatTime(currentTime)}
                    </Typography>
                    <Slider
                        size="small"
                        value={currentTime}
                        max={duration}
                        onChange={changeCurrentTime}
                        sx={{ color: 'primary.main' }}
                    />
                    <Typography variant="caption" sx={{ color: '#fff' }}>
                        {formatTime(duration)}
                    </Typography>
                </Stack>
            </Controls>

            <VolumeControl>
                <VolumeUpIcon sx={{ color: '#fff' }} />
                <Slider
                    size="small"
                    value={volume}
                    onChange={changeVolume}
                    sx={{ width: 100, ml: 1, color: 'primary.main' }}
                />
            </VolumeControl>
        </PlayerWrapper>
    );
}
