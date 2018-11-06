export default (t, next) => (message) => {
  t.results.push(false);

  next && next(message);
};
