$_$wp(38);
import React from 'react';
import PropTypes from 'prop-types';
import NameFields from './NameFields';
import ActivitiesField from './ActivitiesField';
import FrequencyField from './FrequencyField';
import AddPersonButton from './AddPersonButton';
const propTypes = ($_$w(38, 0), {
    person: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
});
function AddPersonForm({person, onChange, onSubmit}) {
    $_$wf(38);
    return $_$w(38, 1), (
        <form>
      <NameFields onChange={onChange} {...person}/>
      <ActivitiesField onChange={onChange} {...person}/>
      <FrequencyField onChange={onChange} {...person}/>
      <AddPersonButton onClick={onSubmit}/>
    </form>
    );
}
$_$w(38, 2), AddPersonForm.propTypes = propTypes;
export default AddPersonForm;
$_$wpe(38);