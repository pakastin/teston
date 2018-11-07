export default (t) => {
  t.plan(3);

  const test = t.createTest({
    failed (a, message) {
      t.pass(message);
    }
  });

  test('Should fail', (t) => {
    t.plan(3);
    t.ok(false, 'false');
    t.ok(0, '0');
    t.ok('', '""');
  });
};
