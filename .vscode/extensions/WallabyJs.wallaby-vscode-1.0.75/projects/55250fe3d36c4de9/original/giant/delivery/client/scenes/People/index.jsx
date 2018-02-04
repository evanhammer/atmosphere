import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'found';
import { humanizeDate, getDateStr } from '~/util';
import { fetchPersons } from '~/api';
import layout from '~/layout';
import PeopleList from './PeopleList';

const PeopleScene = layout(PeopleList, 'People');

const propTypes = {
  router: PropTypes.object,
};

class PeopleContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  componentDidMount () {
    fetchPersons()
      .then(persons => {
        return persons.map(p => {
          const displayDate = humanizeDate(
            p.idealNextDate,
            getDateStr(moment())
          );
          return { ...p, idealNextDate: displayDate };
        });
      })
      .then(persons => this.setState({ persons }));
  }

  onSelect (id) {
    const { router } = this.props;
    router.push(`/contact-person/${id}`);
  }

  render () {
    const { persons } = this.state;
    return (
      <PeopleScene
        persons={persons}
        onSelect={(id) => this.onSelect(id)}
      />
    );
  }
}

PeopleContainer.propTypes = propTypes;
export default withRouter(PeopleContainer);
