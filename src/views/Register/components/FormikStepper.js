/* eslint-disable no-nested-ternary */
import React, { Children, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { Form, Formik } from 'formik';

import axiosInt from 'src/utils/axios';
import BoxActions from './BoxActions';

function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();

  function isLastStep() {
    return step === childrenArray.length - 2;
  }

  const isExistsUser = useMutation(async (values) => {
    const response = await axiosInt.get('/user/isExists', {
      params: {
        email: values.email,
        phone: values.phone,
      },
    });
    return response.data;
  });

  function isFirstStep() {
    return step === 0;
  }

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isFirstStep()) {
          await isExistsUser.mutateAsync(values, {
            onSuccess: (response) => {
              if (!response.user) {
                helpers.setTouched({});
                setStep((s) => s + 1);
              } else {
                enqueueSnackbar(t('Email and/or Phone already registered!'), {
                  variant: 'warning',
                });
              }
            },
          });
          return;
        }
        if (isLastStep()) {
          const result = await props.onSubmit(values, helpers);
          if (result === 'success') {
            setCompleted(true);
            setStep((s) => s + 1);
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          {!completed ? (
            <BoxActions
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                disabled={isSubmitting || step === 0}
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => setStep((s) => s - 1)}
              >
                {t('Previous')}
              </Button>

              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? t('Submitting')
                  : isLastStep()
                  ? t('Complete registration')
                  : t('Next step')}
              </Button>
            </BoxActions>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

export default FormikStepper;
