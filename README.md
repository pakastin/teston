# test
Similar to tape, but with mjs support (w.i.p). Currently not TAP-compliant.

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

### t.plan(count)

### t.pass(message)

### t.fail(message)

### t.equal(a, b, message)
### t.equals(a, b, message)

### t.deepEqual(a, b, message)
### t.deepEquals(a, b, message)

### t(t(description, test))
