import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, TextField, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Email, Phone, GitHub, Send } from "@mui/icons-material";
import { sendContactEmail } from "../../services/EmailService";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.message) {
      setError(true);
      return;
    }
  
    setLoading(true);
    setError(false);
    setSuccess(false);
  
    const success = await sendContactEmail(
      formData.fullName,
      formData.email,
      formData.message
    );
  
    if (success) {
      setSuccess(true);
      setFormData({ fullName: "", email: "", message: "" });
    } else {
      setError(true);
    }
  
    setLoading(false);
  };
  
  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>
        📬 Get in Touch
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
            <CardContent>
              <Phone sx={{ fontSize: 40, color: "#c62d21" }} />
              <Typography variant="h6" sx={{ marginTop: 1 }}>Phone</Typography>
              <Typography variant="body1" color="text.secondary">+972-556777068</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
            <CardContent>
              <Email sx={{ fontSize: 40, color: "#2e4f7a" }} />
              <Typography variant="h6" sx={{ marginTop: 1 }}>Email</Typography>
              <Typography variant="body1" color="text.secondary">m0556777068@email.com</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* GitHub */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
            <CardContent>
              <GitHub sx={{ fontSize: 40, color: "#5e98d4" }} />
              <Typography variant="h6" sx={{ marginTop: 1 }}>GitHub</Typography>
              <Typography variant="body1" color="text.secondary">
                <a href="https://github.com/Miriam-Frieder" target="_blank" rel="noopener noreferrer">
                  github.com/Miriam-Frieder
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Box sx={{ marginTop: 4, textAlign: "left" }}>
        <Typography variant="h5" sx={{ fontWeight: 500, marginBottom: 2 }}>📩 Send a Message</Typography>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </Box>

      {/* Snackbar Notifications */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: "100%" }}>
          Please fill out all fields or try again later.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;