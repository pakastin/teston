import pass from '../src/pass.mjs';

export default (t) => {
  t('Pass', (t) => {
    t.plan(1);

    const obj = {
      planned: 1,
      results: []
    };

    pass(obj, () => {
      t.deepEqual(obj.results, [true], 'Pass');
    })('a', 'a');
  });
};
