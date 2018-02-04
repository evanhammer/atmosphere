import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'found';
import layout from '~/layout';
import { getDateStr, getDisplayName } from '~/util';
import { fetchAddEvent } from '~/api';
import AddEventForm from './AddEventForm';

const AddEventScene = layout(AddEventForm, 'Add Event');

const propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

class AddEventContainer extends Component {

  constructor (props) {
    super(props);
    const { person } = this.props.location.state;
    const { id, firstName, lastName } = person;
    this.state = {
      event: {
        action: person.action,
        status: 'SCHEDULED',
        startAt: getDateStr(moment()),
        person: { id, firstName, lastName },
      },
    };
  }

  updateEvent (props) {
    const { event } = this.state;
    this.setState({ event: { ...event, ...props } });
  }

  onChange (name, value) {
    this.updateEvent({ [name]: value });
  }

  onSubmit () {
    const { router } = this.props;
    const { event } = this.state;
    const { person, ...eventToSend } = event;
    fetchAddEvent({ ...eventToSend, personID: event.person.id })
      .then(addedEvent => this.updateEvent(addedEvent))
      .then(() => router.push('/'));
  }


  render () {
    const { event } = this.state;
    const personName = getDisplayName({ ...event.person });
    return (
      <AddEventScene
        event={event}
        personName={personName}
        onChange={(name, value) => this.onChange(name, value)}
        onSubmit={() => this.onSubmit()}
      />
    );
  }
}

AddEventContainer.propTypes = propTypes;
export default withRouter(AddEventContainer);
