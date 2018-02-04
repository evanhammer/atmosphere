import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'found';
import { fetchAddPerson } from '~/api';
import layout from '~/layout';
import AddPersonForm from './AddPersonForm';

const AddPersonScene = layout(AddPersonForm, 'Add Person');

const propTypes = {
  router: PropTypes.object,
};

class AddPersonContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      person: {
        firstName: '',
        lastName: '',
        action: '',
        frequencyInDays: '',
      },
    };
  }

  updatePerson (props) {
    const { person } = this.state;
    this.setState({ person: { ...person, ...props } });
  }

  onChange (name, value) {
    this.updatePerson({ [name]: value });
  }

  onSubmit () {
    const { router } = this.props;
    const { person } = this.state;
    fetchAddPerson(person)
      .then(addedPerson => this.updatePerson(addedPerson))
      .then(() => router.push('/'));
  }

  render () {
    const { person } = this.state;
    return (
      <AddPersonScene
        person={person}
        onChange={(name, value) => this.onChange(name, value)}
        onSubmit={() => this.onSubmit()}
      />
    );
  }
}

AddPersonContainer.propTypes = propTypes;
export default withRouter(AddPersonContainer);
