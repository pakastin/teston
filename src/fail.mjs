export default (t, next) => (description) => {
  t.results.push(false);

  next(description);
};
