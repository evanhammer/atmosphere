import {
  makePerson,
  makeNewPerson,
  makeUpdatedPerson,
  idealNextDate,
  lastEvent,
  isRipe,
} from './entities/person.js';
import { InvalidEditError, NotFoundError } from './errors.js';

const TYPE = 'persons';
const NAME = 'Person';
const TYPE_EVENTS = 'events';

export const addPerson = async ({ props, create }) => {
  const newPerson = makeNewPerson(props);
  const createdPerson = await create(TYPE, newPerson);
  return makePerson(createdPerson);
};

export const findPerson = async ({ id, read }) => {
  const person = await read(TYPE, id);
  if (person === null) throw new NotFoundError(NAME, id);

  return makePerson(person);
};

export const findPersons = async ({ readMany }) => {
  const persons = await readMany(TYPE);
  const madePersons = persons.map(makePerson);
  return madePersons.some(p => p === null) ? null : madePersons;
};

export const editPerson = async ({ id, props, read, save }) => {
  if (props.hasOwnProperty('events')) {
    throw new InvalidEditError('events', id);
  }
  const oldPerson = await read(TYPE, id);
  if (oldPerson === null) throw new NotFoundError(NAME, id);

  const updatedPerson = makeUpdatedPerson(oldPerson, props);
  const savedPerson = await save(TYPE, updatedPerson);
  return makePerson(savedPerson);
};

export const removePerson = async ({ id, read, destroy }) => {
  const person = await read(TYPE, id);
  const madePerson = makePerson(person);
  if (person === null) {
    throw new NotFoundError(NAME, id);
  }

  await madePerson.events.map(eventID => destroy(TYPE_EVENTS, eventID));
  return await destroy(TYPE, id);
};

export const fetchIdealNextDate = async ({ id, read, today }) => {
  const person = await read(TYPE, id);
  const madePerson = makePerson(person);
  const events = await Promise.all(
    madePerson.events.map((eventID) => read(TYPE_EVENTS, eventID))
  );

  return idealNextDate(madePerson, events, today);
};

export const fetchLastEvent = async ({ id, read }) => {
  const person = await read(TYPE, id);
  const madePerson = makePerson(person);
  const events = await Promise.all(
    madePerson.events.map((eventID) => read(TYPE_EVENTS, eventID))
  );

  return lastEvent(events);
};

export const fetchIsRipe = async ({ id, read, today }) => {
  const person = await read(TYPE, id);
  const madePerson = makePerson(person);
  const events = await Promise.all(
    madePerson.events.map((eventID) => read(TYPE_EVENTS, eventID))
  );
  return isRipe(madePerson, events, today);
};
