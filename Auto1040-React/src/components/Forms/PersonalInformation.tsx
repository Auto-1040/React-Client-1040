import { Container,  Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";


const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(50).required('Required'),
  lastName: Yup.string().max(50).required('Required'),
  ssn: Yup.string().max(20).required('Required')
});

const PersonalInformation = () => {
    
const theme = useTheme();

  const handleSubmit = (values: any) => {
    console.log(values);
    // Logic to save form data
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{  color: theme.palette.text.primary,fontWeight: 'bold' }}>
          Personal Information
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            ssn: ''
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
                    name="firstName"
                    label="First Name"
                    fullWidth
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid size={18} >
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid size={18}>
                  <Field
                    as={TextField}
                    name="ssn"
                    label="SSN"
                    fullWidth
                    error={touched.ssn && !!errors.ssn}
                    helperText={touched.ssn && errors.ssn}
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

export default PersonalInformation;