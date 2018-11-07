export default (t, factory) => {
  t.plan(1);

  const test = factory({
    passed () {
      t.pass();
    }
  });

  test('Should pass', (t) => {
    t.plan(1);
    t.pass();
  });
};
