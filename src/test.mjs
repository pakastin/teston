import checkReady from './checkready.mjs';
import padding from './indentation.mjs';
import plan from './plan.mjs';
import equal from './equal.mjs';
import deepEqual from './deepequal.mjs';
import pass from './pass.mjs';
import fail from './fail.mjs';
import { green, red, grey } from './colors.mjs';

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
        if (!equals) {
          grey(a);
          grey('› should equal to:');
          grey(b);
        }
      });
      t.deepEqual = t.deepEquals = deepEqual(t, (equals, a, b) => {
        if (!equals) {
          grey(a);
          grey('› should deep equal to:');
          grey(b);
        }
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

export default t;
