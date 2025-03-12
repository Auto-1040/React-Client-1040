import { Container, Paper, TextField, Typography, Button, Box, useTheme, FormControl, FormControlLabel, FormLabel, Checkbox, FormGroup } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from "@mui/material/Grid2";
import { AppDispatch, RootStore } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from 'react';
import { addUserInfo, fetchUserInfo, updateUserInfo } from '../../store/UserInfoSlice';
import UserContext from '../User/UserContext';
import { useOutletContext } from 'react-router';

export interface PersonalFormData {
  firstName: string;
  middleInitial: string;
  lastName: string;
  ssn: string;
  filingStatus: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(50).required('Required'),
  middleInitial: Yup.string().max(1),
  lastName: Yup.string().max(50).required('Required'),
  ssn: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format. Expected format: XXX-XX-XXXX')
    .required('Required'),
  filingStatus: Yup.string().required('Required')
});

const filingStatusOptions = [
  'Single',
  'Married filing jointly (even if only one had income)',
  'Married filing separately (MFS)',
  'Head of household (HOH)',
  'Qualifying surviving spouse (QSS)'
];

const PersonalInformation = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootStore) => state.userInformation.userInfo) as PersonalFormData | null;
  const { nextTab } = useOutletContext<{ nextTab: () => void }>();

  useEffect(() => {
    console.log(user.id);
    dispatch(fetchUserInfo(user.id ?? 0));
  }, [dispatch, user.id]);

  const handleSubmit = (values: PersonalFormData) => {
    console.log(values);
    userInfo ? dispatch(updateUserInfo({ userId: user.id ?? 0, userInfo: values }))
      : dispatch(addUserInfo({ userId: user.id ?? 0, userInfo: values }));
    nextTab();
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Let’s get to learn about you
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.secondary, mb: 3 }}>
          To start the process, we need to get to know you. We'll start with gathering basic information.
        </Typography>
        <Formik
          initialValues={{
            firstName: userInfo?.firstName || '',
            middleInitial: userInfo?.middleInitial || '',
            lastName: userInfo?.lastName || '',
            ssn: userInfo?.ssn || '',
            filingStatus: userInfo?.filingStatus || ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values: PersonalFormData) => handleSubmit(values)}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4.5 }}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Field
                    as={TextField}
                    name="middleInitial"
                    label="Middle Initial"
                    fullWidth
                    error={touched.middleInitial && !!errors.middleInitial}
                    helperText={touched.middleInitial && errors.middleInitial}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4.5 }}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
                    The name entered here needs to match the name printed on your Social Security card.
                    This is not always similar to your passport or your Israeli ID - so make sure to get it right.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="ssn"
                    label="SSN"
                    fullWidth
                    error={touched.ssn && !!errors.ssn}
                    helperText={touched.ssn && errors.ssn}
                    placeholder="XXX-XX-XXXX"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl component="fieldset" error={touched.filingStatus && !!errors.filingStatus}>
                    <FormLabel component="legend">Filing Status</FormLabel>
                    <Field name="filingStatus">
                      {({ field }: { field: any }) => (
                        <FormGroup>
                          {filingStatusOptions.map((option) => (
                            <FormControlLabel
                              key={option}
                              control={
                                <Checkbox
                                  {...field}
                                  checked={field.value === option}
                                  onChange={() => field.onChange({ target: { name: field.name, value: option } })}
                                />
                              }
                              label={option}
                            />
                          ))}
                        </FormGroup>
                      )}
                    </Field>
                    {touched.filingStatus && errors.filingStatus && (
                      <Typography variant="body2" color="error">
                        {errors.filingStatus}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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

export default PersonalInformation;