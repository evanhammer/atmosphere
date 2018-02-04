$_$wp(44);
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ContactPersonForm from './ContactPersonForm';
const person = ($_$w(44, 0), {
    id: 123,
    firstName: 'Nora',
    lastName: 'Samir',
    action: 'Read a book out loud',
    frequencyInDays: 34,
    idealNextDate: '2017.12.22',
    lastEventDate: '2017.11.22',
    daysSinceLastEvent: 45,
    onContactedClick: sinon.spy(),
    onScheduledEventClick: sinon.spy(),
    onDoneEventClick: sinon.spy()
});
$_$w(44, 1), describe('delivery/client/scenes/ContactPerson/ContactPersonForm', () => {
    $_$wf(44);
    const wrapper = ($_$w(44, 2), shallow(<ContactPersonForm {...person}/>));
    $_$w(44, 3), describe('title', () => {
        $_$wf(44);
        const title = ($_$w(44, 4), wrapper.find('.title-text'));
        $_$w(44, 5), it('has first name and not last name', () => {
            $_$wf(44);
            $_$w(44, 6), expect(title.html().includes('Nora')).to.eql(true);
            $_$w(44, 7), expect(title.html().includes('Samir')).to.eql(false);
        });
        $_$w(44, 8), it('has action', () => {
            $_$wf(44);
            $_$w(44, 9), expect(title.html().includes('Read a book out loud')).to.eql(true);
        });
    });
    $_$w(44, 10), describe('summary message', () => {
        $_$wf(44);
        const summary = ($_$w(44, 11), wrapper.find('.summary-text'));
        $_$w(44, 12), it('has first name and not last name', () => {
            $_$wf(44);
            $_$w(44, 13), expect(summary.html().includes('Nora')).to.eql(true);
            $_$w(44, 14), expect(summary.html().includes('Samir')).to.eql(false);
        });
        $_$w(44, 15), it('has frequency', () => {
            $_$wf(44);
            $_$w(44, 16), expect(summary.html().includes(34)).to.eql(true);
        });
        $_$w(44, 17), it('has correct next event date', () => {
            $_$wf(44);
            $_$w(44, 18), expect(summary.html().includes('2017.12.22')).to.eql(true);
        });
        $_$w(44, 19), it('has correct last event date', () => {
            $_$wf(44);
            $_$w(44, 20), expect(summary.html().includes('2017.11.22')).to.eql(true);
        });
        $_$w(44, 21), it('has correct days since last event', () => {
            $_$wf(44);
            $_$w(44, 22), expect(summary.html().includes(45)).to.eql(true);
        });
    });
    $_$w(44, 23), it('has action text', () => {
        $_$wf(44);
        $_$w(44, 24), expect(wrapper.find('.action-text').exists()).to.eql(true);
    });
    $_$w(44, 25), it('calls onContactedClick when button is clicked', () => {
        $_$wf(44);
        $_$w(44, 26), wrapper.find('.contacted-button').simulate('click');
        $_$w(44, 27), expect(person.onContactedClick.calledOnce).to.eql(true);
    });
    $_$w(44, 28), it('calls onEventScheduledClick when button is clicked', () => {
        $_$wf(44);
        $_$w(44, 29), wrapper.find('.scheduled-event-button').simulate('click');
        $_$w(44, 30), expect(person.onScheduledEventClick.calledOnce).to.eql(true);
    });
    $_$w(44, 31), it('calls onEventRecentlyClick when button is clicked', () => {
        $_$wf(44);
        $_$w(44, 32), wrapper.find('.done-event-button').simulate('click');
        $_$w(44, 33), expect(person.onDoneEventClick.calledOnce).to.eql(true);
    });
});
$_$wpe(44);