import MainLayout from '@/layouts/MainLayout';
import { ITrack } from '@/types/track';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const TrackPage = () => {
    const track: ITrack = {_id: "1", name: "name1", artist: "artist1", text:"text1", listens: 5, audio: "http://localhost:5001/audio/0473512f-665f-4f85-a58e-b1f67b432407.mp3", 
        picture: "http://localhost:5001/image/c2f32f00-623d-49f4-85aa-89af9feecad6.jpg", comments: []}

    const router = useRouter();

    return(
        <div>
            <MainLayout>
                <Button
                    variant = {"outlined"}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/tracks')}>
                    К списку
                </Button>
                <Grid container style={{margin: '20px 0'}}>
                    <img src={track.picture} width={200} alt="#"/>
                    <div style={{marginLeft: 30}}>
                        <h1>Название трека - {track.name}</h1>
                        <h1>Исполнитель - {track.artist}</h1>
                        <h1>Прослушиваний - {track.listens}</h1>
                    </div>
                </Grid>
           </MainLayout>
        </div>
    )
}

export default TrackPage;