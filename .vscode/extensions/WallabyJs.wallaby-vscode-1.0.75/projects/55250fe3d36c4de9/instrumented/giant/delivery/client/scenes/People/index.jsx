$_$wp(49);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'found';
import {
    humanizeDate,
    getDateStr
} from '~/util';
import { fetchPersons } from '~/api';
import layout from '~/layout';
import PeopleList from './PeopleList';
const PeopleScene = ($_$w(49, 0), layout(PeopleList, 'People'));
const propTypes = ($_$w(49, 1), { router: PropTypes.object });
class PeopleContainer extends Component {
    constructor(props) {
        super(($_$wf(49), $_$w(49, 2), props));
        $_$w(49, 3), this.state = { persons: [] };
    }
    componentDidMount() {
        $_$wf(49);
        $_$w(49, 4), fetchPersons().then(persons => {
            $_$wf(49);
            return $_$w(49, 5), persons.map(p => {
                $_$wf(49);
                const displayDate = ($_$w(49, 6), humanizeDate(p.idealNextDate, getDateStr(moment())));
                return $_$w(49, 7), {
                    ...p,
                    idealNextDate: displayDate
                };
            });
        }).then(persons => {
            $_$wf(49);
            return $_$w(49, 8), this.setState({ persons });
        });
    }
    onSelect(id) {
        $_$wf(49);
        const {router} = ($_$w(49, 9), this.props);
        $_$w(49, 10), router.push(`/contact-person/${ id }`);
    }
    render() {
        $_$wf(49);
        const {persons} = ($_$w(49, 11), this.state);
        return $_$w(49, 12), (
            <PeopleScene persons={persons}
                onSelect={id => {
                    $_$wf(49);
                    return $_$w(49, 13), this.onSelect(id);
                }}/>
        );
    }
}
$_$w(49, 14), PeopleContainer.propTypes = propTypes;
export default withRouter(PeopleContainer);
$_$wpe(49);