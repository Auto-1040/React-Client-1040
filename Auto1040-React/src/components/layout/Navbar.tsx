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
    <AppBar position="fixed" sx={{ backgroundColor: theme.palette.background.default, zIndex: theme.zIndex.appBar }}>
      <Toolbar>
        {user?.id ? (
          <UserAvatar />
        ) : (
          <Box>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={openRegister}
              sx={{ mx: 1, backgroundColor: theme.palette.primary.main, textTransform: 'none', color: theme.palette.primary.contrastText, '&:hover': { backgroundColor: theme.palette.secondary.main } }}
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
              sx={{ mx: 1, backgroundColor: theme.palette.primary.main, textTransform: 'none', color: theme.palette.primary.contrastText, '&:hover': { backgroundColor: theme.palette.secondary.main } }}
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
            src="/ez1040logo2.png"
            alt="Auto 1040 Logo"
            style={{ height: '40px', objectFit: 'contain' }}
          />
        </Typography>

        <Button
          sx={{ color: theme.palette.primary.main, textTransform: 'none', '&:hover': { color: theme.palette.secondary.main } }} 
          startIcon={<DashboardIcon />}
          onClick={handleDashboardOpen}
        >
          Dashboard
        </Button>
        <IconButton sx={{ color: theme.palette.primary.main,  '&:hover': { color: theme.palette.secondary.main } }} aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>

        <IconButton edge="end" sx={{ color: theme.palette.primary.main, '&:hover': { color: theme.palette.secondary.main } }} aria-label="mode" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;