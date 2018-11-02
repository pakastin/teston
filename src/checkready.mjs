export const NOT_PLANNED = 'Not planned';
export const TOO_MANY_RESULTS = 'Too many results';

export default (t, cb) => () => {
  const { results, planned } = t;

  const total = results.length;

  if (total === planned) {
    const passed = results.filter(result => result).length;

    if (t.ready) {
      return;
    }

    t.result = passed === total;

    t.ready = true;
    cb(t.result, passed, total - passed, total);
  } else if (total > planned) {
    t.result = false;

    if (planned === 0) {
      throw new Error(NOT_PLANNED);
    } else {
      throw new Error(TOO_MANY_RESULTS);
    }
  }
};
