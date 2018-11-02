import t from './index.mjs';

import checkReady from './checkready.test.mjs';
import colors from './colors.test.mjs';
import equal from './equal.test.mjs';
import deepEqual from './deepEqual.test.mjs';

t('Test', (t) => {
  t('checkReady', checkReady);
  t('colors', colors);
  t('equal', equal);
  t('deepEqual', deepEqual);
}, () => {
  console.log('Done');
});
