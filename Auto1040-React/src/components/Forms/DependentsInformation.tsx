import { Container, Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";

export interface DependentsFormData {
  dependents: string;
}

const validationSchema = Yup.object().shape({
  dependents: Yup.string()
});

const DependentsInformation = () => {
  const theme = useTheme();

  const handleSubmit = (values: DependentsFormData) => {
    console.log(values);
    // Logic to save form data
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Dependents Information
        </Typography>
        <Formik
          initialValues={{
            dependents: ''
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
                    name="dependents"
                    label="Dependents"
                    fullWidth
                    error={touched.dependents && !!errors.dependents}
                    helperText={touched.dependents && errors.dependents}
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

export default DependentsInformation;