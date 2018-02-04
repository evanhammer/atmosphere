import { is } from './types.js';
import { isValid } from './base.js';

export const STATUS = [ 'SCHEDULED', 'DONE', 'CANCELED' ];

const propTypes = {
  all: {
    startAt: [is.date(), is.notNull()],
    action: [is.string(), is.notBlank()],
    status: [is.choice(STATUS)],
    person: [is.relation(), is.notNull()],
  },

  created: {
    id: is.string(),
  },
};

const defaults = {
  action: 'Hang out',
  status: 'SCHEDULED',
};

export const isValidEvent = (props) => {
  const constraints = { ...propTypes.all, ...propTypes.created };
  return isValid(constraints, props);
};

export const makeNewEvent = (props) => {
  const entity = { ...defaults, ...props };
  const { all: constraints } = propTypes;
  return isValid(constraints, entity) ? entity : null;
};

export const makeUpdatedEvent = (oldProps, newProps) => {
  const entity = { ...oldProps, ...newProps };
  return isValidEvent(entity) ? entity : null;
};
