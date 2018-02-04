import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    idealNextDate: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

function PersonListItem ({
  person: { id, firstName, lastName, idealNextDate },
  onSelect,
}) {
  return (
    <ListItem button divider onClick={() => onSelect(id)} >
      <ListItemText primary={`${firstName} ${lastName}`} />
      <Typography type="subheading" >{idealNextDate}</Typography>
    </ListItem>
  );
}

PersonListItem.propTypes = propTypes;
export default PersonListItem;
