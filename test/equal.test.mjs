import equal from '../src/equal.mjs';

export default (t) => {
  t('Equal', (t) => {
    t.plan(1);

    equal({
      pass: () => { },
      results: []
    }, (passed) => {
      t.equal(passed, true, 'Pass');
    })('a', 'a');
  });
  t('Not equal', (t) => {
    t.plan(1);

    equal({
      fail: () => { },
      results: []
    }, (passed) => {
      t.equal(passed, false, 'Fail');
    })('a', 'b');
  });
  t('Similar not equal objects', (t) => {
    t.plan(1);

    equal({
      fail: () => { },
      results: []
    }, (passed) => {
      t.equal(passed, false, 'Fail');
    })({ a: 1 }, { a: 1 });
  });
};
