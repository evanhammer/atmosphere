import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const NAME = 'frequencyInDays';

const propTypes = {
  frequencyInDays: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

function FrequencyField ({ frequencyInDays, onChange }) {
  return (
    <TextField
      name={NAME}
      value={frequencyInDays}
      type="number"
      fullWidth
      label="How often do you want to see them?"
      helperText="(in days)"
      placeholder="45"
      onChange={ev => onChange(NAME, ev.target.value)}
    />
  );
}

FrequencyField.propTypes = propTypes;
export default FrequencyField;
