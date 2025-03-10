import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import SignUp from "./UserSignUp";
import Login from "./UserLogin";
import UserContext from "./UserContext";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  const switchToSignUp = () => {
    setIsLogging(false);
    setIsRegister(true);
  };

  const switchToLogin = () => {
    setIsRegister(false);
    setIsLogging(true);
  };

  return (
    <AppBar position="fixed">
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
          onClick={() => navigate('/dashboard/view-forms')}
        >
          Dashboard
        </Button>
        <IconButton edge="end" color="inherit" aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;