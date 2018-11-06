import pass from './pass.mjs';
import fail from './fail.mjs';

const ok = (t, next) => (value, message) => {
  if (value) {
    pass(t)(message);
    next && next(true);
  } else {
    fail(t)(message);
    next && next(false);
  }
};

export default ok;

export const notOk = (t, next) => (value, message) => {
  return ok(t, next)(!value, message);
};
