# test
Similar to tape, but with ES6 module support, simpler subtest creation and nice indentation (w.i.p). Currently not TAP-compliant.

## Installation
```
npm i @pakastin/test
```

## Usage
```
import t from '@pakastin/test';

t('Testing things', (t) => {
  t('Test A', (t) => {
    t.plan(1);
    t.pass('Works!');
  });
  t('Test B', (t) => {
     t.plan(1);
     t.pass('Works!');
  });
});
```

```
node --experimental-modules test.mjs


 Testing things

  Test A
  ✔︎ Works!
  » Passed 1/1

  Test B
  ✔︎ Works!
  » Passed 1/1

♥︎ All tests passed ♥︎
```

## API
### t(description, test)
Create a test

### t.plan(count)
Define how many tests there will be.

### t.pass(message)
Pass the test

### t.fail(message)
Fail the test

### t.equal(a, b, message)
### t.equals(a, b, message)
Test if a and b are equal

### t.deepEqual(a, b, message)
### t.deepEquals(a, b, message)
Test if a and b are deeply equal

### t(message, (t) => { t(description, test) })
Setup subtest
