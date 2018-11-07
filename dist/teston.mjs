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

var id = 0;

var nextTick = function (cb) {
  if (process && process.nextTick) {
    process.nextTick(cb);
  } else {
    setTimeout(cb, 0);
  }
};

var createTest = function (parent, depth) {
  if ( depth === void 0 ) depth = -1;

  var timeout;

  var t = function (description, test) {
    var child = createTest(t, depth + 1);
    child.description = description;
    child.test = test;

    t.queue || (t.queue = []);
    t.queue.push(child);

    nextTick(child.serve);
  };

  t.id = id++;
  t.parent = parent;

  t.depth = depth;
  t.introduced = false;
  t.timeout = 5000;

  t.plannedCount = 0;
  t.passedCount = 0;
  t.doneCount = 0;

  t.plannedDescendantCount = 0;
  t.passedDescendantCount = 0;

  t.serve = function () {
    var waitingChildren = t.plannedDescendantCount !== t.passedDescendantCount;
    var queueing = t.queue && t.queue.length;

    if (!waitingChildren) {
      if (queueing) {
        var child = t.queue.shift();

        child.test(child);
      } else if (t.plannedCount === t.passedCount) {
        parent.serve && parent.serve();
      }
    }
  };

  t.plan = function (count) {
    t.plannedCount += count;
    parent.planned && parent.planned(t, count);

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (t.doneCount !== t.plannedCount) {
        t.fail('Timeout');
      }
    }, t.timeout);
  };

  t.planned = function (t, count) {
    t.plannedDescendantCount += count;
    parent.planned && parent.planned(t, count);
  };

  t.pass = function (message) {
    t.passedCount++;
    t.doneCount++;
    parent.passed && parent.passed(t, message || 'passed');

    if (t.plannedCount === 0) {
      t.fail('Always plan');
    } else if (t.doneCount > t.plannedCount) {
      t.fail('Passed/failed too many times');
    }

    if (t.doneCount === t.plannedCount) {
      clearTimeout(timeout);
    }

    t.serve();
  };

  t.passed = function (t, message) {
    t.passedDescendantCount++;
    parent.passed && parent.passed(t, message);
    t.serve();
  };

  t.fail = function (message) {
    t.doneCount++;
    parent.failed && parent.failed(t, message || 'failed');

    if (t.doneCount === t.plannedCount) {
      clearTimeout(timeout);
    }
  };

  t.failed = function (t, message) {
    parent.failed && parent.failed(t, message);
  };

  t.ok = function (value, message) {
    if (value) {
      t.pass(message || 'ok');
    } else {
      t.fail(message || 'ok');
    }
  };

  t.notOk = function (value, message) {
    t.ok(!value, message || 'not ok');
  };

  t.equal = t.equals = function (a, b, message) {
    t.ok(a === b, message || 'equals');
  };

  t.deepEqual = function (a, b, message) {
    if (deepEqual(a, b)) {
      t.pass(message || 'deep equal');
    } else {
      t.fail(message || 'deep equal');
    }
  };

  t.createTest = createTest;

  return t;
};

function indent (count) {
  var result = '';

  for (var i = 0; i < count; i++) {
    result += ' ';
  }

  return result;
}

var GREEN = '\x1b[32m';
var RESET = '\x1b[0m';
var RED = '\x1b[31m';

var green = function (str) {
  return GREEN + str + RESET;
};
var red = function (str) {
  return RED + str + RESET;
};

var planned = 0;
var passed = 0;

var introduceParents = function (t) {
  var parents = [];
  var traverse = t;

  while (traverse) {
    if (traverse.introduced) {
      break;
    }
    parents.unshift(traverse);

    traverse = traverse.parent;
  }

  for (var i = 0; i < parents.length; i++) {
    var parent = parents[i];

    if (!parent.introduced) {
      parent.introduced = true;
      if (parent.description) {
        console.log('');
        console.log(indent(parent.depth), parent.description);
      }
    }
  }
};

var index = createTest({
  ready: false,
  planned: function planned$1 (t, count) {
    planned += count;
  },
  passed: function passed$1 (t, message) {
    passed++;
    introduceParents(t);
    console.log(indent(t.depth) + green(' ✔︎ ' + message));
  },
  failed: function failed (t, message) {
    console.log(t);
    console.error(indent(t.depth) + red('✗ ' + message));
    process.exit(1);
  },
  serve: function serve () {
    var this$1 = this;

    nextTick(function () {
      if (planned === passed) {
        if (this$1.ready) {
          return;
        }
        this$1.ready = true;
        console.log('');
        console.log(green('♥︎ All tests passed! ♥︎'));
      }
    });
  }
});

export default index;
