const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');
const { add, subtract, multiply, divide, calculate } = require('../calculator');

const calculatorPath = path.join(__dirname, '..', 'calculator.js');

test('addition handles the example, zero, and negative operands', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 4), 0);
  assert.equal(add(-2, -3), -5);
});

test('subtraction handles the example and negative results', () => {
  assert.equal(subtract(10, 4), 6);
  assert.equal(subtract(3, 8), -5);
});

test('multiplication handles the example, zero, and negative operands', () => {
  assert.equal(multiply(45, 2), 90);
  assert.equal(multiply(0, 7), 0);
  assert.equal(multiply(-3, 4), -12);
});

test('division handles the example and fractional results', () => {
  assert.equal(divide(20, 5), 4);
  assert.equal(divide(1, 4), 0.25);
  assert.equal(divide(-12, 3), -4);
});

test('division by zero throws a clear error', () => {
  assert.throws(() => divide(1, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('calculate dispatches all four operations', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
});

test('calculate rejects unsupported operators', () => {
  assert.throws(() => calculate(2, '%', 3), /Unsupported operator: %/);
});

test('CLI prints results for each operation in the example', () => {
  for (const [a, operator, b, expected] of [
    ['2', '+', '3', '5'],
    ['10', '-', '4', '6'],
    ['45', '*', '2', '90'],
    ['20', '/', '5', '4'],
  ]) {
    const result = spawnSync(process.execPath, [calculatorPath, a, operator, b], {
      encoding: 'utf8',
    });

    assert.equal(result.status, 0);
    assert.equal(result.stdout, `${expected}\n`);
    assert.equal(result.stderr, '');
  }
});

test('CLI reports invalid input and division by zero', () => {
  const invalidNumber = spawnSync(process.execPath, [calculatorPath, 'nope', '+', '2'], {
    encoding: 'utf8',
  });
  assert.equal(invalidNumber.status, 1);
  assert.match(invalidNumber.stderr, /valid numbers/);

  const divisionByZero = spawnSync(process.execPath, [calculatorPath, '2', '/', '0'], {
    encoding: 'utf8',
  });
  assert.equal(divisionByZero.status, 1);
  assert.match(divisionByZero.stderr, /Cannot divide by zero/);
});
