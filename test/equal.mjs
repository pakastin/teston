export default (t, factory) => {
  t('Should equal', (t) => {
    t.plan(3);

    const test = factory({
      passed (a, message) {
        t.pass(message);
      }
    });

    test('Should pass', (t) => {
      t.plan(3);
      t.equal(true, true, 'true');
      t.equal(1, 1, '1');
      t.equal('ok', 'ok', '"ok"');
    });
  });

  t('Should not equal', (t) => {
    t.plan(3);

    const test = factory({
      failed (a, message) {
        t.pass(message);
      }
    });

    test('Should fail', (t) => {
      t.plan(3);
      t.equal(true, false, 'true !== false');
      t.equal(1, 2, '1 !== 2');
      t.equal('ok', 'not ok', '"ok" !== "not ok"');
    });
  });
};
