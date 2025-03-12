import { FormEvent, useContext, useState } from "react";
import { User } from "../Types";
import { Avatar, Box, Button, IconButton, Link, Modal, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Import Grid
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from "./UserContext";
import { emptyUser } from "./UserContext";
import { loginBoxStyle } from "../Styles";
import { useTheme } from '@mui/material/styles';
import { login } from "./UserService.ts";


const Login = ({ open, close, switchToSignUp }: { open: boolean, close: Function, switchToSignUp: Function }) => {
  const {  userDispatch } = useContext(UserContext);
  const [userData, setUserData] = useState<User>(emptyUser);
  const theme = useTheme();

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = await login(userData);

    userDispatch({
      type: 'CREATE_USER',
      data: {
        id: data.user.id,
        username: data.user.userName,
        email: data.user.email,
      },
    });
    setUserData(emptyUser);
    close();
  };

  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid size={10}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ ...loginBoxStyle }}
          >
            <IconButton
              onClick={() => close()}
              sx={{ position: 'absolute', top: 8, right: 8, color: theme.palette.error.main }}
            >
              <CloseIcon />
            </IconButton>
            <Grid container direction="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h6" component="h1" textAlign="center" id="login-modal-title">
                Login
              </Typography>
            </Grid>

            <TextField
              id="username"
              label="Username or Email"
              type="text"
              variant="outlined"
              fullWidth
              value={userData.username}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              margin="normal"
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={userData.password}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              margin="normal"
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, borderRadius: '20px', textTransform: 'none', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
              Continue
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link href="#" onClick={() => { close(); switchToSignUp(); }}>Sign Up</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Login;