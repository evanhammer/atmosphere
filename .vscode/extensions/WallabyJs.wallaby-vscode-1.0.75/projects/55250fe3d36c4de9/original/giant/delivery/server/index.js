import moment from 'moment';
import express from 'express';
import bodyParser from 'body-parser';
// import morgan from 'morgan';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import MemoryGateway from '/gateways/memory.js';
import FirebaseDB from '/gateways/firebase.db.js';
import FirebaseGateway from '/gateways/firebase.js';
import schema from './schema';
import serviceAccount from './../../../firebase-dev-key.json';

const app = express();
const PORT = process.env.PORT || 8080;

const ENTITIES = ['persons', 'events'];
// const storageGateway = MemoryGateway(ENTITIES, {});

const db = FirebaseDB({
  serviceAccount,
  dbName: 'giant-dev',
});

const storageGateway = FirebaseGateway(ENTITIES, db.getStorage());

// app.use(morgan('combined'));

// pass a function to graphqlExpress to regenerate today on each request
app.use('/graphql', bodyParser.json(), graphqlExpress(() => ({
  schema,
  context: {
    gateway: storageGateway,
    today: moment().format('YYYY.MM.DD'),
  },
  formatError: (error) => ({
    message: error.message,
    details: error.stack,
  }),
  debug: true,
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

/* const root = { root: path.join(__dirname, 'public') };
app.get('/', (req, res) => {
  res.sendFile('index.html', root);
}); */

app.set('port', PORT);
const server = app.listen(app.get('port'), function() {
  // console.log(`Server running on port ${PORT}.`);
});

// 'export default server' fails tests
module.exports = {
  server,
  db,
};
