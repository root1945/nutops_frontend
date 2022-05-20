import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

import InputMask from 'react-input-mask';

export default function InputPhone(props) {
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
        <TextField
          {...props}
          error={isErrorPhone && focusError}
          helperText={meta?.error && focusError ? meta?.error : false}
        />
      )}
    </InputMask>
  );
}
