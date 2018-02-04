import { expect } from 'chai';
import moment from 'moment';
import { getMoment, getDateStr, humanizeDate } from './util';

describe('delivery/client/util', () => {
  const testMoment = moment('2017.12.22', 'YYYY.MM.DD');

  describe('.getMoment', () => {
    it('is the moment of the date string', () => {
      const actual = getMoment('2017.12.22');
      const expected = testMoment;
      expect(actual).to.eql(expected);
    });
  });

  describe('.getDateStr', () => {
    it('is the date string of the moment', () => {
      const actual = getDateStr(testMoment);
      const expected = '2017.12.22';
      expect(actual).to.eql(expected);
    });
  });

  describe('.humanizeDate', () => {
    const today = '2016.11.22';

    it('is Today when its today', () => {
      const actual = humanizeDate('2016.11.22', today);
      const expected = 'Today';
      expect(actual).to.eql(expected);
    });

    it('is Tomorrow when its tomorrow', () => {
      const actual = humanizeDate('2016.11.23', today);
      const expected = 'Tomorrow';
      expect(actual).to.eql(expected);
    });

    it('is the day of the week when its next week', () => {
      const actual = humanizeDate('2016.11.28', today);
      const expected = 'Monday';
      expect(actual).to.eql(expected);
    });

    it('is Yesterday when its yesterday', () => {
      const actual = humanizeDate('2016.11.21', today);
      const expected = 'Yesterday';
      expect(actual).to.eql(expected);
    });

    it('is Last day of the week when its last week', () => {
      const actual = humanizeDate('2016.11.16', today);
      const expected = 'Last Wednesday';
      expect(actual).to.eql(expected);
    });

    it('is month and day when its this year', () => {
      const actual = humanizeDate('2016.01.01', today);
      const expected = 'Jan 1st';
      expect(actual).to.eql(expected);
    });

    it('is Last day of the week when its last week', () => {
      const actual = humanizeDate('2018.01.20', today);
      const expected = 'Jan 20th, 2018';
      expect(actual).to.eql(expected);
    });
  });
});
