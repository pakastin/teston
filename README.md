# Teston

Test runner similar to tape, but with ES6 module support, simpler subtest syntax and nice indentation.

Oh, and Teston is blazing fast, of course! 🚀

[![npm](https://img.shields.io/npm/v/teston.svg?maxAge=60&style=flat-square)](https://www.npmjs.com/package/teston)
 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Installation

You can install the production version via `npm`.

```sh
npm i teston
```

Or you can install the development version from `git`, providing it is installed.

```sh
git clone https://github.com/testonjs/teston.git
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

  Test B
  ✔︎ Works!

♥︎ All tests passed! ♥︎
```

## API

### t
`t(description: String, test: Function)`

The main function for creating a test.
You may also call this function when inside a test, which is called a subtest.

### t.plan
`t.plan(count: Number)`

Define how many tests there will be.

### t.pass
`t.pass(message: String)`

Pass the current test with an optional message which will be logged to the console.

### t.fail
`t.fail(message: String)`

Fail the test, passing a message that will be logged to the console.

### t.ok
`t.ok(value : Boolean, message : String)`

Pass if value is truthy, fail if not.

### t.notOk
`t.notOk(value : Boolean, message : String)`

Pass if value is not truthy, fail if is.

### t.equals
_alias: t.equal_
`t.equals(a: *, b: *, message: String)`

Assert that `a` and `b` are equal.

### t.deepEqual
_alias: t.deepEquals_
`t.deepEquals(a: *, b: *, message: String)`

Assert that `a` and `b` are deeply equal.

## Test
* [Runt tests in browser](https://testonjs.github.io/teston/test/index.html)

## License

[MIT](https://github.com/testonjs/teston/blob/master/LICENSE)
