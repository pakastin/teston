export default (t) => {
  t('Should throw', (t) => {
    t.plan(1);
    t.throws(() => {throw new TypeError("This is the end")}, TypeError, "It throws");
  });
};