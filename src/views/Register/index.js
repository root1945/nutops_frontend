import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Container,
  Button,
  Card,
  Grid,
  Box,
  Link,
  Collapse,
  Alert,
  IconButton,
  TextField as TextFieldMui,
} from '@mui/material';
import { Field, useField } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

import InputMask from 'react-input-mask';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import axiosInt from 'src/utils/axios';

import FormikStepper from './components/FormikStepper';
import FormikStep from './components/FormikStep';
import MainContent from './components/MainContent';
import AvatarSuccess from './components/AvatarSuccess';

function InputPhone(props) {
  const [focusError, setFocusError] = useState(false);
  const [, meta, helpers] = useField(props.name);

  const isErrorPhone = !!meta?.error;

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <InputMask
      mask="(99) 99999-9999"
      alwaysShowMask={false}
      value={value}
      onFocus={() => setFocusError(true)}
      onChange={(event) => setValue(event.target.value)}
      maskChar="_"
    >
      {() => (
        <TextFieldMui
          {...props}
          error={isErrorPhone && focusError}
          helperText={meta?.error}
        />
      )}
    </InputMask>
  );
}

function RegisterWizard() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [openAlert, setOpenAlert] = useState(true);

  const createUser = useMutation(async (values) => {
    const response = await axiosInt.post('/user/', {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      password: values.password,
      companyName: values.companyName,
      companyPhone: values.companyPhone,
      companySector: values.companySector,
    });
    return response;
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Card sx={{ mt: 1, pt: 4 }}>
            <Box px={4}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                {t('Create account')}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 3 }}
              >
                {t('Fill in the fields below to sign up for an account.')}
              </Typography>
            </Box>
            <FormikStepper
              initialValues={{
                firstName: '',
                lastName: '',
                terms: true,
                promo: true,
                password: '',
                password_confirm: '',
                email: '',
                phone: '',
                companyName: '',
                companyPhone: '',
                companySector: '',
              }}
              onSubmit={async (values) => {
                let status = '';

                await createUser.mutateAsync(values, {
                  onSuccess: (response) => {
                    status = response?.data?.status;

                    if (status === 'success') {
                      enqueueSnackbar('Sucesso! ', {
                        variant: 'success',
                      });
                    }
                  },

                  onError: (err) => {
                    status = err?.status;

                    if (status === 'error') {
                      enqueueSnackbar(
                        t('An error has occurred, please try again'),
                        {
                          variant: 'error',
                        }
                      );
                    }

                    if (status === 'warn') {
                      enqueueSnackbar(err?.message, {
                        variant: 'warning',
                      });
                    }
                  },
                });

                return status;
              }}
            >
              <FormikStep
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(
                      t('The email provided should be a valid email address')
                    )
                    .max(255)
                    .required(t('The email field is required')),
                  firstName: Yup.string()
                    .max(255)
                    .required(t('The first name field is required')),
                  lastName: Yup.string()
                    .max(255)
                    .required(t('The last name field is required')),
                  phone: Yup.string()
                    .required(t('The phone field is required'))
                    .matches(/^[^A-Za-z]+$/g, t('Phone number is not valid'))
                    .min(11, t('Phone number is not valid'))
                    .transform((currentValue) =>
                      currentValue.replace(/[^0-9]+/g, '')
                    ),
                  password: Yup.string()
                    .min(8)
                    .max(255)
                    .required(t('The password field is required')),
                  password_confirm: Yup.string()
                    .oneOf(
                      [Yup.ref('password')],
                      t('Both password fields need to be the same')
                    )
                    .required(t('This field is required')),
                })}
                label={t('Personal Informations')}
              >
                <Box p={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="firstName"
                        component={TextField}
                        label={t('First name')}
                        placeholder={t('Write your first name here...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="lastName"
                        component={TextField}
                        label={t('Last name')}
                        placeholder={t('Write your last name here...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="email"
                        component={TextField}
                        label={t('Email')}
                        placeholder={t('Write your email here...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} />
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        type="password"
                        name="password"
                        component={TextField}
                        label={t('Password')}
                        placeholder={t('Write a password here...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        type="password"
                        name="password_confirm"
                        component={TextField}
                        label={t('Confirm password')}
                        placeholder={t('Confirm password here...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputPhone
                        fullWidth
                        label={t('Phone number')}
                        name="phone"
                        margin="normal"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="promo"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        Label={{
                          label: t(
                            'Yes, I want to receive monthly promotional materials.'
                          ),
                        }}
                      />
                      <br />
                      <Field
                        name="terms"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        Label={{
                          label: (
                            <Typography variant="body2">
                              {t('I accept the')}{' '}
                              <Link component="a" href="#">
                                {t('terms and conditions')}
                              </Link>
                              .
                            </Typography>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep
                validationSchema={Yup.object().shape({
                  companyPhone: Yup.string()
                    .max(55)
                    .required(t('The company phone field is required')),
                  companyName: Yup.string()
                    .max(255)
                    .required(t('The company name field is required')),
                  companySector: Yup.string()
                    .max(255)
                    .required(t('The company sector field is required')),
                })}
                label={t('Company Details')}
              >
                <Box p={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="companyName"
                        component={TextField}
                        label={t('Company name')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="companyPhone"
                        component={TextField}
                        label={t('Company phone')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="companySector"
                        component={TextField}
                        label={t('Company sector')}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep label={t('Complete Registration')}>
                <Box px={4} py={8}>
                  <Container maxWidth="sm">
                    <AvatarSuccess>
                      <CheckTwoToneIcon />
                    </AvatarSuccess>
                    <Collapse in={openAlert}>
                      <Alert
                        sx={{ mt: 5 }}
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpenAlert(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        severity="info"
                      >
                        {t(
                          'A confirmation has been sent to your email address'
                        )}
                      </Alert>
                    </Collapse>
                    <Typography
                      align="center"
                      sx={{ pt: 5, pb: 4, lineHeight: 1.5, px: 10 }}
                      variant="h2"
                    >
                      {t(
                        'Check your email to confirm your email and start using your account'
                      )}
                    </Typography>
                    <Button fullWidth variant="contained" href="/account/login">
                      {t('Continue to sign in')}
                    </Button>
                  </Container>
                </Box>
              </FormikStep>
            </FormikStepper>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default RegisterWizard;
