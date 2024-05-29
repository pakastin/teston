export default (t) => {
  t('Should pass similar objects', (t) => {
    t.plan(1);

    const test = t.createTest({
      passed () {
        t.pass('deep equal');
      }
    });
    test.plan(1);
    test.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
  });

  t('Should fail with non-similar objects', (t) => {
    t.plan(3);

    const test = t.createTest({
      failed () {
        t.pass('not deep equal');
      }
    });

    test.plan(3);

    test.deepEqual({ a: 1 }, { a: 1, b: 2 });
    test.deepEqual({ a: 1, b: 2 }, { a: 1 });
    test.deepEqual({ a: 2, b: 1 }, { a: 1, b: 2 });
  });
};
