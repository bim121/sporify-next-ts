
import { TrackList } from "@/component/TrackList";
import { useFetcher } from "@/hooks/useFetch";
import { useTypedSelector } from "@/hooks/useTypeSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks } from "@/store/actions-creators/track";
import { ITrack } from "@/types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
    const router = useRouter();
    useFetcher(fetchTracks);
    const {tracks, error} = useTypedSelector(state => state.track)
    
    //const tracks: ITrack[] = [
    //    {_id: "1", name: "name1", artist: "artist1", text:"text1", listens: 5, audio: "http://localhost:5001/audio/fb5d6865-98ab-4d26-a3f4-cfd89cf18041.mp3", 
    //        picture: "http://localhost:5001/image/b70f0949-1856-4291-98bc-393262662210.jpg", comments: []},
    //    {_id: "2", name: "name2", artist: "artist2", text:"text2", listens: 5, audio: "http://localhost:5001/audio/155ea5b3-1e79-4ee1-b653-5f098a2da2b4.mp3", 
    //        picture: "http://localhost:5001/image/b49ee0d6-3720-4a52-b3f1-270690e37e0d.jpg", comments: []},
    //    {_id: "3", name: "name3", artist: "artist3", text:"text3", listens: 5, audio: "http://localhost:5001/audio/399a074b-2bb9-4f98-9798-b025cd3a5db6.mp3", 
    //        picture: "http://localhost:5001/image/144731a1-f29f-4bf9-b203-6408a64feb6f.jpg", comments: []},
    //]


    if(error){
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }else{
        console.log("df" + tracks);
    }
    

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