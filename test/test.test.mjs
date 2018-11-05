export default (t) => {
  t('Run synchronous test succesfully', (t) => {
    t('1 + 1 = 2', (t) => {
      t.plan(1);

      const sum = (a, b) => a + b;

      t.equals(sum(1, 1), 2, 'Correct calculation');
    });
  });

  t('Run asynchronous test succesfully', (t) => {
    t('1 + 1 = 2', (t) => {
      t.plan(1);

      const sum = (a, b, next) => setTimeout(() => next(a + b), 0);

      sum(1, 1, (total) => {
        t.equals(total, 2, 'Correct calculation');
      });
    });
  });
};
