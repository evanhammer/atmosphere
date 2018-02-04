$_$wp(37);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import Button from 'material-ui/Button';
const styles = ($_$w(37, 0), { root: { width: '100%' } });
const propTypes = ($_$w(37, 1), {
    classes: PropTypes.object,
    onClick: PropTypes.func.isRequired
});
function AddPersonButton({classes, onClick}) {
    $_$wf(37);
    return $_$w(37, 2), (
        <Button raised
            className={classes.root} color='primary'
            onClick={onClick}>
      Add Person
    </Button>
    );
}
$_$w(37, 3), AddPersonButton.propTypes = propTypes;
export default withStyles(styles)(AddPersonButton);
$_$wpe(37);