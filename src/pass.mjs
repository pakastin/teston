export default (t, next) => (description) => {
  t.results.push(true);

  next(description);
};
