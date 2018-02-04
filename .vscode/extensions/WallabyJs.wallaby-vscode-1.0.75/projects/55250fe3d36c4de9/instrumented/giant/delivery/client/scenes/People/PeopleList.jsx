$_$wp(47);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import List, { ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import PersonListItem from './PersonListItem';
const styles = ($_$w(47, 0), {
    subheader: {
        display: 'flex',
        opacity: 0.5,
        justifyContent: 'space-between'
    }
});
const propTypes = ($_$w(47, 1), {
    persons: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    classes: PropTypes.object
});
function PeopleList({persons, onSelect, classes}) {
    $_$wf(47);
    return $_$w(47, 2), (
        <List
            subheader={(
                <ListSubheader className={classes.subheader}>
          <Typography>Name</Typography>
          <Typography>Contact By</Typography>
        </ListSubheader>
            )}>
      {persons.map(p => {
                $_$wf(47);
                return $_$w(47, 3), <PersonListItem key={`{person-list-item-${ p.id }`} person={p} onSelect={onSelect}/>;
            })}
    </List>
    );
}
$_$w(47, 4), PeopleList.propTypes = propTypes;
export default withStyles(styles)(PeopleList);
$_$wpe(47);