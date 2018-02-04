import moment from 'moment';

export const getMoment = dateStr => moment(dateStr, 'YYYY.MM.DD');
export const getDateStr = moment => moment.format('YYYY.MM.DD');

export const humanizeDate = (dateStr, todayStr) => {
  return getMoment(dateStr).calendar(
    getMoment(todayStr),
    {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: function (now) {
        return this.isSame(now, 'year') ? 'MMM Do' : 'MMM Do, YYYY';
      },
    }
  );
};

export const getDisplayName = ({
  firstName,
  lastName,
}) => [ firstName, lastName ]
  .filter(name => !!name)
  .join(' ');
