import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React, { ReactNode } from 'react';

interface StepWrapperProps{
    activeStep: number;
    children?: ReactNode;
}

const steps = ['Track Info', 'Load Picture', 'Load Track']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return(
        <div style={{color: 'white'}}>
        <div className='center' style={{color: 'white'}}> 
            <Container className='center'>
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) =>
                        <Step
                            key={step}
                            completed={activeStep > index}
                        >
                            <StepLabel sx={{ color: 'white', '& .MuiStepLabel-label': { color: 'white' } }}>{step}</StepLabel>
                        </Step>
                    )}
                </Stepper>
                <Grid container justifyContent="center" style={{margin: '70px 0', height: 270, color: 'white'}} >
                        <Card style={{width: 600}}>
                            {children}
                        </Card>
                </Grid>
            </Container>
            <style jsx>
                {`
                    .center {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 100vw;
                        color: white;
                    }
                `}
            </style>
        </div>
        </div>
    )
}

export default StepWrapper;