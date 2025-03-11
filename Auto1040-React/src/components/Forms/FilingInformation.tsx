import { Container, Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";


const validationSchema = Yup.object().shape({
  filingStatus: Yup.string().max(50),
  presidentialCampaign: Yup.boolean()
});

const FilingInformation = () => {
  const theme = useTheme();

  const handleSubmit = (values: any) => {
    console.log(values);
    // Logic to save form data
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Filing Information
        </Typography>
        <Formik
          initialValues={{
            filingStatus: '',
            presidentialCampaign: false
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="filingStatus"
                    label="Filing Status"
                    fullWidth
                    error={touched.filingStatus && !!errors.filingStatus}
                    helperText={touched.filingStatus && errors.filingStatus}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="presidentialCampaign"
                    label="Presidential Campaign"
                    type="checkbox"
                    fullWidth
                    error={touched.presidentialCampaign && !!errors.presidentialCampaign}
                    helperText={touched.presidentialCampaign && errors.presidentialCampaign}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ textTransform: 'none' }}
                >
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default FilingInformation;