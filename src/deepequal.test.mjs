import deepEqual from './deepequal.mjs';

export default (t) => {
  t('Should pass similar objects', (t) => {
    t.plan(1);

    deepEqual({
      pass: () => {},
      results: []
    }, (passed) => {
      t.equal(passed, true, 'Equal');
    })({ a: 1, b: 2 }, { a: 1, b: 2 });
  });

  t('Should fail with non-similar objects', (t) => {
    t.plan(3);

    deepEqual({
      fail: () => {},
      results: []
    }, (passed) => {
      t.equal(passed, false, 'Not equal');
    })({ a: 1 }, { a: 1, b: 2 });

    deepEqual({
      fail: () => {},
      results: []
    }, (passed) => {
      t.equal(passed, false, 'Not equal');
    })({ a: 1, b: 2 }, { a: 1 });

    deepEqual({
      fail: () => {},
      results: []
    }, (passed) => {
      t.equal(passed, false, 'Not equal');
    })({ a: 2, b: 1 }, { a: 1, b: 2 });
  });
};
