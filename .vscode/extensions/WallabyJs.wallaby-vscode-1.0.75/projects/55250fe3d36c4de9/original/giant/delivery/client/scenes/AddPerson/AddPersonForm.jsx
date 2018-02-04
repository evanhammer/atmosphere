import React from 'react';
import PropTypes from 'prop-types';
import NameFields from './NameFields';
import ActivitiesField from './ActivitiesField';
import FrequencyField from './FrequencyField';
import AddPersonButton from './AddPersonButton';

const propTypes = {
  person: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function AddPersonForm ({ person, onChange, onSubmit }) {
  return (
    <form>
      <NameFields onChange={onChange} { ...person } />
      <ActivitiesField onChange={onChange} { ...person } />
      <FrequencyField onChange={onChange} { ...person } />
      <AddPersonButton onClick={onSubmit} />
    </form>
  );
}

AddPersonForm.propTypes = propTypes;
export default AddPersonForm;
