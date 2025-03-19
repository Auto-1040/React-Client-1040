import { Container, Paper, TextField, Typography, Button, Box, useTheme, MenuItem, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";
import { AppDispatch, RootStore } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from 'react';
import { addUserInfo, fetchUserInfo, updateUserInfo } from '../../store/UserInfoSlice';
import UserContext from '../user/UserContext';
import { useOutletContext } from 'react-router';
import { ModalContext } from '../ModalContext';

export interface AddressFormData {
  streetName: string;
  streetNumber: string;
  apartmentNumber: string;
  city: string;
  country: string;
  zipCode: string;
}

const validationSchema = Yup.object().shape({
  streetName: Yup.string().max(255).required('Street name is required'),
  streetNumber: Yup.string().max(10).required('Street number is required'),
  apartmentNumber: Yup.string().max(10),
  city: Yup.string().max(100).required('City is required'),
  country: Yup.string().max(100).required('Country is required'),
  zipCode: Yup.string().max(20).required('Zip code is required'),
});

const AddressInformation = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootStore) => state.userInformation.userInfo) as AddressFormData | null;
  const { nextTab } = useOutletContext<{ nextTab: () => void }>();
  const { openLogin } = useContext(ModalContext);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserInfo(user.id));
    }
  }, [dispatch, user]);

  const handleSubmit = (values: AddressFormData) => {
    console.log(values);
    if (user.id) {
      userInfo ? dispatch(updateUserInfo({ userId: user.id, userInfo: values }))
        : dispatch(addUserInfo({ userId: user.id, userInfo: values }));
      nextTab();
    } else {
      openLogin();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Your home address
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.secondary, mb: 3 }}>
          Unlike in the other parts of the questionnaire - here we need your CURRENT address, and not the one you lived in during 2024.
        </Typography>
        <Formik
          initialValues={{
            streetName: userInfo?.streetName || '',
            streetNumber: userInfo?.streetNumber || '',
            apartmentNumber: userInfo?.apartmentNumber || '',
            city: userInfo?.city || '',
            country: userInfo?.country || 'Israel',
            zipCode: userInfo?.zipCode || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Field
                    as={TextField}
                    name="streetName"
                    label="Street name"
                    fullWidth
                    error={touched.streetName && !!errors.streetName}
                    helperText={touched.streetName && errors.streetName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Field
                    as={TextField}
                    name="streetNumber"
                    label="Street number"
                    fullWidth
                    error={touched.streetNumber && !!errors.streetNumber}
                    helperText={touched.streetNumber && errors.streetNumber}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Field
                    as={TextField}
                    name="apartmentNumber"
                    label="Apartment number"
                    fullWidth
                    error={touched.apartmentNumber && !!errors.apartmentNumber}
                    helperText={touched.apartmentNumber && errors.apartmentNumber}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    error={touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Field
                    as={TextField}
                    name="country"
                    label="Country"
                    select
                    fullWidth
                    error={touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                  >
                    <MenuItem value="Israel">Israel</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    {/* Add more countries as needed */}
                  </Field>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Field
                    as={TextField}
                    name="zipCode"
                    label="Zip code"
                    fullWidth
                    error={touched.zipCode && !!errors.zipCode}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                  <Link href="https://doar.israelpost.co.il/locatezip" target="_blank" rel="noopener" sx={{ display: 'block', mt: 1 }}>
                    Find your Zip
                  </Link>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ textTransform: 'none' }}
                >
                  Continue
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