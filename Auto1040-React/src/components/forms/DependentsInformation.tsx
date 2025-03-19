import { Container, Paper, Typography, Button, Box, useTheme, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppDispatch, RootStore } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from 'react';
import { addUserInfo, fetchUserInfo, updateUserInfo } from '../../store/UserInfoSlice';
import UserContext from '../user/UserContext';
import { useOutletContext } from 'react-router';
import { ModalContext } from '../ModalContext';

export interface DependentsFormData {
  hasDependents: string;
}

const validationSchema = Yup.object().shape({
  hasDependents: Yup.string().required('Please select an option'),
});

const DependentsInformation = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootStore) => state.userInformation.userInfo) as DependentsFormData | null;
  const { nextTab } = useOutletContext<{ nextTab: () => void }>();
  const { openLogin } = useContext(ModalContext);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserInfo(user.id));
    }
  }, [dispatch, user]);

  const handleSubmit = (values: DependentsFormData) => {
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
          Dependents
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.secondary, mb: 3 }}>
          Moving on to the rest of the family.
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: theme.palette.text.primary, mb: 3 }}>
          Do you have Dependents you want to include on your 2024 tax return
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: theme.palette.text.secondary, mb: 3 }}>
          A dependent is someone who:
          <br />
          (1) lived with you for at least six months during 2024 (or born in 2024);
          <br />
          (2) you have financially supported at least 50% of his/her expenses; and,
          <br />
          (3) had a valid Social Security Number (an ITIN is not sufficient for this) by June 15, 2025, unless you filed an extension to file your 2024 tax return, in which case the SSN could have been obtained by October 15, 2025.
          <br />
          A parent or other relative can be claimed as a dependent as well, if they meet the above criteria.
        </Typography>
        <Formik
          initialValues={{
            hasDependents: userInfo?.hasDependents || 'no',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl component="fieldset" error={touched.hasDependents && !!errors.hasDependents}>
                <FormLabel component="legend">Do you have Dependents?</FormLabel>
                <Field as={RadioGroup} name="hasDependents">
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                </Field>
                {touched.hasDependents && errors.hasDependents && (
                  <Typography variant="body2" color="error">
                    {errors.hasDependents}
                  </Typography>
                )}
              </FormControl>
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

export default DependentsInformation;