# Teston

Test runner similar to tape, but with ES6 module support, simpler subtest syntax and nice indentation.

Not to mention it's blazing fast (because why not)! 🚀

[![Build Status](https://img.shields.io/travis/pakastin/teston/master.svg?maxAge=60&style=flat-square)](https://travis-ci.org/pakastin/teston?branch=master)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?maxAge=60&style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/teston.svg?maxAge=60&style=flat-square)](https://www.npmjs.com/package/teston)
 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Installation

You can install the production version via `npm`.

```sh
npm i teston
```

Or you can install the development version from `git`, providing it is installed.

```sh
git clone https://github.com/pakastin/teston.git
```

## Usage

Teston has an easy to use api, which you should be familiar with if you have ever worked with [Mocha](https://mochajs.org).

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

The output of the above code when passed to Teston would be:

```sh
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

### t

> The main function for creating a test.
> You may also call this function when inside a test, which is called a subtest.

Signature: `t(description: !message, test: !function)`

### t.plan

> Define how many tests there will be.

Signature: `t.plan(count: !number)`

### t.pass

> Pass the current test, passing a message which will be logged to the console.

Signature: `t.pass(message: !string)`

### t.fail

> Fail the test, passing a message that will be logged to the console.

Signature: `t.fail(message: !string)`

### t.equals(a, b, message)

aka t.equal

> Assert that `a` and `b` are equal.

Signature: `t.equals(a: !any, b: any!, message: string)

### t.deepEqual(a, b, message)

aka t.deepEquals

> Assert that `a` and `b` are deeply equal.

Signature: `t.deepEquals(a: !any, b: !any, message: string)`

## License

[MIT](https://github.com/pakastin/teston/blob/master/LICENSE)
