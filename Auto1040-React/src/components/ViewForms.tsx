import { Container, Typography, Card, CardContent, IconButton, Grid, Alert } from "@mui/material";
import { Download, Visibility, Description } from "@mui/icons-material";

const forms = [
  { id: 1, type: "1040", date: "2024-03-10", fileUrl: "#" },
  { id: 2, type: "106", date: "2024-02-25", fileUrl: "#" },
  { id: 3, type: "1040", date: "2023-12-15", fileUrl: "#" },
];

const ViewForms = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Keeping previous tax forms is crucial in case of an IRS audit. Your uploaded forms are securely stored here.
      </Alert>
      <Typography variant="h5" gutterBottom>
        Your Archived Tax Forms
      </Typography>
      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid item xs={12} sm={6} key={form.id}>
            <Card elevation={3} sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Description color={form.type === "1040" ? "primary" : "success"} sx={{ fontSize: 40, mr: 2 }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Form {form.type}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Uploaded on: {form.date}
                </Typography>
              </CardContent>
              <IconButton color="primary" href={form.fileUrl}>
                <Visibility />
              </IconButton>
              <IconButton color="secondary" href={form.fileUrl} download>
                <Download />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewForms;
