$_$wp(48);
import React from 'react';
import PropTypes from 'prop-types';
import {
    ListItem,
    ListItemText
} from 'material-ui/List';
import Typography from 'material-ui/Typography';
const propTypes = ($_$w(48, 0), {
    person: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        idealNextDate: PropTypes.string.isRequired
    }).isRequired,
    onSelect: PropTypes.func.isRequired
});
function PersonListItem({
    person: {id, firstName, lastName, idealNextDate},
    onSelect
}) {
    $_$wf(48);
    return $_$w(48, 1), (
        <ListItem button divider
            onClick={() => {
                $_$wf(48);
                return $_$w(48, 2), onSelect(id);
            }}>
      <ListItemText primary={`${ firstName } ${ lastName }`}/>
      <Typography type='subheading'>{idealNextDate}</Typography>
    </ListItem>
    );
}
$_$w(48, 3), PersonListItem.propTypes = propTypes;
export default PersonListItem;
$_$wpe(48);