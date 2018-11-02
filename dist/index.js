'use strict';

const NOT_PLANNED = 'Not planned';
const TOO_MANY_RESULTS = 'Too many results';

var checkReady = (t, cb) => () => {
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

var padding = (count) => {
  let result = '';

  for (let i = 0; i < count; i++) {
    result += ' ';
  }

  return result;
};

var plan = (t) => {
  return (planned) => {
    t.planned = planned;
  };
};

var equal = (t, next) => (a, b, description) => {
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

var deepEqual$1 = (t, next) => (a, b, msg) => {
  if (deepEqual(a, b)) {
    t.pass(msg || 'deep equal');
    next(true);
  } else {
    t.fail(msg || 'deep equal');
    next(false, a, b);
  }
};

var pass = (t, next) => (description) => {
  t.results.push(true);

  next(description);
};

var fail = (t, next) => (description) => {
  t.results.push(false);

  next(description);
};

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREY = '\x1b[90m';

const green = (str) => {
  return GREEN + str + RESET;
};
const red = (str) => {
  return RED + str + RESET;
};
const grey = (str) => {
  return GREY + str + RESET;
};

let depth = 1;

const q = [];
let qReady = true;

const serve = () => {
  if (qReady) {
    if (!q.length) {
      console.log('');
      if (passed) {
        console.log(green('♥︎ All tests passed ♥︎'));
      } else {
        console.error(red('Test failed'));
      }
      return;
    }
    const { test } = q.shift();

    qReady = false;
    test();
  }
};

let passed = true;

const t = (description, test) => {
  const d = depth;
  const queued = {
    test: () => {
      let timeout;
      t.timeout = 5000;
      t.description = description;
      t.indent = padding(queued.depth);

      t.white = (str) => console.log(t.indent + str);
      t.grey = (str) => console.log(t.indent + grey(str));
      t.green = (str) => console.log(t.indent + green(str));
      t.red = (str) => console.error(t.indent + red(str));

      console.log('');
      t.white(description);

      t.ready = false;
      t.result = false;
      t.results = [];
      t.planned = 0;
      t.plan = plan(t);
      t.checkReady = checkReady(t, (result, passed, failed, total) => {
        process.nextTick(() => {
          if (total) {
            if (result) {
              t.green(`» Passed ${passed}/${total}`);
            } else {
              t.red(`» Failed ${failed}/${total}`);
            }
          }
          if (timeout) {
            clearTimeout(timeout);
          }
          qReady = true;
          serve();
          depth--;
        });
      });
      t.pass = pass(t, (description) => {
        t.green(`✔︎ ${description || 'pass'}`);
        t.checkReady();
      });
      t.fail = fail(t, (description) => {
        t.red(`✗ ${description || 'fail'}`);
        t.checkReady();
        passed = false;
      });
      t.equal = t.equals = equal(t, (equals, a, b) => {
      });
      t.deepEqual = t.deepEquals = deepEqual$1(t, (equals, a, b) => {
      });
      depth++;
      test(t);

      if (t.planned && !t.ready) {
        timeout = setTimeout(() => {
          timeout = null;

          if (!t.ready) {
            t.red(`» timeout`);
          }
        }, t.timeout);
      }

      t.checkReady();
    },
    depth: d
  };

  for (let i = 0; i <= q.length; i++) {
    if (i === q.length || depth > q[i].depth) {
      q.splice(i, 0, queued);
      break;
    }
  }

  if (qReady) {
    serve();
  }
};

module.exports = t;
