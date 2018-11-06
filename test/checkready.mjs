import checkReady, { NOT_PLANNED, TOO_MANY_RESULTS } from '../src/checkready.mjs';

export default (t) => {
  t('Do nothing if less done than planned', (t) => {
    t.plan(1);

    let callback = false;

    checkReady({
      planned: 1,
      results: []
    }, () => {
      callback = true;
    })();

    t.equal(callback, false, "Didn't call back");
  });

  t('Complete when done exactly as much as planned', (t) => {
    t.plan(1);

    checkReady({
      planned: 1,
      results: [true]
    }, () => {
      t.pass('Completed');
    })();
  });

  t('Throw exception if nothing planned', (t) => {
    t.plan(1);

    try {
      checkReady({
        planned: 0,
        results: [true]
      })();
    } catch (err) {
      t.equal(err.message, NOT_PLANNED, 'Correct error');
    }
  });

  t('Throw exception if too many results', (t) => {
    t.plan(1);

    try {
      checkReady({
        planned: 1,
        results: [true, true]
      })();
    } catch (err) {
      t.equal(err.message, TOO_MANY_RESULTS, 'Correct error');
    }
  });
};
