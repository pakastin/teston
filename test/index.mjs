import t from '../src/index.mjs';
import { factory } from '../src/test.mjs';

import deepEqual from './deepequal.mjs';
import colors from './colors.mjs';
import pass from './pass.mjs';
import fail from './fail.mjs';
import ok from './ok.mjs';
import notOk from './notok.mjs';
import equal from './equal.mjs';

t('Test', (t) => {
  t('Colors', colors);
  t('t.pass', (t) => pass(t, factory));
  t('t.fail', (t) => fail(t, factory));
  t('t.ok', (t) => ok(t, factory));
  t('t.notOk', (t) => notOk(t, factory));
  t('t.equal', (t) => equal(t, factory));
  t('t.deepEqual', (t) => deepEqual(t, factory));
  t('Timeout', (t) => {
    t.plan(1);

    const test = factory({
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
