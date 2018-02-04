'use strict';
$_$wp(29);
$_$w(29, 0), Object.defineProperty(exports, '__esModule', { value: true });
var _graphqlTools = ($_$w(29, 1), require('graphql-tools'));
var _resolvers = ($_$w(29, 2), require('./resolvers'));
var _resolvers2 = ($_$w(29, 3), _interopRequireDefault(_resolvers));
function _interopRequireDefault(obj) {
    $_$wf(29);
    return $_$w(29, 4), ($_$w(29, 7), obj) && ($_$w(29, 8), obj.__esModule) ? ($_$w(29, 5), obj) : ($_$w(29, 6), { default: obj });
}
const master = ($_$w(29, 9), 'interface Object {\n    id: ID!\n}\n\ntype Query {\n    persons: [Person]!\n    person(id: ID!): Person\n\n    events: [Event]!\n    event(id: ID!): Event\n}\n\ntype Mutation {\n    addPerson(input: AddPersonInput!): Person\n    editPerson(input: EditPersonInput!): Person\n    removePerson(input: RemovePersonInput!): ID\n\n    addEvent(input: AddEventInput!): Event\n    editEvent(input: EditEventInput!): Event\n    removeEvent(input: RemovePersonInput!): ID\n}\n');
const event = ($_$w(29, 10), 'enum EventStatus {\n    SCHEDULED, DONE, CANCELED\n}\n\ntype Event implements Object {\n    id: ID!\n    startAt: String!\n    action: String!\n    status: EventStatus!\n    person: Person\n}\n\ninput AddEventInput{\n    startAt: String!\n    action: String!\n    status: EventStatus\n    person: ID!\n}\n\ninput EditEventInput {\n    id: ID!\n    startAt: String\n    action: String\n    status: EventStatus\n    person: ID\n}\n\ninput RemoveEventInput {\n    id: ID!\n}\n');
const person = ($_$w(29, 11), 'type Person implements Object {\n    id: ID!\n    firstName: String\n    lastName: String\n    action: String\n    frequencyInDays: Int\n    lastContactedAt: String\n    events: [Event]\n    idealNextDate: String\n    lastEvent: Event\n    isRipe: Boolean\n}\n\ninput AddPersonInput {\n    firstName: String!\n    lastName: String\n    action: String\n    frequencyInDays: Int\n    lastContactedAt: String\n}\n\ninput EditPersonInput {\n    id: ID!\n    firstName: String\n    lastName: String\n    action: String\n    frequencyInDays: Int\n    lastContactedAt: String\n}\n\ninput RemovePersonInput {\n    id: ID!\n}\n');
const typeDefs = ($_$w(29, 12), master + person + event);
const schema = ($_$w(29, 13), (0, _graphqlTools.makeExecutableSchema)({
    typeDefs,
    resolvers: _resolvers2.default
}));
$_$w(29, 14), exports.default = schema;
$_$wpe(29);