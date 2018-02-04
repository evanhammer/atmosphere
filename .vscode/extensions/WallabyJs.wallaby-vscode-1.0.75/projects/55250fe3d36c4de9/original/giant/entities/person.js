import R from 'ramda';
import moment from 'moment';
import { is } from './types.js';
import { isValid } from './base.js';

const propTypes = {
  all: {
    firstName: [is.string(), is.notBlank()],
    lastName: [is.string()],
    action: [is.string(), is.notBlank()],
    frequencyInDays: [is.counting()],
    lastContactedAt: is.date(),
    events: [is.relations(), is.emptyArray()],
  },

  created: {
    id: is.string(),
    events: is.relations(),
  },
};


const defaults = {
  lastName: '',
  action: 'Hang out',
  frequencyInDays: 30,
  events: [],
  lastContactedAt: null,
};

export const isValidPerson = (props) => {
  const constraints = { ...propTypes.all, ...propTypes.created };
  return isValid(constraints, props);
};

export const makeNewPerson = (props) => {
  const entity = { ...defaults, ...props };
  const { all: constraints } = propTypes;
  return isValid(constraints, entity) ? entity : null;
};

export const makeUpdatedPerson = (oldProps, newProps) => {
  const entity = { ...oldProps, ...newProps };
  return isValidPerson(entity) ? entity : null;
};

export const makePerson = (props) => {
  const entity = { events: [], ...props };
  return isValidPerson(props) ? entity : null;
};

const filterEventsByStatus = (statuses, events) => {
  return events.filter(e => statuses.includes(e.status));
};

const sortEvents = events => {
  return events.sort((a, b) => a.startAt < b.startAt ? 1 : -1);
};

export const lastEvent = (events) => {
  return R.pipe(
    items => filterEventsByStatus(['DONE', 'SCHEDULED'], items),
    sortEvents,
    items => items.length > 0 ? items[0] : null
  )(events);
};

export const scheduledEvents = (events) => {
  return R.pipe(
    items => filterEventsByStatus(['SCHEDULED'], items),
    sortEvents
  )(events);
};

export const idealNextDate = (person, events, today) => {
  const mostRecent = lastEvent(events);

  if (mostRecent === null) return today;

  return moment(mostRecent.startAt, 'YYYY.MM.DD')
    .add(person.frequencyInDays, 'days')
    .format('YYYY.MM.DD');
};

const isReadyForEvent = (person, events, today) => {
  const todayMoment = moment(today, 'YYYY.MM.DD');
  const eventDate = idealNextDate(person, events, today);
  const nextEventMoment = moment(eventDate, 'YYYY.MM.DD');
  return todayMoment.isSameOrAfter(nextEventMoment);
};

const isReadyForContact = (person, today) => {
  const { lastContactedAt } = person;
  if (lastContactedAt === null) return true;

  const todayMoment = moment(today, 'YYYY.MM.DD');
  const nextContactMoment = moment(lastContactedAt, 'YYYY.MM.DD')
    .add(7, 'days');
  return todayMoment.isSameOrAfter(nextContactMoment);
};

export const isRipe = (person, events, today) => {
  if (!moment(today, 'YYYY.MM.DD').isValid()) return null;

  return R.and(
    isReadyForEvent(person, events, today),
    isReadyForContact(person, today)
  );
};
