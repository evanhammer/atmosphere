import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import PeopleIcon from 'material-ui-icons/People';
import PersonAddIcon from 'material-ui-icons/PersonAdd';

const styles = {
  root: {
    color: 'white',
    '&:hover': {
      color: 'orange',
    },
  },
};

const icons = [
  {
    Icon: PeopleIcon,
    name: 'people',
    path: '/',
    displayName: 'People',
  },
  {
    Icon: PersonAddIcon,
    name: 'add-person',
    path: '/add-person',
    displayName: 'Add Person',
  },
];

const ActionsPropTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  onClick: PropTypes.func,
};

function Actions ({ className, classes, onClick }) {
  return (
    <div className={className}>
      {icons.map(({ Icon, name, path, displayName }) => (
        <IconButton
          key={name}
          onTouchTap={() => onClick(path)}
          aria-label={ displayName }
          className={classes.root}
        >
          <Icon />
        </IconButton>
      ))}
    </div>
  );
}

Actions.propTypes = ActionsPropTypes;
export default withStyles(styles)(Actions);
