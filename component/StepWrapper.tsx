import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React, { ReactNode } from 'react';

interface StepWrapperProps{
    activeStep: number;
    children?: ReactNode;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return(
        <div className='center'> 
            <Container className='center'>
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) =>
                        <Step
                            key={step}
                            completed={activeStep > index}
                        >
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )}
                </Stepper>
                <Grid container justifyContent="center" style={{margin: '70px 0', height: 270}}>
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
                    }
                `}
            </style>
        </div>
    )
}

export default StepWrapper;