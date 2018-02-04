import { expect } from 'chai';
import {
  isValidEvent,
  makeNewEvent,
  makeUpdatedEvent,
  STATUS,
} from './event.js';
const values = {
  id: 'asd234',
  startAt: '2016.12.11',
  action: 'some action',
  status: 'SCHEDULED',
  person: undefined,
};

describe('entites/event', function () {
  describe('.isValidEvent', function () {
    it('is true if a valid event', function () {
      const props = { ...values, id: 'akjsd239' };
      expect(isValidEvent(props)).to.eql(true);
    });

    it('is false if id is missing', function () {
      const { id, ...props } = values;
      expect(isValidEvent(props)).to.eql(false);
    });

    describe('startAt', function () {
      it('is false if not a valid date string', function () {
        const props = { ...values, startAt: '99' };
        expect(isValidEvent(props)).to.eql(false);
      });

      it('is false if missing', function () {
        const { startAt, ...props } = values;
        expect(isValidEvent(props)).to.eql(false);
      });
    });

    describe('action', function () {
      it('is false if not a string', function () {
        const props = { ...values, action: 99 };
        expect(isValidEvent(props)).to.eql(false);
      });

      it('is false if blank', function () {
        const props = { ...values, action: '' };
        expect(isValidEvent(props)).to.eql(false);
      });

      it('is false if missing', function () {
        const { action, ...props } = values;
        expect(isValidEvent(props)).to.eql(false);
      });
    });

    describe('status', function () {
      it('returns all statuses', function () {
        const actual = STATUS
          .map(status => ({ ...values, status }))
          .every(isValidEvent);
        const expected = true;
        expect(actual).to.eql(expected);
      });

      it('is false if not in status list', function () {
        const props = { ...values, status: 'junk' };
        expect(isValidEvent(props)).to.eql(false);
      });

      it('is false if missing', function () {
        const { status, ...props } = values;
        expect(isValidEvent(props)).to.eql(false);
      });
    });

    describe('person', function () {
      it('is false if not an string', function () {
        const props = { ...values, person: 99 };
        expect(isValidEvent(props)).to.eql(false);
      });

      it('is false if missing', function () {
        const { person, ...props } = values;
        expect(isValidEvent(props)).to.eql(false);
      });
    });

  });

  describe('.makeNewEvent', function () {
    const { id, ...newValues } = values;

    it('returns correct properties', function () {
      const { id, ...actual } = makeNewEvent(newValues);
      const expected = newValues;
      expect(actual).to.eql(expected);
    });
  });

  describe('.makeUpdatedEvent', function () {
    it('returns correct properties', function () {
      const newProps = { action: 'Updated' };
      const actual = makeUpdatedEvent(values, newProps).firstName;
      const expected = newProps.firstName;
      expect(actual).to.eql(expected);
    });

    it('is null if invalid value', function () {
      const actual = makeUpdatedEvent(values, { action: 99 });
      const expected = null;
      expect(actual).to.eql(expected);
    });

    it('is null if undeclared properties', function () {
      const actual = makeUpdatedEvent(values, { badProp: 'something' });
      const expected = null;
      expect(actual).to.eql(expected);
    });
  });
});
