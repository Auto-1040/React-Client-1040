import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Checkbox, FormGroup, Typography } from '@mui/material';
import { FieldProps } from 'formik';

interface FilingStatusProps {
  field: FieldProps['field'];
  touched: boolean;
  error: string | undefined;
}

const filingStatusOptions = [
  { label: 'Single', value: 'Single' },
  { label: 'Married filing jointly (even if only one had income)', value: 'MarriedFilingJointly' },
  { label: 'Married filing separately (MFS)', value: 'MarriedFilingSeparately' },
  { label: 'Head of household (HOH)', value: 'HeadOfHousehold' },
  { label: 'Qualifying surviving spouse (QSS)', value: 'QualifyingSurvivingSpouse' }
];

const FilingStatus: React.FC<FilingStatusProps> = ({ field, touched, error }) => {
  return (
    <FormControl component="fieldset" error={touched && !!error}>
      <FormLabel component="legend">Filing Status</FormLabel>
      <FormGroup>
        {filingStatusOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                {...field}
                checked={field.value === option.value}
                onChange={() => field.onChange({ target: { name: field.name, value: option.value } })}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {touched && error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export default FilingStatus;