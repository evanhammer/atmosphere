import { expect } from 'chai';
import { is } from './types.js';

describe('types', function () {
  it('provides types interface', function () {
    const constraints = [
      is.required,
      is.string,
      is.notBlank,
      is.notNull,
      is.choice,
      is.date,
      is.counting,
      is.integer,
      is.relation,
      is.relations,
      is.emptyArray,
    ];
    const actual = constraints.every(i => typeof i === 'function');
    const expected = true;
    expect(actual).to.equal(expected);
  });
});
