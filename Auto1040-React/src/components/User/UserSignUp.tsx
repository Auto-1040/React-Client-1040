import { FormEvent, useContext, useState } from "react";
import { User } from "../Types";
import { Avatar, Box, Button, IconButton, Link, Modal, TextField, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserContext, { emptyUser } from "./UserContext";
import { loginBoxStyle } from "../Styles";
import CloseIcon from '@mui/icons-material/Close';
import { register } from "./UserService.ts";


const SignUp = ({ open, close, switchToLogin }: { open: boolean, close: Function, switchToLogin: Function }) => {
  const [userData, setUserData] = useState<User>(emptyUser);
  const {  userDispatch } = useContext(UserContext);
  const theme = useTheme();

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await register(userData);
    console.log(data);
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
  }


  return (
    <Modal
      open={open}
      onClose={() => { close() }}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
    >
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }} >
        <Grid size={10}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ ...loginBoxStyle, p: 4 }}
          >
            <IconButton
              onClick={() => close()}
              sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
            >
              <CloseIcon />
            </IconButton>
            <Grid container direction="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <PersonAddIcon />
              </Avatar>
              <Typography variant="h6" component="h1" textAlign="center" id="signup-modal-title">
                Sign Up
              </Typography>
            </Grid>

            <TextField
              id="username"
              label="Username"
              type="text"
              variant="outlined"
              fullWidth
              value={userData.username}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              margin="normal"
            />

            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={userData.email}
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

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, textTransform: 'none', borderRadius: '20px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
              Continue
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link href="#" onClick={() => { close(); switchToLogin(); }}>Log In</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SignUp;