export default (t) => {
  t.plan(1);

  const test = t.createTest({
    passed () {
      t.pass();
    }
  });

  test('Should pass', (t) => {
    t.plan(1);
    t.pass();
  });
};
