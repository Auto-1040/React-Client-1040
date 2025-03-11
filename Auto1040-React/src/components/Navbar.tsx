import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import SignUp from "./User/UserSignUp";
import Login from "./User/UserLogin";
import UserContext from "./User/UserContext";
import UserAvatar from "./User/UserAvatar";
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../App'; 
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const switchToSignUp = () => {
    setIsLogging(false);
    setIsRegister(true);
  };

  const switchToLogin = () => {
    setIsRegister(false);
    setIsLogging(true);
  };

  const handleDashboardOpen = () => {
    if(user.id)
      navigate('/dashboard/view-forms');
    else
      setIsLogging(true);
  };
  

  return (
    <AppBar position="fixed"  sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#000000' : theme.palette.primary.main }}>
      <Toolbar>
        {user?.id ? (
          <UserAvatar />
        ) : (
          <Box>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => setIsRegister(true)}
              sx={{ mx: 1, backgroundColor: '#e0e0e0', textTransform: 'none', color: '#000', '&:hover': { backgroundColor: '#d5d5d5' } }}
            >
              Sign Up
            </Button>
            <SignUp
              open={isRegister}
              close={() => setIsRegister(false)}
              switchToLogin={switchToLogin}
            />
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              onClick={() => setIsLogging(true)}
              sx={{ mx: 1, backgroundColor: '#e0e0e0', textTransform: 'none', color: '#000', '&:hover': { backgroundColor: '#d5d5d5' } }}
            >
              Log in
            </Button>
            <Login
              open={isLogging}
              close={() => setIsLogging(false)}
              switchToSignUp={switchToSignUp}
            />
          </Box>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Auto 1040
        </Typography>
        
        <Button
          color="inherit"
          startIcon={<DashboardIcon />}
          sx={{ textTransform: 'none' }}
          onClick={() => handleDashboardOpen()}
        >
          Dashboard
        </Button>
        <IconButton  color="inherit" aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        
        <IconButton edge="end" color="inherit" aria-label="mode" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;