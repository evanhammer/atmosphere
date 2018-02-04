'use strict';
$_$wp(31);
$_$w(31, 0), Object.defineProperty(exports, '__esModule', { value: true });
const addPerson = ($_$w(31, 1), `
mutation addPerson(
  $firstName: String!,
  $lastName: String,
  $action: String,
  $frequencyInDays: Int,
) {
  addPerson(input: {
    firstName: $firstName,
    lastName: $lastName,
    action: $action,
    frequencyInDays: $frequencyInDays,
  }) {
    id,
    firstName,
    lastName,
    action,
    frequencyInDays,
    isRipe,
  }
}
`);
const persons = ($_$w(31, 2), `
{
  persons {
    id,
    firstName,
    lastName,
    idealNextDate,
  }
}
`);
const person = ($_$w(31, 3), `
query person($id: Int!) {
  person(id: $id) {
    id,
    firstName,
    lastName,
    action,
    frequencyInDays,
    idealNextDate,
    lastEvent {
      id,
      startAt,
    },
  }
}
`);
const editPerson = ($_$w(31, 4), `
mutation editPerson(
  $id: Int!,
  $lastContactedAt: String,
) {
  editPerson(input: {
    id: $id,
    lastContactedAt: $lastContactedAt,
  }) {
    id,
    firstName,
    lastName,
    action,
    frequencyInDays,
    lastContactedAt,
    events {
      id
    },
    idealNextDate,
    lastEvent {
      id
    },
    isRipe,
  }
}
`);
const addEvent = ($_$w(31, 5), exports.addEvent = `
mutation addEvent(
  $action: String!,
  $startAt: String!,
  $status: EventStatus,
  $personID: Int!
) {
  addEvent(input: {
    action: $action,
    startAt: $startAt,
    status: $status,
    person: $personID
  }) {
    id,
    startAt,
    action,
    status,
    person {
      id,
      firstName,
      lastName,
      action,
    },
  }
}
`);
$_$w(31, 6), exports.default = {
    addPerson,
    persons,
    person,
    editPerson,
    addEvent
};
$_$wpe(31);