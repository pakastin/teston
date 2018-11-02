const deepEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    if (a.getTime() === b.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  if (a === null && b === null) {
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }

  for (const key in a) {
    if (!(key in b)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }
  for (const key in b) {
    if (!(key in a)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

export default (t, next) => (a, b, msg) => {
  if (deepEqual(a, b)) {
    t.pass(msg || 'deep equal');
    next(true);
  } else {
    t.fail(msg || 'deep equal');
    next(false, a, b);
  }
};
