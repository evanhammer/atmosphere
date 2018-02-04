import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ContactPersonForm from './ContactPersonForm';

const person = {
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
  onDoneEventClick: sinon.spy(),
};

describe('delivery/client/scenes/ContactPerson/ContactPersonForm', () => {
  const wrapper = shallow(<ContactPersonForm { ...person } />);

  describe('title', () => {
    const title = wrapper.find('.title-text');

    it('has first name and not last name', () => {
      expect(title.html().includes('Nora')).to.eql(true);
      expect(title.html().includes('Samir')).to.eql(false);
    });

    it('has action', () => {
      expect(title.html().includes('Read a book out loud')).to.eql(true);
    });
  });

  describe('summary message', () => {
    const summary = wrapper.find('.summary-text');

    it('has first name and not last name', () => {
      expect(summary.html().includes('Nora')).to.eql(true);
      expect(summary.html().includes('Samir')).to.eql(false);
    });

    it('has frequency', () => {
      expect(summary.html().includes(34)).to.eql(true);
    });

    it('has correct next event date', () => {
      expect(summary.html().includes('2017.12.22')).to.eql(true);
    });

    it('has correct last event date', () => {
      expect(summary.html().includes('2017.11.22')).to.eql(true);
    });

    it('has correct days since last event', () => {
      expect(summary.html().includes(45)).to.eql(true);
    });
  });

  it('has action text', () => {
    expect(wrapper.find('.action-text').exists()).to.eql(true);
  });

  it('calls onContactedClick when button is clicked', () => {
    wrapper.find('.contacted-button').simulate('click');
    expect(person.onContactedClick.calledOnce).to.eql(true);
  });

  it('calls onEventScheduledClick when button is clicked', () => {
    wrapper.find('.scheduled-event-button').simulate('click');
    expect(person.onScheduledEventClick.calledOnce).to.eql(true);
  });

  it('calls onEventRecentlyClick when button is clicked', () => {
    wrapper.find('.done-event-button').simulate('click');
    expect(person.onDoneEventClick.calledOnce).to.eql(true);
  });
});
