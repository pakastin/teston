# test
Similar to tape, but with mjs support (w.i.p)

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
```

## API
### t(description, test)
