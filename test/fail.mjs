export default (t, factory) => {
  t.plan(1);

  const test = factory({
    failed () {
      t.pass('Failed');
    }
  });

  test('Should fail', (t) => {
    t.plan(1);
    t.fail();
  });
};
