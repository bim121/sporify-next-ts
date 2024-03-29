import { useInput } from '@/hooks/useInput';
import MainLayout from '@/layouts/MainLayout';
import { ITrack } from '@/types/track';
import { CommentsDisabled } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const TrackPage = ({serverTrack}) => {
   const [track, setTrack] = useState(serverTrack); 
    //const track: ITrack = {_id: "1", name: "name1", artist: "artist1", text:"text1", listens: 5, audio: "http://localhost:5001/audio/0473512f-665f-4f85-a58e-b1f67b432407.mp3", 
    //    picture: "http://localhost:5001/image/c2f32f00-623d-49f4-85aa-89af9feecad6.jpg", comments: []}

    const router = useRouter();
    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try{
                const response = await axios.post('http://localhost:5001/tracks/comment', {
                    username: username.value,
                    text: text.value,
                    trackId: track._id
                })
            setTrack({...track, comments: [...track.comments, response.data]})
        }catch(e){
            console.log(e);
        }
        
    }

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
                    <img src={"http://localhost:5001/" + track.picture} width={200} alt="#"/>
                    <div style={{marginLeft: 30}}>
                        <h1>Название трека - {track.name}</h1>
                        <h1>Исполнитель - {track.artist}</h1>
                        <h1>Прослушиваний - {track.listens}</h1>
                    </div>
                </Grid>
                <h1>Слова в треке</h1>
                <p>{track.text}</p>
                <h1>Коментарии</h1>
                <Grid container>
                    <TextField
                        label="Ваше имя"
                        fullWidth
                        {...username}
                    />
                    <TextField
                        label="Комментарий"
                        fullWidth
                        multiline
                        rows={4}
                        {...text}
                    />
                    <Button onClick={addComment}>Отправить</Button>
                </Grid>
                <div>
                    {track.comments.map(comment =>
                        <div>
                            <div>Автор - {comment.username}</div>
                            <div>Коментарии - {comment.text}</div>
                        </div>
                        )}
                </div>
           </MainLayout>
        </div>
    )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async({params}) => {
    const url = 'http://localhost:5001/tracks/' + params?.id;
    const response = await axios.get(url)
    return {
        props: {
            serverTrack: response.data
        }
    }
}