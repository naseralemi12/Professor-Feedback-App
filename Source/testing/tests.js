// System modules
const assert = require('assert');

// User modules
// IMPORT YOUR MODULES HERE
const example = require('./example-function.js');

const it = (desc, fn) => {
  try {
    fn();
    console.log('\x1b[32m%s\x1b[0m', `\u2714 ${desc}`);
  } catch (error) {
    console.log('\n');
    console.log('\x1b[31m%s\x1b[0m', `\u2718 ${desc}`);
    console.error(error);
    core.setFailed(error.message);
  }
};

// Example test
it('should return the sum of two numbers', () => {
  assert.strictEqual(example.sum(5, 10), 15);
});

// PLACE YOUR UNIT TESTS HERE