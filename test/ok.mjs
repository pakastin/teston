export default (t) => {
  t.plan(3);

  const test = t.createTest({
    passed (a, message) {
      t.pass(message);
    }
  });

  test('Should pass', (t) => {
    t.plan(3);
    t.ok(true, 'true');
    t.ok(1, '1');
    t.ok('ok', '"ok"');
  });
};
