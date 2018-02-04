import { expect } from 'chai';
import { is } from './types.js';
import { isValid } from './base.js';

describe('entities/base', function () {
  describe('.isValid', function () {
    it('is true if props are declared and valid', function () {
      const propTypes = { prop1: [ is.date() ] };
      const validProps = { prop1: null };
      expect(isValid(propTypes, validProps)).to.eql(true);
    });

    it('is false if props are not declared', function () {
      const propTypes = { prop1: [] };
      const props = { prop1: 'asd', prop3: 9 };
      expect(isValid(propTypes, props)).to.eql(false);
    });

    it('is false if props are not valid', function () {
      const propTypes = { prop1: [ is.string() ] };
      const props = { prop1: 9 };
      expect(isValid(propTypes, props)).to.eql(false);
    });

    it('is false if any properties are missing', function () {
      const propTypes = {
        prop1: is.string(),
        prop2: is.string(),
      };
      const props = { prop2: 'value' };
      expect(isValid(propTypes, props)).to.eql(false);
    });
  });
});
