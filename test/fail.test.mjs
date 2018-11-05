import fail from '../src/fail.mjs';

export default (t) => {
  t('Fail', (t) => {
    t.plan(1);

    const obj = {
      planned: 1,
      results: []
    };

    fail(obj, () => {
      t.deepEqual(obj.results, [false], 'Fail');
    })('a', 'b');
  });
};
