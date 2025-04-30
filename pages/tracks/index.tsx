
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


    if(error){
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }else{
        console.log("df" + tracks);
    }
    

    return(
        <>
            <MainLayout >
                <Grid container justifyContent='center' width={'cover'} >
                    <Card style = {{width: 1100}} >
                        <Box p={3} style={{backgroundColor:'rgba(54, 53, 53, 1)'}}>
                            <Grid container justifyContent='space-between' color = {'rgba(214, 214, 215, 1)'}>
                                <h1>Track List</h1>
                                <Button onClick = {() => router.push('/tracks/create')}>Load track</Button>
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