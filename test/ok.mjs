import ok, { notOk } from '../src/ok.mjs';

export default (t, t2) => {
  t('truthy', (t) => {
    t.plan(1);

    ok({
      pass: () => {},
      results: []
    }, (passed) => {
      t.ok(passed, 'truthy');
    })(true);
  });

  t('not truthy', (t) => {
    t.plan(1);

    ok({
      fail: () => {},
      results: []
    }, (passed) => {
      t.ok(!passed, 'not truthy');
    })(false);
  });

  t2('truthy', (t) => {
    t.plan(1);

    notOk({
      fail: () => {},
      results: []
    }, (passed) => {
      t.notOk(passed, 'truthy');
    })(true);
  });

  t2('not truthy', (t) => {
    t.plan(1);

    notOk({
      pass: () => {},
      results: []
    }, (passed) => {
      t.notOk(!passed, 'not truthy');
    })(false);
  });
};
