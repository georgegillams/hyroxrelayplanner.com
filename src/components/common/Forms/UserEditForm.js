import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '@george-gillams/components/form-builder';

import { EMAIL_REGEX, USERNAME_REGEX, NAME_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const UserEditForm = props => {
  const { user, showAdminControls, onDataChanged, ...rest } = props;

  const onDataChangedCustom = newValue => {
    if (!newValue.email) {
      onDataChanged(newValue);
      return;
    }
    const newEmail = newValue.email.split(' ').join('');
    onDataChanged({ ...newValue, email: newEmail });
  };

  return (
    <FormBuilder
      onDataChanged={onDataChangedCustom}
      entity={user}
      submitLabel="Update"
      formFields={[
        {
          id: 'uname',
          name: 'Display name',
          validationRegex: USERNAME_REGEX,
          show: true,
          inputProps: {
            spellCheck: 'false',
          },
        },
        {
          id: 'name',
          name: 'Real name',
          validationRegex: NAME_REGEX,
          show: true,
          inputProps: {
            spellCheck: 'false',
            autofill: 'name',
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
          id: 'admin',
          name: 'Is admin',
          show: showAdminControls,
          type: 'CHECKBOX',
        },
      ]}
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

UserEditForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showAdminControls: PropTypes.bool,
};

UserEditForm.defaultProps = {
  showAdminControls: false,
};

export default UserEditForm;
