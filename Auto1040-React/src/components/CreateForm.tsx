import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import SlipUpload from './SlipUpload';

const CreateForm: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Upload your pay slip here
        </Typography>
        <Box>
          <SlipUpload />
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateForm;