import moment from 'moment';
import validator from 'validator.js';
import validatorExtends from 'validator.js-asserts';
const validIs = validator.Assert.extend(validatorExtends);

const isDate = v => moment(v, 'YYYY.MM.DD', true).isValid();
const isCounting = v => (Number.isInteger(v) && v > 0) || v === null;
const isRelation = v => typeof v === 'string' || typeof v === 'object';

const choice = validIs.choice;
const counting = () => validIs.callback(isCounting);
const date = () => validIs.callback(v => isDate(v) || v === null);
const emptyArray = () => validIs.count(0);
const integer = () => validIs.callback(Number.isInteger);
const notBlank = validIs.notBlank;
const notNull = validIs.notNull;
const relation = () => validIs.callback(v => {
  return isRelation(v) || typeof v === 'undefined';
});
const relations = () => validIs.callback(v => v.every(isRelation));
const required = validIs.required;
const string = validIs.isString;


export const is = {
  choice,
  counting,
  date,
  emptyArray,
  integer,
  notBlank,
  notNull,
  relation,
  relations,
  required,
  string,
};
