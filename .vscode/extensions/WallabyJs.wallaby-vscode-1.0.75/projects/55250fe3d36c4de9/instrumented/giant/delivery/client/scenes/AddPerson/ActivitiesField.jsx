$_$wp(36);
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
const LABEL = ($_$w(36, 0), 'What meaningful activities will help build your relationship?');
const NAME = ($_$w(36, 1), 'action');
const propTypes = ($_$w(36, 2), {
    action: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
});
function ActivitiesField({action, onChange}) {
    $_$wf(36);
    return $_$w(36, 3), (
        <TextField
            name={NAME}
            value={action}
            label={LABEL}
            placeholder='Hang out in-person, talk about farming, or Skype and beer' fullWidth
            onChange={ev => {
                $_$wf(36);
                return $_$w(36, 4), onChange(NAME, ev.target.value);
            }}/>
    );
}
$_$w(36, 5), ActivitiesField.propTypes = propTypes;
export default ActivitiesField;
$_$wpe(36);