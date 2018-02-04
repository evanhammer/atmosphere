import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'found';
import moment from 'moment';
import { humanizeDate, getDateStr, getMoment, getDisplayName } from '~/util';
import { fetchPerson, fetchEditPerson } from '~/api';
import layout from '~/layout';
import ContactPersonForm from './ContactPersonForm';

const propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  router: PropTypes.object,
};

export class ContactPersonContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      person: {
        id: 123,
        firstName: 'Nobody',
        lastName: '',
        action: 'Create Loading State',
        frequencyInDays: 45,
        idealNextDate: '2017.06.27',
        lastEvent: null,
        daysSinceLastEvent: null,
      },
    };
  }

  componentDidMount () {
    const id = parseInt(this.props.params.id, 10);
    fetchPerson({ id })
      .then(person => this.setState({ person }));
  }

  onContactedClick () {
    const { id } = this.state.person;
    const { router } = this.props;
    fetchEditPerson({ id, lastContactedAt: getDateStr(moment()) })
      .then(person => this.setState({ person }))
      .then(() => router.push('/'));
  }

  onAddEventClick () {
    const { router } = this.props;
    const { person } = this.state;
    router.push({ pathname: '/add-event', state: { person } });
  }

  render () {
    const { person } = this.state;
    const title = `Contact ${getDisplayName(person)}`;
    const ContactPersonScene = layout(ContactPersonForm, title);

    const todayStr = getDateStr(moment());
    const { idealNextDate, lastEvent } = person;
    const displayIdealNextDate = humanizeDate(idealNextDate, todayStr);
    const lastEventDate = lastEvent && lastEvent.startAt || '';
    const displayLastEventDate = humanizeDate(lastEventDate, todayStr);

    return (
      <ContactPersonScene { ...person }
        lastEventDate={displayLastEventDate}
        idealNextDate={displayIdealNextDate}
        daysSinceLastEvent={getMoment(lastEventDate).diff(moment(), 'days')}
        onContactedClick={() => this.onContactedClick()}
        onScheduledEventClick={() => this.onAddEventClick()}
        onDoneEventClick={() => this.onAddEventClick()}
      />
    );
  }
}

ContactPersonContainer.propTypes = propTypes;

export default withRouter(ContactPersonContainer);
