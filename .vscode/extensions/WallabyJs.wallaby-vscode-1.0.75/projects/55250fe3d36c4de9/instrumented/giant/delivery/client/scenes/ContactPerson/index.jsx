$_$wp(45);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'found';
import moment from 'moment';
import {
    humanizeDate,
    getDateStr,
    getMoment,
    getDisplayName
} from '~/util';
import {
    fetchPerson,
    fetchEditPerson
} from '~/api';
import layout from '~/layout';
import ContactPersonForm from './ContactPersonForm';
const propTypes = ($_$w(45, 0), {
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    router: PropTypes.object
});
export class ContactPersonContainer extends Component {
    constructor(props) {
        super(($_$wf(45), $_$w(45, 1), props));
        $_$w(45, 2), this.state = {
            person: {
                id: 123,
                firstName: 'Nobody',
                lastName: '',
                action: 'Create Loading State',
                frequencyInDays: 45,
                idealNextDate: '2017.06.27',
                lastEvent: null,
                daysSinceLastEvent: null
            }
        };
    }
    componentDidMount() {
        $_$wf(45);
        const id = ($_$w(45, 3), parseInt(this.props.params.id, 10));
        $_$w(45, 4), fetchPerson({ id }).then(person => {
            $_$wf(45);
            return $_$w(45, 5), this.setState({ person });
        });
    }
    onContactedClick() {
        $_$wf(45);
        const {id} = ($_$w(45, 6), this.state.person);
        const {router} = ($_$w(45, 7), this.props);
        $_$w(45, 8), fetchEditPerson({
            id,
            lastContactedAt: getDateStr(moment())
        }).then(person => {
            $_$wf(45);
            return $_$w(45, 9), this.setState({ person });
        }).then(() => {
            $_$wf(45);
            return $_$w(45, 10), router.push('/');
        });
    }
    onAddEventClick() {
        $_$wf(45);
        const {router} = ($_$w(45, 11), this.props);
        const {person} = ($_$w(45, 12), this.state);
        $_$w(45, 13), router.push({
            pathname: '/add-event',
            state: { person }
        });
    }
    render() {
        $_$wf(45);
        const {person} = ($_$w(45, 14), this.state);
        const title = ($_$w(45, 15), `Contact ${ getDisplayName(person) }`);
        const ContactPersonScene = ($_$w(45, 16), layout(ContactPersonForm, title));
        const todayStr = ($_$w(45, 17), getDateStr(moment()));
        const {idealNextDate, lastEvent} = ($_$w(45, 18), person);
        const displayIdealNextDate = ($_$w(45, 19), humanizeDate(idealNextDate, todayStr));
        const lastEventDate = ($_$w(45, 20), ($_$w(45, 21), ($_$w(45, 23), lastEvent) && ($_$w(45, 24), lastEvent.startAt)) || ($_$w(45, 22), ''));
        const displayLastEventDate = ($_$w(45, 25), humanizeDate(lastEventDate, todayStr));
        return $_$w(45, 26), (
            <ContactPersonScene {...person}
                lastEventDate={displayLastEventDate}
                idealNextDate={displayIdealNextDate}
                daysSinceLastEvent={getMoment(lastEventDate).diff(moment(), 'days')}
                onContactedClick={() => {
                    $_$wf(45);
                    return $_$w(45, 27), this.onContactedClick();
                }}
                onScheduledEventClick={() => {
                    $_$wf(45);
                    return $_$w(45, 28), this.onAddEventClick();
                }}
                onDoneEventClick={() => {
                    $_$wf(45);
                    return $_$w(45, 29), this.onAddEventClick();
                }}/>
        );
    }
}
$_$w(45, 30), ContactPersonContainer.propTypes = propTypes;
export default withRouter(ContactPersonContainer);
$_$wpe(45);