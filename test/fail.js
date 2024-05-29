export default (t) => {
  t.plan(1);

  const test = t.createTest({
    failed () {
      t.pass('Failed');
    }
  });

  test('Should fail', (t) => {
    t.plan(1);
    t.fail();
  });
};
