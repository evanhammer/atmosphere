import validator from 'validator.js';

const hasOnlyDeclaredProps = (declaredProps, props) => {
  const undeclaredProps = Object.keys(props)
    .filter(k => !(k in declaredProps));
  /*if (undeclaredProps.length !== 0) {
    console.trace();
    console.log('Key(s) not declared', undeclaredProps);
  }*/

  return undeclaredProps.length === 0;
};

const areConstraintsOnProps = (constraints, props) => {
  const constraint = validator.constraint(constraints);
  const errors = constraint.check(props);
  /* if (typeof errors === 'object') {
    const keys = Object.keys(errors);
    console.trace();
    console.log('Validator returned errors', keys);
  } */

  return typeof errors !== 'object';
};

const hasRequiredProps = (required, props) => {
  const missing = Object.keys(required)
    .filter(k => !(k in props));
  /*
  if (missing.length !== 0) {
    console.trace();
    console.log('Required props missing', missing);
  }*/

  return missing.length === 0;
};

export const isValid = (constraints, props) => {
  const checks = [
    // hasRequiredProps,
    hasOnlyDeclaredProps,
    areConstraintsOnProps,
  ];

  return checks.every(check => check(constraints, props));
};
