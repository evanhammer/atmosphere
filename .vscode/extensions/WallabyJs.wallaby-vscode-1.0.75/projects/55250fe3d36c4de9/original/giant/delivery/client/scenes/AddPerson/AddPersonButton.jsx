import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import Button from 'material-ui/Button';

const styles = {
  root: {
    width: '100%',
  },
};

const propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

function AddPersonButton ({ classes, onClick }) {
  return (
    <Button raised className={classes.root} color="primary" onClick={onClick}>
      Add Person
    </Button>
  );
}

AddPersonButton.propTypes = propTypes;
export default withStyles(styles)(AddPersonButton);
