$_$wp(39);
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
const NAME = ($_$w(39, 0), 'frequencyInDays');
const propTypes = ($_$w(39, 1), {
    frequencyInDays: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
});
function FrequencyField({frequencyInDays, onChange}) {
    $_$wf(39);
    return $_$w(39, 2), (
        <TextField
            name={NAME}
            value={frequencyInDays} type='number'
            fullWidth label='How often do you want to see them?' helperText='(in days)'
            placeholder='45'
            onChange={ev => {
                $_$wf(39);
                return $_$w(39, 3), onChange(NAME, ev.target.value);
            }}/>
    );
}
$_$w(39, 4), FrequencyField.propTypes = propTypes;
export default FrequencyField;
$_$wpe(39);