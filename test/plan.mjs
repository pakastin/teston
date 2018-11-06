import plan from '../src/plan.mjs';

export default (t) => {
  t('Plan', (t) => {
    t.plan(1);

    const obj = {};
    plan(obj)(1);

    t.deepEqual(obj, { planned: 1 }, 'Planned');
  });
};
