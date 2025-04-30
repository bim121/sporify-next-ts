import { useInput } from '@/hooks/useInput';
import MainLayout from '@/layouts/MainLayout';
import { ITrack } from '@/types/track';
import { Button, Grid, TextField, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface IPropsTrack {
    serverTrack: any;
}

const TrackPage = ({ serverTrack }: IPropsTrack) => {
    const [track, setTrack] = useState(serverTrack);
    const router = useRouter();

    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            });
            setTrack({ ...track, comments: [...track.comments, response.data] });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <MainLayout>
            <Box sx={{ color: 'white', textAlign: 'center', p: 4 }}>
                <Button
                    variant="outlined"
                    sx={{ fontSize: 20, mb: 3, color: 'white', borderColor: 'white', }}
                    onClick={() => router.push('/tracks')}
                >
                    Back
                </Button>

                <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#363535', p: 3, width: '40%', marginLeft:'auto', marginRight: 'auto' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        image={`http://localhost:5000/${track.picture}`}
                        alt={track.name}
                    />
                    <CardContent sx={{ textAlign: 'left', ml: 3 }}>
                        <Typography variant="h5" gutterBottom>Track Name: {track.name}</Typography>
                        <Typography variant="h6" gutterBottom>Author: {track.artist}</Typography>
                        <Typography variant="body1">Listeners: {track.listens}</Typography>
                        <Typography variant="h6" mt={2}>Album</Typography>
                        <Typography variant="body2">{track.text}</Typography>
                    </CardContent>
                </Card>

                <Box mt={5}>
                    <Typography variant="h5" gutterBottom>Comments</Typography>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item sx={{ width: '60%' }}>
                            <TextField
                                label="Your Name"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                                {...username}
                            />
                        </Grid>
                        <Grid item sx={{ width: '60%' }}>
                            <TextField
                                label="Commentary"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                                {...text}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={addComment}>Send</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={4}>
                    {track.comments.map((comment: any, index: number) => (
                        <Card key={index} sx={{ mb: 2, backgroundColor: '#424242', color: 'white', p: 2, width: '60%', mx: 'auto' }}>
                            <Typography variant="subtitle2">Author: {comment.username}</Typography>
                            <Typography variant="body2">Comment: {comment.text}</Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const url = 'http://localhost:5000/tracks/' + params?.id;
    const response = await axios.get(url);
    return {
        props: {
            serverTrack: response.data
        }
    };
};