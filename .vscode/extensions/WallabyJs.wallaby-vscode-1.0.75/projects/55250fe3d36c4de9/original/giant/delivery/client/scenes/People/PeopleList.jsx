import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import List, { ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import PersonListItem from './PersonListItem';

const styles = {
  subheader: {
    display: 'flex',
    opacity: .5,
    justifyContent: 'space-between',
  },
};

const propTypes = {
  persons: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

function PeopleList ({ persons, onSelect, classes }) {
  return (
    <List
      subheader={(
        <ListSubheader className={classes.subheader}>
          <Typography>Name</Typography>
          <Typography>Contact By</Typography>
        </ListSubheader>
      )}
    >
      {persons.map(p => (
        <PersonListItem
          key={`{person-list-item-${p.id}`}
          person={p}
          onSelect={onSelect}
        />
      ))}
    </List>
  );
}

PeopleList.propTypes = propTypes;
export default withStyles(styles)(PeopleList);
