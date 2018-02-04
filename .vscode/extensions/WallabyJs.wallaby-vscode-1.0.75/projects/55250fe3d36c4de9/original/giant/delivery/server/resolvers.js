import {
  addPerson,
  findPerson,
  findPersons,
  editPerson,
  removePerson,
  fetchIdealNextDate,
  fetchLastEvent,
  fetchIsRipe,
} from '/use_persons.js';
import {
  addEvent,
  findEvent,
  findEvents,
  editEvent,
  removeEvent,
} from '/use_events.js';

const resolvers = {
  Query: {
    person: (_, { id }, { gateway }) => findPerson({ id, ...gateway }),
    persons: (_, args, { gateway }) => findPersons({ ...gateway }),
    event: (_, { id }, { gateway }) => findEvent({ id, ...gateway }),
    events: (_, args, { gateway }) => findEvents({ ...gateway }),
  },

  Person: {
    events ({ events }, _, { gateway }) {
      return events.map(id => findEvent({ id, ...gateway }));
    },
    idealNextDate ({ id }, _, { today, gateway }) {
      return fetchIdealNextDate({ id, today, ...gateway });
    },
    lastEvent({ id }, _, { gateway }) {
      return fetchLastEvent({ id, ...gateway });
    },
    isRipe ({ id }, _, { today, gateway }) {
      return fetchIsRipe({ id, today, ...gateway });
    },
  },

  Event: {
    person ({ person }, _, { gateway }) {
      return findPerson({ id: person, ...gateway });
    },
  },

  Mutation: {
    addPerson (_, { input: props }, { today, gateway }) {
      return addPerson({ props, today, ...gateway });
    },

    editPerson (_, { input: { id, ...props } }, { gateway }) {
      return editPerson({ id, props, ...gateway });
    },

    removePerson (_, { input: { id } }, { gateway }) {
      return removePerson({ id, ...gateway });
    },

    addEvent (_, { input: props }, { gateway }) {
      return addEvent({ props, ...gateway });
    },

    editEvent (_, { input: { id, ...props } }, { gateway }) {
      return editEvent({ id, props, ...gateway });
    },

    removeEvent (_, { input: { id } }, { gateway }) {
      return removeEvent({ id, ...gateway });
    },
  },
};

export default resolvers;
