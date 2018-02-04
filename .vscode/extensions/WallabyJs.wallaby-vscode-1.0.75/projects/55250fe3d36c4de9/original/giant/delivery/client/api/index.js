import queries from './queries';

const fetchGraphQL = (querySlug, variables = {}) => {
  const data = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queries[querySlug], variables }),
  };
  return fetch('/graphql?', data)
    .then(res => res.json())
    .then(json => json.data[querySlug]);
};

export const fetchAddPerson = person => fetchGraphQL('addPerson', person);
export const fetchPersons = () => fetchGraphQL('persons');
export const fetchPerson = id => fetchGraphQL('person', id);
export const fetchEditPerson = person => fetchGraphQL('editPerson', person);

export const fetchAddEvent = event => fetchGraphQL('addEvent', event);
