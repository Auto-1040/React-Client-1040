import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 7 }}>
      <Box sx={{ mb: 4 }}>
        <img src="/dev.jpg" alt="Development" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          We're Developing the Site for You
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Our team is working hard to bring you the best experience. Please check back later.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ textTransform: 'none' }}>
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;