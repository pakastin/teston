[![Build Status](https://img.shields.io/travis/pakastin/teston/master.svg?maxAge=60&style=flat-square)](https://travis-ci.org/pakastin/teston?branch=master)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?maxAge=60&style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/teston.svg?maxAge=60&style=flat-square)](https://www.npmjs.com/package/teston)

# Teston
Test runner similar to tape, but with ES6 module support, simpler subtest syntax and nice indentation.
🚀

## Installation
```
npm i teston
```

## Usage
```js
import t from 'teston';

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

## License
[MIT](https://github.com/pakastin/teston/blob/master/LICENSE)
