import { Container, Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";

export interface SpouseFormData {
  spouseFirstName: string;
  spouseLastName: string;
  spouseSsn: string;
}

const validationSchema = Yup.object().shape({
  spouseFirstName: Yup.string().max(50),
  spouseLastName: Yup.string().max(50),
  spouseSsn: Yup.string().max(20)
});

const SpouseInformation = () => {
  const theme = useTheme();

  const handleSubmit = (values: SpouseFormData) => {
    console.log(values);
    // Logic to save form data
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Spouse Information
        </Typography>
        <Formik
          initialValues={{
            spouseFirstName: '',
            spouseLastName: '',
            spouseSsn: ''
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
                    name="spouseFirstName"
                    label="Spouse First Name"
                    fullWidth
                    error={touched.spouseFirstName && !!errors.spouseFirstName}
                    helperText={touched.spouseFirstName && errors.spouseFirstName}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="spouseLastName"
                    label="Spouse Last Name"
                    fullWidth
                    error={touched.spouseLastName && !!errors.spouseLastName}
                    helperText={touched.spouseLastName && errors.spouseLastName}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="spouseSsn"
                    label="Spouse SSN"
                    fullWidth
                    error={touched.spouseSsn && !!errors.spouseSsn}
                    helperText={touched.spouseSsn && errors.spouseSsn}
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

export default SpouseInformation;