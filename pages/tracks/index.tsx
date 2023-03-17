import NavBar from "@/component/NavBar";
import { TrackList } from "@/component/TrackList";
import MainLayout from "@/layouts/MainLayout";
import { ITrack } from "@/types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
    const router = useRouter();
    const tracks: ITrack[] = [
        {_id: "1", name: "name1", artist: "artist1", text:"text1", listens: 5, audio: "http://localhost:5001/audio/0473512f-665f-4f85-a58e-b1f67b432407.mp3", 
            picture: "http://localhost:5001/image/c2f32f00-623d-49f4-85aa-89af9feecad6.jpg", comments: []},
        {_id: "2", name: "name2", artist: "artist2", text:"text2", listens: 5, audio: "http://localhost:5001/audio/e3536d37-abed-4b57-88b8-6df38c0602c8.mp3", 
            picture: "http://localhost:5001/image/3c8b0631-88ff-4aac-9067-4dbce17735c5.jpg", comments: []},
        {_id: "3", name: "name3", artist: "artist3", text:"text3", listens: 5, audio: "http://localhost:5001/audio/e3faaafb-e46b-43d3-bde7-98635900635f.mp3", 
            picture: "http://localhost:5001/image/a0838e0b-17de-42fd-8210-c83dd6b10082.jpg", comments: []},
    ]

    return(
        <>
            <MainLayout>
                <Grid container justifyContent='center' width={1920}>
                    <Card style = {{width: 1100}}>
                        <Box p={3}>
                            <Grid container justifyContent='space-between'>
                                <h1>Список треков</h1>
                                <Button onClick = {() => router.push('/tracks/create')}>Загрузить</Button>
                            </Grid>   
                        </Box>
                        <TrackList tracks={tracks}/>   
                    </Card>
                </Grid>
            </MainLayout>
        </>
    );

    
};

export default Index;