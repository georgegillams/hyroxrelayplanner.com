import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '@george-gillams/components/form-builder';

import { USERNAME_REGEX, EMAIL_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const SignUpForm = props => {
  const { onDataChanged, credentials, submitLabel, ...rest } = props;

  const onDataChangedCustom = newValue => {
    if (!newValue || !newValue.email) {
      onDataChanged(newValue);
      return;
    }
    const newEmail = newValue.email.split(' ').join('');
    onDataChanged({ ...newValue, email: newEmail });
  };

  return (
    <FormBuilder
      onDataChanged={onDataChangedCustom}
      entity={credentials}
      submitLabel={submitLabel || 'Sign up'}
      disabled={!credentials.consent}
      formFields={[
        {
          id: 'uname',
          name: 'Display name',
          validationRegex: USERNAME_REGEX,
          show: true,
          inputProps: {
            autofill: 'username',
          },
        },
        {
          id: 'email',
          name: 'Email',
          validationRegex: EMAIL_REGEX,
          show: true,
          inputProps: {
            spellCheck: 'false',
            autofill: 'email',
          },
        },
        {
          type: 'CHECKBOX',
          id: 'consent',
          name: 'I consent to the data entered above being stored.',
          show: true,
        },
      ]}
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

SignUpForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  credentials: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

SignUpForm.defaultProps = {
  submitLabel: null,
};

export default SignUpForm;
