import { FormEvent, useContext, useState } from "react";
import { User } from "../Types.ts";
import { Avatar, Box, Button, IconButton, Link, Modal, TextField, Typography, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from "./UserContext.ts";
import { emptyUser } from "./UserContext.ts";
import { loginBoxStyle } from "../Styles.ts";
import { useTheme } from '@mui/material/styles';
import { login } from "../../services/UserService.ts";
import * as yup from "yup";  // Import Yup for validation

// 🎯 Validation schema using Yup
const validationSchema = yup.object({
  username: yup.string().required("Username or email is required"),
  password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = ({ open, close, switchToSignUp }: { open: boolean, close: Function, switchToSignUp: Function }) => {
  const { userDispatch } = useContext(UserContext);
  const [userData, setUserData] = useState<User>(emptyUser);
  const [errors, setErrors] = useState<{ username?: string, password?: string }>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setSnackbarMessage("Login failed. Please check your credentials and try again.");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box>
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
                error={!!errors.username}
                helperText={errors.username}
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
                error={!!errors.password}
                helperText={errors.password}
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

export default Login;
