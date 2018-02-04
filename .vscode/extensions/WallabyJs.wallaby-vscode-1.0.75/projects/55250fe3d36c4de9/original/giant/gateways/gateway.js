const methods = [ 'create', 'read', 'readMany', 'save', 'destroy' ];

function Gateway (Spec) {

  return (types, ...args) => {
    if (!Array.isArray(types)) throw new Error('Validation');

    const gateway = Spec(types, ...args);

    if (methods.some(method => ! gateway.hasOwnProperty(method))) {
      throw new Error(`Gateway Interface requires: ${methods.join(', ')}.`);
    }

    return gateway;
  };
}

export default Gateway;
