import { Container, Paper, TextField, Typography, Button, Box, useTheme } from '@mui/material';
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

export interface SpouseFormData {
  spouseFirstName: string;
  spouseInitialName: string;
  spouseLastName: string;
  spouseSsn: string;
}

const validationSchema = Yup.object().shape({
  spouseFirstName: Yup.string().max(50).required('Spouse first name is required'),
  spouseInitialName: Yup.string().max(1),
  spouseLastName: Yup.string().max(50).required('Spouse last name is required'),
  spouseSsn: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format. Expected format: XXX-XX-XXXX')
    .required('Spouse SSN is required'),
});

const SpouseInformation = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootStore) => state.userInformation.userInfo) as SpouseFormData | null;
  const { nextTab } = useOutletContext<{ nextTab: () => void }>();
  const { openLogin } = useContext(ModalContext);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserInfo(user.id));
    }
  }, [dispatch, user]);

  const handleSubmit = (values: SpouseFormData) => {
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
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Spouse Information
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.secondary, mb: 3 }}>
          Please provide the information about your spouse.
        </Typography>
        <Formik
          initialValues={{
            spouseFirstName: userInfo?.spouseFirstName || '',
            spouseInitialName: userInfo?.spouseInitialName || '',
            spouseLastName: userInfo?.spouseLastName || '',
            spouseSsn: userInfo?.spouseSsn || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values: SpouseFormData) => handleSubmit(values)}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4.5 }}>
                  <Field
                    as={TextField}
                    name="spouseFirstName"
                    label="Spouse First Name"
                    fullWidth
                    error={touched.spouseFirstName && !!errors.spouseFirstName}
                    helperText={touched.spouseFirstName && errors.spouseFirstName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Field
                    as={TextField}
                    name="spouseInitialName"
                    label="Spouse Initial Name"
                    fullWidth
                    error={touched.spouseInitialName && !!errors.spouseInitialName}
                    helperText={touched.spouseInitialName && errors.spouseInitialName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4.5 }}>
                  <Field
                    as={TextField}
                    name="spouseLastName"
                    label="Spouse Last Name"
                    fullWidth
                    error={touched.spouseLastName && !!errors.spouseLastName}
                    helperText={touched.spouseLastName && errors.spouseLastName}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
                    The name entered here needs to match the name printed on your spouse's Social Security card.
                    This is not always similar to their passport or their Israeli ID - so make sure to get it right.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Field
                    as={TextField}
                    name="spouseSsn"
                    label="Spouse SSN"
                    fullWidth
                    error={touched.spouseSsn && !!errors.spouseSsn}
                    helperText={touched.spouseSsn && errors.spouseSsn}
                    placeholder="XXX-XX-XXXX"
                  />
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

export default SpouseInformation;