export function NotFoundError (name, id) {
  const defaultMsg = `Did not find ${name} with ID ${id}.`;
  const msgText = defaultMsg;
  this.name = 'NotFoundError';
  this.message = `${this.name}: ${msgText}`;
}
NotFoundError.prototype = new Error();

export function InvalidRelationError (relationName, relationId) {
  const defaultMsg = `Did not find ${relationName} with ID ${relationId}.`;
  const msgText = defaultMsg;
  this.name = 'InvalidRelationError';
  this.message = `${this.name}: ${msgText}`;
}
InvalidRelationError.prototype = new Error();

export function InvalidEditError (name, id) {
  const defaultMsg = `Cannot edit ${name} of id ${id}.`;
  const msgText = defaultMsg;
  this.name = 'InvalidEditError';
  this.message = `${this.name}: ${msgText}`;
}
InvalidEditError.prototype = new Error();
