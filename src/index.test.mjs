import t from './index.mjs';

import plan from './plan.test.mjs';
import pass from './pass.test.mjs';
import fail from './fail.test.mjs';
import equal from './equal.test.mjs';
import deepEqual from './deepequal.test.mjs';
import checkReady from './checkready.test.mjs';
import colors from './colors.test.mjs';
import test from './test.test.mjs';

t('Test', (t) => {
  t('plan', plan);
  t('pass', pass);
  t('fail', fail);
  t('equal', equal);
  t('deepEqual', deepEqual);
  t('checkReady', checkReady);
  t('colors', colors);
  t('test', test);
}, () => {
  console.log('Done');
});
