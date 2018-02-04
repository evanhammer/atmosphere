import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const LABEL = 'What meaningful activities will help build your relationship?';
const NAME = 'action';

const propTypes = {
  action: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function ActivitiesField ({ action, onChange }) {
  return (
    <TextField
      name={NAME}
      value={action}
      label={LABEL}
      placeholder="Hang out in-person, talk about farming, or Skype and beer"
      fullWidth
      onChange={ev => onChange(NAME, ev.target.value)}
    />
  );
}

ActivitiesField.propTypes = propTypes;
export default ActivitiesField;
