import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NavBar from '~/components/NavBar';
import ContactPersonForm from './ContactPersonForm';
import { ContactPersonContainer } from '.';

describe('delivery/client/scenes/ContactPerson', () => {
  const wrapper = shallow(
    <ContactPersonContainer params={{ id: '123' }} />,
    { disableLifecycleMethods: true }
  );

  it('is a React component', () => {
    expect(wrapper.exists()).to.eql(true);
  });

  it('is wrapped in a layout', () => {
    expect(wrapper.name()).to.eql('ComponentWithLayout');
  });

  it('contains a title with Contacts display name', () => {
    const title = wrapper.dive().find(NavBar).prop('title');
    expect(title).to.eql('Contact Nobody');
  });

  it('contains a ContactPerson Form', () => {
    const form = wrapper.dive().find(ContactPersonForm);
    expect(form.exists()).to.eql(true);
  });

  it('fetches person on mount', () => {
    // untested
    // parses id
    // fetches person
    // humanizes date
    // saves state
  });
});
