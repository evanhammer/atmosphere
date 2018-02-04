import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import TextField from 'material-ui/TextField';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  child: {
    flexBasis: '40%',
  },
};

const propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

function NameFields ({ firstName, lastName, classes, onChange }) {
  return (
    <div className={classes.root}>
      <TextField
        name="firstName"
        value={firstName}
        required
        label="First Name"
        placeholder="Nora"
        className={classes.child}
        onChange={ev => onChange('firstName', ev.target.value)}
      />
      <TextField
        name="lastName"
        value={lastName}
        label="Last Name"
        placeholder="Samir"
        className={classes.child}
        onChange={ev => onChange('lastName', ev.target.value)}
      />
    </div>
  );
}

NameFields.propTypes = propTypes;
export default withStyles(styles)(NameFields);
