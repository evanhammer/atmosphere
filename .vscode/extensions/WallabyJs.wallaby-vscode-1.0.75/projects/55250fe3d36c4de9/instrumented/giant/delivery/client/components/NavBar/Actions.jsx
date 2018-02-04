$_$wp(32);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import PeopleIcon from 'material-ui-icons/People';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
const styles = ($_$w(32, 0), {
    root: {
        color: 'white',
        '&:hover': { color: 'orange' }
    }
});
const icons = ($_$w(32, 1), [
    {
        Icon: PeopleIcon,
        name: 'people',
        path: '/',
        displayName: 'People'
    },
    {
        Icon: PersonAddIcon,
        name: 'add-person',
        path: '/add-person',
        displayName: 'Add Person'
    }
]);
const ActionsPropTypes = ($_$w(32, 2), {
    className: PropTypes.string,
    classes: PropTypes.object,
    onClick: PropTypes.func
});
function Actions({className, classes, onClick}) {
    $_$wf(32);
    return $_$w(32, 3), (
        <div className={className}>
      {icons.map(({Icon, name, path, displayName}) => {
                $_$wf(32);
                return $_$w(32, 4), (
                    <IconButton
                        key={name}
                        onTouchTap={() => {
                            $_$wf(32);
                            return $_$w(32, 5), onClick(path);
                        }}
                        aria-label={displayName}
                        className={classes.root}>
          <Icon/>
        </IconButton>
                );
            })}
    </div>
    );
}
$_$w(32, 6), Actions.propTypes = ActionsPropTypes;
export default withStyles(styles)(Actions);
$_$wpe(32);