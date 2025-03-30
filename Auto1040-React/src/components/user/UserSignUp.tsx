import { FormEvent, useContext, useState } from "react";
import { User } from "../Types.ts";
import { Avatar, Box, Button, IconButton, Link, Modal, TextField, Typography, useTheme, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserContext, { emptyUser } from "./UserContext.ts";
import { loginBoxStyle } from "../Styles.ts";
import CloseIcon from '@mui/icons-material/Close';
import { register } from "../../services/UserService.ts";
import * as yup from "yup";

// 🎯 Validation schema using Yup
const validationSchema = yup.object({
  username: yup.string().min(2, "Username must be at least 2 characters").required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Za-z]/, "Password must contain at least one letter")
    .matches(/[!@#$%^&*(),.?:{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
});

const SignUp = ({ open, close, switchToLogin }: { open: boolean, close: ()=>void, switchToLogin: Function }) => {
  const [userData, setUserData] = useState<User>(emptyUser);
  const [errors, setErrors] = useState<{ username?: string, email?: string, password?: string }>({});
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for snackbar
  const { userDispatch } = useContext(UserContext);
  const theme = useTheme();
  
  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    try {
      // Validate user input
      await validationSchema.validate(userData, { abortEarly: false });

      // If valid, send request to register user
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

      // Reset form after successful submission
      setUserData(emptyUser);
      close();
      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Collect validation errors
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setSnackbarMessage("Registration failed. Please try again later.");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Modal open={open} onClose={close} aria-labelledby="signup-modal-title">
      <Box>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid size={10}>
            <Box component="form" onSubmit={handleSubmit} sx={{ ...loginBoxStyle, p: 4 }}>
              
              {/* Close button */}
              <IconButton onClick={close} sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}>
                <CloseIcon />
              </IconButton>

              <Grid container direction="column" alignItems="center">
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <PersonAddIcon />
                </Avatar>
                <Typography variant="h6" component="h1" textAlign="center">
                  Sign Up
                </Typography>
              </Grid>

              {/* Username input field */}
              <TextField
                id="username"
                label="Username"
                type="text"
                variant="outlined"
                fullWidth
                value={userData.username}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                margin="normal"
                error={!!errors.username}
                helperText={errors.username}
              />

              {/* Email input field */}
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={userData.email}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />

              {/* Password input field */}
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={userData.password}
                onChange={(e) => handleChange(e.target.id, e.target.value)}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
              />

              {/* Submit button */}
              <Button type="submit" variant="contained" fullWidth
                sx={{ mt: 2, borderRadius: '20px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
                Continue
              </Button>

              {/* Switch to login link */}
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account? <Link href="#" onClick={() => { close(); switchToLogin(); }}>Log In</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Snackbar for error messages */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default SignUp;
