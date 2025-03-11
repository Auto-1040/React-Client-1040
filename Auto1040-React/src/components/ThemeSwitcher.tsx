import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme, CssBaseline, Switch } from '@mui/material';
import Box from '@mui/material/Box';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

function AppBarLabel({ label }: { label: string }) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <AppBarLabel label="My Application" />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} />
          </Box>
        </AppBar>
        {/* Your other components go here */}
      </Stack>
    </ThemeProvider>
  );
}