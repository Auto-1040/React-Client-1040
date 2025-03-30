import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.secondary,
        py: 3,
        mt: 4,
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        textAlign: 'center',
        zIndex:(theme)=>(theme.zIndex.appBar)
      }}
    >
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <Link
            href="/contact"
            sx={{
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Contact Us
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="/support"
            sx={{
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Support
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="/privacy"
            sx={{
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Privacy Policy
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mb: 1 }}>
        © 2025 Miriam Frieder. All rights reserved.
      </Typography>
      <IconButton
        href="https://github.com/Miriam-Frieder"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: (theme) => theme.palette.primary.main,
          '&:hover': {
            color: (theme) => theme.palette.secondary.main,
          },
        }}
      >
        <GitHubIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Footer;