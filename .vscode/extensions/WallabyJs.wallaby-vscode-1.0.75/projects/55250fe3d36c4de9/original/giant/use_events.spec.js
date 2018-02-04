import { expect } from 'chai';
import { makeNewEvent } from './entities/event.js';
import { makeNewPerson } from './entities/person.js';
import {
  addEvent,
  findEvent,
  findEvents,
  editEvent,
  removeEvent,
} from './use_events.js';
import { InvalidRelationError, NotFoundError } from './errors.js';

describe('use_events', function () {
  const defaultProps = {
    startAt: '2015.03.04',
    action: 'Dinner',
    status: 'SCHEDULED',
    person: '3',
  };
  const defaultEvent = { ...makeNewEvent(defaultProps), id: '4' };

  const personProps = {
    firstName: 'Max',
    action: 'some action',
    frequencyInDays: 50,
  };
  const defaultPerson = { ...makeNewPerson(personProps), id: '3' };

  describe('.addEvent', function () {
    it('returns added Event', async function () {
      const actual = await addEvent({
        props: defaultProps,
        create: () => defaultEvent,
        read: () => defaultPerson,
        save: (type, entity) => entity,
      });
      const expected = { ...defaultEvent, id: '4' };
      expect(actual).to.eql(expected);
    });

    it('saves person with event', async function () {
      let events;
      await addEvent({
        props: defaultProps,
        create: () => defaultEvent,
        read: () => defaultPerson,
        save: (type, entity) => {
          events = entity.events;
          return entity;
        },
      });
      const actual = events;
      const expected = [ '4' ];
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent Person id', function () {
      const addBadEvent = () => addEvent({
        props: defaultProps,
        create: () => defaultEvent,
        read: () => {
          throw new NotFoundError('Person', 4);
        },
      });

      return expect(addBadEvent()).to.be.rejectedWith(InvalidRelationError);
    });
  });

  describe('.findEvent', function () {
    it('returns correct Event by ID', async function () {
      const { id } = defaultEvent;
      const actual = await findEvent({
        id,
        read: () => defaultEvent,
      });
      const expected = defaultEvent;
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent ID', function () {
      const findBadEvent = () => findEvent({
        id: '9999',
        read: () => null,
      });
      return expect(findBadEvent()).to.be.rejectedWith(NotFoundError);
    });
  });

  describe('.findEvents', function () {
    it('returns list of Events', async function () {
      const actual = await findEvents({
        readMany: () => [ defaultEvent ],
      });
      const expected = [ defaultEvent ];
      expect(actual).to.eql(expected);
    });
  });

  describe('.editEvent', function () {
    it('edits correct Event', async function () {
      const { id } = defaultEvent;
      const props = { action: 'Updated action' };
      const actual = await editEvent({
        id,
        props,
        read: () => defaultEvent,
        save: (type, entity) => entity,
      });
      const expected = { ...defaultEvent, ...props };
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent ID', function () {
      const editBadEvent = () => editEvent({
        id: '9999',
        props: {},
        read: () => null,
      });
      return expect(editBadEvent()).to.be.rejectedWith(NotFoundError);
    });

    it('saves new person with event', async function () {
      const { id } = defaultEvent;
      const props = { person: '44' };
      const events = [];
      await editEvent({
        id,
        props,
        read: (type) => {
          if (type === 'persons') return defaultPerson;
          return defaultEvent;
        },
        save: (type, entity) => {
          if (type === 'persons') {
            events.push(entity.events);
            return entity;
          }
          return { ...defaultEvent, ...props };
        },
      });
      const actual = events[0];
      const expected = [ '4' ];
      expect(actual).to.eql(expected);
    });

    it('saves old person without event', async function () {
      const { id } = defaultEvent;
      const props = { person: '44' };
      const persons = {
        44: defaultPerson,
        3: { ...defaultPerson, events: [ '4', '7' ] },
      };
      const events = [];
      await editEvent({
        id,
        props,
        read: (type, id) => {
          if (type === 'persons') return persons[id];
          return defaultEvent;
        },
        save: (type, entity) => {
          if (type === 'persons') {
            events.push(entity.events);
            return entity;
          }
          return entity;
        },
      });
      const actual = events[1];
      const expected = [ '7' ];
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent Person id', function () {
      const badProps = { ...defaultProps, person: '99' };
      const editBadEvent = () => editEvent({
        props: badProps,
        read: (type) => {
          if (type === 'persons') {
            throw new NotFoundError('Person', 4);
          }
          return defaultEvent;
        },
      });
      return expect(editBadEvent()).to.be.rejectedWith(InvalidRelationError);
    });
  });

  describe('.removeEvent', function () {
    it('removes correct Event by ID', async function () {
      const { id } = defaultEvent;
      const actual = await removeEvent({
        id,
        read: (type) => {
          if (type === 'persons') return defaultPerson;
          return defaultEvent;
        },
        save: (type, entity) => entity,
        destroy: () => id,
      });
      const expected = id;
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent ID', function () {
      const removeBadEvent = () => removeEvent({
        id: '9999',
        read: () => null,
      });
      return expect(removeBadEvent()).to.be.rejectedWith(NotFoundError);
    });

    it('saves person without event', async function () {
      const { id } = defaultEvent;
      const person = { ...defaultPerson, events: [ '4', '9' ] };
      let events;
      await removeEvent({
        id,
        read: (type) => {
          if (type === 'persons') return person;
          return defaultEvent;
        },
        save: (type, entity) => {
          if (type === 'persons') {
            events = entity.events;
            return entity;
          }
          return entity;
        },
        destroy: (type, id) => id,
      });
      const actual = events;
      const expected = [ '9' ];
      expect(actual).to.eql(expected);
    });
  });
});
