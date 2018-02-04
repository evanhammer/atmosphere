import {
  isValidEvent,
  makeNewEvent,
  makeUpdatedEvent,
} from './entities/event.js';
import {
  isValidPerson,
  makeUpdatedPerson,
} from './entities/person.js';
import { findPerson } from './use_persons.js';
import { InvalidRelationError, NotFoundError } from './errors.js';

const TYPE = 'events';
const NAME = 'Event';
const TYPE_PERSONS = 'persons';

const findPersonRelation = async ({ read, id }) => {
  try {
    return await findPerson({ read, id });
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new InvalidRelationError(TYPE_PERSONS, id);
    }
    throw e;
  }
};

const addToPersonRelation = async ({ read, save, personID, eventID }) => {
  const person = await findPersonRelation({ read, id: personID });
  const events = [ ...person.events, eventID ];
  const updatedPerson = makeUpdatedPerson(person, { events });
  const savedPerson = await save(TYPE_PERSONS, updatedPerson);
  return isValidPerson(savedPerson) ? savedPerson : null;
};

const removeFromPersonRelation = async ({ read, save, personID, eventID }) => {
  const person = await findPersonRelation({ read, id: personID });
  const events = person.events.filter(e => e !== eventID);
  const updatedPerson = makeUpdatedPerson(person, { events });
  const savedPerson = await save(TYPE_PERSONS, updatedPerson);
  return isValidPerson(savedPerson) ? savedPerson : null;
};

const swapPersonRelations = async ({ read, save, event, updatedEvent }) => {
  const { id } = event;

  await addToPersonRelation({
    read,
    save,
    personID: updatedEvent.person,
    eventID: id,
  });
  await removeFromPersonRelation({
    read,
    save,
    personID: event.person,
    eventID: id,
  });
};

export const addEvent = async ({ props, create, read, save }) => {
  await findPersonRelation({ read, id: props.person });

  const newEvent = makeNewEvent(props);
  const createdEvent = await create(TYPE, newEvent);
  let savedPerson;
  if (isValidEvent(createdEvent)) {
    savedPerson = await addToPersonRelation({
      read,
      save,
      personID: props.person,
      eventID: createdEvent.id,
    });
  }
  return (isValidEvent(createdEvent) && savedPerson) ? createdEvent : null;
};

export const findEvent = async ({ id, read }) => {
  const event = await read(TYPE, id);
  if (event === null) {
    throw new NotFoundError(NAME, id);
  }

  return isValidEvent(event) ? event : null;
};

export const findEvents = async ({ readMany }) => {
  const events = await readMany(TYPE);
  return events.every(isValidEvent) ? events : null;
};

export const editEvent = async ({ id, props, read, save }) => {
  const event = await read(TYPE, id);
  if (event === null) {
    throw new NotFoundError(NAME, id);
  }
  const updatedEvent = makeUpdatedEvent(event, props);

  if (event.person !== updatedEvent.person) {
    await swapPersonRelations({ read, save, event, updatedEvent });
  }

  const savedEvent = await save(TYPE, updatedEvent);
  return isValidEvent(savedEvent) ? savedEvent : null;
};

export const removeEvent = async ({ id, read, save, destroy }) => {
  const event = await read(TYPE, id);
  if (event === null) {
    throw new NotFoundError(NAME, id);
  }

  await removeFromPersonRelation({
    read,
    save,
    personID: event.person,
    eventID: id,
  });

  return await destroy(TYPE, id);
};
