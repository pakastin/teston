export default (t, next) => (a, b, description) => {
  const { pass, fail } = t;
  const result = a === b;

  if (result) {
    pass(description || 'equal');
    next(true);
  } else {
    fail(description || 'equal');
    next(false, a, b);
  }
};
