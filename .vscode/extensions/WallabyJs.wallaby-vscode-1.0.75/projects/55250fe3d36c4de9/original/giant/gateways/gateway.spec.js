import { expect } from 'chai';
import Gateway from './gateway.js';

const methods = {
  create: '',
  read: '',
  readMany: '',
  save: '',
  destroy: '',
};

describe('Gateway', () => {

  it('is function', () => {
    const actual = typeof Gateway(() => methods);
    const expected = 'function';
    expect(actual).to.eql(expected);
  });

  it('throws error when Spec doesnt return create', () => {
    const { create, ...test } = methods;
    const actual = () => Gateway(() => test)([]);
    expect(actual).to.throw(Error);
  });

  it('throws error when Spec doesnt return read', () => {
    const { read, ...test } = methods;
    const actual = () => Gateway(() => test)([]);
    expect(actual).to.throw(Error);
  });

  it('throws error when spec doesnt return readMany', () => {
    const { readMany, ...test } = methods;
    const actual = () => Gateway(() => test)([]);
    expect(actual).to.throw(Error);
  });

  it('throws error when spec doesnt have save', () => {
    const { save, ...test } = methods;
    const actual = () => Gateway(() => test)([]);
    expect(actual).to.throw(Error);
  });

  it('throws error when spec doesnt have destroy', () => {
    const { destroy, ...test } = methods;
    const actual = () => Gateway(() => test)([]);
    expect(actual).to.throw(Error);
  });

  describe('Returned Function', () => {
    it('returns the object passed as spec', () => {
      const obj = Gateway(() => methods)([]);
      expect(obj).to.eql(methods);
    });

    it('errors if types isnt an array', function () {
      expect(() => Gateway(methods)({}))
        .to.throw(Error);
    });
  });
});
