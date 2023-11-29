import React from 'react';
import PropTypes from 'prop-types';
import FormBuilder from '@george-gillams/components/form-builder';

const CreateNotificationForm = props => {
  const { notification, onDataChanged, onSubmit, submitLabel, ...rest } = props;

  return (
    <FormBuilder
      onDataChanged={onDataChanged}
      entity={notification}
      submitLabel={submitLabel || 'Create notification'}
      formFields={[
        {
          id: 'message',
          name: 'Message',
          show: true,
        },
        {
          id: 'type',
          name: 'Type',
          type: 'SELECT',
          options: [
            { value: 'success', name: 'Success (green)' },
            { value: 'warn', name: 'Warning (orange)' },
            { value: 'error', name: 'Error (red)' },
          ],
          show: true,
        },
      ]}
      onSubmit={onSubmit}
      test={process.env.NODE_ENV === 'test'}
      {...rest}
    />
  );
};

CreateNotificationForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notification: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

CreateNotificationForm.defaultProps = {
  submitLabel: null,
};

export default CreateNotificationForm;
