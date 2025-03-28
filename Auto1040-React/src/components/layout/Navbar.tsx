import { useContext, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import SignUp from "../user/UserSignUp";
import Login from "../user/UserLogin";
import UserContext from "../user/UserContext";
import UserAvatar from "../user/UserAvatar";
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../App';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ModalContext } from '../ModalContext';
import { isTokenExpired } from "../../services/AuthUtils";

const Navbar = () => {
  const { user, userDispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { isLoginOpen, isRegisterOpen, openLogin, closeLogin, openRegister, closeRegister } = useContext(ModalContext);

  const switchToSignUp = () => {
    closeLogin();
    openRegister();
  };

  const switchToLogin = () => {
    closeRegister();
    openLogin();
  };

  const handleDashboardOpen = () => {
    if (user.id)
      navigate('/dashboard/view-forms');
    else
      openLogin();
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token && !isTokenExpired(token)) {
      userDispatch({
        type: 'CREATE_USER',
        data: JSON.parse(savedUser),
      });
    }

  }, []);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#000000' : theme.palette.primary.main, zIndex: theme.zIndex.appBar }}>
      <Toolbar>
        {user?.id ? (
          <UserAvatar />
        ) : (
          <Box>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={openRegister}
              sx={{ mx: 1, backgroundColor: theme.palette.primary.main, textTransform: 'none', color: '#000', '&:hover': { backgroundColor: '#d5d5d5' } }}
            >
              Sign Up
            </Button>
            <SignUp
              open={isRegisterOpen}
              close={closeRegister}
              switchToLogin={switchToLogin}
            />
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              onClick={openLogin}
              sx={{ mx: 1, backgroundColor: '#e0e0e0', textTransform: 'none', color: '#000', '&:hover': { backgroundColor: '#d5d5d5' } }}
            >
              Log in
            </Button>
            <Login
              open={isLoginOpen}
              close={closeLogin}
              switchToSignUp={switchToSignUp}
            />
          </Box>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <img
            src="/logo.png"
            alt="Auto 1040 Logo"
            style={{ height: '40px', objectFit: 'contain' }}
          />
        </Typography>

        <Button
          color="inherit"
          startIcon={<DashboardIcon />}
          sx={{ textTransform: 'none' }}
          onClick={handleDashboardOpen}
        >
          Dashboard
        </Button>
        <IconButton color="inherit" aria-label="home" onClick={() => navigate('/')}>
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