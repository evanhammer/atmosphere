$_$wp(35);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'found';
import layout from '~/layout';
import {
    getDateStr,
    getDisplayName
} from '~/util';
import { fetchAddEvent } from '~/api';
import AddEventForm from './AddEventForm';
const AddEventScene = ($_$w(35, 0), layout(AddEventForm, 'Add Event'));
const propTypes = ($_$w(35, 1), {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
});
class AddEventContainer extends Component {
    constructor(props) {
        super(($_$wf(35), $_$w(35, 2), props));
        const {person} = ($_$w(35, 3), this.props.location.state);
        const {id, firstName, lastName} = ($_$w(35, 4), person);
        $_$w(35, 5), this.state = {
            event: {
                action: person.action,
                status: 'SCHEDULED',
                startAt: getDateStr(moment()),
                person: {
                    id,
                    firstName,
                    lastName
                }
            }
        };
    }
    updateEvent(props) {
        $_$wf(35);
        const {event} = ($_$w(35, 6), this.state);
        $_$w(35, 7), this.setState({
            event: {
                ...event,
                ...props
            }
        });
    }
    onChange(name, value) {
        $_$wf(35);
        $_$w(35, 8), this.updateEvent({ [name]: value });
    }
    onSubmit() {
        $_$wf(35);
        const {router} = ($_$w(35, 9), this.props);
        const {event} = ($_$w(35, 10), this.state);
        const {
            person,
            ...eventToSend
        } = ($_$w(35, 11), event);
        $_$w(35, 12), fetchAddEvent({
            ...eventToSend,
            personID: event.person.id
        }).then(addedEvent => {
            $_$wf(35);
            return $_$w(35, 13), this.updateEvent(addedEvent);
        }).then(() => {
            $_$wf(35);
            return $_$w(35, 14), router.push('/');
        });
    }
    render() {
        $_$wf(35);
        const {event} = ($_$w(35, 15), this.state);
        const personName = ($_$w(35, 16), getDisplayName({ ...event.person }));
        return $_$w(35, 17), (
            <AddEventScene
                event={event}
                personName={personName}
                onChange={(name, value) => {
                    $_$wf(35);
                    return $_$w(35, 18), this.onChange(name, value);
                }}
                onSubmit={() => {
                    $_$wf(35);
                    return $_$w(35, 19), this.onSubmit();
                }}/>
        );
    }
}
$_$w(35, 20), AddEventContainer.propTypes = propTypes;
export default withRouter(AddEventContainer);
$_$wpe(35);