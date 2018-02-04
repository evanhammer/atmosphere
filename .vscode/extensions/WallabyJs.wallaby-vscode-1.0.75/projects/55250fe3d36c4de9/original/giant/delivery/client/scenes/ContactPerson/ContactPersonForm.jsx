import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  frequencyInDays: PropTypes.number.isRequired,
  idealNextDate: PropTypes.string.isRequired,
  lastEventDate: PropTypes.string,
  daysSinceLastEvent: PropTypes.number,
  onContactedClick: PropTypes.func,
  onScheduledEventClick: PropTypes.func,
  onDoneEventClick: PropTypes.func,
};

function ContactPersonForm ({
  firstName,
  action,
  frequencyInDays,
  idealNextDate,
  lastEventDate,
  daysSinceLastEvent,
  onContactedClick,
  onScheduledEventClick,
  onDoneEventClick,
}) {
  return (
    <form>
      <Typography className='title-text' type='title' gutterBottom >
        {action} with {firstName}!
      </Typography>
      <Typography className='summary-text' gutterBottom >
        You’d like to spend time with {firstName} every <b>
          {frequencyInDays} days</b>. Aim to get together by <b>
          {idealNextDate}</b>. The last time was <b>
          {lastEventDate}</b>, {daysSinceLastEvent} days ago.
      </Typography>
      <Typography className='action-text' gutterBottom >
        Planning to spend time together soon?
      </Typography>
      <Button
        className='contacted-button'
        raised
        color="primary"
        onClick={onContactedClick}
      >
        Yes, contacted them
      </Button>
      <Button
        className='scheduled-event-button'
        raised
        color="inherit"
        onClick={onScheduledEventClick}
      >
        Yes, made plans
      </Button>
      <Button
        className='done-event-button'
        raised
        color="inherit"
        onClick={onDoneEventClick}
      >
        No, spent time together recently
      </Button>
    </form>
  );
}

ContactPersonForm.propTypes = propTypes;
export default ContactPersonForm;
