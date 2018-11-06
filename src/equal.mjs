export default (t, next) => (a, b, message) => {
  const { pass, fail } = t;
  const result = a === b;

  if (result) {
    pass(message || 'equal');
    next && next(true);
  } else {
    fail(message || 'equal');
    next && next(false, a, b);
  }
};
