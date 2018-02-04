import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import master from './schema.graphql';
import event from './event.graphql';
import person from './person.graphql';

const typeDefs = master + person + event;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
