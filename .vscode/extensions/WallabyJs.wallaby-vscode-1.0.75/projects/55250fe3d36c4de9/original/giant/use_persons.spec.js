import { expect } from 'chai';
import { makeNewPerson } from './entities/person.js';
import {
  addPerson,
  findPerson,
  findPersons,
  editPerson,
  removePerson,
  fetchIdealNextDate,
  fetchLastEvent,
  fetchIsRipe,
} from './use_persons.js';
import { NotFoundError, InvalidEditError } from './errors.js';

const ID = '-default3ID';
const ID2 = '-some9TestID';

describe('use_persons', function () {
  const defaultProps = {
    firstName: 'Max',
    action: 'some action',
    frequencyInDays: 50,
  };
  const defaultPerson = { ...makeNewPerson(defaultProps), id: ID };
  const persons = { [ID]: defaultPerson };
  const events = {
    23: {
      id: 23,
      startAt: '2015.03.04',
      action: 'Dinner',
      status: 'SCHEDULED',
      person: 3,
    },
    45: {
      id: 45,
      startAt: '2016.05.14',
      action: 'Phone call',
      status: 'DONE',
      person: 3,
    },
  };

  const gateway = {
    create: (type, person) => ({ ...person, id: ID2 }),
    save: (type, person) => person,
    read: (type, id) => persons[id] || null,
    readMany: (type) => {
      if (type === 'persons') {
        return [ defaultPerson ];
      }
      if (type === 'events') {
        return Object.values(events);
      }
    },
    destroy: (type, id) => {
      if (id !== defaultPerson.id) {
        throw new Error();
      }
      return id;
    },
  };

  describe('.addPerson', function () {
    it('returns added Person', async function () {
      const actual = await addPerson({
        props: defaultProps,
        ...gateway,
      });
      const expected = {
        id: ID2,
        firstName: 'Max',
        lastName: '',
        action: 'some action',
        frequencyInDays: 50,
        lastContactedAt: null,
        events: [],
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('.findPerson', function () {
    it('returns correct Person by ID', async function () {
      const { id } = defaultPerson;
      const actual = await findPerson({ id, ...gateway });
      const expected = defaultPerson;
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent ID', function () {
      return expect(findPerson({ id: 9999, ...gateway }))
        .to.be.rejectedWith(NotFoundError);
    });
  });

  describe('.findPersons', function () {
    it('returns list of Persons', async function () {
      const actual = await findPersons({ ...gateway });
      const expected = [ defaultPerson ];
      expect(actual).to.eql(expected);
    });
  });

  describe('.editPerson', function () {
    it('edits correct Person', async function () {
      const { id } = defaultPerson;
      const props = { lastName: 'Manic' };
      const actual = await editPerson({ props, id, ...gateway });
      const expected = { ...defaultPerson, ...props };
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent ID', function () {
      return expect(editPerson({ id: 9999, props: {}, ...gateway }))
        .to.be.rejectedWith(NotFoundError);
    });

    it('errors on edited events', async function () {
      const editPersonsEvents = () => editPerson({
        id: 2,
        props: { events: [ 890 ] },
        ...gateway,
      });
      return expect(editPersonsEvents()).to.be.rejectedWith(InvalidEditError);
    });
  });

  describe('.removePerson', function () {
    it('removes correct Person by ID', async function () {
      const { id } = defaultPerson;
      const actual = await removePerson({ id, ...gateway });
      const expected = defaultPerson.id;
      expect(actual).to.eql(expected);
    });

    it('errors on non-existent ID', function () {
      return expect(removePerson({ id: 9999, ...gateway }))
        .to.be.rejectedWith(NotFoundError);
    });

    it('destroys its events', async function () {
      const personWithEvents = { ...defaultPerson, events: [ 23, 45 ] };
      const { id } = defaultPerson;
      const destroyedEvents = [];
      await removePerson({
        id,
        read: (type, id) => {
          if (type === 'events') return events[id] || null;
          return personWithEvents;
        },
        destroy: (type, id) => {
          if (type === 'events') {
            destroyedEvents.push(id);
          }
          return id;
        },
      });
      const actual = destroyedEvents;
      const expected = [ 23, 45 ];
      expect(actual).to.eql(expected);
    });
  });

  describe('.fetchIdealNextDate', function () {
    it('is date that person is ripe on', async function () {
      const personWithEvents = { ...defaultPerson, events: [ 23, 45 ] };
      const { id } = defaultPerson;
      const actual = await fetchIdealNextDate({
        id,
        read: (type, id) => {
          if (type === 'events') return events[id] || null;
          return personWithEvents;
        },
      });
      const expected = '2016.07.03';
      expect(actual).to.eql(expected);
    });
  });

  describe('.fetchLastEvent', function () {
    it('is date that person is ripe on', async function () {
      const personWithEvents = { ...defaultPerson, events: [ 23, 45 ] };
      const { id } = defaultPerson;
      const actual = await fetchLastEvent({
        id,
        read: (type, id) => {
          if (type === 'events') return events[id] || null;
          return personWithEvents;
        },
      });
      const expected = {
        id: 45,
        startAt: '2016.05.14',
        action: 'Phone call',
        status: 'DONE',
        person: 3,
      };
      expect(actual).to.eql(expected);
    });
  });

  describe('.fetchIsRipe', function () {
    it ('is true if person is ripe', async function () {
      const today = '2017.05.15';
      const personWithEvents = { ...defaultPerson, events: [ 23, 45 ] };
      const { id } = defaultPerson;
      const actual = await fetchIsRipe({
        id,
        read: (type, id) => {
          if (type === 'events') return events[id] || null;
          return personWithEvents;
        },
        today,
      });
      const expected = true;
      expect(actual).to.eql(expected);
    });

    it ('is false if person is not ripe', async function () {
      const today = '2016.05.15';
      const personWithEvents = { ...defaultPerson, events: [ 23, 45 ] };
      const { id } = defaultPerson;
      const actual = await fetchIsRipe({
        id,
        read: (type, id) => {
          if (type === 'events') return events[id] || null;
          return personWithEvents;
        },
        today,
      });
      const expected = false;
      expect(actual).to.eql(expected);
    });
  });
});
