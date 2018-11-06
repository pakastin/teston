export default (t, next) => (message) => {
  t.results.push(true);

  next && next(message);
};
