const addPerson = `
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
`;

const persons = `
{
  persons {
    id,
    firstName,
    lastName,
    idealNextDate,
  }
}
`;

const person = `
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
`;

const editPerson = `
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
`;

export const addEvent = `
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
`;

export default {
  addPerson,
  persons,
  person,
  editPerson,
  addEvent,
};
