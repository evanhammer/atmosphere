$_$wp(40);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import TextField from 'material-ui/TextField';
const styles = ($_$w(40, 0), {
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    child: { flexBasis: '40%' }
});
const propTypes = ($_$w(40, 1), {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object
});
function NameFields({firstName, lastName, classes, onChange}) {
    $_$wf(40);
    return $_$w(40, 2), (
        <div className={classes.root}>
      <TextField name='firstName'
                value={firstName} required
                label='First Name' placeholder='Nora'
                className={classes.child}
                onChange={ev => {
                    $_$wf(40);
                    return $_$w(40, 3), onChange('firstName', ev.target.value);
                }}/>
      <TextField name='lastName'
                value={lastName} label='Last Name'
                placeholder='Samir'
                className={classes.child}
                onChange={ev => {
                    $_$wf(40);
                    return $_$w(40, 4), onChange('lastName', ev.target.value);
                }}/>
    </div>
    );
}
$_$w(40, 5), NameFields.propTypes = propTypes;
export default withStyles(styles)(NameFields);
$_$wpe(40);