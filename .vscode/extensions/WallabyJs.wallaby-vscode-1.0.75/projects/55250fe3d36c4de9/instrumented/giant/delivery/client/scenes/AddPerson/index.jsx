$_$wp(41);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'found';
import { fetchAddPerson } from '~/api';
import layout from '~/layout';
import AddPersonForm from './AddPersonForm';
const AddPersonScene = ($_$w(41, 0), layout(AddPersonForm, 'Add Person'));
const propTypes = ($_$w(41, 1), { router: PropTypes.object });
class AddPersonContainer extends Component {
    constructor(props) {
        super(($_$wf(41), $_$w(41, 2), props));
        $_$w(41, 3), this.state = {
            person: {
                firstName: '',
                lastName: '',
                action: '',
                frequencyInDays: ''
            }
        };
    }
    updatePerson(props) {
        $_$wf(41);
        const {person} = ($_$w(41, 4), this.state);
        $_$w(41, 5), this.setState({
            person: {
                ...person,
                ...props
            }
        });
    }
    onChange(name, value) {
        $_$wf(41);
        $_$w(41, 6), this.updatePerson({ [name]: value });
    }
    onSubmit() {
        $_$wf(41);
        const {router} = ($_$w(41, 7), this.props);
        const {person} = ($_$w(41, 8), this.state);
        $_$w(41, 9), fetchAddPerson(person).then(addedPerson => {
            $_$wf(41);
            return $_$w(41, 10), this.updatePerson(addedPerson);
        }).then(() => {
            $_$wf(41);
            return $_$w(41, 11), router.push('/');
        });
    }
    render() {
        $_$wf(41);
        const {person} = ($_$w(41, 12), this.state);
        return $_$w(41, 13), (
            <AddPersonScene person={person}
                onChange={(name, value) => {
                    $_$wf(41);
                    return $_$w(41, 14), this.onChange(name, value);
                }}
                onSubmit={() => {
                    $_$wf(41);
                    return $_$w(41, 15), this.onSubmit();
                }}/>
        );
    }
}
$_$w(41, 16), AddPersonContainer.propTypes = propTypes;
export default withRouter(AddPersonContainer);
$_$wpe(41);