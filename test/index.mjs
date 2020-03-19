import t from '../src/index.mjs';

import deepEqual from './deepequal.mjs';
import colors from './colors.mjs';
import pass from './pass.mjs';
import fail from './fail.mjs';
import ok from './ok.mjs';
import notOk from './notok.mjs';
import equal from './equal.mjs';
import throws from './throws.mjs';

t('Test', (t) => {
  t('Colors', colors);
  t('t.pass', (t) => pass(t));
  t('t.fail', (t) => fail(t));
  t('t.ok', (t) => ok(t));
  t('t.notOk', (t) => notOk(t));
  t('t.equal', (t) => equal(t));
  t('t.deepEqual', (t) => deepEqual(t));
  t('t.throws', (t) => throws(t));
  t('Timeout', (t) => {
    t.plan(1);

    const test = t.createTest({
      failed () {
        t.pass('Timeout');
      }
    });

    test('Never finish', (t) => {
      t.timeout = 1000;
      t.plan(1);
    });
  });
});
