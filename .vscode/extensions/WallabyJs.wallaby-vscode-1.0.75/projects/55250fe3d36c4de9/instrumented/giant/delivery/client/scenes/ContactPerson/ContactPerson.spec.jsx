$_$wp(42);
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NavBar from '~/components/NavBar';
import ContactPersonForm from './ContactPersonForm';
import { ContactPersonContainer } from '.';
$_$w(42, 0), describe('delivery/client/scenes/ContactPerson', () => {
    $_$wf(42);
    const wrapper = ($_$w(42, 1), shallow(<ContactPersonContainer params={{ id: '123' }}/>, { disableLifecycleMethods: true }));
    $_$w(42, 2), it('is a React component', () => {
        $_$wf(42);
        $_$w(42, 3), expect(wrapper.exists()).to.eql(true);
    });
    $_$w(42, 4), it('is wrapped in a layout', () => {
        $_$wf(42);
        $_$w(42, 5), expect(wrapper.name()).to.eql('ComponentWithLayout');
    });
    $_$w(42, 6), it('contains a title with Contacts display name', () => {
        $_$wf(42);
        const title = ($_$w(42, 7), wrapper.dive().find(NavBar).prop('title'));
        $_$w(42, 8), expect(title).to.eql('Contact Nobody');
    });
    $_$w(42, 9), it('contains a ContactPerson Form', () => {
        $_$wf(42);
        const form = ($_$w(42, 10), wrapper.dive().find(ContactPersonForm));
        $_$w(42, 11), expect(form.exists()).to.eql(true);
    });
    $_$w(42, 12), it('fetches person on mount', () => {
        $_$wf(42);
    });
});
$_$wpe(42);