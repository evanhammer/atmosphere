$_$wp(34);
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
const propTypes = ($_$w(34, 0), {
    event: PropTypes.object.isRequired,
    personName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
});
function AddEventForm({
    event: {action, status, startAt},
    personName,
    onChange,
    onSubmit
}) {
    $_$wf(34);
    return $_$w(34, 1), (
        <form>
      <TextField name='action'
                value={action}
                label={`What are you doing with ${ personName }?`}
                placeholder='Going fishing'
                onChange={ev => {
                    $_$wf(34);
                    return $_$w(34, 2), onChange(ev.target.name, ev.target.value);
                }}/>
      <FormControl>
        <InputLabel htmlFor='status-input'>
          What’s the event’s status?
        </InputLabel>
        <Select input={<Input name='status' id='status-input'/>} value={status}
                    onChange={ev => {
                        $_$wf(34);
                        return $_$w(34, 3), onChange(ev.target.name, ev.target.value);
                    }}>
          <MenuItem value='SCHEDULED'>Scheduled</MenuItem>
          <MenuItem value='DONE'>Done</MenuItem>
          <MenuItem value='CANCELED'>Canceled</MenuItem>
        </Select>
      </FormControl>
      <TextField type='date' name='startAt' required
                value={startAt.replace(/\./g, '-')} label='Date'
                onChange={ev => {
                    $_$wf(34);
                    return $_$w(34, 4), onChange(ev.target.name, ev.target.value.replace(/-/g, '.'));
                }}/>
      <Button raised color='primary' onClick={onSubmit}>
        Add Event
      </Button>
    </form>
    );
}
$_$w(34, 5), AddEventForm.propTypes = propTypes;
export default AddEventForm;
$_$wpe(34);