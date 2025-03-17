import { Container, Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";

export interface AddressFormData {
  homeAddress: string;
  city: string;
  state: string;
  zipCode: string;
  foreignCountry: string;
  foreignState: string;
  foreignPostalCode: string;
}

const validationSchema = Yup.object().shape({
  homeAddress: Yup.string().max(255),
  city: Yup.string().max(100),
  state: Yup.string().max(50),
  zipCode: Yup.string().max(20),
  foreignCountry: Yup.string().max(100),
  foreignState: Yup.string().max(100),
  foreignPostalCode: Yup.string().max(20)
});

const AddressInformation = () => {
  const theme = useTheme();

  const handleSubmit = (values: AddressFormData) => {
    console.log(values);
    // Logic to save form data
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Address Information
        </Typography>
        <Formik
          initialValues={{
            homeAddress: '',
            city: '',
            state: '',
            zipCode: '',
            foreignCountry: '',
            foreignState: '',
            foreignPostalCode: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid size={18}>
                  <Field
                    as={TextField}
                    name="homeAddress"
                    label="Home Address"
                    fullWidth
                    error={touched.homeAddress && !!errors.homeAddress}
                    helperText={touched.homeAddress && errors.homeAddress}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    error={touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    error={touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    error={touched.zipCode && !!errors.zipCode}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="foreignCountry"
                    label="Foreign Country"
                    fullWidth
                    error={touched.foreignCountry && !!errors.foreignCountry}
                    helperText={touched.foreignCountry && errors.foreignCountry}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="foreignState"
                    label="Foreign State"
                    fullWidth
                    error={touched.foreignState && !!errors.foreignState}
                    helperText={touched.foreignState && errors.foreignState}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    as={TextField}
                    name="foreignPostalCode"
                    label="Foreign Postal Code"
                    fullWidth
                    error={touched.foreignPostalCode && !!errors.foreignPostalCode}
                    helperText={touched.foreignPostalCode && errors.foreignPostalCode}
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

export default AddressInformation;