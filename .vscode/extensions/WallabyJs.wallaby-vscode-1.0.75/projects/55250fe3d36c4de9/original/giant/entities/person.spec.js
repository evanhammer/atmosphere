import { expect } from 'chai';
import moment from 'moment';
import { makeNewEvent } from './event.js';
import {
  isValidPerson,
  makeNewPerson,
  makeUpdatedPerson,
  lastEvent,
  scheduledEvents,
  idealNextDate,
  isRipe,
} from './person.js';

const values = {
  id: '-askjd28djdI',
  firstName: 'Jenny',
  lastName: 'Marker',
  action: 'some string',
  frequencyInDays: 5,
  lastContactedAt: moment().format('YYYY.MM.DD'),
  events: [ '34', '23' ],
};

describe('entities/person', function () {
  describe('.isValidPerson', function () {
    it('is true if a valid person', function () {
      const props = { ...values, id: '245' };
      expect(isValidPerson(props)).to.eql(true);
    });

    it('is false if id is missing', function () {
      const { id, ...props } = values;
      expect(isValidPerson(props)).to.eql(false);
    });

    describe('firstName', function () {
      it('is false if not a string', function () {
        const props = { ...values, firstName: 45 };
        expect(isValidPerson(props)).to.eql(false);
      });

      it('is false if blank', function () {
        const props = { ...values, firstName: '' };
        expect(isValidPerson(props)).to.eql(false);
      });

      it('is false if missing', function () {
        const { firstName, ...props } = values;
        expect(isValidPerson(props)).to.eql(false);
      });
    });

    describe('lastName', function () {
      it('is false if not a string', function () {
        const props = { ...values, lastName: 45 };
        expect(isValidPerson(props)).to.eql(false);
      });
    });

    describe('action', function () {
      it('is false if not a string', function () {
        const props = { ...values, action: 99 };
        expect(isValidPerson(props)).to.eql(false);
      });

      it('is false if blank', function () {
        const props = { ...values, action: '' };
        expect(isValidPerson(props)).to.eql(false);
      });
    });

    describe('frequencyInDays', function () {
      it('is false if not an integer above 0', function () {
        const props = { ...values, frequencyInDays: 0 };
        expect(isValidPerson(props)).to.eql(false);
      });
    });

    describe('lastContactedAt', function () {
      it('is false if not a Date', function () {
        const props = { ...values, lastContactedAt: 99 };
        expect(isValidPerson(props)).to.eql(false);
      });
    });

    describe('events', function () {
      it('is false if not an array of strings', function () {
        const props = { ...values, events: [ 99 ] };
        expect(isValidPerson(props)).to.eql(false);
      });
    });
  });

  describe('.makeNewPerson', function () {
    const { id, ...valuesNoID } = values;
    const newValues= { ...valuesNoID, events: [] };

    it('returns correct properties', function () {
      const { id, ...actual } = makeNewPerson(newValues);
      const expected = newValues;
      expect(actual).to.eql(expected);
    });

    it('uses defaults for action, frequencyInDays, events', function () {
      const { action, frequencyInDays, events, ...props } = newValues;
      const person = makeNewPerson(props);
      const actual = {
        action: person.action,
        frequencyInDays: person.frequencyInDays,
        events: person.events,
      };

      const expected = {
        action: 'Hang out',
        frequencyInDays: 30,
        events: [],
      };
      expect(actual).to.eql(expected);
    });

    it('is null if events is not empty', function () {
      const props = { ...newValues, events: [ 99 ] };
      const actual = makeNewPerson(props);
      const expected = null;
      expect(actual).to.eql(expected);
    });
  });

  describe('.makeUpdatedPerson', function () {
    it('returns correct properties', function () {
      const newProps = { firstName: 'Updated' };
      const actual = makeUpdatedPerson(values, newProps).firstName;
      const expected = newProps.firstName;
      expect(actual).to.eql(expected);
    });

    it('is null if invalid value', function () {
      const props = { lastName: 99 };
      const actual = makeUpdatedPerson(values, props);
      const expected = null;
      expect(actual).to.eql(expected);
    });

    it('is null if undeclared properties', function () {
      const badProps = { badProp: 'something' };
      const actual = makeUpdatedPerson(values, badProps);
      const expected = null;
      expect(actual).to.eql(expected);
    });
  });

  describe('lastEvent', function () {
    it('is last done event when done is most recent', () => {
      const events = [
        { startAt: '2016.12.12', status: 'SCHEDULED', person: '44' },
        { startAt: '2017.03.11', status: 'DONE', person: '44' },
      ].map(props => makeNewEvent(props));

      const { startAt: actual } = lastEvent(events);
      const expected = '2017.03.11';
      expect(actual).to.eql(expected);
    });

    it('is last scheduled event when scheduled is most recent', () => {
      const events = [
        { startAt: '2016.12.12', status: 'DONE', person: '44' },
        { startAt: '2017.03.11', status: 'SCHEDULED', person: '44' },
      ].map(props => makeNewEvent(props));

      const { startAt: actual } = lastEvent(events);
      const expected = '2017.03.11';
      expect(actual).to.eql(expected);
    });

    it('is null when no done or scheduled events', () => {
      const events = [
        { startAt: '2017.03.11', status: 'CANCELED', person: '44' },
      ].map(props => makeNewEvent(props));
      const actual = lastEvent(events);
      const expected = null;
      expect(actual).to.eql(expected);
    });

    it('ignores canceled', () => {
      const events = [
        { startAt: '2017.03.11', status: 'CANCELED', person: '44' },
        { startAt: '2016.12.12', status: 'DONE', person: '44' },
      ].map(props => makeNewEvent(props));

      const { startAt: actual } = lastEvent(events);
      const expected = '2016.12.12';
      expect(actual).to.eql(expected);
    });
  });

  describe('scheduledEvents', () => {
    it('is all and only scheduled events, newest first', () => {
      const events = [
        { startAt: '2017.03.11', status: 'SCHEDULED', person: '44' },
        { startAt: '2017.03.15', status: 'SCHEDULED', person: '44' },
        { startAt: '2017.03.16', status: 'CANCELED', person: '44' },
        { startAt: '2016.12.12', status: 'DONE', person: '44' },
      ].map(props => makeNewEvent(props));

      const actual = scheduledEvents(events).map(e => e.startAt);
      const expected = [ '2017.03.15', '2017.03.11' ];
      expect(actual).to.eql(expected);
    });
  });

  describe('idealNextDate', function () {
    let person;

    beforeEach(function () {
      const defaultProps = {
        firstName: 'Steve',
        action: 'some string',
        frequencyInDays: 5,
      };
      person = makeNewPerson(defaultProps);
    });

    it('is date of last event + frequency', function () {
      const events = [
        { startAt: '2017.03.11', status: 'SCHEDULED', person: '44' },
        { startAt: '2016.12.12', status: 'DONE', person: '44' },
      ].map(props => makeNewEvent(props));

      const actual = idealNextDate(person, events);
      const expected = '2017.03.16';
      expect(actual).to.eql(expected);
    });

    it('is today if no events', function () {
      const today = '2015.04.03';
      const actual = idealNextDate(person, [], today);
      const expected = '2015.04.03';
      expect(actual).to.eql(expected);
    });
  });

  describe('isRipe', () => {
    const defaultEventProps = {
      startAt: '1999.03.15',
      action: 'asd',
      status: 'DONE',
      person: {
        firstName: 'Steve',
      },
    };
    let person;

    beforeEach(() => {
      const defaultProps = {
        firstName: 'Steve',
        action: 'some string',
        frequencyInDays: 5,
      };
      person = makeNewPerson(defaultProps);
    });

    it('is true if ready for event and ready for contact', () => {
      const contactedPerson = { ...person, lastContactedAt: '2017.03.08' };
      const today = '2017.03.15';
      const dates = [ '2017.03.10' ];
      const events = dates
        .map(d => ({ ...defaultEventProps, startAt: d }))
        .map(props => makeNewEvent(props));

      const actual = isRipe(contactedPerson, events, today);
      const expected = true;
      expect(actual).to.equal(expected);
    });

    it('is true if ready for event and no previous contact', () => {
      const contactedPerson = { ...person, lastContactedAt: null };
      const today = '2017.03.15';
      const dates = [ '2017.03.10' ];
      const events = dates
        .map(d => ({ ...defaultEventProps, startAt: d }))
        .map(props => makeNewEvent(props));

      const actual = isRipe(contactedPerson, events, today);
      const expected = true;
      expect(actual).to.equal(expected);
    });

    it('is false if ready for event but not ready for contact', () => {
      const contactedPerson = { ...person, lastContactedAt: '2017.03.09' };
      const today = '2017.03.15';
      const dates = [ '2017.03.10' ];
      const events = dates
        .map(d => ({ ...defaultEventProps, startAt: d }))
        .map(props => makeNewEvent(props));

      const actual = isRipe(contactedPerson, events, today);
      const expected = false;
      expect(actual).to.equal(expected);
    });


    it('is false if not ready for event but ready for contact', () => {
      const contactedPerson = { ...person, lastContactedAt: '2017.02.11' };
      const today = '2017.03.15';
      const dates = [ '2017.03.11', '2016.12.12' ];
      const events = dates
        .map(d => ({ ...defaultEventProps, startAt: d }))
        .map(props => makeNewEvent(props));

      const actual = isRipe(contactedPerson, events, today);
      const expected = false;
      expect(actual).to.equal(expected);
    });

    it('is null if today is not a date', () => {
      const actual = isRipe(person, [], undefined);
      const expected = null;
      expect(actual).to.eql(expected);
    });
  });
});
