'use strict';

var NOT_PLANNED = 'Not planned';
var TOO_MANY_RESULTS = 'Too many results';

function checkReady (t, cb) { return function () {
  var results = t.results;
  var planned = t.planned;

  var total = results.length;

  if (total === planned) {
    var passed = results.filter(function (result) { return result; }).length;

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
}; }

function padding (count) {
  var result = '';

  for (var i = 0; i < count; i++) {
    result += ' ';
  }

  return result;
}

function plan (t) {
  return function (planned) {
    t.planned = planned;
  };
}

function equal (t, next) { return function (a, b, description) {
  var pass = t.pass;
  var fail = t.fail;
  var result = a === b;

  if (result) {
    pass(description || 'equal');
    next(true);
  } else {
    fail(description || 'equal');
    next(false, a, b);
  }
}; }

var deepEqual = function (a, b) {
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

  for (var key in a) {
    if (!(key in b)) {
      return false;
    }
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }
  for (var key$1 in b) {
    if (!(key$1 in a)) {
      return false;
    }
    if (!deepEqual(a[key$1], b[key$1])) {
      return false;
    }
  }

  return true;
};

function deepEqual$1 (t, next) { return function (a, b, msg) {
  if (deepEqual(a, b)) {
    t.pass(msg || 'deep equal');
    next(true);
  } else {
    t.fail(msg || 'deep equal');
    next(false, a, b);
  }
}; }

function pass (t, next) { return function (description) {
  t.results.push(true);

  next(description);
}; }

function fail (t, next) { return function (description) {
  t.results.push(false);

  next(description);
}; }

var GREEN = '\x1b[32m';
var RESET = '\x1b[0m';
var RED = '\x1b[31m';
var GREY = '\x1b[90m';

var green = function (str) {
  return GREEN + str + RESET;
};
var red = function (str) {
  return RED + str + RESET;
};
var grey = function (str) {
  return GREY + str + RESET;
};

var depth = 1;

var q = [];
var qReady = true;

var serve = function () {
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
    var ref = q.shift();
    var test = ref.test;

    qReady = false;
    test();
  }
};

var passed = true;

var t = function (description, test) {
  var d = depth;
  var queued = {
    test: function () {
      var timeout;
      t.timeout = 5000;
      t.description = description;
      t.indent = padding(queued.depth);

      t.white = function (str) { return console.log(t.indent + str); };
      t.grey = function (str) { return console.log(t.indent + grey(str)); };
      t.green = function (str) { return console.log(t.indent + green(str)); };
      t.red = function (str) { return console.error(t.indent + red(str)); };

      console.log('');
      t.white(description);

      t.ready = false;
      t.result = false;
      t.results = [];
      t.planned = 0;
      t.plan = plan(t);
      t.checkReady = checkReady(t, function (result, passed, failed, total) {
        process.nextTick(function () {
          if (total) {
            if (result) {
              t.green(("» Passed " + passed + "/" + total));
            } else {
              t.red(("» Failed " + failed + "/" + total));
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
      t.pass = pass(t, function (description) {
        t.green(("✔︎ " + (description || 'pass')));
        t.checkReady();
      });
      t.fail = fail(t, function (description) {
        t.red(("✗ " + (description || 'fail')));
        t.checkReady();
        passed = false;
      });
      t.equal = t.equals = equal(t, function (equals, a, b) {
      });
      t.deepEqual = t.deepEquals = deepEqual$1(t, function (equals, a, b) {
      });
      depth++;
      test(t);

      if (t.planned && !t.ready) {
        timeout = setTimeout(function () {
          timeout = null;

          if (!t.ready) {
            t.red("» timeout");
          }
        }, t.timeout);
      }

      t.checkReady();
    },
    depth: d
  };

  for (var i = 0; i <= q.length; i++) {
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
