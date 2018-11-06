import t from '../src/index.mjs';

import plan from './plan.mjs';
import pass from './pass.mjs';
import fail from './fail.mjs';
import ok from './ok.mjs';
import equal from './equal.mjs';
import deepEqual from './deepequal.mjs';
import checkReady from './checkready.mjs';
import colors from './colors.mjs';
import test from './test.mjs';

t('Test', (t) => {
  t('plan', plan);
  t('pass', pass);
  t('fail', fail);
  t('ok', t => {
    t('notOk', t2 => {
      ok(t, t2);
    });
  });
  t('equal', equal);
  t('deepEqual', deepEqual);
  t('checkReady', checkReady);
  t('colors', colors);
  t('test', test);
}, () => {
  console.log('Done');
});
