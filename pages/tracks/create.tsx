import FileUpload from '@/component/FileUpload';
import StepWrapper from '@/component/StepWrapper';
import MainLayout from '@/layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);

    const next = () => {
        if(activeStep !== 2){
            setActiveStep(prev => prev + 1);
        }
    }
    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return(
        <>
            <MainLayout>
                <StepWrapper activeStep={activeStep}>
                   {activeStep === 0 && 
                        <Grid container direction={'column'} style={{padding: 20}}>
                            <TextField
                                style={{marginTop: 10}}
                                label={"Название трека"}
                            />
                            <TextField
                                style={{marginTop: 10}}
                                label={"Имя исполнителя"}
                            />
                            <TextField
                                style={{marginTop: 10}}
                                label={"Слова к треку"}
                                multiline
                                rows={3}
                            />
                        </Grid>
                   }
                   {activeStep === 1 && 
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                   }
                   {activeStep === 2 && 
                    <FileUpload setFile={setAudio} accept="audio/*">
                    <Button>Загрузить аудио</Button>
                </FileUpload>
                   }
                </StepWrapper>
                <Grid container justifyContent='center' width='100vw'>
                    <Grid container justifyContent='space-between' width='70%'>
                        <Button disabled={activeStep===0} onClick={back}>Назад</Button>
                        <Button onClick={next}>Далее</Button>
                    </Grid>
                </Grid>
            </MainLayout>
        </>

        
    )
}

export default Create;