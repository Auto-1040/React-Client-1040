import React from 'react';
import { Container, Grid, Paper, TextField, Typography, Button, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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
  const handleSubmit = (values: any) => {
    console.log(values);
    // Logic to save form data
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
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
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="homeAddress"
                    label="Home Address"
                    fullWidth
                    error={touched.homeAddress && !!errors.homeAddress}
                    helperText={touched.homeAddress && errors.homeAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    error={touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    error={touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    error={touched.zipCode && !!errors.zipCode}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="foreignCountry"
                    label="Foreign Country"
                    fullWidth
                    error={touched.foreignCountry && !!errors.foreignCountry}
                    helperText={touched.foreignCountry && errors.foreignCountry}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="foreignState"
                    label="Foreign State"
                    fullWidth
                    error={touched.foreignState && !!errors.foreignState}
                    helperText={touched.foreignState && errors.foreignState}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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