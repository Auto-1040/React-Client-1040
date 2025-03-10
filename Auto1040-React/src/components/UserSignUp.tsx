import { FormEvent, useState } from "react";
import { User } from "./Types";
import { Avatar, Box, Button, IconButton, Link, Modal,  TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { emptyUser } from "./UserContext";
import { loginBoxStyle } from "./Styles";
import CloseIcon from '@mui/icons-material/Close';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SignUp = ({ open, close, switchToLogin }: { open: boolean, close: Function, switchToLogin: Function }) => {
  const [userData, setUserData] = useState<User>(emptyUser);
  const uri = 'api/auth/register';

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/${uri}`, {
        method: 'POST',
        body: JSON.stringify(
          {
            userName: userData.username,
            email: userData.email,
            password: userData.password,
          }
        ),
        headers: {
          'content-type': 'application/json',
        }
      })
      if (response.status === 400) { alert('username or email already exist') }
      else if (!response.ok) { throw new Error(response.status + '') }

      setUserData(emptyUser);
      close();
    }
    catch (e) {
      console.log(e);
      alert('Something went wrong. Please try again later.');
    }
  };

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

            <Button type="submit" variant="contained" fullWidth  sx={{ mt: 2,textTransform:'none', borderRadius: '20px', backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1e88e5' } }}>
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