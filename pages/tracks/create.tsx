import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MainLayout from '@/layouts/MainLayout';
import axios from 'axios';
import router from 'next/router';

const Input = styled('input')({
  display: 'none',
});

const steps = ['Track Information', 'Cover Image', 'Audio File'];

type FormDataType = {
    title: string;
    artist: string;
    genre: string;
    description: string;
    releaseDate: string;
    image: File | null;
    audio: File | null;
};

function AddTrackPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    artist: '',
    genre: '',
    description: '',
    releaseDate: '',
    image: null,
    audio: null,
  });
  
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [audioFileName, setAudioFileName] = useState('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (
    e: any
  ) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name as keyof FormDataType]: value,
    }));
  };
  

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        audio: file,
      }));
      setAudioFileName(file.name);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof FormDataType];
        if (value instanceof File) {
          data.append(key, value);
        } else if (value !== null && value !== undefined) {
          data.append(key, String(value));
        }
    });

    axios.post('http://localhost:5000/tracks', data)
        .then((resp) => {
            router.push('/tracks');
        })
        .catch((e) => {
            console.error('Error in submitting form:', e);
            if (e.response) {
                console.error('Error Response:', e.response);
            }
        });

  };

  const getStepContent = (step: any) => {
    switch (step) {
        case 0:
            return (
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Artist"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel>Genre</InputLabel>
                        <Select
                            name="genre"
                            value={formData.genre}
                            label="Genre"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Pop">Pop</MenuItem>
                            <MenuItem value="Rock">Rock</MenuItem>
                            <MenuItem value="Hip Hop">Hip Hop</MenuItem>
                            <MenuItem value="Electronic">Electronic</MenuItem>
                            <MenuItem value="Classical">Classical</MenuItem>
                            <MenuItem value="Jazz">Jazz</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                    />
                    <TextField
                        fullWidth
                        label="Release Date"
                        name="releaseDate"
                        type="date"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Stack>
            );

        case 1:
            return (
                <Box sx={{ textAlign: 'center' }}>
                    {coverImagePreview && (
                        <Box
                            component="img"
                            src={coverImagePreview}
                            alt="Cover preview"
                            sx={{
                            width: 200,
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 2,
                            }}
                        />
                    )}
                    <label htmlFor="cover-image">
                        <Input
                            accept="image/*"
                            id="cover-image"
                            type="file"
                            onChange={handleImageUpload}
                        />
                        <Button variant="contained" component="span" fullWidth>
                            Upload Cover Image
                        </Button>
                    </label>
                </Box>
            );

        case 2:
            return (
                <Box sx={{ textAlign: 'center' }}>
                    {audioFileName && (
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Selected file: {audioFileName}
                        </Typography>
                    )}
                    <label htmlFor="audio-file">
                        <Input
                            accept="audio/*"
                            id="audio-file"
                            type="file"
                            onChange={handleAudioUpload}
                        />
                        <Button variant="contained" component="span" fullWidth>
                            Upload Audio File
                        </Button>
                    </label>
                </Box>
            );

        default:
            return 'Unknown step';
    }
  };

  return (
    <MainLayout>
        <Container maxWidth="md" sx={{ py: 12 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Add New Track
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form onSubmit={handleSubmit}>
                    {getStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                        <Box>
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!formData.title || !formData.artist || !formData.image || !formData.audio}
                                >
                                    Upload Track
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={activeStep === 0 && (!formData.title || !formData.artist)}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Container>
    </MainLayout>
  );
}

export default AddTrackPage;